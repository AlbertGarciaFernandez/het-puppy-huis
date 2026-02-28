import { motion } from "motion/react";
import { Instagram, Music, Globe } from "lucide-react";

const artists = [
  {
    name: "DJ Buday",
    location: "Berlin",
    image: "https://picsum.photos/seed/buday/400/400",
    tags: ["Techno", "Hard House", "Trance"],
    bio: "Resident DJ at Berlin's wildest underground parties. Bringing the hard-hitting beats that make pups howl.",
    socials: { instagram: "#", soundcloud: "#", website: "#" },
  },
  {
    name: "Pup Tekno",
    location: "Amsterdam",
    image: "https://picsum.photos/seed/tekno/400/400",
    tags: ["Dark Synth", "EBM", "Industrial"],
    bio: "A master of dark atmospheres and driving rhythms. Perfect for the dungeon and the dancefloor alike.",
    socials: { instagram: "#", soundcloud: "#", website: "#" },
  },
  {
    name: "Pup Hunter",
    location: "London",
    image: "https://picsum.photos/seed/hunter/400/400",
    tags: ["Progressive House", "Tribal"],
    bio: "Mixing tribal beats with progressive melodies to create a journey through sound.",
    socials: { instagram: "#", soundcloud: "#", website: "#" },
  },
];

export default function Artists() {
  return (
    <div className="min-h-screen bg-neutral-950 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="font-display text-5xl md:text-7xl font-bold text-center mb-16">
          <span className="text-white">RESIDENT</span> <span className="text-neon-purple">ARTISTS</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artists.map((artist, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-neutral-900/50 border border-white/5 rounded-xl overflow-hidden hover:border-neon-purple/50 transition-all duration-300"
            >
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <h3 className="font-display text-3xl font-bold text-white mb-1">{artist.name}</h3>
                  <p className="text-neon-purple text-sm uppercase tracking-wider mb-3">{artist.location}</p>
                  <div className="flex flex-wrap gap-2">
                    {artist.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                  {artist.bio}
                </p>
                <div className="flex space-x-4">
                  <a href={artist.socials.instagram} className="text-gray-400 hover:text-neon-pink transition-colors">
                    <Instagram size={20} />
                  </a>
                  <a href={artist.socials.soundcloud} className="text-gray-400 hover:text-neon-blue transition-colors">
                    <Music size={20} />
                  </a>
                  <a href={artist.socials.website} className="text-gray-400 hover:text-neon-green transition-colors">
                    <Globe size={20} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
