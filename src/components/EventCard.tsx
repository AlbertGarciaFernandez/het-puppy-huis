import { Calendar, MapPin, Clock, Ticket } from "lucide-react";
import { Link } from "react-router-dom";

interface EventProps {
  title: string;
  date: string;
  time: string;
  venue: string;
  venueLink?: string;
  description: string;
  image: string;
  type: "day" | "night";
  label?: string;
  ticketLink: string;
  id?: number | string;
  key?: number | string;
}

export default function EventCard({ title, date, time, venue, venueLink, description, image, type, label, ticketLink, id }: EventProps) {
  const isNight = type === "night";
  const accentColor = isNight ? "text-neon-green" : "text-neon-blue";
  const borderColor = isNight ? "border-neon-green/30 hover:border-neon-green" : "border-neon-blue/30 hover:border-neon-blue";
  const buttonColor = isNight ? "bg-neon-green hover:bg-white" : "bg-neon-blue hover:bg-white";

  return (
    <div className={`group relative flex flex-col md:flex-row bg-neutral-900/50 border ${borderColor} rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-${isNight ? "neon-green" : "neon-blue"}/20`}>
      <div className="md:w-1/3 relative h-64 md:h-auto overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 px-3 py-1 bg-black/70 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider text-white border border-white/10">
          {label || (type === "day" ? "Day Event" : "Night Event")}
        </div>
      </div>
      
      <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
            <div className="flex items-center">
              <Calendar className={`w-4 h-4 mr-2 ${accentColor}`} />
              <span>{date}</span>
            </div>
            <div className="flex items-center">
              <Clock className={`w-4 h-4 mr-2 ${accentColor}`} />
              <span>{time}</span>
            </div>
          </div>
          
          <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
            {title}
          </h3>
          
          <div className="flex items-center text-gray-400 mb-4">
            <MapPin className={`w-4 h-4 mr-2 ${accentColor}`} />
            {venueLink ? (
              <a href={venueLink} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                {venue}
              </a>
            ) : (
              <span>{venue}</span>
            )}
          </div>
          
          <p className="text-gray-400 mb-6 line-clamp-2">
            {description}
          </p>
        </div>
        
        <div className="flex items-center justify-between mt-auto">
          <Link 
            to={`/events/${id || 1}`} 
            className="text-white text-sm font-bold uppercase tracking-wider hover:text-neon-pink transition-colors"
          >
            More Info
          </Link>
          
          <a 
            href={ticketLink}
            target="_blank"
            rel="noreferrer"
            className={`flex items-center px-6 py-3 ${buttonColor} text-black font-bold uppercase tracking-wider rounded-lg transition-all duration-300 transform group-hover:translate-x-1`}
          >
            <Ticket className="w-4 h-4 mr-2" />
            Tickets
          </a>
        </div>
      </div>
    </div>
  );
}
