import type { RefObject } from "react";
import { Download } from "lucide-react";

import type { GalleryPhoto } from "@/types/gallery";

const watermarkLogo = "/Het_Puppy_Huis_NOBG.png";

type GalleryPhotoGridProps = {
  albumTitle: string;
  photos: GalleryPhoto[];
  hasMorePhotos: boolean;
  loadMoreRef: RefObject<HTMLDivElement | null>;
  onOpenPhoto: (index: number) => void;
};

export default function GalleryPhotoGrid({
  albumTitle,
  photos,
  hasMorePhotos,
  loadMoreRef,
  onOpenPhoto,
}: GalleryPhotoGridProps) {
  return (
    <>
      <div className="mt-10 columns-1 gap-4 space-y-4 md:columns-2 xl:columns-3">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => onOpenPhoto(index)}
            className="group relative block w-full break-inside-avoid overflow-hidden rounded-[1.75rem] border border-white/8 bg-neutral-900 text-left"
          >
            <img
              src={photo.imageUrl}
              alt={`Photo ${index + 1} from ${albumTitle}`}
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
    </>
  );
}
