import { useEffect, useState } from "react";

import {
  clearAlbumAccessState,
  readAlbumAccessState,
  storeAlbumAccessState,
  type AlbumSessionPayload,
} from "@/lib/gallery-access";
import {
  GalleryApiError,
  getGalleryAlbum,
  getGalleryAlbums,
  unlockGalleryAlbum,
} from "@/lib/gallery-api";
import type { GalleryAlbumDetail, GalleryAlbumSummary } from "@/types/gallery";

export function useGalleryAlbumAccess(slug: string, onSessionExpired?: () => void) {
  const [albumSummary, setAlbumSummary] = useState<GalleryAlbumSummary | null>(null);
  const [albumDetail, setAlbumDetail] = useState<GalleryAlbumDetail | null>(null);
  const [session, setSession] = useState<AlbumSessionPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function expireSession() {
    clearAlbumAccessState(window.localStorage);
    setSession(null);
    setAlbumDetail(null);
    onSessionExpired?.();
  }

  useEffect(() => {
    if (!slug) {
      return;
    }

    let isCancelled = false;

    async function loadAlbumAccess() {
      setIsLoading(true);

      try {
        const albums = await getGalleryAlbums();
        if (isCancelled) {
          return;
        }

        const summary = albums.find((item) => item.slug === slug) ?? null;
        setAlbumSummary(summary);

        if (!summary) {
          setErrorMessage("This album could not be found.");
          return;
        }

        const persistedSession = readAlbumAccessState(window.localStorage, slug);
        if (!persistedSession?.sessionToken) {
          setSession(null);
          setAlbumDetail(null);
          setErrorMessage(null);
          return;
        }

        setSession(persistedSession);
        const detail = await getGalleryAlbum(slug, persistedSession.sessionToken);
        if (!isCancelled) {
          setAlbumDetail(detail);
          setErrorMessage(null);
        }
      } catch (error) {
        if (isCancelled) {
          return;
        }

        if (error instanceof GalleryApiError && (error.status === 401 || error.status === 403)) {
          expireSession();
          setErrorMessage(null);
        } else {
          setErrorMessage(error instanceof Error ? error.message : "The album is not available right now.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadAlbumAccess();

    return () => {
      isCancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    if (!session) {
      return;
    }

    const timeoutMs = session.expiresAt - Date.now();
    if (timeoutMs <= 0) {
      expireSession();
      return;
    }

    const timer = window.setTimeout(expireSession, timeoutMs);
    return () => window.clearTimeout(timer);
  }, [session]);

  async function unlockAlbum(password: string) {
    if (!slug) {
      return;
    }

    setIsUnlocking(true);
    setErrorMessage(null);

    try {
      const unlockResponse = await unlockGalleryAlbum(slug, password);
      const nextSession: AlbumSessionPayload = {
        albumSlug: slug,
        expiresAt: unlockResponse.expiresAt,
        sessionToken: unlockResponse.sessionToken,
      };

      storeAlbumAccessState(window.localStorage, nextSession);
      setSession(nextSession);

      const detail = await getGalleryAlbum(slug, unlockResponse.sessionToken);
      setAlbumDetail(detail);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "The album could not be unlocked.");
    } finally {
      setIsUnlocking(false);
    }
  }

  return {
    albumDetail,
    albumSummary,
    currentAlbum: albumDetail ?? albumSummary,
    errorMessage,
    expireSession,
    isLoading,
    isUnlocking,
    session,
    unlockAlbum,
  };
}
