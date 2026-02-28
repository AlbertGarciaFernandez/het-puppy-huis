import { motion } from "motion/react";
import { Instagram } from "lucide-react";

const photos = [
  "https://picsum.photos/seed/g1/600/800",
  "https://picsum.photos/seed/g2/800/600",
  "https://picsum.photos/seed/g3/600/600",
  "https://picsum.photos/seed/g4/800/800",
  "https://picsum.photos/seed/g5/600/400",
  "https://picsum.photos/seed/g6/400/600",
  "https://picsum.photos/seed/g7/800/600",
  "https://picsum.photos/seed/g8/600/800",
  "https://picsum.photos/seed/g9/600/600",
];

export default function Gallery() {
  return (
    <div className="min-h-screen bg-neutral-950 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="font-display text-5xl md:text-7xl font-bold text-center mb-16">
          <span className="text-white">PHOTO</span> <span className="text-neon-blue">GALLERY</span>
        </h1>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="break-inside-avoid relative group overflow-hidden rounded-xl"
            >
              <img
                src={photo}
                alt={`Gallery ${index + 1}`}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <a href="#" className="flex items-center text-white font-bold uppercase tracking-wider hover:text-neon-pink transition-colors">
                  <Instagram className="mr-2" /> View on Insta
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
