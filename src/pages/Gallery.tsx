import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Images, LockKeyhole } from "lucide-react";
import { motion } from "motion/react";

import { GalleryApiError, getGalleryAlbums } from "@/lib/gallery-api";
import type { GalleryAlbumSummary } from "@/types/gallery";

export default function Gallery() {
  const [albums, setAlbums] = useState<GalleryAlbumSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function loadAlbums() {
      try {
        const albumList = await getGalleryAlbums();
        if (!isCancelled) {
          setAlbums(albumList);
          setErrorMessage(null);
        }
      } catch (error) {
        if (!isCancelled) {
          setErrorMessage(
            error instanceof GalleryApiError
              ? error.message
              : "The gallery is not available right now.",
          );
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadAlbums();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 px-4 pb-20 pt-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="max-w-4xl"
        >
          <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-neon-blue">
            <Images className="h-4 w-4" />
            Gallery
          </span>
          <h1 className="mt-6 text-5xl font-bold text-white md:text-7xl">
            Private <span className="text-neon-pink">Albums</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Explore each event through curated private albums. Covers, names and descriptions stay public. Access to the photos themselves is protected album by album.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-[28rem] animate-pulse rounded-[2rem] border border-white/8 bg-white/5" />
            ))}
          </div>
        ) : null}

        {!isLoading && errorMessage ? (
          <div className="mt-14 rounded-[2rem] border border-rose-500/30 bg-rose-500/10 px-6 py-5 text-rose-200">
            {errorMessage}
          </div>
        ) : null}

        {!isLoading && !errorMessage ? (
          <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {albums.map((album, index) => (
              <motion.article
                key={album.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="group overflow-hidden rounded-[2rem] border border-white/8 bg-neutral-900/75"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={album.coverImageUrl}
                    alt={album.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/55 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-neon-pink backdrop-blur-md">
                    <LockKeyhole className="h-3.5 w-3.5" />
                    Password Protected
                  </div>
                </div>

                <div className="space-y-5 p-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{album.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-gray-400">{album.description}</p>
                  </div>

                  <Link
                    to={`/gallery/${album.slug}`}
                    className="inline-flex items-center gap-3 rounded-full border border-neon-blue/40 px-5 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-neon-blue transition hover:border-neon-blue hover:bg-neon-blue hover:text-black"
                  >
                    Enter Album
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
