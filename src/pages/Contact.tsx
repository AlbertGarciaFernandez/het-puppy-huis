import { motion } from "motion/react";
import { Mail, Send, UserPlus, Calendar } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-neutral-950 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        <h1 className="font-display text-5xl md:text-7xl font-bold text-center mb-16">
          <span className="text-white">GET IN</span> <span className="text-neon-pink">TOUCH</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Newsletter Section */}
          <div className="bg-neutral-900/50 p-8 rounded-2xl border border-white/5">
            <div className="flex items-center mb-6">
              <Mail className="w-8 h-8 text-neon-pink mr-4" />
              <h2 className="font-display text-2xl font-bold text-white">Newsletter</h2>
            </div>
            <p className="text-gray-400 mb-6">
              Stay updated on upcoming events, ticket drops, and community news. We promise not to spam (unless you're into that).
            </p>
            <form className="space-y-4" action="mailto:info@hetpuppyhuis.com?subject=Newsletter%20subscription" method="post" encType="text/plain">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-pink transition-colors"
              />
              <button className="w-full bg-neon-pink text-black font-bold uppercase tracking-wider py-3 rounded-lg hover:bg-white transition-colors flex items-center justify-center">
                Subscribe <Send className="ml-2 w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Volunteer / Join Section */}
          <div className="bg-neutral-900/50 p-8 rounded-2xl border border-white/5">
            <div className="flex items-center mb-6">
              <UserPlus className="w-8 h-8 text-neon-blue mr-4" />
              <h2 className="font-display text-2xl font-bold text-white">Join the Pack</h2>
            </div>
            <p className="text-gray-400 mb-6">
              Want to help out at events? We're always looking for volunteers, care bears, and creative souls to join our team.
            </p>
            <a href="mailto:info@hetpuppyhuis.com?subject=Volunteer%20application" className="block w-full border border-neon-blue text-neon-blue font-bold uppercase tracking-wider py-3 rounded-lg hover:bg-neon-blue hover:text-black transition-colors text-center">
              Volunteer Application
            </a>
          </div>

          {/* Booking / General Contact */}
          <div className="md:col-span-2 bg-neutral-900/50 p-8 rounded-2xl border border-white/5">
            <div className="flex items-center mb-6">
              <Calendar className="w-8 h-8 text-neon-green mr-4" />
              <h2 className="font-display text-2xl font-bold text-white">Bookings & Inquiries</h2>
            </div>
            <p className="text-gray-400 mb-8">
              For DJ bookings, venue partnerships, or general questions, drop us a line.
            </p>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" action="mailto:woof@puppyhuntermansion.com?subject=Bookings%20and%20inquiries" method="post" encType="text/plain">
              <input
                type="text"
                placeholder="Name"
                className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-green transition-colors"
              />
              <input
                type="email"
                placeholder="Email"
                className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-green transition-colors"
              />
              <select className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-gray-400 focus:outline-none focus:border-neon-green transition-colors md:col-span-2">
                <option>General Inquiry</option>
                <option>DJ Booking</option>
                <option>Venue Partnership</option>
                <option>Press</option>
              </select>
              <textarea
                placeholder="Message"
                rows={4}
                className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-green transition-colors md:col-span-2"
              ></textarea>
              <button className="md:col-span-2 bg-neon-green text-black font-bold uppercase tracking-wider py-3 rounded-lg hover:bg-white transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
