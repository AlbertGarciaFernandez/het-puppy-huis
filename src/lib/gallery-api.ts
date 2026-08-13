import type { GalleryAlbumDetail, GalleryAlbumSummary, UnlockAlbumResponse } from "@/types/gallery";

const galleryApiBaseUrl = (import.meta.env.VITE_GALLERY_API_URL ?? "").replace(/\/$/, "");

export class GalleryApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "GalleryApiError";
    this.status = status;
  }
}

function createApiUrl(path: string) {
  return `${galleryApiBaseUrl}${path}`;
}

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(createApiUrl(path), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    let message = "Gallery request failed.";

    try {
      const payload = (await response.json()) as { error?: string };
      if (payload.error) {
        message = payload.error;
      }
    } catch {
      // Keep the generic error when the backend does not return JSON.
    }

    throw new GalleryApiError(message, response.status);
  }

  return response.json() as Promise<T>;
}

export function getGalleryAlbums() {
  return requestJson<GalleryAlbumSummary[]>("/api/gallery/albums");
}

export function unlockGalleryAlbum(slug: string, password: string) {
  return requestJson<UnlockAlbumResponse>(`/api/gallery/albums/${encodeURIComponent(slug)}/unlock`, {
    method: "POST",
    body: JSON.stringify({ password }),
  });
}

export function getGalleryAlbum(slug: string, sessionToken: string) {
  const params = new URLSearchParams({ sessionToken });
  return requestJson<GalleryAlbumDetail>(`/api/gallery/albums/${encodeURIComponent(slug)}?${params.toString()}`).then((album) => ({
    ...album,
    photos: album.photos.map((photo) => ({
      ...photo,
      downloadUrl: photo.downloadUrl.startsWith("/api") ? createApiUrl(photo.downloadUrl) : photo.downloadUrl,
    })),
  }));
}
