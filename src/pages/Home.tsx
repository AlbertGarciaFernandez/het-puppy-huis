import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Calendar, Users, Ticket, Handshake, ArrowRight } from "lucide-react";
import posterPride from "@/assets/POSTERPRIDE.jpeg";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video/Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/seed/neonclub/1920/1080"
            alt="Club Atmosphere"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-neutral-950" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neon-purple/20 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <motion.div
          className="relative z-10 text-center px-4 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="font-display text-5xl md:text-7xl lg:text-9xl font-bold mb-6 tracking-tighter"
            variants={itemVariants}
          >
            <span className="block text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
              HET PUPPY
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue drop-shadow-[0_0_25px_rgba(255,0,255,0.5)]">
              HUIS
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-3xl text-gray-200 font-light tracking-widest uppercase mb-12"
            variants={itemVariants}
          >
            "Be a good boy. <span className="text-neon-green font-bold">Come play.</span>"
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
            variants={itemVariants}
          >
            <Link
              to="/events"
              className="px-8 py-4 bg-neon-pink text-black font-bold text-lg uppercase tracking-wider hover:bg-white hover:shadow-[0_0_20px_rgba(255,0,255,0.8)] transition-all duration-300 rounded-sm skew-x-[-10deg]"
            >
              <span className="block skew-x-[10deg]">Get Tickets</span>
            </Link>
            <Link
              to="/community"
              className="px-8 py-4 border border-neon-blue text-neon-blue font-bold text-lg uppercase tracking-wider hover:bg-neon-blue hover:text-black hover:shadow-[0_0_20px_rgba(0,255,255,0.8)] transition-all duration-300 rounded-sm skew-x-[-10deg]"
            >
              <span className="block skew-x-[10deg]">Join the Pack</span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Upcoming Event Highlight */}
      <section className="py-24 bg-neutral-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden border border-white/10 bg-neutral-900/50 backdrop-blur-sm"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-96 lg:h-auto">
                <img
                  src={posterPride}
                  alt="Next Event"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent lg:bg-gradient-to-t" />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="inline-block px-4 py-1 bg-neon-green/20 border border-neon-green/50 text-neon-green rounded-full text-sm font-bold uppercase tracking-wider mb-6 w-fit">
                  Next Event
                </div>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                  <span className="text-neon-blue">Het Puppy Huis</span>{" "}
                  <span className="text-white">&</span>{" "}
                  <span className="text-neon-green">Puppy Hunter Mansion</span>{" "}
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue">
                    World Pride Edition
                  </span>
                </h2>
                <div className="flex items-center text-gray-300 mb-6 space-x-6">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-neon-blue" />
                    <span>July 25, 2026, 13:00 - 20:00</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-2 text-neon-purple" />
                    <a
                      href="https://www.clubchurch.nl/parties/hetPuppyHuis"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      Club Church, Amsterdam
                    </a>
                  </div>
                </div>
                <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                  After the <span className="text-neon-pink font-semibold">Pride Walk</span>, come home to your pack. Club Church opens its doors for a <span className="text-neon-blue font-semibold">colorful WorldPride afternoon</span> built for good boys, wild hearts and playful souls. Expect <span className="text-neon-green font-semibold">bingo, shows, talks, friends, new faces</span> and a house full of puppy energy. From <span className="text-neon-green font-semibold">17:00</span>, the music gets deeper, the lights go down, and <span className="text-neon-purple font-semibold">Puppy Hunter Mansion</span> takes over with darker sounds, brighter instincts and a little trouble in the air.
                </p>
                <div className="flex flex-wrap items-center gap-6">
                  <a
                    href="https://ticketsoft.nl/pos/event/f772899c-8c78-4ada-9cf2-5686ee796667"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center text-neon-pink font-bold uppercase tracking-wider hover:text-white transition-colors group"
                  >
                    Get Tickets <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </a>
                  <Link
                    to="/events/1"
                    className="inline-flex items-center text-neon-blue font-bold uppercase tracking-wider hover:text-white transition-colors group"
                  >
                    More Info <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Access Grid */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Events", icon: Calendar, color: "text-neon-pink", border: "hover:border-neon-pink", link: "/events" },
              { title: "Team", icon: Users, color: "text-neon-blue", border: "hover:border-neon-blue", link: "/artists" },
              { title: "Tickets", icon: Ticket, color: "text-neon-green", border: "hover:border-neon-green", link: "/events" }, // Assuming tickets are in events
              { title: "Partners", icon: Handshake, color: "text-neon-purple", border: "hover:border-neon-purple", link: "/partners" },
            ].map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className={`group relative p-8 bg-neutral-900/50 border border-white/5 ${item.border} transition-all duration-300 hover:-translate-y-2 overflow-hidden`}
              >
                <div className={`absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity duration-300`}>
                  <item.icon className={`w-24 h-24 ${item.color}`} />
                </div>
                <div className="relative z-10">
                  <item.icon className={`w-8 h-8 ${item.color} mb-4`} />
                  <h3 className="font-display text-2xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm group-hover:text-gray-300 transition-colors">
                    Explore {item.title.toLowerCase()} &rarr;
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
