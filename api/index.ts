function getMissingGalleryConfigNames() {
  return ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY", "GALLERY_SESSION_SECRET"].filter((name) => !process.env[name]);
}

export default async function handler(req: any, res: any) {
  try {
    if (req.url?.startsWith("/api/health")) {
      const missingConfig = getMissingGalleryConfigNames();

      res.json({
        ok: true,
        galleryConfigReady: missingConfig.length === 0,
        missingConfig,
      });
      return;
    }

    const { createGalleryApp } = await import("../server/lib/gallery-app");
    const galleryApp = createGalleryApp();
    return galleryApp(req, res);
  } catch (error) {
    console.error("Gallery API invocation failed", error);
    res.status(500).json({
      error: "Gallery API invocation failed.",
      reason: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
