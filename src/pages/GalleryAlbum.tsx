import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Camera, Download, Images } from "lucide-react";
import { motion } from "motion/react";

import GalleryPasswordGate from "@/components/GalleryPasswordGate";
import PhotoLightbox from "@/components/PhotoLightbox";
const watermarkLogo = "/Het_Puppy_Huis_NOBG.png";
const albumPhotographer = {
  name: "Alessandro Faraon",
  instagram: "https://www.instagram.com/alessandro.faraon/",
};
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
import { GALLERY_PHOTOS_BATCH_SIZE, getNextVisiblePhotoCount, getVisiblePhotos } from "@/lib/gallery-pagination";
import type { GalleryAlbumDetail, GalleryAlbumSummary } from "@/types/gallery";

export default function GalleryAlbum() {
  const { slug = "" } = useParams();
  const navigate = useNavigate();
  const [albumSummary, setAlbumSummary] = useState<GalleryAlbumSummary | null>(null);
  const [albumDetail, setAlbumDetail] = useState<GalleryAlbumDetail | null>(null);
  const [session, setSession] = useState<AlbumSessionPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [visiblePhotoCount, setVisiblePhotoCount] = useState(GALLERY_PHOTOS_BATCH_SIZE);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const selectedPhotoIndex = useMemo(() => selectedIndex ?? 0, [selectedIndex]);
  const visiblePhotos = useMemo(
    () => getVisiblePhotos(albumDetail?.photos ?? [], visiblePhotoCount),
    [albumDetail?.photos, visiblePhotoCount],
  );
  const hasMorePhotos = Boolean(albumDetail && visiblePhotoCount < albumDetail.photos.length);

  useEffect(() => {
    if (!slug) {
      navigate("/gallery", { replace: true });
    }
  }, [navigate, slug]);

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
          clearAlbumAccessState(window.localStorage);
          setSession(null);
          setAlbumDetail(null);
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
    setVisiblePhotoCount(GALLERY_PHOTOS_BATCH_SIZE);
  }, [slug, albumDetail?.id]);

  useEffect(() => {
    const sentinel = loadMoreRef.current;
    if (!sentinel || !albumDetail || !hasMorePhotos) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisiblePhotoCount((currentCount) => getNextVisiblePhotoCount(currentCount, albumDetail.photos.length));
        }
      },
      { rootMargin: "800px 0px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [albumDetail, hasMorePhotos]);

  useEffect(() => {
    if (!session) {
      return;
    }

    const timeoutMs = session.expiresAt - Date.now();
    if (timeoutMs <= 0) {
      clearAlbumAccessState(window.localStorage);
      setSession(null);
      setAlbumDetail(null);
      return;
    }

    const timer = window.setTimeout(() => {
      clearAlbumAccessState(window.localStorage);
      setSession(null);
      setAlbumDetail(null);
      setSelectedIndex(null);
    }, timeoutMs);

    return () => window.clearTimeout(timer);
  }, [session]);

  async function handleUnlock(password: string) {
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

  function handleSessionExpired() {
    clearAlbumAccessState(window.localStorage);
    setSession(null);
    setAlbumDetail(null);
    setSelectedIndex(null);
  }

  const currentAlbum = albumDetail ?? albumSummary;

  return (
    <div className="min-h-screen bg-neutral-950 px-4 pb-20 pt-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-3 rounded-full border border-white/10 px-5 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-gray-300 transition hover:border-neon-blue hover:text-neon-blue"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Gallery
          </Link>

          {session ? (
            <button
              type="button"
              onClick={handleSessionExpired}
              className="inline-flex items-center gap-3 rounded-full border border-white/10 px-5 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-gray-300 transition hover:border-neon-pink hover:text-neon-pink"
            >
              Session expires automatically
            </button>
          ) : null}
        </div>

        {isLoading ? (
          <div className="mt-10 h-[32rem] animate-pulse rounded-[2rem] border border-white/8 bg-white/5" />
        ) : null}

        {!isLoading && errorMessage && !albumSummary ? (
          <div className="mt-10 rounded-[2rem] border border-rose-500/30 bg-rose-500/10 px-6 py-5 text-rose-200">
            {errorMessage}
          </div>
        ) : null}

        {!isLoading && currentAlbum && !albumDetail ? (
          <div className="mt-10">
            <GalleryPasswordGate
              title={currentAlbum.title}
              description={currentAlbum.description}
              coverImageUrl={currentAlbum.coverImageUrl}
              errorMessage={errorMessage}
              isSubmitting={isUnlocking}
              onSubmit={handleUnlock}
            />
          </div>
        ) : null}

        {!isLoading && albumDetail ? (
          <div className="mt-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
            >
              <div>
                <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-neon-blue">
                  <Images className="h-4 w-4" />
                  Album Unlocked
                </span>
                <h1 className="mt-6 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">{albumDetail.title}</h1>
                <p className="mt-4 max-w-3xl text-base leading-8 text-gray-400 sm:text-lg">{albumDetail.description}</p>
                <a
                  href={albumPhotographer.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-gray-300 transition hover:border-neon-blue hover:text-neon-blue"
                >
                  <Camera className="h-4 w-4" />
                  Photos by {albumPhotographer.name}
                </a>
              </div>

              <div className="text-sm uppercase tracking-[0.28em] text-gray-500">
                {albumDetail.photos.length} photos
              </div>
            </motion.div>

            <div className="mt-10 columns-1 gap-4 space-y-4 md:columns-2 xl:columns-3">
              {visiblePhotos.map((photo, index) => (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  className="group relative block w-full break-inside-avoid overflow-hidden rounded-[1.75rem] border border-white/8 bg-neutral-900 text-left"
                >
                  <img
                    src={photo.imageUrl}
                    alt={`Album photo ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="h-auto w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                  <img
                    src={watermarkLogo}
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-2 right-2 w-[24%] max-w-28 opacity-45 drop-shadow-[0_0_18px_rgba(0,0,0,0.75)]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                  <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/65 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white opacity-0 backdrop-blur-md transition group-hover:opacity-100">
                    <Download className="h-3.5 w-3.5" />
                    Open
                  </div>
                </button>
              ))}
            </div>

            {hasMorePhotos ? (
              <div ref={loadMoreRef} className="mt-10 flex justify-center py-8 text-sm uppercase tracking-[0.28em] text-gray-500">
                Loading more photos...
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      {albumDetail && selectedIndex !== null ? (
        <PhotoLightbox
          photos={albumDetail.photos}
          currentIndex={selectedPhotoIndex}
          onClose={() => setSelectedIndex(null)}
          onPrevious={() => setSelectedIndex((current) => (current === null ? 0 : (current - 1 + albumDetail.photos.length) % albumDetail.photos.length))}
          onNext={() => setSelectedIndex((current) => (current === null ? 0 : (current + 1) % albumDetail.photos.length))}
        />
      ) : null}
    </div>
  );
}
