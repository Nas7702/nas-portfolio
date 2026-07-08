"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const R2_THUMBS = "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/thumbnail";

/**
 * Real films surfaced on the homepage. Each card deep-links into the
 * /create portfolio via the hash-based lightbox routing, so a visitor
 * is one click from watching the work.
 */
const FEATURED = [
  {
    slug: "adj-meadowhead",
    title: "ADJ: Meadowhead",
    client: "ADJ Surfacing",
    note: "Best-performing industrial film to date, generating inbound enquiries.",
    thumb: `${R2_THUMBS}/sq_adj_meadowhead_thumbnail.webp`,
    alt: "ADJ Surfacing Morrisons Meadowhead completion film",
  },
  {
    slug: "sheffield-food-festival-2026",
    title: "Sheffield Food Festival",
    client: "Event Recap",
    note: "Delivered within 12 hours to drive footfall across the weekend.",
    thumb: `${R2_THUMBS}/sq_sheff_food_fest_thumbnail.webp`,
    alt: "Sheffield Food Festival 2026 event recap reel",
  },
  {
    slug: "the-jmc",
    title: "The JMC",
    client: "Brand Film",
    note: "Identity piece for a creative director working with leading YouTubers.",
    thumb: `${R2_THUMBS}/sq_theJMC_thumbnail.webp`,
    alt: "The JMC brand film",
  },
  {
    slug: "property-showcase",
    title: "Property Showcase",
    client: "Estate Agent",
    note: "Cinematic property film that elevates listings above the local standard.",
    thumb: `${R2_THUMBS}/sq_prop1_thumbnail.webp`,
    alt: "Cinematic property film for an estate agent",
  },
];

const CLIENTS = [
  "ADJ Surfacing",
  "Sheffield Food Festival",
  "University of Sheffield",
  "Walshe's Property",
  "Stance Fitness",
  "Lalezar Restaurant",
];

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export default function FeaturedWorkStrip() {
  return (
    <section className="max-w-7xl mx-auto px-4 pt-4 pb-6 md:pt-8 md:pb-10 w-full">
      <div className="mb-10 flex items-end justify-between">
        <div className="w-full text-center md:text-left">
          <p className="eyebrow mb-3">Selected Work</p>
          <h2 className="text-cine text-4xl md:text-5xl text-foreground">
            Recent Films
          </h2>
        </div>
        <Link
          href="/create"
          className="hidden md:block flex-shrink-0 pb-1 text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground hover:text-accent transition-colors duration-300 whitespace-nowrap"
        >
          View all work →
        </Link>
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={gridVariants}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3"
      >
        {FEATURED.map((item) => (
          <motion.div key={item.slug} variants={cardVariants}>
            <Link
              href={`/create#${item.slug}`}
              className="group block"
              aria-label={`Watch ${item.title}`}
            >
              <div className="relative aspect-square overflow-hidden rounded-sm border border-border bg-card">
                {/* Plain img — R2 thumbnails are already optimised webp; this
                    bypasses the Vercel image pipeline, same as the gallery */}
                <img
                  src={item.thumb}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.04] brightness-[0.92] group-hover:brightness-100 select-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 right-2.5">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border border-white/30 bg-black/40 backdrop-blur-sm opacity-80 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:border-white/70 group-hover:scale-110">
                    <Play size={10} fill="white" className="text-white ml-px" />
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-[0.6rem] font-medium tracking-[0.18em] uppercase text-muted-foreground mb-1">
                  {item.client}
                </p>
                <h3 className="font-sans font-medium text-[0.95rem] text-foreground group-hover:text-accent transition-colors duration-300 mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-snug hidden sm:block">
                  {item.note}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-6 flex justify-center md:hidden">
        <Link
          href="/create"
          className="text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground hover:text-accent transition-colors duration-300"
        >
          View all work →
        </Link>
      </div>

      {/* Social proof — one pull quote and the names behind the work */}
      <div className="mt-16 md:mt-20">
        <div aria-hidden="true" className="hairline" />
        <figure className="max-w-2xl mx-auto text-center mt-12 mb-10 px-2">
          <blockquote className="font-display font-light italic text-2xl md:text-[1.7rem] leading-snug text-foreground/90">
            &ldquo;The whole office was impressed. Nothing like you&apos;d see
            locally.&rdquo;
          </blockquote>
          <figcaption className="mt-4 text-[0.65rem] font-medium tracking-[0.22em] uppercase text-muted-foreground">
            Walshe&apos;s Property <span className="text-accent/70">&middot;</span>{" "}
            Estate Agent
          </figcaption>
        </figure>
        <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 px-4">
          {CLIENTS.map((client) => (
            <span
              key={client}
              className="text-[0.6rem] font-medium tracking-[0.25em] uppercase text-muted-foreground/60 whitespace-nowrap"
            >
              {client}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
