import { Link } from "react-router-dom";
import { Instagram, Mail, Send } from "lucide-react";
import hunterHorizontalLogo from "@/assets/hunter_horizontal .png";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="inline-flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
              <img 
                src="/logo_horizontal.png" 
                alt="Het Puppy Huis" 
                className="h-32 w-auto"
              />
              <img
                src={hunterHorizontalLogo}
                alt="Puppy Hunter Mansion"
                className="h-16 w-auto"
              />
            </Link>
            <p className="text-gray-400 max-w-md mb-6">
              A modern, immersive community and event brand focused on the international Puppy community. 
              Be a good boy. Come play.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="https://www.instagram.com/puppyhuntermansion/" target="_blank" rel="noreferrer" aria-label="Puppy Hunter Mansion Instagram" className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-3 text-white hover:bg-neon-pink hover:text-black transition-all duration-300">
                <Instagram size={26} />
                <span className="text-sm font-bold uppercase tracking-wider">Hunter Mansion</span>
              </a>
              <a href="https://www.instagram.com/hetpuppyhuis/" target="_blank" rel="noreferrer" aria-label="Het Puppy Huis Instagram" className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-3 text-white hover:bg-neon-blue hover:text-black transition-all duration-300">
                <Instagram size={26} />
                <span className="text-sm font-bold uppercase tracking-wider">Het Puppy Huis</span>
              </a>
              <a href="https://t.me/+npqx_DlVzC42MDc0" target="_blank" rel="noreferrer" aria-label="Het Puppy Huis Telegram" className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-3 text-white hover:bg-neon-purple hover:text-black transition-all duration-300">
                <Send size={26} />
                <span className="text-sm font-bold uppercase tracking-wider">Telegram</span>
              </a>
              <a href="mailto:info@hetpuppyhuis.com" aria-label="Email Het Puppy Huis" className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-3 text-white hover:bg-neon-green hover:text-black transition-all duration-300">
                <Mail size={26} />
                <span className="text-sm font-bold uppercase tracking-wider">Email</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-display font-bold text-lg mb-6 uppercase tracking-wider">Explore</h3>
            <ul className="space-y-3">
              <li><Link to="/events" className="text-gray-400 hover:text-neon-pink transition-colors">Events</Link></li>
              <li><Link to="/community" className="text-gray-400 hover:text-neon-blue transition-colors">Community</Link></li>
              <li><Link to="/artists" className="text-gray-400 hover:text-neon-green transition-colors">Team</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-display font-bold text-lg mb-6 uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail size={18} className="text-neon-blue mr-2 flex-shrink-0" />
                <a href="mailto:info@hetpuppyhuis.com" className="text-gray-400 hover:text-white transition-colors">info@hetpuppyhuis.com</a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-neon-pink mr-2 flex-shrink-0" />
                <a href="mailto:woof@puppyhuntermansion.com" className="text-gray-400 hover:text-white transition-colors">woof@puppyhuntermansion.com</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Het Puppy Huis. All rights reserved. Powered by{" "}
            <a
              href="https://www.codehunterlab.com/"
              target="_blank"
              rel="noreferrer"
              className="text-neon-blue hover:text-white transition-colors"
            >
              Code Hunter Lab
            </a>
            .
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-500 text-sm hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-500 text-sm hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
