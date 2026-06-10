"use client";

import { testimonials } from "./Testimonials";

/**
 * Compact, continuously scrolling strip of client testimonial one-liners.
 * Sits early in the page so social proof is seen without the vertical cost
 * of the full carousel. Pauses on hover; respects prefers-reduced-motion
 * (falls back to a static, manually scrollable row).
 */
export default function TestimonialMarquee() {
  return (
    <section
      aria-label="Client testimonials preview"
      className="relative py-6 sm:py-8 bg-[var(--color-creative-band)] border-y border-border/40 overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 mb-4 flex items-center justify-between">
        <p className="eyebrow text-accent">Client Stories</p>
        <a
          href="#create-testimonials"
          className="text-[0.65rem] tracking-[0.2em] uppercase font-medium text-muted-foreground hover:text-accent transition-colors"
        >
          Read all &rarr;
        </a>
      </div>

      <div className="group relative motion-reduce:overflow-x-auto">
        {/* Edge fades so cards dissolve at the boundaries */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-16 z-10 bg-gradient-to-r from-[var(--color-creative-band)] to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-16 z-10 bg-gradient-to-l from-[var(--color-creative-band)] to-transparent"
        />

        <div className="flex w-max animate-[nc-marquee_45s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[0, 1].map((copy) => (
            <div key={copy} aria-hidden={copy === 1} className="flex">
              {testimonials.map((t) => (
                <a
                  key={`${copy}-${t.name}`}
                  href="#create-testimonials"
                  tabIndex={copy === 1 ? -1 : 0}
                  className="mr-3 sm:mr-4 w-[260px] sm:w-[300px] shrink-0 rounded-sm border border-border/60 bg-card/40 px-4 py-3.5 backdrop-blur-sm transition-colors duration-300 hover:border-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
                >
                  <p className="font-display italic text-sm text-foreground/90 leading-snug line-clamp-2 mb-2.5">
                    &ldquo;{t.headline}&rdquo;
                  </p>
                  <p className="text-[0.6rem] font-medium tracking-[0.18em] uppercase text-muted-foreground">
                    {t.name} <span className="text-accent/70">&middot;</span> {t.role}
                  </p>
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
