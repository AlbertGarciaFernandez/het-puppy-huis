export type AlbumSessionPayload = {
  albumSlug: string;
  expiresAt: number;
  sessionToken: string;
};

type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">;

const GALLERY_ACCESS_STORAGE_KEY = "gallery-album-access";

export function createAlbumSessionToken(
  albumSlug: string,
  accessDurationMinutes: number,
  now = Date.now(),
  sessionToken = "",
): AlbumSessionPayload {
  return {
    albumSlug,
    expiresAt: now + accessDurationMinutes * 60 * 1000,
    sessionToken,
  };
}

export function isAlbumSessionPayloadValid(
  payload: AlbumSessionPayload | null | undefined,
  albumSlug: string,
  now = Date.now(),
): payload is AlbumSessionPayload {
  return Boolean(payload && payload.albumSlug === albumSlug && payload.expiresAt > now);
}

export function storeAlbumAccessState(storage: StorageLike, payload: AlbumSessionPayload) {
  storage.setItem(GALLERY_ACCESS_STORAGE_KEY, JSON.stringify(payload));
}

export function readAlbumAccessState(
  storage: StorageLike,
  albumSlug: string,
  now = Date.now(),
): AlbumSessionPayload | null {
  const rawPayload = storage.getItem(GALLERY_ACCESS_STORAGE_KEY);
  if (!rawPayload) {
    return null;
  }

  try {
    const parsedPayload = JSON.parse(rawPayload) as AlbumSessionPayload;
    if (isAlbumSessionPayloadValid(parsedPayload, albumSlug, now)) {
      return parsedPayload;
    }
  } catch {
    // Invalid payloads should be treated as expired sessions.
  }

  storage.removeItem(GALLERY_ACCESS_STORAGE_KEY);
  return null;
}

export function clearAlbumAccessState(storage: StorageLike) {
  storage.removeItem(GALLERY_ACCESS_STORAGE_KEY);
}
