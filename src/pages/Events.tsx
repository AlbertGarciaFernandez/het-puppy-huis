import { motion } from "motion/react";
import EventCard from "../components/EventCard";
import { events } from "@/data/events";

export default function Events() {
  return (
    <div className="min-h-screen bg-neutral-950 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="font-display text-5xl md:text-7xl font-bold text-center mb-16">
          <span className="text-white">UPCOMING</span> <span className="text-neon-pink">EVENTS</span>
        </h1>

        <div className="grid grid-cols-1 gap-12">
          {/* Night Events Section */}
          <section>
            <div className="flex items-center mb-8">
              <div className="w-2 h-8 bg-neon-green mr-4 rounded-full" />
              <h2 className="font-display text-3xl font-bold text-white uppercase tracking-wider">
                Puppy Hunter <span className="text-neon-green">Mansion</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-8">
              {events
                .filter((e) => e.type === "night")
                .map(({ id, ...event }) => (
                  <EventCard key={id} id={id} {...event} />
                ))}
            </div>
          </section>

          {/* Day Events Section */}
          <section>
            <div className="flex items-center mb-8">
              <div className="w-2 h-8 bg-neon-blue mr-4 rounded-full" />
              <h2 className="font-display text-3xl font-bold text-white uppercase tracking-wider">
                Het Puppy <span className="text-neon-blue">Huis</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-8">
              {events
                .filter((e) => e.type === "day")
                .map(({ id, ...event }) => (
                  <EventCard key={id} id={id} {...event} />
                ))}
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
