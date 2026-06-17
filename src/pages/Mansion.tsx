import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Music, Zap, Moon, ShieldAlert } from "lucide-react";
import { useEffect, useRef } from "react";
import hunterMansionIcon from "@/assets/huntermansion.png";
import mansionHeroVideo from "@/assets/replicate-prediction-x2e9yrzhg1rmt0cytgzbapsg70.mp4";

export default function Mansion() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-end justify-center overflow-hidden pb-6">
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            src={mansionHeroVideo}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            aria-label="Mansion atmosphere background video"
          />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-4xl px-4"
        >

          <p className="text-xl md:text-2xl text-white font-light tracking-widest uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            Where the <span className="text-neon-green font-bold">Hunters</span> prowl and the <span className="text-neon-pink font-bold">Pups</span> play.
          </p>
        </motion.div>
        <Link 
          to="/events" 
          className="absolute bottom-8 right-8 z-10 inline-block px-10 py-4 bg-neon-green text-black font-bold text-xl uppercase tracking-wider hover:bg-white hover:shadow-[0_0_20px_rgba(204,255,0,0.6)] transition-all duration-300 skew-x-[-10deg]"
        >
          <span className="block skew-x-[10deg]">Enter the Mansion</span>
        </Link>
      </section>

      {/* Concept Section */}
      <section className="py-24 px-4 bg-neutral-950">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
              THE <span className="text-neon-green">EXPERIENCE</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Puppy Hunter Mansion is not just a party; it's an immersive nightlife experience designed for the bold. We transform venues into neon-soaked playgrounds where boundaries are tested and instincts take over.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              Expect dark corners, high-energy beats, and a crowd that knows how to play. Whether you're here to hunt or be hunted, the Mansion welcomes you.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="bg-neutral-900 p-6 rounded-xl border border-white/5 hover:border-neon-green/30 transition-colors">
              <Music className="w-10 h-10 text-neon-pink mb-4" />
              <h3 className="font-bold text-white text-lg mb-2">Techno & Trance</h3>
              <p className="text-sm text-gray-500">Driving beats to keep the pack moving till dawn.</p>
            </div>
            <div className="bg-neutral-900 p-6 rounded-xl border border-white/5 hover:border-neon-green/30 transition-colors">
              <Moon className="w-10 h-10 text-neon-blue mb-4" />
              <h3 className="font-bold text-white text-lg mb-2">Play Areas</h3>
              <p className="text-sm text-gray-500">Designated zones for puppy play and social interaction.</p>
            </div>
            <div className="bg-neutral-900 p-6 rounded-xl border border-white/5 hover:border-neon-green/30 transition-colors">
              <ShieldAlert className="w-10 h-10 text-neon-green mb-4" />
              <h3 className="font-bold text-white text-lg mb-2">Safe Space</h3>
              <p className="text-sm text-gray-500">Strict consent policy and care bears on site.</p>
            </div>
            <div className="bg-neutral-900 p-6 rounded-xl border border-white/5 hover:border-neon-green/30 transition-colors">
              <Zap className="w-10 h-10 text-neon-purple mb-4" />
              <h3 className="font-bold text-white text-lg mb-2">Performances</h3>
              <p className="text-sm text-gray-500">Live shows, gogo pups, and neon spectacles.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Visual Breaker */}
      <section className="py-12 bg-black overflow-hidden">
        <div className="flex justify-center px-4">
          <img 
            src={hunterMansionIcon} 
            alt="Puppy Hunter Mansion" 
            className="w-full max-w-4xl h-auto"
          />
        </div>
      </section>
    </div>
  );
}
