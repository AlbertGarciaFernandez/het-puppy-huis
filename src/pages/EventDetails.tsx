import { motion } from "motion/react";
import { Calendar, Clock, MapPin, Ticket, ArrowLeft, Twitter, Instagram, Link as LinkIcon, Check, PawPrint } from "lucide-react";
import { Link, useParams, Navigate } from "react-router-dom";
import { events } from "@/data/events";
import { useState } from "react";

export default function EventDetails() {
  const { id } = useParams();
  const [copied, setCopied] = useState(false);
  const event = events.find((e) => e.id === Number(id));

  if (!event) {
    return <Navigate to="/events" replace />;
  }

  const shareUrl = window.location.href;
  const shareText = `Check out ${event.title} at ${event.venue}!`;

  const handleShare = (platform: string) => {
    let url = "";
    switch (platform) {
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case "instagram":
        url = "https://www.instagram.com/puppyhuntermansion/";
        break;
      case "copy":
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
    }
    if (url) window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-neutral-950 pt-24 pb-12">
      {/* Hero Image */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-4 sm:p-8 max-w-7xl mx-auto">
          <Link to="/events" className="inline-flex items-center text-gray-300 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="mr-2 w-4 h-4" /> Back to Events
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-6xl font-bold text-white mb-4 leading-tight"
          >
            {event.id === 1 ? (
              <>
                <span className="text-neon-blue">Het Puppy Huis</span>{" "}
                <span className="text-white">&</span>{" "}
                <span className="text-neon-green">Puppy Hunter Mansion</span>{" "}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue">
                  World Pride Edition
                </span>
              </>
            ) : (
              event.title
            )}
          </motion.h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-neutral-900/50 border border-white/5 rounded-2xl p-8"
            >
              <h2 className="font-display text-2xl font-bold text-white mb-6">About the Event</h2>
              {event.id === 1 ? (
                <div className="text-gray-300 leading-relaxed text-lg mb-6 space-y-4">
                  <p>
                    After showing your <span className="text-neon-pink font-semibold">colors with pride</span> and walking the Pride Walk with your beautiful little paws, you can come home.
                  </p>
                  <p>
                    <span className="text-neon-blue font-semibold">Club Church</span> opens its doors to the good boys for the arrival of <span className="text-neon-green font-semibold">WorldPride Amsterdam</span>, and Het Puppy Huis has prepared an afternoon made for connection, rest, play, and celebration.
                  </p>
                  <p>
                    Expect <span className="text-neon-purple font-semibold">light, color, bingo, shows, talks</span>, friendly faces, and a place that feels like home for pups, handlers, hunters, friends, and curious new faces.
                  </p>
                  <p>
                    From <span className="text-neon-green font-semibold">17:00</span>, the music gets deeper, the lights drop their bright colors, and <span className="text-neon-pink font-semibold">Puppy Hunter Mansion</span> takes over.
                  </p>
                </div>
              ) : (
                <p className="text-gray-300 leading-relaxed text-lg mb-6">
                  {event.fullDescription || event.description}
                </p>
              )}
              <p className="text-gray-300 leading-relaxed text-lg">
                Expect a fully immersive environment with custom lighting, designated play zones, and a strict dress code that encourages you to unleash your inner animal. Whether you're in full gear or just curious, the Mansion welcomes you.
              </p>
            </motion.div>

            {event.lineup && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="font-display text-2xl font-bold text-white mb-6">Lineup</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {event.lineup.map((artist, index) => {
                    const name = typeof artist === "string" ? artist : artist.name;
                    const instagram = typeof artist === "string" ? undefined : artist.instagram;

                    return (
                      <div key={`${name}-${index}`} className="bg-neutral-900/50 border border-white/5 p-4 rounded-xl flex items-center">
                        <div className="w-12 h-12 bg-neon-purple/20 rounded-full flex items-center justify-center text-neon-purple mr-4">
                          <PawPrint className="w-6 h-6" />
                        </div>
                        {instagram ? (
                          <a href={instagram} target="_blank" rel="noreferrer" className="text-white font-bold hover:text-neon-pink transition-colors">
                            {name}
                          </a>
                        ) : (
                          <span className="text-white font-bold">{name}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-neutral-900 border border-white/10 rounded-2xl p-6 sticky top-24"
            >
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <Calendar className="w-6 h-6 text-neon-pink mr-4 mt-1" />
                  <div>
                    <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-1">Date</h3>
                    <p className="text-white font-bold text-lg">{event.date}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-neon-blue mr-4 mt-1" />
                  <div>
                    <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-1">Time</h3>
                    <p className="text-white font-bold text-lg">{event.time}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-neon-green mr-4 mt-1" />
                  <div>
                    <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-1">Venue</h3>
                    {event.venueLink ? (
                      <a
                        href={event.venueLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-white font-bold text-lg hover:text-neon-green transition-colors"
                      >
                        {event.venue}
                      </a>
                    ) : (
                      <p className="text-white font-bold text-lg">{event.venue}</p>
                    )}
                  </div>
                </div>

                {event.price && (
                  <div className="flex items-start">
                    <Ticket className="w-6 h-6 text-neon-purple mr-4 mt-1" />
                    <div>
                      <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-1">Price</h3>
                      <p className="text-white font-bold text-lg">{event.price}</p>
                    </div>
                  </div>
                )}
              </div>

              <a 
                href={event.ticketLink}
                target="_blank"
                rel="noreferrer"
                className="block w-full py-4 bg-neon-pink text-black font-bold text-center uppercase tracking-wider rounded-lg hover:bg-white transition-colors mb-4"
              >
                Get Tickets
              </a>
              
              <div className="grid grid-cols-3 gap-2">
                <button 
                  onClick={() => handleShare("twitter")}
                  className="flex items-center justify-center py-3 border border-white/10 text-gray-300 hover:text-[#1DA1F2] hover:border-[#1DA1F2]/50 font-bold uppercase tracking-wider rounded-lg hover:bg-white/5 transition-colors"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleShare("instagram")}
                  className="flex items-center justify-center py-3 border border-white/10 text-gray-300 hover:text-neon-pink hover:border-neon-pink/50 font-bold uppercase tracking-wider rounded-lg hover:bg-white/5 transition-colors"
                  aria-label="Open Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleShare("copy")}
                  className={`flex items-center justify-center py-3 border border-white/10 text-gray-300 hover:text-neon-green hover:border-neon-green/50 font-bold uppercase tracking-wider rounded-lg hover:bg-white/5 transition-colors ${copied ? "text-neon-green border-neon-green/50" : ""}`}
                  aria-label="Copy Link"
                >
                  {copied ? <Check className="w-5 h-5" /> : <LinkIcon className="w-5 h-5" />}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
