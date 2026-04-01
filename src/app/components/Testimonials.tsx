"use client";

import { useState, useEffect, useCallback } from "react";
import { MessageSquareQuote, Quote, ChevronLeft, ChevronRight, ExternalLink, Play, Camera } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

type RelatedWork = {
  label: string;
  href?: string;
  scrollTo?: string;
  openItemId?: string;
};

type Testimonial = {
  name: string;
  role: string;
  headline: string;
  quote: string;
  praise: string;
  link?: string;
  relatedWork?: RelatedWork[];
};

const testimonials: Testimonial[] = [
  {
    name: "Walshe's Property",
    role: "Estate Agent",
    headline: "The whole office was impressed. Nothing like you'd see locally.",
    quote:
      "Nas produced a walkthrough video for one of our listings and the whole office was really impressed by how it turned out. The drone footage and interior shots really stood out, nothing like you'd see locally.",
    praise:
      "He was easy to work with, knew exactly what he was doing on the day, and delivered quickly. We'd absolutely look to use him again for future listings.",
    relatedWork: [
      { label: "Watch the Film", openItemId: "Property Showcase", scrollTo: "creative-portfolio" },
    ],
  },
  {
    name: "Stance Fitness",
    role: "Sports Tech · VBT Wearables",
    headline: "Clear increase in views, follows and ad performance.",
    quote:
      "Nas has been fantastic at developing social media and website content (reels, posts, video, ads, statics) which has delivered clear value to us. He understood our brand and audience and was able to take ideas and develop them into clear narratives to shoot and edit the content.",
    praise:
      "He's easy to work with, clarifies what is needed and works quickly. With his content we've seen a clear increase in views, follows and an increase in performance across our ads. I would highly recommend Nas to anyone who wants to up their online presence.",
    link: "https://stancefitness.co/",
    relatedWork: [
      { label: "Watch the Film", openItemId: "Stance Fitness Promo", scrollTo: "creative-portfolio" },
    ],
  },
  {
    name: "Lalezar Restaurant",
    role: "Restaurant",
    headline: "A promotional video everyone keeps praising.",
    quote:
      "The video Nas delivered was phenomenal and we're overjoyed with how it turned out. We've had compliments in person and online from guests impressed by it.",
    praise:
      "Nas was a delight to work with and we recommend Nas to any business looking to stand out on social because the work is exceptional.",
  },
  {
    name: "Kyle Allen Coaching",
    role: "Online Coaching",
    headline: "Became my most viewed post.",
    quote:
      "I went with Nas for professional photos and a promo video for my online coaching business. Absolutely loved the video, his skills are amazing with a super fast turnaround and great service.",
    praise:
      "I used the video to promote my page and it became my most viewed post. Couldn't recommend him enough, will definitely be using him again!",
    relatedWork: [
      { label: "Watch the Reel", openItemId: "Kyle Allen Physique Coaching", scrollTo: "creative-portfolio" },
      { label: "View Photos", scrollTo: "creative-portfolio" },
    ],
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setProgress(0);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setProgress(0);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  useEffect(() => {
    if (!isAutoPlaying) {
      setProgress(0);
      return;
    }
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 100 / 60));
    }, 100);
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const testimonial = testimonials[currentIndex];

  return (
    <section className="max-w-6xl mx-auto px-6 mt-12 md:mt-16">
      <ScrollReveal direction="up" delay={0} threshold={0.15}>
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-10">
          <div className="space-y-3">
            <p className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-muted-foreground">
              <MessageSquareQuote size={16} aria-hidden />
              Testimonials
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Featured Client Stories
            </h2>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1} threshold={0.2}>
        <div className="relative">
          <article
            key={currentIndex}
            className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-lg animate-in fade-in slide-in-from-right-4 duration-500"
          >
            {/* Decorative quote mark */}
            <div className="absolute top-4 right-8 opacity-5 pointer-events-none" aria-hidden>
              <Quote size={180} className="text-foreground" strokeWidth={1} />
            </div>

            <div className="relative p-8 md:p-12">
              <div className="grid md:grid-cols-[2fr_3fr] gap-8 md:gap-0">

                {/* LEFT — Identity */}
                <div className="flex flex-col justify-between gap-8 md:pr-12">
                  <div>
                    <p className="text-xs tracking-[0.25em] uppercase text-accent font-medium mb-4">
                      {testimonial.role}
                    </p>

                    {testimonial.link ? (
                      <a
                        href={testimonial.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-block"
                      >
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight group-hover/link:text-accent transition-colors duration-300">
                          {testimonial.name}
                        </h3>
                        <span className="inline-flex items-center gap-1 mt-2 text-xs text-accent opacity-0 group-hover/link:opacity-100 transition-opacity duration-200">
                          <ExternalLink size={12} />
                          Visit site
                        </span>
                      </a>
                    ) : (
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                        {testimonial.name}
                      </h3>
                    )}
                  </div>

                  {testimonial.relatedWork && testimonial.relatedWork.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                      {testimonial.relatedWork.map((work) =>
                        work.openItemId ? (
                          <button
                            key={work.label}
                            type="button"
                            onClick={() => {
                              const el = document.getElementById(work.scrollTo ?? "creative-portfolio");
                              if (el) el.scrollIntoView({ behavior: "smooth" });
                              setTimeout(() => {
                                window.dispatchEvent(
                                  new CustomEvent("open-lightbox-item", { detail: { itemId: work.openItemId } })
                                );
                              }, 600);
                            }}
                            className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-all duration-200 cursor-pointer"
                          >
                            <Play size={14} />
                            {work.label}
                          </button>
                        ) : work.href ? (
                          <a
                            key={work.label}
                            href={work.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-all duration-200"
                          >
                            <Play size={14} />
                            {work.label}
                          </a>
                        ) : work.scrollTo ? (
                          <button
                            key={work.label}
                            type="button"
                            onClick={() => {
                              const el = document.getElementById(work.scrollTo!);
                              if (el) el.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-all duration-200 cursor-pointer"
                          >
                            <Camera size={14} />
                            {work.label}
                          </button>
                        ) : null
                      )}
                    </div>
                  )}
                </div>

                {/* RIGHT — Quote content */}
                <div className="flex flex-col gap-6 md:border-l md:border-border md:pl-12">
                  {/* Headline as pull-quote */}
                  <p className="text-xl md:text-2xl font-light italic text-foreground/85 leading-snug">
                    &ldquo;{testimonial.headline}&rdquo;
                  </p>

                  <div className="space-y-4 pt-5 border-t border-border/50">
                    <p className="text-base text-foreground/75 leading-relaxed">
                      {testimonial.quote}
                    </p>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {testimonial.praise}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </article>

          {/* Navigation arrows — vertically centred */}
          <button
            onClick={() => { prevSlide(); setIsAutoPlaying(false); setTimeout(() => setIsAutoPlaying(true), 10000); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-accent hover:bg-accent/10 transition-all duration-200 backdrop-blur-sm shadow-sm cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => { nextSlide(); setIsAutoPlaying(false); setTimeout(() => setIsAutoPlaying(true), 10000); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-accent hover:bg-accent/10 transition-all duration-200 backdrop-blur-sm shadow-sm cursor-pointer"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Navigation — thin progress lines instead of dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              className="relative h-[3px] rounded-full overflow-hidden transition-all duration-300 cursor-pointer bg-border hover:bg-border/80"
              style={{ width: index === currentIndex ? "2.5rem" : "1.25rem" }}
            >
              {index === currentIndex && isAutoPlaying && (
                <span
                  className="absolute inset-y-0 left-0 rounded-full bg-accent transition-none"
                  style={{ width: `${progress}%` }}
                />
              )}
              {index === currentIndex && !isAutoPlaying && (
                <span className="absolute inset-0 bg-accent rounded-full" />
              )}
            </button>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
