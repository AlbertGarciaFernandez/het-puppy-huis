import cyberpunkImage from "@/assets/DSC02400_VSCO.jpeg";
import groupImage from "@/assets/group.jpeg";
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
  label?: string;
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
    fullDescription: "After showing your colors with pride and walking the Pride Walk with your beautiful little paws, you can come home. Club Church opens its doors to the good boys for the arrival of WorldPride Amsterdam, and Het Puppy Huis has prepared an afternoon made for connection, rest, play, and celebration. Expect light, color, bingo, shows, talks, friendly faces, and a place that feels like home for pups, handlers, hunters, friends, and curious new faces. From 17:00, the music gets deeper, the lights drop their bright colors, and Puppy Hunter Mansion takes over. The church becomes the Mansion of the pups: darker, louder, more playful, and ready for wild hearts to enter. Tickets are €15 online, plus €10 cash at the door as a minimum drink spend. This includes 1 token for 2 soft drinks or 1 alcoholic drink. Cloakroom is included. This is an event for everyone, so there will be separate areas for socializing and play, keeping everyone comfortable while offering space for both kinds of energy. Let your inner beast out, but do it appropriately and with respect for the pack. Be a good boy, or don't.",
    image: posterPride,
    type: "night",
    label: "Pride Event",
    ticketLink: "https://ticketsoft.nl/pos/event/f772899c-8c78-4ada-9cf2-5686ee796667",
    lineup: [
      { name: "HÜNTER", instagram: "https://www.instagram.com/pup.hunter071/" },
      { name: "TKHNØ", instagram: "https://www.instagram.com/tkhno.dj/" },
    ],
    price: "€15 online + €10 cash drink spend at the door",
  },
  {
    id: 2,
    title: "Het Puppy Huis: Something Special",
    date: "August 1 & August 29, 2026",
    time: "Working on something special",
    venue: "Stay tuned",
    description: "We are working on something special for you. Stay tuned.",
    fullDescription: "We are working on something special for you on August 1 and August 29. More playful details are coming soon, so stay tuned.",
    image: groupImage,
    type: "day",
    label: "Stay Tuned",
    ticketLink: "#",
    lineup: ["Working on something special for you", "Stay tuned"],
    price: "More info soon",
  },
  {
    id: 3,
    title: "Puppy Hunter Mansion: Edition",
    date: "November 14, 2026",
    time: "22:00 - 05:00",
    venue: "Club Church, Amsterdam",
    description: "Save the date. More info soon.",
    fullDescription: "Puppy Hunter Mansion: Cyberpunk Edition returns on November 14. Save the date. More info soon.",
    image: cyberpunkImage,
    type: "night",
    label: "Save the Date",
    ticketLink: "#",
    lineup: ["More info soon"],
    price: "More info soon",
  },
];
