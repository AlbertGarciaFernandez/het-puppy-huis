export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  fullDescription?: string;
  image: string;
  type: "day" | "night";
  ticketLink: string;
  lineup?: string[];
  price?: string;
}

export const events: Event[] = [
  {
    id: 1,
    title: "Puppy Hunter Mansion: Neon Dreams",
    date: "Oct 28, 2023",
    time: "22:00 - 05:00",
    venue: "Club Church, Amsterdam",
    description: "Prepare for a night of neon-soaked debauchery. Top DJs, play areas, and the best crowd in town.",
    fullDescription: "Prepare for a night of neon-soaked debauchery. Top DJs, play areas, and the best crowd in town. This is the ultimate gathering for pups, handlers, and hunters who want to experience the wilder side of nightlife. Expect a fully immersive environment with custom lighting, designated play zones, and a strict dress code that encourages you to unleash your inner animal.",
    image: "https://picsum.photos/seed/neon/800/600",
    type: "night",
    ticketLink: "#",
    lineup: ["DJ Buday (Berlin)", "Pup Tekno", "Pup Hunter"],
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
