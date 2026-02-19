"use client";

import { useState, useEffect, useCallback } from "react";
import { MessageSquareQuote, Sparkles, Quote, ChevronLeft, ChevronRight, ExternalLink, Play, Camera } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

type RelatedWork = {
  label: string;
  href?: string;
  scrollTo?: string;
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
  {
    name: "Kyle",
    role: "Kyle Allen Coaching",
    headline: "Became my most viewed post",
    quote:
      "I went with Nas for professional photos and a promo video for my online coaching business. Absolutely loved the video — his skills are amazing with a super fast turnaround and great service.",
    praise:
      "I used the video to promote my page and it became my most viewed post. Couldn't recommend him enough, will definitely be using him again!",
    relatedWork: [
      { label: "Watch the Reel", href: "https://www.youtube.com/shorts/LaoAVooLROU" },
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
            <p className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-white/50">
              <MessageSquareQuote size={16} aria-hidden />
              Testimonials
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Featured Client Stories
            </h2>
            <p className="text-white/55 max-w-2xl">
              Real clients. Real results. Here&apos;s what they said.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/8 px-4 py-3">
            <Sparkles size={18} className="text-accent" aria-hidden />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-white leading-tight">The video has a job to do</p>
              <p className="text-xs text-white/50 leading-tight">Every brief starts with the outcome</p>
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
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#111314] p-8 md:p-12 shadow-lg animate-in fade-in slide-in-from-right-4 duration-500"
          >
            {/* Background effects */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-accent/10 blur-3xl" />
              <div className="absolute -left-20 bottom-0 h-60 w-60 rounded-full bg-white/5 blur-3xl" />
            </div>

            {/* Decorative quote mark */}
            <div className="absolute top-4 right-8 opacity-5">
              <Quote size={180} className="text-white" strokeWidth={1} />
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
                      className="inline-flex items-center gap-2 rounded-full bg-white/8 px-4 py-1.5 mb-3 hover:bg-white/12 transition-colors duration-200 group/link"
                    >
                      <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                      <p className="text-sm font-semibold text-white/80 uppercase tracking-wider">{testimonial.role}</p>
                      <ExternalLink size={12} className="text-white/40 opacity-0 group-hover/link:opacity-100 transition-opacity duration-200" />
                    </a>
                  ) : (
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/8 px-4 py-1.5 mb-3">
                      <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                      <p className="text-sm font-semibold text-white/80 uppercase tracking-wider">{testimonial.role}</p>
                    </div>
                  )}
                  <h3 className="text-2xl md:text-3xl font-bold text-white">{testimonial.name}</h3>
                  <p className="text-base text-white/60 font-medium italic mt-1">{testimonial.headline}</p>
                </div>
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-white/8 flex items-center justify-center border border-white/10">
                  <MessageSquareQuote size={28} className="text-white/60" />
                </div>
              </div>

              {/* Quote */}
              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-accent via-accent/50 to-transparent rounded-full" />
                  <p className="pl-6 text-lg md:text-xl leading-relaxed text-white/90 font-light">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </div>

                <div className="relative pt-4 border-t border-white/10">
                  <p className="text-base md:text-lg text-white/50 leading-relaxed">{testimonial.praise}</p>
                </div>

                {testimonial.relatedWork && testimonial.relatedWork.length > 0 && (
                  <div className="flex flex-wrap gap-3 pt-4">
                    {testimonial.relatedWork.map((work) =>
                      work.href ? (
                        <a
                          key={work.label}
                          href={work.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-medium text-white/70 hover:bg-white/12 hover:text-white transition-all duration-200"
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
                          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-medium text-white/70 hover:bg-white/12 hover:text-white transition-all duration-200"
                        >
                          <Camera size={14} />
                          {work.label}
                        </button>
                      ) : null
                    )}
                  </div>
                )}
              </div>
            </div>
          </article>

          {/* Navigation arrows */}
          <button
            onClick={() => { prevSlide(); setIsAutoPlaying(false); setTimeout(() => setIsAutoPlaying(true), 10000); }}
            className="absolute left-4 top-[200px] w-10 h-10 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all duration-200 backdrop-blur-sm"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => { nextSlide(); setIsAutoPlaying(false); setTimeout(() => setIsAutoPlaying(true), 10000); }}
            className="absolute right-4 top-[200px] w-10 h-10 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all duration-200 backdrop-blur-sm"
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
                    ? "w-8 bg-accent"
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
