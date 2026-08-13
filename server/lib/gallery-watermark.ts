import { readFile } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

import type { GalleryServerConfig } from "./env";

type SupabaseStorageClient = {
  storage: {
    from: (bucket: string) => {
      download: (path: string) => Promise<{ data: Blob | null; error: Error | null }>;
    };
  };
};

export type CreateWatermarkedImageInput = {
  supabase: SupabaseStorageClient;
  config: GalleryServerConfig;
  storagePath: string;
  photoId: string;
  albumSlug: string;
  photoNumber: number;
};

export type WatermarkedImage = {
  data: Buffer;
  contentType: string;
  filename: string;
};

const watermarkLogoPath = path.resolve(process.cwd(), "public/Het_Puppy_Huis_NOBG.png");

function createSafeFilename(albumSlug: string, photoNumber: number) {
  const safeAlbumSlug = albumSlug.replace(/[^a-z0-9-]/gi, "-");
  const paddedPhotoNumber = String(photoNumber).padStart(4, "0");

  return `het-puppy-huis-${safeAlbumSlug}-${paddedPhotoNumber}.jpg`;
}

async function blobToBuffer(blob: Blob) {
  return Buffer.from(await blob.arrayBuffer());
}

export async function createWatermarkedImage({
  supabase,
  config,
  storagePath,
  photoId,
  albumSlug,
  photoNumber,
}: CreateWatermarkedImageInput): Promise<WatermarkedImage> {
  const { data: photoBlob, error } = await supabase.storage
    .from(config.galleryPhotosBucket)
    .download(storagePath);

  if (error || !photoBlob) {
    throw error ?? new Error(`Unable to download photo ${photoId}`);
  }

  const photoBuffer = await blobToBuffer(photoBlob);
  const logoBuffer = await readFile(watermarkLogoPath);
  const image = sharp(photoBuffer).rotate();
  const metadata = await image.metadata();
  const imageWidth = metadata.width ?? 1600;
  const imageHeight = metadata.height ?? 1200;
  const logoWidth = Math.max(220, Math.min(620, Math.round(imageWidth * 0.18)));
  const resizedLogo = await sharp(logoBuffer).resize({ width: logoWidth, withoutEnlargement: true }).png().toBuffer();
  const logoMetadata = await sharp(resizedLogo).metadata();
  const logoHeight = logoMetadata.height ?? Math.round(logoWidth * 0.35);
  const padding = Math.max(8, Math.round(Math.min(imageWidth, imageHeight) * 0.012));
  const encodedLogo = resizedLogo.toString("base64");
  const watermarkSvg = Buffer.from(`
    <svg width="${logoWidth}" height="${logoHeight}" xmlns="http://www.w3.org/2000/svg">
      <image href="data:image/png;base64,${encodedLogo}" width="${logoWidth}" height="${logoHeight}" opacity="0.48"/>
    </svg>
  `);

  const watermarked = await image
    .composite([
      {
        input: watermarkSvg,
        left: Math.max(0, imageWidth - logoWidth - padding),
        top: Math.max(0, imageHeight - logoHeight - padding),
      },
    ])
    .jpeg({ quality: 88, mozjpeg: true })
    .toBuffer();

  return {
    data: watermarked,
    contentType: "image/jpeg",
    filename: createSafeFilename(albumSlug, photoNumber),
  };
}
