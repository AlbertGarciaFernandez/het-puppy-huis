import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

type GalleryAlbumNavProps = {
  hasSession: boolean;
  onSessionExpired: () => void;
};

export default function GalleryAlbumNav({ hasSession, onSessionExpired }: GalleryAlbumNavProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <Link
        to="/gallery"
        className="inline-flex items-center gap-3 rounded-full border border-white/10 px-5 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-gray-300 transition hover:border-neon-blue hover:text-neon-blue"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Gallery
      </Link>

      {hasSession ? (
        <button
          type="button"
          onClick={onSessionExpired}
          className="inline-flex items-center gap-3 rounded-full border border-white/10 px-5 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-gray-300 transition hover:border-neon-pink hover:text-neon-pink"
        >
          Session expires automatically
        </button>
      ) : null}
    </div>
  );
}
