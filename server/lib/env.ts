export type GalleryServerConfig = {
  port: number;
  supabaseUrl: string;
  supabaseServiceRoleKey: string;
  gallerySessionSecret: string;
  galleryPhotosBucket: string;
  frontendOrigin: string | null;
};

function readRequiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function getGalleryServerConfig(): GalleryServerConfig {
  return {
    port: Number(process.env.PORT ?? 3001),
    supabaseUrl: readRequiredEnv("SUPABASE_URL"),
    supabaseServiceRoleKey: readRequiredEnv("SUPABASE_SERVICE_ROLE_KEY"),
    gallerySessionSecret: readRequiredEnv("GALLERY_SESSION_SECRET"),
    galleryPhotosBucket: process.env.GALLERY_PHOTOS_BUCKET ?? "gallery-private",
    frontendOrigin: process.env.FRONTEND_ORIGIN ?? null,
  };
}
