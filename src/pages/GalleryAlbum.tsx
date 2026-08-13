import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import GalleryAlbumHero from "@/components/GalleryAlbumHero";
import GalleryAlbumNav from "@/components/GalleryAlbumNav";
import GalleryPasswordGate from "@/components/GalleryPasswordGate";
import GalleryPhotoGrid from "@/components/GalleryPhotoGrid";
import PhotoLightbox from "@/components/PhotoLightbox";
import { useGalleryAlbumAccess } from "@/hooks/useGalleryAlbumAccess";
import { GALLERY_PHOTOS_BATCH_SIZE, getNextVisiblePhotoCount, getVisiblePhotos } from "@/lib/gallery-pagination";

export default function GalleryAlbum() {
  const { slug = "" } = useParams();
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [visiblePhotoCount, setVisiblePhotoCount] = useState(GALLERY_PHOTOS_BATCH_SIZE);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const {
    albumDetail,
    albumSummary,
    currentAlbum,
    errorMessage,
    expireSession,
    isLoading,
    isUnlocking,
    session,
    unlockAlbum,
  } = useGalleryAlbumAccess(slug, () => setSelectedIndex(null));

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

  function handleSessionExpired() {
    expireSession();
  }

  function handlePreviousPhoto() {
    setSelectedIndex((current) => (current === null || !albumDetail ? 0 : (current - 1 + albumDetail.photos.length) % albumDetail.photos.length));
  }

  function handleNextPhoto() {
    setSelectedIndex((current) => (current === null || !albumDetail ? 0 : (current + 1) % albumDetail.photos.length));
  }

  return (
    <div className="min-h-screen bg-neutral-950 px-4 pb-20 pt-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <GalleryAlbumNav hasSession={Boolean(session)} onSessionExpired={handleSessionExpired} />

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
              onSubmit={unlockAlbum}
            />
          </div>
        ) : null}

        {!isLoading && albumDetail ? (
          <div className="mt-10">
            <GalleryAlbumHero title={albumDetail.title} description={albumDetail.description} photoCount={albumDetail.photos.length} />
            <GalleryPhotoGrid
              albumTitle={albumDetail.title}
              photos={visiblePhotos}
              hasMorePhotos={hasMorePhotos}
              loadMoreRef={loadMoreRef}
              onOpenPhoto={setSelectedIndex}
            />
          </div>
        ) : null}
      </div>

      {albumDetail && selectedIndex !== null ? (
          <PhotoLightbox
            photos={albumDetail.photos}
            currentIndex={selectedPhotoIndex}
            onClose={() => setSelectedIndex(null)}
            onPrevious={handlePreviousPhoto}
            onNext={handleNextPhoto}
          />
      ) : null}
    </div>
  );
}
