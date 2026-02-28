import { motion } from "motion/react";
import { Handshake, ShoppingBag, Star } from "lucide-react";

const partners = [
  { name: "Mr. S Leather", logo: "https://picsum.photos/seed/mrs/200/100", type: "Gear Partner" },
  { name: "Fetish Freaks", logo: "https://picsum.photos/seed/ff/200/100", type: "Merch" },
  { name: "Club Church", logo: "https://picsum.photos/seed/cc/200/100", type: "Venue" },
  { name: "Puppy Pride", logo: "https://picsum.photos/seed/pp/200/100", type: "Community" },
];

export default function Partners() {
  return (
    <div className="min-h-screen bg-neutral-950 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="font-display text-5xl md:text-7xl font-bold text-center mb-16">
          <span className="text-white">OUR</span> <span className="text-neon-green">PARTNERS</span>
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-xl p-8 flex flex-col items-center justify-center hover:bg-white/10 transition-colors group"
            >
              <img src={partner.logo} alt={partner.name} className="mb-4 grayscale group-hover:grayscale-0 transition-all" />
              <h3 className="font-bold text-white mb-1">{partner.name}</h3>
              <p className="text-xs text-gray-400 uppercase tracking-wider">{partner.type}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-neutral-900/50 border border-neon-pink/20 rounded-2xl p-8">
            <ShoppingBag className="w-12 h-12 text-neon-pink mb-6" />
            <h2 className="font-display text-3xl font-bold text-white mb-4">Become a Vendor</h2>
            <p className="text-gray-400 mb-6">
              Want to sell your gear, art, or merch at our events? We love supporting independent creators within the community.
            </p>
            <button className="px-6 py-3 bg-neon-pink text-black font-bold uppercase tracking-wider rounded-lg hover:bg-white transition-colors">
              Apply Now
            </button>
          </div>

          <div className="bg-neutral-900/50 border border-neon-blue/20 rounded-2xl p-8">
            <Handshake className="w-12 h-12 text-neon-blue mb-6" />
            <h2 className="font-display text-3xl font-bold text-white mb-4">Collaborate</h2>
            <p className="text-gray-400 mb-6">
              Are you a brand, venue, or organization looking to partner with Het Puppy Huis? Let's create something amazing together.
            </p>
            <button className="px-6 py-3 bg-neon-blue text-black font-bold uppercase tracking-wider rounded-lg hover:bg-white transition-colors">
              Get in Touch
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
