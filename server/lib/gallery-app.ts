import bcrypt from "bcryptjs";
import express from "express";

import { signAlbumSessionToken, verifyAlbumSessionToken } from "./album-session.js";
import { getGalleryServerConfig, type GalleryServerConfig } from "./env.js";
import { getSupabaseAdmin } from "./supabase-admin.js";
import type { CreateWatermarkedImageInput, WatermarkedImage } from "./gallery-watermark";

type AlbumRow = {
  id: string;
  title: string;
  slug: string;
  description: string;
  cover_image_url: string;
  password_hash: string;
  access_duration_minutes: number;
};

type GalleryAppDependencies = {
  getConfig?: () => GalleryServerConfig;
  getSupabase?: () => any;
  createWatermarkedImage?: (input: CreateWatermarkedImageInput) => Promise<WatermarkedImage>;
};

function createDownloadUrl(slug: string, photoId: string, sessionToken: string) {
  const params = new URLSearchParams({ sessionToken });
  return `/api/gallery/albums/${encodeURIComponent(slug)}/photos/${encodeURIComponent(photoId)}/download?${params.toString()}`;
}

function createReportUrl(album: { title: string; slug: string }, photoId: string, photoNumber: number) {
  const subject = `Report photo - ${album.title}`;
  const body = [
    "Hi Het Puppy Huis,",
    "",
    "I would like to report this gallery photo:",
    "",
    `Album: ${album.title}`,
    `Album slug: ${album.slug}`,
    `Photo number: ${photoNumber}`,
    `Photo ID: ${photoId}`,
    "",
    "Reason:",
  ].join("\n");

  return `mailto:info@hetpuppyhuis.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function isGalleryImage(name: string) {
  return /\.(jpe?g|png|webp)$/i.test(name);
}

function getAlbumStorageFolder(album: { title: string }) {
  return album.title.trim();
}

function getMissingGalleryConfigNames() {
  return ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY", "GALLERY_SESSION_SECRET"].filter((name) => !process.env[name]);
}

async function listAlbumStoragePaths(supabase: any, config: GalleryServerConfig, album: { title: string }) {
  const folder = getAlbumStorageFolder(album);
  const { data, error } = await supabase.storage.from(config.galleryPhotosBucket).list(folder, {
    limit: 1000,
    sortBy: { column: "name", order: "asc" },
  });

  if (error) {
    throw error;
  }

  return (data ?? [])
    .map((item: { name?: string }) => item.name ?? "")
    .filter((name: string) => isGalleryImage(name))
    .sort((left: string, right: string) => left.localeCompare(right, undefined, { numeric: true }))
    .map((name: string) => `${folder}/${name}`);
}

export function createGalleryApp(dependencies: GalleryAppDependencies = {}) {
  const getConfig = dependencies.getConfig ?? getGalleryServerConfig;
  const getSupabase = dependencies.getSupabase ?? getSupabaseAdmin;
  const watermarkImage = dependencies.createWatermarkedImage ?? ((input: CreateWatermarkedImageInput) => import("./gallery-watermark.js").then(({ createWatermarkedImage }) => createWatermarkedImage(input)));
  const app = express();

  app.use(express.json());

  app.get("/api/health", (_req, res) => {
    const missingConfig = dependencies.getConfig ? [] : getMissingGalleryConfigNames();

    res.json({
      ok: true,
      galleryConfigReady: missingConfig.length === 0,
      missingConfig,
    });
  });

  app.use((req, res, next) => {
    const { frontendOrigin } = getConfig();

    if (frontendOrigin && req.headers.origin === frontendOrigin) {
      res.setHeader("Access-Control-Allow-Origin", frontendOrigin);
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    }

    if (req.method === "OPTIONS") {
      res.sendStatus(204);
      return;
    }

    next();
  });

  app.get("/api/gallery/albums", async (_req, res) => {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from("albums")
        .select("id,title,slug,description,cover_image_url,access_duration_minutes")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      res.json(
        (data ?? []).map((album) => ({
          id: album.id,
          title: album.title,
          slug: album.slug,
          description: album.description,
          coverImageUrl: album.cover_image_url,
          accessDurationMinutes: album.access_duration_minutes,
        })),
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "The gallery is not available right now." });
    }
  });

  app.post("/api/gallery/albums/:slug/unlock", async (req, res) => {
    const slug = String(req.params.slug ?? "");
    const password = String(req.body?.password ?? "").trim();

    if (!slug || !password) {
      res.status(400).json({ error: "Album slug and password are required." });
      return;
    }

    try {
      const supabase = getSupabase();
      const config = getConfig();
      const { data, error } = await supabase
        .from("albums")
        .select("id,title,slug,description,cover_image_url,password_hash,access_duration_minutes")
        .eq("slug", slug)
        .eq("is_published", true)
        .single();

      if (error || !data) {
        res.status(404).json({ error: "Album not found." });
        return;
      }

      const passwordMatches = await bcrypt.compare(password, data.password_hash);
      if (!passwordMatches) {
        res.status(401).json({ error: "Incorrect album password." });
        return;
      }

      const now = Date.now();
      const sessionToken = signAlbumSessionToken({
        albumSlug: data.slug,
        secret: config.gallerySessionSecret,
        expiresInMinutes: data.access_duration_minutes,
        now,
      });

      res.json({
        sessionToken,
        expiresAt: now + data.access_duration_minutes * 60 * 1000,
        accessDurationMinutes: data.access_duration_minutes,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "The album could not be unlocked." });
    }
  });

  app.get("/api/gallery/albums/:slug", async (req, res) => {
    const slug = String(req.params.slug ?? "");
    const sessionToken = String(req.query.sessionToken ?? "");

    if (!slug || !sessionToken) {
      res.status(400).json({ error: "Album slug and session token are required." });
      return;
    }

    const config = getConfig();
    let session;

    try {
      session = verifyAlbumSessionToken(sessionToken, config.gallerySessionSecret);
    } catch (error) {
      console.error("Gallery session verification failed", error);
      res.status(401).json({ error: "Your album session has expired. Please enter the password again." });
      return;
    }

    try {
      if (session.albumSlug !== slug) {
        res.status(403).json({ error: "This session does not match the requested album." });
        return;
      }

      const supabase = getSupabase();
      const { data: album, error: albumError } = await supabase
        .from("albums")
        .select("id,title,slug,description,cover_image_url,access_duration_minutes")
        .eq("slug", slug)
        .eq("is_published", true)
        .single();

      if (albumError || !album) {
        res.status(404).json({ error: "Album not found." });
        return;
      }

      const storagePaths = await listAlbumStoragePaths(supabase, config, album);

      const signedPhotos = await Promise.all(
        storagePaths.map(async (storagePath, index) => {
          const { data: signedUrlData, error } = await supabase.storage
            .from(config.galleryPhotosBucket)
            .createSignedUrl(storagePath, album.access_duration_minutes * 60);

          if (error || !signedUrlData?.signedUrl) {
            throw error ?? new Error(`Unable to sign photo ${storagePath}`);
          }

          return {
            id: storagePath,
            imageUrl: signedUrlData.signedUrl,
            downloadUrl: createDownloadUrl(slug, storagePath, sessionToken),
            reportUrl: createReportUrl(album, storagePath, index + 1),
          };
        }),
      );

      res.json({
        id: album.id,
        title: album.title,
        slug: album.slug,
        description: album.description,
        coverImageUrl: album.cover_image_url,
        accessDurationMinutes: album.access_duration_minutes,
        photos: signedPhotos,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "The album photos are not available right now." });
    }
  });

  app.get("/api/gallery/albums/:slug/photos/:photoId/download", async (req, res) => {
    const slug = String(req.params.slug ?? "");
    const photoId = String(req.params.photoId ?? "");
    const sessionToken = String(req.query.sessionToken ?? "");

    if (!slug || !photoId || !sessionToken) {
      res.status(400).json({ error: "Album slug, photo id and session token are required." });
      return;
    }

    const config = getConfig();
    let session;

    try {
      session = verifyAlbumSessionToken(sessionToken, config.gallerySessionSecret);
    } catch {
      res.status(401).json({ error: "Your album session has expired. Please enter the password again." });
      return;
    }

    try {
      if (session.albumSlug !== slug) {
        res.status(403).json({ error: "This session does not match the requested album." });
        return;
      }

      const supabase = getSupabase();
      const { data: album, error: albumError } = await supabase
        .from("albums")
        .select("id,title,slug,description,cover_image_url,access_duration_minutes")
        .eq("slug", slug)
        .eq("is_published", true)
        .single();

      if (albumError || !album) {
        res.status(404).json({ error: "Album not found." });
        return;
      }

      const storagePaths = await listAlbumStoragePaths(supabase, config, album);
      const photoIndex = storagePaths.indexOf(photoId);

      if (photoIndex === -1) {
        res.status(404).json({ error: "Photo not found." });
        return;
      }

      const watermarked = await watermarkImage({
        supabase,
        config,
        storagePath: photoId,
        photoId,
        albumSlug: album.slug,
        photoNumber: photoIndex + 1,
      });

      res.setHeader("Content-Type", watermarked.contentType);
      res.setHeader("Content-Disposition", `attachment; filename="${watermarked.filename}"`);
      res.send(watermarked.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "The album photo could not be downloaded right now." });
    }
  });

  return app;
}
