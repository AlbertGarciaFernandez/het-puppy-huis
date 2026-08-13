import { Camera, Images } from "lucide-react";
import { motion } from "motion/react";

type GalleryAlbumHeroProps = {
  title: string;
  description: string;
  photoCount: number;
};

const albumPhotographer = {
  name: "Alessandro Faraon",
  instagram: "https://www.instagram.com/alessandro.faraon/",
};

export default function GalleryAlbumHero({ title, description, photoCount }: GalleryAlbumHeroProps) {
  return (
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
        <h1 className="mt-6 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-gray-400 sm:text-lg">{description}</p>
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

      <div className="text-sm uppercase tracking-[0.28em] text-gray-500">{photoCount} photos</div>
    </motion.div>
  );
}
