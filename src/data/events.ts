import cyberpunkImage from "@/assets/DSC02400_VSCO.jpeg";
import groupImage from "@/assets/group.jpeg";
import posterPride from "@/assets/POSTERPRIDE.jpeg";
import type { EventStatus } from "./event-status";

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
  detailImage?: string;
  type: "day" | "night";
  status: EventStatus;
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
    fullDescription: "After showing your colors with pride and walking the Pride Walk with your beautiful little paws, you can come home. Club Church opens its doors to the good boys for the arrival of WorldPride Amsterdam, and Het Puppy Huis has prepared an afternoon made for connection, rest, play, and celebration. Expect light, color, bingo, shows, talks, friendly faces, and a place that feels like home for pups, handlers, hunters, friends, and curious new faces. From 17:00, the music gets deeper, the lights drop their bright colors, and Puppy Hunter Mansion takes over. The church becomes the Mansion of the pups: darker, louder, more playful, and ready for wild hearts to enter. Tickets are €15 with cloakroom included. This is an event for everyone, so there will be separate areas for socializing and play, keeping everyone comfortable while offering space for both kinds of energy. Let your inner beast out, but do it appropriately and with respect for the pack. Be a good boy, or don't.",
    image: posterPride,
    type: "night",
    status: "past",
    label: "Pride Event",
    ticketLink: "https://ticketsoft.nl/pos/event/f772899c-8c78-4ada-9cf2-5686ee796667",
    lineup: [
      { name: "HÜNTER", instagram: "https://www.instagram.com/pup.hunter071/" },
      { name: "TKHNØ", instagram: "https://www.instagram.com/tkhno.dj/" },
    ],
    price: "€15",
  },
  {
    id: 2,
    title: "Puppy Hunter Mansion at Headrush x Damage",
    date: "August 1, 2026",
    time: "22:00 - 06:00",
    venue: "The Other Side, Amsterdam",
    venueLink: "https://www.damageparty.eu/",
    description: "Puppy Hunter Mansion joined Headrush x Damage World Pride Edition as an invited collaborator for Amsterdam's biggest fetish dance party.",
    fullDescription: "Puppy Hunter Mansion was invited to collaborate with Headrush x Damage World Pride Edition on August 1. Damage Party is Amsterdam's biggest fetish dance party: a night built around dance, cruise, play, underground energy, and sexual freedom. From 22:00 to 06:00, The Other Side became a space for pounding beats, liberated bodies, performers, fetish looks, and connection without judgement. We were proud to bring the Mansion pack into that world as part of the World Pride weekend.",
    image: groupImage,
    type: "night",
    status: "past",
    label: "Past Collaboration",
    ticketLink: "https://www.universe.com/events/headrush-x-damage-amsterdam-world-pride-edition-tickets-3MHLX2",
    lineup: ["Headrush x Damage", "Puppy Hunter Mansion invited collaboration"],
    price: "Past event",
  },
  {
    id: 4,
    title: "Pups at Superflirt",
    date: "August 29, 2026",
    time: "Festival day",
    venue: "Superflirt Festival",
    venueLink: "https://www.superflirtfestival.nl/",
    description: "Het Puppy Huis joins Superflirt Festival with a dedicated pup chill area: a playful spot to rest, connect, and meet the pack.",
    fullDescription: "Het Puppy Huis is collaborating with Superflirt Festival on August 29. Superflirt is a queer safe space and a bold, colorful festival that calls itself Queer as fxck, bringing together stage hosts including Pax Romana, Can You Feel iT, Flirtation, Club Church & BOPS, with more partners to be announced. We will have our own pup spot inside the festival: a chill area where pups can join the pack, take a breath, and have their own space. Expect a tent with a ball pit, shibari, and a social meeting point where pups, handlers, friends, and curious new faces can find each other during the day.",
    image: groupImage,
    detailImage: "/Logo_SF-2025_WHITE.png",
    type: "day",
    status: "upcoming",
    label: "Festival Collaboration",
    ticketLink: "https://eventix.shop/cu5dwmgv",
    lineup: ["Het Puppy Huis pup chill area", "Ball pit", "Shibari", "Social meeting point"],
    price: "Tickets via Superflirt",
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
    status: "upcoming",
    label: "Save the Date",
    ticketLink: "#",
    lineup: ["More info soon"],
    price: "More info soon",
  },
];
