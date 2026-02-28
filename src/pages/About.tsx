import { motion } from "motion/react";
import { Globe, Heart, Zap } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-neutral-950 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="font-display text-5xl md:text-7xl font-bold text-center mb-16">
          <span className="text-white">ABOUT</span> <span className="text-neon-purple">US</span>
        </h1>

        <div className="space-y-20">
          <section className="text-center">
            <h2 className="font-display text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              Het Puppy Huis is dedicated to creating immersive, safe, and exhilarating spaces for the puppy community. We blend the raw energy of underground club culture with the warmth of a supportive pack.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-neutral-900/50 p-8 rounded-xl border border-white/5 text-center">
              <Heart className="w-12 h-12 text-neon-pink mx-auto mb-4" />
              <h3 className="font-bold text-white text-xl mb-2">Community First</h3>
              <p className="text-gray-400">Building a sense of belonging for every pup, handler, and admirer.</p>
            </div>
            <div className="bg-neutral-900/50 p-8 rounded-xl border border-white/5 text-center">
              <Zap className="w-12 h-12 text-neon-blue mx-auto mb-4" />
              <h3 className="font-bold text-white text-xl mb-2">Electric Energy</h3>
              <p className="text-gray-400">Curating unforgettable nights with top-tier sound, light, and atmosphere.</p>
            </div>
            <div className="bg-neutral-900/50 p-8 rounded-xl border border-white/5 text-center">
              <Globe className="w-12 h-12 text-neon-green mx-auto mb-4" />
              <h3 className="font-bold text-white text-xl mb-2">Global Vision</h3>
              <p className="text-gray-400">Expanding our territory to bring the Puppy Hunter Mansion experience worldwide.</p>
            </div>
          </div>

          <section className="bg-gradient-to-br from-neutral-900 to-black p-10 rounded-3xl border border-white/10">
            <h2 className="font-display text-3xl font-bold text-white mb-6">The Story</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                Born in the dark, neon-lit corners of Amsterdam's nightlife, Het Puppy Huis started as a small gathering of friends who wanted more than just a bar night. We wanted a playground.
              </p>
              <p>
                What began as "Het Puppy Huis" - a place for community and connection - evolved into the "Puppy Hunter Mansion," our signature club night where the energy is high and the leashes are loose.
              </p>
              <p>
                But our mission goes beyond the night. We are expanding to include more outdoor day events, social gatherings, and park meetups. We want to create spaces for connection under the sun as well as the strobe lights. Stay tuned for what's coming next.
              </p>
              <p>
                Today, we are a growing movement, connecting pups across borders and creating spaces where you can truly be yourself. Whether you're a good boy, a bad dog, or a hunter on the prowl, you have a home here.
              </p>
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
