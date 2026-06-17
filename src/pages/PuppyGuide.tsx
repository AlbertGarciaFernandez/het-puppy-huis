import { motion } from "motion/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, PawPrint, ShieldCheck } from "lucide-react";

const guideSections = [
  {
    title: "1. What is puppy play?",
    body: [
      "Puppy play is a form of roleplay where someone connects with their playful puppy side. For some people, it is about being silly, cute, chaotic and free. For others, it is about care, trust, affection, community or letting go of daily stress.",
      "Puppy play can include barking, crawling, wagging, playing with toys, being guided by a handler, cuddling, socializing with other pups or simply enjoying a different headspace.",
      "Every pup is different. Some pups are playful. Some are shy. Some are bratty. Some are soft. Some are chaotic. Some just want to feel safe and accepted. There is no one correct way to be a pup.",
    ],
  },
  {
    title: "2. What puppy play is not",
    body: [
      "Puppy play is not about real animals. It is roleplay between consenting adults.",
      "Puppy play is not always sexual. For many people, it is social, emotional, playful, relaxing or community-based.",
      "Puppy play is not only for people with expensive gear. You do not need a hood, harness, collar or leash to be valid.",
      "Puppy play is not an excuse to touch, control or approach someone without consent. Consent always comes first.",
    ],
  },
  {
    title: "3. Common roles",
    body: [
      "Pup: someone who enjoys entering puppy mode or pup space. This can mean being playful, loyal, curious, silly, shy, energetic or soft. You can be a pup with or without gear, with or without a handler, and even if you are still learning.",
      "Handler: someone who guides, supports, protects or plays with a pup. A good handler listens, respects boundaries and helps the pup feel safe. Always ask first.",
      "Hunter: at Puppy Hunter Mansion, a hunter brings energy, confidence and playful tension into the space. Good hunters do not chase without permission.",
      "Pack: a group of pups, handlers, hunters or friends who connect, play or support each other. There is no need to belong to a pack to join the community.",
    ],
  },
  {
    title: "4. Consent first, always",
    body: [
      "Consent is the most important rule in puppy play. Before playing with someone, talk about boundaries: touch, collars, leashes, photos, names, pronouns, public play limits, safe words, what feels good and what is off limits.",
      "A simple question can make everything better: Can I touch you? Can I boop you? Is it okay if I hold your leash? Do you want to play?",
      "Consent can change at any time. A yes can become a no. A no should always be respected. Silence is not consent.",
      "Pack rule: a good pup asks. A good handler listens. A good hunter respects the chase.",
    ],
  },
  {
    title: "5. First time as a pup",
    body: [
      "New pup? Welcome. You do not need to perform, bark, crawl or know everything. You can just watch, ask questions, stay close to a friend and take things slowly.",
      "First-time pup tips: start slowly, drink water, protect your knees if you crawl, ask before joining someone else’s play, do not compare yourself to other pups, take breaks and say no when something does not feel right.",
      "No hood? Still a pup. No handler? Still a pup. No experience? Still welcome.",
    ],
  },
  {
    title: "6. First time as a handler",
    body: [
      "Being a handler is about care, not ego. A good handler creates safety, gives attention and respects the pup’s boundaries.",
      "Never grab someone’s collar without asking. Never pull a leash without consent. Never assume a pup is submissive. Never pressure someone into play.",
      "Handler tips: ask before touching, check in often, praise with consent, watch body language, give space, respect safe words and support the pup after play.",
      "A good handler does not own the pup. A good handler earns trust.",
    ],
  },
  {
    title: "7. Gear guide",
    body: [
      "Gear can help people feel more connected to their puppy side, but it is not required. You are not more or less valid because of what you wear.",
      "Beginner-friendly gear: bandana, collar, harness, knee pads, comfortable shoes, puppy toy, small accessory or name tag.",
      "More advanced gear: pup hood, mitts, leash, tail, chest harness or full outfit.",
      "Comfort essentials: water, knee protection, deodorant, wipes, breath mints, a small towel and something to store your gear.",
      "Gear should feel good, safe and comfortable. If something hurts, restricts breathing or makes you feel unsafe, stop using it.",
    ],
  },
  {
    title: "8. Puppy language",
    body: [
      "Pup space: the mental state where someone feels connected to their puppy side.",
      "Boop: a cute nose touch. Always ask first. Zoomies: sudden chaotic puppy energy. Walkies: going for a walk or moving around with a handler or pack.",
      "Stray pup: a pup without a handler or pack. Good pup: a classic compliment. Use with care. It can be powerful.",
      "Safe word: a word or signal used to pause or stop play immediately.",
    ],
  },
  {
    title: "9. Event etiquette",
    body: [
      "At Het Puppy Huis and Puppy Hunter Mansion, everyone deserves to feel welcome, respected and safe. Our spaces are for puppies, hunters, handlers and curious humans of all genders, bodies and experience levels.",
      "Ask before touching anyone, taking photos, grabbing collars or pulling leashes. Respect pronouns and names. Give people space. Do not shame beginners. Do not pressure anyone to play.",
      "Keep intense play in appropriate areas. Listen to staff and hosts. Hydrate, take breaks and look after your pack. Cute chaos is welcome. Disrespect is not.",
    ],
  },
  {
    title: "10. Photos and privacy",
    body: [
      "Not everyone wants to be photographed. Some people are private about puppy play. Some people are not out. Some people simply do not want their image online.",
      "Always ask before taking or posting photos. If someone says no, respect it immediately.",
      "Simple rule: no consent, no photo.",
    ],
  },
  {
    title: "11. Safety and aftercare",
    body: [
      "Puppy play can be emotional, physical or intense, even when it is playful. Take care of yourself and others.",
      "After play, some people need cuddles, water, quiet time, reassurance or space. This is called aftercare.",
      "Aftercare can be simple: Are you okay? Do you need water? Do you want space or company? Thank you for playing with me. You did great. Checking in matters.",
    ],
  },
  {
    title: "12. Huis Rules",
    body: [
      "Bark with consent. Ask before you boop. Hydrate, little chaos demon. Respect the pack. No pup left behind.",
      "Good pups communicate. Good handlers listen. Good hunters respect the chase.",
      "All genders, all bodies, all good puppy energy. Be cute. Be kind. Cause safe trouble.",
    ],
  },
  {
    title: "13. Frequently Asked Questions",
    body: [
      "Do I need a hood to be a pup? No. Gear is optional. A hood can help some people feel more in pup space, but it does not define you.",
      "Do I need a handler? No. You can be a solo pup, part of a pack or simply curious. Roles can be flexible too: some people are pups, handlers, hunters or a mix depending on the moment.",
      "Is puppy play always sexual? No. For many people, puppy play is social, playful, emotional, relaxing or community-based. It depends on the person and the context.",
      "Can I join if I am shy or inexperienced? Yes. You can watch, ask questions, stay close to friends and take your time.",
      "What if I make a mistake? Apologize, listen, learn and respect the boundary next time. Everyone starts somewhere.",
      "Can I touch someone’s hood, collar or leash? Only if they clearly say yes. Gear can be very personal.",
      "What should I bring to my first event? Comfortable clothes, water, knee protection if you plan to crawl, deodorant, good energy and respect for others.",
    ],
  },
  {
    title: "14. Welcome to the pack",
    body: [
      "Puppy play is about freedom, trust, care, silliness and connection. You do not need to be perfect. You do not need to know everything. You do not need to look a certain way.",
      "Come curious. Come respectful. Come as you are. Be a good pup. Respect the pack. Enter the mansion.",
    ],
  },
];

