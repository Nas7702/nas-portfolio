"use client";

import { MessageSquareQuote, Sparkles } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

type Testimonial = {
  name: string;
  role: string;
  headline: string;
  quote: string;
  praise: string;
  rating: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Sivan",
    role: "Lalezar Restaurant",
    headline: "A promotional video everyone keeps praising",
    quote:
      "The video Nas delivered was phenomenal and we're overjoyed with how it turned out. We've had compliments in person and online from guests impressed by it.",
    praise:
      "Nas was a delight to work with and we recommend Nas Create to any business looking to stand out on social because the work is exceptional.",
    rating: "10/10",
  },
];

export default function Testimonials() {
  return (
    <section className="max-w-6xl mx-auto px-6 mt-32">
      <ScrollReveal direction="up" delay={0} threshold={0.15}>
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="space-y-3">
            <p className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-primary/80">
              <MessageSquareQuote size={16} aria-hidden />
              Testimonials
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Trusted by teams who want standout stories
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Social proof from clients who care about craft and measurable impact.
              Built to grow as more collaborations ship.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-primary/30 bg-primary/10 px-4 py-3 shadow-[0_14px_45px_-20px_rgba(121,46,254,0.7)]">
            <Sparkles size={18} className="text-primary" aria-hidden />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-primary leading-tight">Video-first storytelling</p>
              <p className="text-xs text-muted-foreground leading-tight">Human, cinematic, measurable results</p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        {testimonials.map((testimonial, index) => (
          <ScrollReveal key={testimonial.name} delay={0.05 * index} threshold={0.2} className="h-full">
            <article className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-card/90 via-card to-primary/5 p-6 shadow-lg shadow-primary/5">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -right-14 -top-14 h-36 w-36 rounded-full bg-primary/15 blur-3xl" />
                <div className="absolute -left-16 bottom-0 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
              </div>

              <div className="relative flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-primary">{testimonial.role}</p>
                  <h3 className="text-xl font-bold">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.headline}</p>
                </div>
                <div className="shrink-0 rounded-full border border-primary/30 bg-primary/10 px-3 py-2 text-xs font-semibold text-primary">
                  {testimonial.rating}
                </div>
              </div>

              <p className="relative mt-6 text-lg leading-relaxed text-foreground/90">
                “{testimonial.quote}”
              </p>
              <p className="relative mt-3 text-muted-foreground">{testimonial.praise}</p>

              <div className="relative mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" aria-hidden />
                Word of mouth & online buzz
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

