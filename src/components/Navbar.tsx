import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Mansion", path: "/mansion" },
  { name: "Events", path: "/events" },
  { name: "Community", path: "/community" },
  { name: "Artists", path: "/artists" },
  { name: "Gallery", path: "/gallery" },
  { name: "Partners", path: "/partners" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
        scrolled ? "bg-black/90 backdrop-blur-md border-white/10" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <Link to="/" className="flex-shrink-0 group">
            <img 
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b1f3b733-5c29-4595-8857-797545934149/2025-02-28/c743e498-89c5-43a9-9807-7429188d374b.png" 
              alt="Het Puppy Huis" 
              className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
          
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "font-medium text-xs xl:text-sm uppercase tracking-widest hover:text-neon-pink transition-colors duration-200 relative group",
                    location.pathname === item.path ? "text-neon-pink" : "text-gray-300"
                  )}
                >
                  {item.name}
                  <span className={cn(
                    "absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-pink transition-all duration-300 group-hover:w-full",
                    location.pathname === item.path ? "w-full" : ""
                  )} />
                </Link>
              ))}
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "block px-3 py-4 rounded-md text-base font-medium uppercase tracking-widest text-center hover:bg-white/5 hover:text-neon-pink transition-colors",
                    location.pathname === item.path ? "text-neon-pink bg-white/5" : "text-gray-300"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
