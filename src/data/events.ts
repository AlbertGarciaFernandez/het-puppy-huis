import posterPride from "@/assets/POSTERPRIDE.jpeg";

export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  venue: string;
  venueLink?: string;
  description: string;
  fullDescription?: string;
  image: string;
  type: "day" | "night";
  ticketLink: string;
  lineup?: Array<string | { name: string; instagram?: string }>;
  price?: string;
}

export const events: Event[] = [
  {
    id: 1,
    title: "Het Puppy Huis & Puppy Hunter Mansion World Pride Edition",
    date: "July 25, 2026",
    time: "13:00 - 20:00",
    venue: "Club Church, Amsterdam",
    venueLink: "https://www.clubchurch.nl/parties/hetPuppyHuis",
    description: "After the Pride Walk, Club Church opens its doors to good boys, wild hearts, and playful souls for a colorful afternoon with the pack.",
    fullDescription: "After showing your colors with pride and walking the Pride Walk with your beautiful little paws, you can come home. Club Church opens its doors to the good boys for the arrival of WorldPride Amsterdam, and Het Puppy Huis has prepared an afternoon made for connection, rest, play, and celebration. Expect light, color, bingo, shows, talks, friendly faces, and a place that feels like home for pups, handlers, hunters, friends, and curious new faces. From 17:00, the music gets deeper, the lights drop their bright colors, and Puppy Hunter Mansion takes over. The church becomes the Mansion of the pups: darker, louder, more playful, and ready for wild hearts to enter. Be a good boy, or don't.",
    image: posterPride,
    type: "night",
    ticketLink: "https://ticketsoft.nl/pos/event/f772899c-8c78-4ada-9cf2-5686ee796667",
    lineup: [
      { name: "HÜNTER", instagram: "https://www.instagram.com/pup.hunter071/" },
      { name: "TKHNØ", instagram: "https://www.instagram.com/tkhno.dj/" },
    ],
    price: "€25.00",
  },
  {
    id: 2,
    title: "Het Puppy Huis: Community Day",
    date: "Nov 12, 2023",
    time: "14:00 - 18:00",
    venue: "Social Hub, Amsterdam",
    description: "A relaxed afternoon for pups and handlers to connect, learn, and play. Workshops and social mixing.",
    fullDescription: "Join us for a relaxed afternoon designed for pups and handlers to connect, learn, and play in a safe, low-pressure environment. Whether you're new to the scene or a seasoned pup, this community day offers workshops on gear care, pup play basics, and plenty of time for social mixing.",
    image: "https://picsum.photos/seed/day/800/600",
    type: "day",
    ticketLink: "#",
    lineup: ["Workshop: Gear Care 101", "Social Mixer", "Q&A Panel"],
    price: "Free / Donation",
  },
  {
    id: 3,
    title: "Puppy Hunter Mansion: Cyberpunk Edition",
    date: "Dec 15, 2023",
    time: "22:00 - 05:00",
    venue: "Club Church, Amsterdam",
    description: "Enter the future. Cyberpunk attire encouraged. Hard techno and dark synth all night long.",
    fullDescription: "Enter the future at our Cyberpunk Edition. We're transforming the venue into a dystopian playground where high-tech meets primal instincts. Cyberpunk attire is highly encouraged—think neon, chrome, and tactical gear. Hard techno and dark synth will be blasting all night long.",
    image: "https://picsum.photos/seed/cyber/800/600",
    type: "night",
    ticketLink: "#",
    lineup: ["DJ Cyberdog", "Neon Wolf", "The Android"],
    price: "€25.00",
  },
];
