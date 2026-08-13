import { useEffect } from "react";
import { ChevronLeft, ChevronRight, Download, Flag, X } from "lucide-react";

import type { GalleryPhoto } from "@/types/gallery";
const watermarkLogo = "/Het_Puppy_Huis_NOBG.png";

type PhotoLightboxProps = {
  photos: GalleryPhoto[];
  currentIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

export default function PhotoLightbox({
  photos,
  currentIndex,
  onClose,
  onPrevious,
  onNext,
}: PhotoLightboxProps) {
  const currentPhoto = photos[currentIndex];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
      if (event.key === "ArrowLeft") {
        onPrevious();
      }
      if (event.key === "ArrowRight") {
        onNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrevious]);

  if (!currentPhoto) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 px-4 py-6 backdrop-blur-md" role="dialog" aria-modal="true" aria-label="Photo viewer">
      <button className="absolute inset-0 cursor-default" aria-label="Close photo viewer" onClick={onClose} />

      <div className="relative z-10 flex h-full w-full max-w-7xl items-center justify-center">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-0 top-0 rounded-full border border-white/10 bg-black/70 p-3 text-white transition hover:border-neon-pink hover:text-neon-pink"
          aria-label="Close photo viewer"
        >
          <X className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={onPrevious}
          className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/70 p-3 text-white transition hover:border-neon-blue hover:text-neon-blue"
          aria-label="Previous photo"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <figure className="relative mx-14 flex max-h-full max-w-full items-center justify-center">
          <img
            src={currentPhoto.imageUrl}
            alt={`Album photo ${currentIndex + 1}`}
            className="max-h-[82vh] max-w-full rounded-[1.5rem] object-contain shadow-[0_0_80px_rgba(0,0,0,0.65)]"
          />
          <img
            src={watermarkLogo}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute bottom-2 right-2 w-[16%] min-w-20 max-w-44 opacity-45 drop-shadow-[0_0_24px_rgba(0,0,0,0.85)]"
          />
        </figure>

        <button
          type="button"
          onClick={onNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/70 p-3 text-white transition hover:border-neon-blue hover:text-neon-blue"
          aria-label="Next photo"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 flex-wrap items-center justify-center gap-3">
          <a
            href={currentPhoto.reportUrl}
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/75 px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white transition hover:border-neon-pink hover:text-neon-pink"
          >
            <Flag className="h-4 w-4" />
            Report photo
          </a>
          <a
            href={currentPhoto.downloadUrl}
            download
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/75 px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white transition hover:border-neon-green hover:text-neon-green"
          >
            <Download className="h-4 w-4" />
            Download
          </a>
        </div>
      </div>
    </div>
  );
}
