import { motion } from "motion/react";
import { Instagram } from "lucide-react";
import alessandroImage from "@/assets/ALESSANDRO.jpeg";
import hunterImage from "@/assets/HUNTER.png";
import jiraImage from "@/assets/JIRA.jpg";
import mangoImage from "@/assets/MANGO.jpg";
import polarImage from "@/assets/POLAR.jpg";

const artists = [
  {
    name: "HÜNter",
    image: hunterImage,
    tags: ["Resident DJ", "Visual Artist", "Brand Creator"],
    bio: "Iconic, fierce and full of diva energy, HÜNter brings the feminine touch to the pack, with vision, attitude and a sharp creative instinct.",
    instagram: "https://www.instagram.com/pup.hunter071/",
    hoverColor: "group-hover:text-neon-green",
    iconHoverColor: "hover:text-neon-green",
  },
  {
    name: "IMANOL",
    image: "https://picsum.photos/seed/imanol/400/400",
    tags: ["Pack Father", "Care", "Dancefloor Warmth"],
    bio: "The father of the pack. He guides the pack, keeps everyone together and makes sure no pup gets left behind. Social, smiley and always ready to dance, Imanol brings warmth, care and direction to the group.",
    hoverColor: "group-hover:text-neon-pink",
    iconHoverColor: "hover:text-neon-pink",
  },
  {
    name: "ALESSANDRO",
    image: alessandroImage,
    tags: ["Pack Uncle", "Room Boss", "Italian Heat"],
    bio: "The Italian uncle of the pack. Like a good Italian ristretto, he is rich, hot and absolutely necessary, whether it is morning or night. Do not let his size fool you. He is the real boss of the room.",
    instagram: "https://www.instagram.com/alessandro.faraon/",
    hoverColor: "group-hover:text-neon-blue",
    iconHoverColor: "hover:text-neon-blue",
  },
  {
    name: "POLAR",
    image: polarImage,
    tags: ["Photography", "Poster Model", "Creative Eye"],
    bio: "Our youngest wild pup. Soft, playful and naturally charming, Polar is a born poster model with a very artistic eye. He loves photography, creativity and bringing a fresh, gentle energy to the pack.",
    instagram: "https://www.instagram.com/polarfurreal/",
    hoverColor: "group-hover:text-neon-purple",
    iconHoverColor: "hover:text-neon-purple",
  },
  {
    name: "JIRA",
    image: jiraImage,
    tags: ["Shibari", "Social Media", "Craft"],
    bio: "Our handsome Colombian bear. He loves ropes and making sure everything is tied up properly. With true artistry in his shibari, Jira brings sensuality, craft and control to the pack. And even as a big cuddly bear, he also knows how to keep our social media looking sharp.",
    instagram: "https://www.instagram.com/pup.jira/",
    hoverColor: "group-hover:text-neon-green",
    iconHoverColor: "hover:text-neon-green",
  },
  {
    name: "MANGO",
    image: mangoImage,
    tags: ["Good Vibes", "Support", "Creative Chaos"],
    bio: "Sweet by name, sweet by nature. Always ready to help, support and collaborate, Mango brings kindness, good vibes and that juicy energy every pack needs.",
    instagram: "https://www.instagram.com/dutchpup_mango/",
    hoverColor: "group-hover:text-orange-400",
    iconHoverColor: "hover:text-orange-400",
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
            <span className="text-neon-purple">PACK</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            A playful, creative and slightly chaotic pack of artists, DJs, pups, handlers and beautiful troublemakers, bringing music, performance, visuals, shibari, photography and community together under one mansion.
          </p>
        </div>

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
                <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                  {artist.bio}
                </p>
                {artist.instagram && (
                  <a href={artist.instagram} target="_blank" rel="noreferrer" className={`mx-auto flex w-fit text-gray-300 ${artist.iconHoverColor} transition-colors`} aria-label={`${artist.name} Instagram`}>
                    <Instagram size={30} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
