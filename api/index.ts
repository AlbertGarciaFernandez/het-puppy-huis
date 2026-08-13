import { createGalleryApp } from "../server/lib/gallery-app";

const galleryApp = createGalleryApp();

export default function handler(req: Parameters<typeof galleryApp>[0], res: Parameters<typeof galleryApp>[1]) {
  try {
    return galleryApp(req, res);
  } catch (error) {
    console.error("Gallery API invocation failed", error);
    res.status(500).json({ error: "Gallery API invocation failed." });
  }
}