const ctas = [
  { label: "Join the next event", href: "/events" },
  { label: "Follow Het Puppy Huis", href: "https://www.instagram.com/hetpuppyhuis/", external: true },
  { label: "Read the event rules", href: "/community" },
  { label: "Discover Puppy Hunter Mansion", href: "/mansion" },
  { label: "Contact the pack", href: "/contact" },
];

export default function PuppyGuide() {
  useEffect(() => {
    document.title = "Puppy Guide | Het Puppy Huis";
    let metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = "A beginner-friendly guide to puppy play, pups, handlers, consent, gear and event etiquette by Het Puppy Huis. Learn how to join the pack safely and respectfully.";
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black p-8 md:p-14 mb-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,0,255,0.18),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(0,255,255,0.14),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(204,255,0,0.12),transparent_30%)]" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-neon-pink/40 bg-neon-pink/10 px-4 py-2 text-neon-pink text-sm font-bold uppercase tracking-widest mb-8">
              <PawPrint className="w-4 h-4" /> Puppy Huis / Puppy Hunter Mansion
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Welcome to the <span className="text-neon-blue">Puppy Guide</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl">
              Curious about puppy play? New to the pack? Just here to learn? This guide is for pups, handlers, hunters, friends and anyone who wants to understand the basics in a safe, respectful and playful way.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
              {[
                [Heart, "No experience needed"],
                [ShieldCheck, "No gear required"],
                [PawPrint, "Good puppy energy"],
              ].map(([Icon, label]) => (
                <div key={label as string} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-gray-200">
                  <Icon className="w-7 h-7 text-neon-green mb-3" />
                  <p className="font-bold">{label as string}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="space-y-6">
          {guideSections.map((section, index) => (
            <motion.section
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(index * 0.03, 0.2) }}
              className="rounded-3xl border border-white/10 bg-neutral-900/60 p-6 md:p-8"
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-5">
                <span className="text-neon-pink">{section.title.split(". ")[0]}.</span> {section.title.split(". ").slice(1).join(". ")}
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        <section className="mt-14 rounded-[2rem] border border-neon-green/30 bg-neon-green/10 p-8 md:p-10 text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">Ready to join the pack?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">Come curious. Come respectful. Come as you are.</p>
          <div className="flex flex-wrap justify-center gap-4">
            {ctas.map((cta) =>
              cta.external ? (
                <a key={cta.label} href={cta.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-white font-bold uppercase tracking-wider hover:bg-neon-pink hover:text-black transition-colors">
                  {cta.label} <ArrowRight className="w-4 h-4" />
                </a>
              ) : (
                <Link key={cta.label} to={cta.href} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-white font-bold uppercase tracking-wider hover:bg-neon-green hover:text-black transition-colors">
                  {cta.label} <ArrowRight className="w-4 h-4" />
                </Link>
              )
            )}
          </div>
        </section>
      </motion.div>
    </div>
  );
}
