import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <img 
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b1f3b733-5c29-4595-8857-797545934149/2025-02-28/c743e498-89c5-43a9-9807-7429188d374b.png" 
                alt="Het Puppy Huis" 
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-gray-400 max-w-md mb-6">
              A modern, immersive community and event brand focused on the international Puppy community. 
              Be a good boy. Come play.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-neon-pink hover:text-black transition-all duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-neon-blue hover:text-black transition-all duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-neon-green hover:text-black transition-all duration-300">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-display font-bold text-lg mb-6 uppercase tracking-wider">Explore</h3>
            <ul className="space-y-3">
              <li><Link to="/events" className="text-gray-400 hover:text-neon-pink transition-colors">Events</Link></li>
              <li><Link to="/community" className="text-gray-400 hover:text-neon-blue transition-colors">Community</Link></li>
              <li><Link to="/artists" className="text-gray-400 hover:text-neon-green transition-colors">Artists</Link></li>
              <li><Link to="/gallery" className="text-gray-400 hover:text-neon-purple transition-colors">Gallery</Link></li>
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
            &copy; {new Date().getFullYear()} Het Puppy Huis. All rights reserved.
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
