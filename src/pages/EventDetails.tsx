import { motion } from "motion/react";
import { Calendar, Clock, MapPin, Ticket, ArrowLeft, Link as LinkIcon, Check, PawPrint, Share2 } from "lucide-react";
import { Link, useParams, Navigate } from "react-router-dom";
import { events } from "@/data/events";
import { getEventHeroImage } from "@/data/event-images";
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
  const heroImage = getEventHeroImage(event);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }

    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, "_blank");
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-neutral-950 pt-24 pb-12">
      {/* Hero Image */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <img 
          src={heroImage} 
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
                  <p>
                    Tickets are <span className="text-neon-green font-semibold">€15</span> with cloakroom included.
                  </p>
                  <p>
                    For those unfamiliar with <span className="text-neon-blue font-semibold">Club Church</span>, the venue is a spacious three-story building with room for everyone to feel comfortable. We ask attendees to use the spaces appropriately: the bar and main floor are for <span className="text-neon-green font-semibold">socializing and activities</span>, while the darker downstairs areas are intended for <span className="text-neon-purple font-semibold">play</span>. You can check the venue facilities <a href="https://www.clubchurch.nl/info/facilities" target="_blank" rel="noreferrer" className="text-neon-pink font-semibold hover:text-white transition-colors underline underline-offset-4">here</a>.
                  </p>
                  <p>
                    Let your inner beast out, but do it appropriately and with respect for the pack. <span className="text-neon-green font-semibold">Be a good boy, or don't.</span>
                  </p>
                </div>
              ) : event.id === 3 ? (
                <div className="text-gray-300 leading-relaxed text-lg mb-6 space-y-4">
                  <p>
                    The last <span className="text-orange-400 font-semibold">Het Puppy Huis of 2026</span> is a <span className="text-neon-pink font-semibold">Dark Fashion Extravaganza</span> at <span className="text-neon-green font-semibold">Club Church</span>.
                  </p>
                  <p>
                    Think <span className="text-orange-400 font-semibold">leather, rubber, puppy gear, harnesses, dark streetwear, fetish fashion, custom outfits</span> and dramatic autumn looks. Come dressed to impress, because this time the pack is watching.
                  </p>
                  <p>
                    From <span className="text-neon-green font-semibold">16:00</span>, our beloved Puppy Queen host <a href="https://www.instagram.com/vntdusk/" target="_blank" rel="noreferrer" className="text-neon-pink font-semibold hover:text-white transition-colors underline underline-offset-4">Vanity Dusk</a> brings <span className="text-neon-purple font-semibold">Puppy Drag Bingo</span> to the house.
                  </p>
                  <p>
                    From <span className="text-orange-400 font-semibold">17:00</span>, the <span className="text-neon-blue font-semibold">Pup Runway / Best Look Contest</span> takes over the floor, with prizes from our dear partners for some of the best looks of the day. No professional runway skills needed: just walk, pose, play with the spotlight and show the pack what you brought.
                  </p>
                  <p>
                    From <span className="text-neon-green font-semibold">18:00</span>, <span className="text-neon-pink font-semibold">Puppy Hunter Mansion</span> takes over.
                  </p>
                  <p>
                    <a href="https://www.instagram.com/pup.hunter071/" target="_blank" rel="noreferrer" className="text-orange-400 font-semibold hover:text-white transition-colors underline underline-offset-4">HÜNTER</a> opens the final part of the party with cheeky, high-energy tracks to get every tail moving. Then <a href="https://www.instagram.com/pupvinz/" target="_blank" rel="noreferrer" className="text-neon-blue font-semibold hover:text-white transition-colors underline underline-offset-4">VINZ</a> takes the leash and keeps the pack dancing until the very end.
                  </p>
                  <p>
                    Tickets are <span className="text-neon-green font-semibold">€15 + fees</span> with cloakroom included.
                  </p>
                  <p>
                    For those unfamiliar with <span className="text-neon-blue font-semibold">Club Church</span>, the venue is a spacious three-story building with room for everyone to feel comfortable. We ask attendees to use the spaces appropriately: the bar and main floor are for <span className="text-neon-green font-semibold">socializing and activities</span>, while the darker downstairs areas are intended for <span className="text-neon-purple font-semibold">play</span>. You can check the venue facilities <a href="https://www.clubchurch.nl/info/facilities" target="_blank" rel="noreferrer" className="text-neon-pink font-semibold hover:text-white transition-colors underline underline-offset-4">here</a>.
                  </p>
                  <p>
                    All genders are welcome. <span className="text-neon-green font-semibold">Respect, consent and personal boundaries are essential.</span>
                  </p>
                </div>
              ) : (
                <p className="text-gray-300 leading-relaxed text-lg mb-6">
                  {event.fullDescription || event.description}
                </p>
              )}
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

            {event.id === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="font-display text-2xl font-bold text-white mb-6">Host</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-neutral-900/50 border border-orange-500/30 p-4 rounded-xl flex items-center">
                    <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-400 mr-4">
                      <PawPrint className="w-6 h-6" />
                    </div>
                    <a href="https://www.instagram.com/vntdusk/" target="_blank" rel="noreferrer" className="text-white font-bold hover:text-orange-400 transition-colors uppercase tracking-wide">
                      Puppy Drag Bingo hosted by Vanity Dusk
                    </a>
                  </div>
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
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button 
                  onClick={handleShare}
                  className="flex items-center justify-center py-3 border border-white/10 text-gray-300 hover:text-neon-pink hover:border-neon-pink/50 font-bold uppercase tracking-wider rounded-lg hover:bg-white/5 transition-colors"
                  aria-label="Share event"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Share event
                </button>
                <button 
                  onClick={handleCopyLink}
                  className={`flex items-center justify-center py-3 border border-white/10 text-gray-300 hover:text-neon-green hover:border-neon-green/50 font-bold uppercase tracking-wider rounded-lg hover:bg-white/5 transition-colors ${copied ? "text-neon-green border-neon-green/50" : ""}`}
                  aria-label="Copy link"
                >
                  {copied ? <Check className="w-5 h-5 mr-2" /> : <LinkIcon className="w-5 h-5 mr-2" />}
                  {copied ? "Copied" : "Copy link"}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
