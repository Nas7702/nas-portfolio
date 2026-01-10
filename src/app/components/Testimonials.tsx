"use client";

import { useState, useEffect, useCallback } from "react";
import { MessageSquareQuote, Sparkles, Quote, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

type Testimonial = {
  name: string;
  role: string;
  headline: string;
  quote: string;
  praise: string;
  link?: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Jayshan",
    role: "Stance Fitness",
    headline: "Clear increase in views, follows & ad performance",
    quote:
      "Nas has been fantastic at developing social media and website content (reels, posts, video, ads, statics) which has delivered clear value to us. He understood our brand and audience and was able to take ideas and develop them into clear narratives to shoot and edit the content.",
    praise:
      "He's easy to work with, clarifies what is needed and works quickly. With his content we've seen a clear increase in views, follows and an increase in performance across our ads. I would highly recommend Nas to anyone who wants to up their online presence.",
    link: "https://stancefitness.co/",
  },
  {
    name: "Sivan",
    role: "Lalezar Restaurant",
    headline: "A promotional video everyone keeps praising",
    quote:
      "The video Nas delivered was phenomenal and we're overjoyed with how it turned out. We've had compliments in person and online from guests impressed by it.",
    praise:
      "Nas was a delight to work with and we recommend Nas Create to any business looking to stand out on social because the work is exceptional.",
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
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Progress bar animation
  useEffect(() => {
    if (!isAutoPlaying) {
      setProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + (100 / 60); // 60 frames in 6 seconds (100ms intervals)
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]);

  // Auto-rotate every 6 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const testimonial = testimonials[currentIndex];

  return (
    <section className="max-w-6xl mx-auto px-6 mt-32">
      <ScrollReveal direction="up" delay={0} threshold={0.15}>
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-10">
          <div className="space-y-3">
            <p className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-primary/80">
              <MessageSquareQuote size={16} aria-hidden />
              Testimonials
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Featured Client Stories
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Hear from clients who partnered with us to elevate their brand presence.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-primary/30 bg-primary/10 px-4 py-3 shadow-[0_14px_45px_-20px_rgba(57,255,136,0.5)]">
            <Sparkles size={18} className="text-primary" aria-hidden />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-primary leading-tight">Video-first storytelling</p>
              <p className="text-xs text-muted-foreground leading-tight">Human, cinematic, measurable results</p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Carousel */}
      <ScrollReveal delay={0.1} threshold={0.2}>
        <div className="relative">
          {/* Main testimonial card */}
          <article
            key={currentIndex}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-card/90 via-card to-primary/5 p-8 md:p-12 shadow-lg shadow-primary/5 animate-in fade-in slide-in-from-right-4 duration-500"
          >
            {/* Background effects */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary/15 blur-3xl" />
              <div className="absolute -left-20 bottom-0 h-60 w-60 rounded-full bg-primary/10 blur-3xl" />
            </div>

            {/* Decorative quote mark */}
            <div className="absolute top-4 right-8 opacity-5">
              <Quote size={180} className="text-primary" strokeWidth={1} />
            </div>

            {/* Content */}
            <div className="relative max-w-4xl mx-auto">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  {testimonial.link ? (
                    <a
                      href={testimonial.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-3 hover:bg-primary/20 transition-colors duration-200 group/link"
                    >
                      <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                      <p className="text-sm font-semibold text-primary uppercase tracking-wider">{testimonial.role}</p>
                      <ExternalLink size={12} className="text-primary opacity-0 group-hover/link:opacity-100 transition-opacity duration-200" />
                    </a>
                  ) : (
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-3">
                      <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                      <p className="text-sm font-semibold text-primary uppercase tracking-wider">{testimonial.role}</p>
                    </div>
                  )}
                  <h3 className="text-2xl md:text-3xl font-bold">{testimonial.name}</h3>
                  <p className="text-base text-muted-foreground font-medium italic mt-1">{testimonial.headline}</p>
                </div>
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20">
                  <MessageSquareQuote size={28} className="text-primary" />
                </div>
              </div>

              {/* Quote */}
              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary via-primary/50 to-transparent rounded-full" />
                  <p className="pl-6 text-lg md:text-xl leading-relaxed text-foreground/95 font-light">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </div>

                <div className="relative pt-4 border-t border-white/10">
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{testimonial.praise}</p>
                </div>
              </div>
            </div>
          </article>

          {/* Navigation arrows */}
          <button
            onClick={() => { prevSlide(); setIsAutoPlaying(false); setTimeout(() => setIsAutoPlaying(true), 10000); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/10 transition-all duration-200 backdrop-blur-sm"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => { nextSlide(); setIsAutoPlaying(false); setTimeout(() => setIsAutoPlaying(true), 10000); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/10 transition-all duration-200 backdrop-blur-sm"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Navigation dots */}
        <div className="flex flex-col items-center gap-3 mt-8">
          <div className="flex items-center justify-center gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-primary"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              >
                {index === currentIndex && isAutoPlaying && (
                  <span className="absolute inset-0 rounded-full bg-primary/50 animate-ping" />
                )}
              </button>
            ))}
          </div>

          {/* Progress bar */}
          {isAutoPlaying && (
            <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary/50 via-primary to-primary/50 rounded-full transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      </ScrollReveal>
    </section>
  );
}
