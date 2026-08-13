import assert from "node:assert/strict";
import type { AddressInfo } from "node:net";
import test from "node:test";

import { createGalleryApp } from "../server/lib/gallery-app";
import { signAlbumSessionToken } from "../server/lib/album-session";

function createMockSupabase() {
  const album = {
    id: "album-1",
    title: "First Chapter",
    slug: "first-chapter",
    description: "First Chapter gallery.",
    cover_image_url: "https://example.com/cover.jpg",
    access_duration_minutes: 45,
  };
  const storageObjects = [
    { name: "QO6A9030.JPG" },
    { name: "QO6A9029.JPG" },
    { name: ".emptyFolderPlaceholder" },
  ];

  return {
    from(table: string) {
      return {
        select() {
          return this;
        },
        eq(column: string, value: string) {
          if (table === "albums" && column === "slug" && value !== album.slug) {
            return this;
          }
          return this;
        },
        order() {
          return this;
        },
        returns: async () => ({ data: [], error: null }),
        single: async () => {
          if (table === "albums") {
            return { data: album, error: null };
          }
          return { data: null, error: { message: "unknown table" } };
        },
      };
    },
    storage: {
      from() {
        return {
          list: async (folder: string) => {
            assert.equal(folder, "First Chapter");
            return { data: storageObjects, error: null };
          },
          createSignedUrl: async (storagePath: string) => ({
            data: { signedUrl: `https://example.com/${encodeURIComponent(storagePath)}` },
            error: null,
          }),
        };
      },
    },
  };
}

function createTestApp() {
  return createGalleryApp({
    getConfig: () => ({
      port: 3001,
      supabaseUrl: "https://example.supabase.co",
      supabaseServiceRoleKey: "service-role-key",
      gallerySessionSecret: "test-secret",
      galleryPhotosBucket: "gallery-private",
      frontendOrigin: null,
    }),
    getSupabase: createMockSupabase,
    createWatermarkedImage: async ({ storagePath }) => ({
      data: Buffer.from(`watermarked:${storagePath}`),
      contentType: "image/jpeg",
      filename: "photo-1-watermarked.jpg",
    }),
  });
}

test("download endpoint rejects an invalid album session", async () => {
  const app = createTestApp();
  const server = app.listen(0);
  await new Promise<void>((resolve) => server.once("listening", resolve));
  const address = server.address() as AddressInfo;

  try {
    const response = await fetch(
      `http://127.0.0.1:${address.port}/api/gallery/albums/first-chapter/photos/photo-1/download?sessionToken=bad-token`,
    );

    assert.equal(response.status, 401);
  } finally {
    server.close();
  }
});

test("album detail lists signed photos from the album storage folder", async () => {
  const app = createTestApp();
  const server = app.listen(0);
  await new Promise<void>((resolve) => server.once("listening", resolve));
  const address = server.address() as AddressInfo;

  const sessionToken = signAlbumSessionToken({
    albumSlug: "first-chapter",
    secret: "test-secret",
    expiresInMinutes: 45,
  });

  try {
    const response = await fetch(
      `http://127.0.0.1:${address.port}/api/gallery/albums/first-chapter?sessionToken=${encodeURIComponent(sessionToken)}`,
    );
    const payload = await response.json();

    assert.equal(response.status, 200);
    assert.deepEqual(
      payload.photos.map((photo: { id: string }) => photo.id),
      ["First Chapter/QO6A9029.JPG", "First Chapter/QO6A9030.JPG"],
    );
  } finally {
    server.close();
  }
});

test("download endpoint returns a watermarked image for a valid album session", async () => {
  const app = createTestApp();
  const server = app.listen(0);
  await new Promise<void>((resolve) => server.once("listening", resolve));
  const address = server.address() as AddressInfo;

  const sessionToken = signAlbumSessionToken({
    albumSlug: "first-chapter",
    secret: "test-secret",
    expiresInMinutes: 45,
  });

  try {
    const photoId = encodeURIComponent("First Chapter/QO6A9029.JPG");
    const response = await fetch(
      `http://127.0.0.1:${address.port}/api/gallery/albums/first-chapter/photos/${photoId}/download?sessionToken=${encodeURIComponent(sessionToken)}`,
    );

    assert.equal(response.status, 200);
    assert.equal(response.headers.get("content-type"), "image/jpeg");
    assert.equal(response.headers.get("content-disposition"), 'attachment; filename="photo-1-watermarked.jpg"');
    assert.equal(await response.text(), "watermarked:First Chapter/QO6A9029.JPG");
  } finally {
    server.close();
  }
});
