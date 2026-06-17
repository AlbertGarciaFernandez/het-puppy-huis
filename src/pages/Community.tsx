import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Heart, Shield, BookOpen, Users, Globe, Zap } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Inclusivity",
    description: "All pups, handlers, and curious souls are welcome. We celebrate diversity in all its forms.",
    color: "text-neon-pink",
  },
  {
    icon: Shield,
    title: "Safety",
    description: "Consent is mandatory. We create a safe space where you can explore your puppy side without fear.",
    color: "text-neon-blue",
  },
  {
    icon: Users,
    title: "Community",
    description: "We are a pack. We look out for each other, support new pups, and grow together.",
    color: "text-neon-green",
  },
];

export default function Community() {
  return (
    <div className="min-h-screen bg-neutral-950 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-14">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            OUR <span className="text-neon-blue">COMMUNITY</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Het Puppy Huis is more than just a party. It's a home for the stray, the playful, and the wild.
          </p>
        </div>

        <section className="mb-20 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            About <span className="text-neon-purple">Us</span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Het Puppy Huis is dedicated to creating immersive, safe, and exhilarating spaces for the puppy community. We blend the raw energy of underground club culture with the warmth of a supportive pack.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-neutral-900/50 p-8 rounded-xl border border-white/5 text-center">
            <Heart className="w-12 h-12 text-neon-pink mx-auto mb-4" />
            <h3 className="font-bold text-white text-xl mb-2">Community First</h3>
            <p className="text-gray-400">Building a sense of belonging for every pup, handler, and admirer.</p>
          </div>
          <div className="bg-neutral-900/50 p-8 rounded-xl border border-white/5 text-center">
            <Zap className="w-12 h-12 text-neon-blue mx-auto mb-4" />
            <h3 className="font-bold text-white text-xl mb-2">Electric Energy</h3>
            <p className="text-gray-400">Curating unforgettable moments with sound, light, color, and atmosphere.</p>
          </div>
          <div className="bg-neutral-900/50 p-8 rounded-xl border border-white/5 text-center">
            <Globe className="w-12 h-12 text-neon-green mx-auto mb-4" />
            <h3 className="font-bold text-white text-xl mb-2">Global Vision</h3>
            <p className="text-gray-400">Expanding our territory to bring Het Puppy Huis and Puppy Hunter Mansion to more packs.</p>
          </div>
        </div>

        <section className="bg-gradient-to-br from-neutral-900 to-black p-8 md:p-10 rounded-3xl border border-white/10 mb-20">
          <h2 className="font-display text-3xl font-bold text-white mb-6">The Story</h2>
          <div className="space-y-4 text-gray-300">
            <p>
              Born in the dark, neon-lit corners of nightlife, Het Puppy Huis started as a small gathering of friends who wanted more than just a bar night. We wanted a playground.
            </p>
            <p>
              What began as Het Puppy Huis, a place for community and connection, evolved into Puppy Hunter Mansion, our signature club night where the energy is high and the leashes are loose.
            </p>
            <p>
              Our mission goes beyond the night. We create spaces for connection under the sun as well as under the strobe lights, where good boys, wild hearts and curious souls can feel at home.
            </p>
          </div>
        </section>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-neutral-900/50 border border-white/5 p-8 rounded-2xl text-center hover:border-white/20 transition-colors"
            >
              <value.icon className={`w-12 h-12 mx-auto mb-6 ${value.color}`} />
              <h3 className="font-display text-xl font-bold text-white mb-4">{value.title}</h3>
              <p className="text-gray-400">{value.description}</p>
            </motion.div>
          ))}
        </div>

        {/* New Puppy Guide */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-neutral-900 to-neutral-900/50 border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5">
              <BookOpen size={200} />
            </div>
            <div className="relative z-10">
              <h2 className="font-display text-3xl font-bold text-white mb-6">
                New Puppy <span className="text-neon-pink">Guide</span>
              </h2>
              <div className="space-y-6 text-gray-300">
                <p>
                  Curious about puppy play? You've come to the right place. Whether you're just discovering your inner pup or looking for a handler, our community is here to guide you.
                </p>
                <ul className="list-disc list-inside space-y-2 marker:text-neon-pink">
                  <li><strong>Gear is optional:</strong> You don't need a hood to be a pup. It's a mindset.</li>
                  <li><strong>Ask for consent:</strong> Always ask before touching or engaging in play.</li>
                  <li><strong>Find your pack:</strong> Attend our social mixers to meet like-minded folks.</li>
                </ul>
                <Link to="/puppy-guide" className="inline-block mt-6 px-6 py-3 bg-white/10 hover:bg-neon-pink hover:text-black text-white font-bold uppercase tracking-wider rounded-lg transition-all">
                  Read the Puppy Guide
                </Link>
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
