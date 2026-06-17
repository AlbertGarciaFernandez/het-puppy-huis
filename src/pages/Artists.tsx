import { motion } from "motion/react";
import { Instagram, Music2 } from "lucide-react";
import alessandroImage from "@/assets/ALESSANDRO.jpeg";
import hunterImage from "@/assets/HUNTER.png";
import jiraImage from "@/assets/JIRA.jpg";
import mangoImage from "@/assets/MANGO.jpg";
import naviImage from "@/assets/navi.jpeg";
import polarImage from "@/assets/POLAR.jpg";
import spunkyImage from "@/assets/spunky.jpg";

const artists = [
  {
    name: "HÜNter",
    image: hunterImage,
    tags: ["Resident DJ", "Visual Artist", "Brand Creator"],
    bio: "Iconic, fierce and impossible to ignore. HÜNter brings diva energy, sharp visuals and the creative instinct behind the brand. When he enters the room, the pack knows something is about to happen.",
    instagram: "https://www.instagram.com/pup.hunter071/",
    hoverColor: "group-hover:text-neon-green",
    iconHoverColor: "hover:text-neon-green",
  },
  {
    name: "NAVI",
    image: naviImage,
    tags: ["Patrol", "Care", "Pack Direction"],
    bio: "The guide of the team. Navi keeps the group together, watches the room and makes sure no pup gets left behind. Warm, social and always ready to move, he brings direction to the chaos.",
    tiktok: "https://www.tiktok.com/@het_puppy_huis_patrol?_r=1&_t=ZG-97HbLXLkGI5",
    hoverColor: "group-hover:text-neon-pink",
    iconHoverColor: "hover:text-neon-pink",
  },
  {
    name: "ALESSANDRO",
    image: alessandroImage,
    tags: ["Pack Uncle", "Room Boss", "Italian Heat"],
    bio: "The Italian uncle of the pack. Rich, hot and absolutely necessary, Alessandro brings ristretto energy to every room. Do not let the size fool you. He is small, powerful and very much in charge.",
    instagram: "https://www.instagram.com/alessandro.faraon/",
    hoverColor: "group-hover:text-neon-blue",
    iconHoverColor: "hover:text-neon-blue",
  },
  {
    name: "POLAR",
    image: polarImage,
    tags: ["Photography", "Poster Model", "Creative Eye"],
    bio: "Our youngest wild pup. Polar is soft, playful and naturally magnetic, with a camera-ready face and an artist’s eye. He brings fresh energy, gentle chaos and the kind of charm that makes everyone look twice.",
    instagram: "https://www.instagram.com/polarfurreal/",
    hoverColor: "group-hover:text-neon-purple",
    iconHoverColor: "hover:text-neon-purple",
  },
  {
    name: "JIRA",
    image: jiraImage,
    tags: ["Shibari", "Social Media", "Craft"],
    bio: "Our resident rigger. Jira brings sensuality, craft and control to the community, tying every detail together with care, patience and a sharp creative eye.",
    instagram: "https://www.instagram.com/pup.jira/",
    hoverColor: "group-hover:text-neon-green",
    iconHoverColor: "hover:text-neon-green",
  },
  {
    name: "MANGO",
    image: mangoImage,
    tags: ["Good Vibes", "Support", "Creative Chaos"],
    bio: "Sweet by name, sweet by nature. Mango is the helper, supporter and juicy burst of good energy every pack needs. Kind, creative and slightly chaotic, he turns simple moments into something warmer.",
    instagram: "https://www.instagram.com/dutchpup_mango/",
    hoverColor: "group-hover:text-orange-400",
    iconHoverColor: "hover:text-orange-400",
  },
  {
    name: "SPUNKY",
    image: spunkyImage,
    tags: ["Adventure", "Community", "Mischief"],
    bio: "A playful, submissive pup with a mischievous tail and a sweet heart. Spunky loves adventure, connection and bringing people together wherever the team goes.",
    instagram: "https://www.instagram.com/pup_spunky",
    hoverColor: "group-hover:text-neon-blue",
    iconHoverColor: "hover:text-neon-blue",
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
        <div className="text-center mb-16">
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
            <span className="text-neon-purple">TEAM</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            A playful, creative and slightly chaotic team of artists, DJs, pups, handlers and beautiful troublemakers, bringing music, performance, visuals, shibari, photography and community together under one mansion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artists.map((artist, index) => (
            <motion.a
              key={index}
              href={artist.instagram || artist.tiktok || "#"}
              target={artist.instagram || artist.tiktok ? "_blank" : undefined}
              rel={artist.instagram || artist.tiktok ? "noreferrer" : undefined}
              aria-label={artist.instagram ? `${artist.name} Instagram` : artist.tiktok ? `${artist.name} TikTok` : artist.name}
              onClick={(event) => {
                if (!artist.instagram && !artist.tiktok) event.preventDefault();
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-neutral-900/50 border border-white/5 rounded-xl overflow-hidden hover:border-neon-purple/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-neon-purple/10 transition-all duration-300"
            >
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <h3 className={`font-display text-3xl font-bold text-white mb-3 transition-colors ${artist.hoverColor}`}>{artist.name}</h3>
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
                <p className="text-gray-300 mb-6 text-base leading-7 tracking-wide">
                  {artist.bio}
                </p>
                {artist.instagram && (
                  <span className={`mx-auto flex w-fit text-gray-300 ${artist.iconHoverColor} transition-colors`}>
                    <Instagram size={30} />
                  </span>
                )}
                {artist.tiktok && (
                  <span className={`mx-auto flex w-fit text-gray-300 ${artist.iconHoverColor} transition-colors`}>
                    <Music2 size={30} />
                  </span>
                )}
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
