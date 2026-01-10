"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import PageTransition from "../components/PageTransition";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Clapperboard, Camera, Palette, Sparkles, Instagram, ExternalLink, X } from "lucide-react";
import CreativeCTA from "../components/CreativeCTA";
import LightboxGallery, { MediaItem } from "../components/LightboxGallery";
import ScrollReveal from "../components/ScrollReveal";
import Link from "next/link";
import { trackCta } from "../../lib/analytics";
import Testimonials from "../components/Testimonials";

const HERO_BACKGROUND = "/images/bokeh-lights-dark-background.jpg";
// Force rebuild for logo update

// Extended type for Portfolio items
type PortfolioKind = "video" | "photo" | "case" | "album";

interface PortfolioItem extends MediaItem {
  kind?: PortfolioKind;
  tags?: string[];
  client?: string;
  role?: string;
  date?: string;
  slug?: string;
  cover?: string;
  caseSummary?: string;
  caseDescription?: string;
  albumImages?: MediaItem[];
}

function useHeroParallax(
  sectionRef: React.RefObject<HTMLElement | null>,
  bgRef: React.RefObject<HTMLDivElement | null>
) {
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const BG_SCROLL = 120;
    const BG_TILT = 60;
    const BG_MAX_X = 140;
    const BG_MAX_Y = 210;
    const BG_MAX_ROTATE = 3;
    const BG_SCALE = 1.25;
    const bgTarget = { x: 0, y: 0, rotate: 0 };
    const bgCurrent = { x: 0, y: 0, rotate: 0 };
    let rafId: number | null = null;
    let lastPointer = { x: 0, y: 0, has: false };

    const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

    const computeTargets = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const scrollProgress = clamp(-rect.top / rect.height, -1.2, 1.2);

      let pointerXNorm = 0;
      let pointerYNorm = 0;
      if (lastPointer.has) {
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        pointerXNorm = clamp((lastPointer.x - cx) / (rect.width / 2), -1, 1);
        pointerYNorm = clamp((lastPointer.y - cy) / (rect.height / 2), -1, 1);
      }

      bgTarget.x = clamp(pointerXNorm * BG_TILT, -BG_MAX_X, BG_MAX_X);
      bgTarget.y = clamp((pointerYNorm * BG_TILT) + (scrollProgress * BG_SCROLL), -BG_MAX_Y, BG_MAX_Y);
      bgTarget.rotate = clamp(pointerXNorm * -4, -BG_MAX_ROTATE, BG_MAX_ROTATE);
    };

    const tick = () => {
      const bgEl = bgRef.current;
      if (!bgEl) return;

      bgCurrent.x += (bgTarget.x - bgCurrent.x) * 0.2;
      bgCurrent.y += (bgTarget.y - bgCurrent.y) * 0.2;
      bgCurrent.rotate += (bgTarget.rotate - bgCurrent.rotate) * 0.12;

      const clampedX = clamp(bgCurrent.x, -BG_MAX_X, BG_MAX_X);
      const clampedY = clamp(bgCurrent.y, -BG_MAX_Y, BG_MAX_Y);
      const clampedRotate = clamp(bgCurrent.rotate, -BG_MAX_ROTATE, BG_MAX_ROTATE);
      bgEl.style.transform = `translate3d(${clampedX}px, ${clampedY}px, 0) rotate(${clampedRotate}deg) scale(${BG_SCALE})`;
      rafId = requestAnimationFrame(tick);
    };

    const onPointerMove = (e: PointerEvent) => {
      lastPointer = { x: e.clientX, y: e.clientY, has: true };
      computeTargets();
    };

    const onScrollOrResize = () => {
      computeTargets();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    computeTargets();
    rafId = requestAnimationFrame(tick);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [prefersReduced, sectionRef, bgRef]);
}

const skillHighlights = [
  { label: "Videography", icon: Clapperboard },
  { label: "Photography", icon: Camera },
  { label: "Color Grading", icon: Palette },
  { label: "Post-Production", icon: Sparkles }
];

// Starter media for Featured Work
const featuredMedia: MediaItem[] = [
  {
    id: "featured-1",
    type: "video",
    src: "https://youtu.be/lQ5mOoEOoqo",
    thumbnail: "https://i.ytimg.com/vi/lQ5mOoEOoqo/hqdefault.jpg",
    title: "Featured: Brand Film",
    alt: "Featured brand film video",
    description: "A brand film highlighting craft and attention to detail."
  }
];

const portfolioItems: PortfolioItem[] = [
  {
    id: "Kyle Allen Physique Coaching",
    type: "video",
    kind: "video",
    src: "https://www.youtube.com/shorts/LaoAVooLROU",
    thumbnail: "https://i.ytimg.com/vi/LaoAVooLROU/hqdefault.jpg",
    title: "Kyle Allen Physique Coaching Reel",
    alt: "Kyle Allen coaching promo reel thumbnail",
    tags: ["Fitness", "Promo", "Story Reel"],
    client: "Kyle Allen Coaching",
    role: "Director, DP & Editor",
    date: "2025",
    cover: "https://i.ytimg.com/vi/LaoAVooLROU/hqdefault.jpg",
    description: "Story-led Instagram reel mixing Kyle Allen's transformation narrative with cinematic gym B-roll, closing with a DM call-to-action for online coaching."
  },
  {
    id: "Sheffield Varsity Basketball",
    type: "video",
    kind: "video",
    src: "https://youtu.be/y0E6twmL4_I",
    thumbnail: "https://i.ytimg.com/vi/y0E6twmL4_I/hqdefault.jpg",
    title: "Sheffield Varsity Basketball",
    alt: "Sheffield Varsity Basketball thumbnail",
    tags: ["Sport", "Cinematic", "Highlight"],
    client: "University of Sheffield",
    role: "DP & Editor",
    date: "2025",
    cover: "https://i.ytimg.com/vi/ohxsUU4xt2o/hqdefault.jpg",
    description: "Event highlight reel for a basketball competition."
  },
  {
    id: "Sheffield Varsity Powerlifting",
    type: "video",
    kind: "video",
    src: "https://youtu.be/aKEjwiwOTyg",
    thumbnail: "https://i.ytimg.com/vi/aKEjwiwOTyg/hqdefault.jpg",
    title: "Sheffield Varsity Powerlifting",
    alt: "Sheffield Varsity Powerlifting thumbnail",
    tags: ["Sport", "Cinematic", "Highlight"],
    client: "University of Sheffield",
    role: "Director, Editor",
    date: "2025",
    cover: "https://i.vimeocdn.com/video/452001751-8b1768af2e2de0c8dfe2e2c58e4458b4d9b27eb698cb928142b29be4c2c460a9-d_640?force=0",
    description: "A highlight reel for an athlete at a powerlifting competition."
  },
  {
    id: "Stance Fitness Promo",
    type: "video",
    kind: "video",
    src: "https://youtu.be/lQ5mOoEOoqo",
    thumbnail: "https://i.ytimg.com/vi/lQ5mOoEOoqo/hqdefault.jpg",
    title: "Stance Fitness Promo",
    alt: "Stance Fitness Promo thumbnail",
    tags: ["Brand Film", "Cinematic", "Color Grading"],
    client: "Nas.Create",
    role: "Director & Editor",
    date: "2024",
    cover: "https://i.ytimg.com/vi/lQ5mOoEOoqo/hqdefault.jpg",
    description: "A brand film highlighting craft and attention to detail."
  },
  {
    id: "Vizual Mods Promo",
    type: "video",
    kind: "video",
    src: "https://youtube.com/shorts/rPJDmGHiTL0",
    thumbnail: "https://i.ytimg.com/vi/rPJDmGHiTL0/hqdefault.jpg",
    title: "Vizual Mods Promo",
    alt: "Vizual Mods Promo thumbnail",
    tags: ["Automotive", "Promo", "Motion"],
    client: "Vizual Mods",
    role: "Director, Editor",
    date: "2024",
    cover: "https://i.vimeocdn.com/video/452001751-8b1768af2e2de0c8dfe2e2c58e4458b4d9b27eb698cb928142b29be4c2c460a9-d_640?force=0",
    description: "A promotional video for a car modification company."
  },
  // PHOTO ALBUM - Fitness
  {
    id: "fitness-portfolio",
    type: "image",
    kind: "album",
    cover: "/images/portfolio/sheffield-powerlifting/fitness/DSC00947.jpg",
    src: "/images/portfolio/sheffield-powerlifting/fitness/DSC00947.jpg",
    title: "Fitness & Physiques",
    alt: "Fitness photography collection",
    tags: ["Fitness", "Gym", "Physique", "Photography"],
    client: "Various",
    role: "Photographer",
    date: "2025",
    description: "High-impact fitness and physique photography capturing strength and dedication.",
    albumImages: [
      {
        id: "fitness-1",
        type: "image",
        src: "/images/portfolio/sheffield-powerlifting/fitness/DSC00947.jpg",
        alt: "Fitness photography",
      },
      {
        id: "fitness-2",
        type: "image",
        src: "/images/portfolio/sheffield-powerlifting/fitness/DSC00944.jpg",
        alt: "Fitness photography",
      },
      {
        id: "fitness-3",
        type: "image",
        src: "/images/portfolio/sheffield-powerlifting/fitness/DSC00917.jpg",
        alt: "Fitness photography",
      },
      {
        id: "fitness-4",
        type: "image",
        src: "/images/portfolio/sheffield-powerlifting/fitness/DSC00881.jpg",
        alt: "Fitness photography",
      },
    ]
  },
  // PHOTO ALBUM - Automotive Photography
  {
    id: "automotive-photography",
    type: "image",
    kind: "album",
    cover: "/images/Automotive/DSC07610-Enhanced-NR.jpg",
    src: "/images/Automotive/DSC07610-Enhanced-NR.jpg",
    title: "Automotive",
    alt: "Automotive photography collection",
    tags: ["Automotive", "Cars", "Photography"],
    client: "Nas.Create",
    role: "Photographer",
    date: "2024",
    description: "Automotive photography showcasing vehicles with creative lighting and composition.",
    albumImages: [
      {
        id: "automotive-1",
        type: "image",
        src: "/images/Automotive/DSC07563.jpg",
        alt: "Automotive photography",
      },
      {
        id: "automotive-2",
        type: "image",
        src: "/images/Automotive/DSC07610-Enhanced-NR.jpg",
        alt: "Automotive photography",
      },
      {
        id: "automotive-3",
        type: "image",
        src: "/images/Automotive/DSC07646-Enhanced-NR.jpg",
        alt: "Automotive photography",
      },
      {
        id: "automotive-4",
        type: "image",
        src: "/images/Automotive/DSC07747-Enhanced-NR.jpg",
        alt: "Automotive photography",
      },
      {
        id: "automotive-5",
        type: "image",
        src: "/images/Automotive/DSC09689-Enhanced-NR-Edit.png",
        alt: "Automotive photography",
      },
      {
        id: "automotive-6",
        type: "image",
        src: "/images/Automotive/carousel_07.jpg",
        alt: "Automotive photography",
      },
    ]
  },
  // PHOTO ALBUM - Sheffield Powerlifting Varsity 2025
  {
    id: "sheffield-powerlifting-varsity-2025",
    type: "image",
    kind: "album",
    // Cover image shown on main portfolio page
    cover: "/images/portfolio/sheffield-powerlifting/DSC05443.jpg",
    src: "/images/portfolio/sheffield-powerlifting/DSC05662.jpg",
    title: "Sheffield Powerlifting Varsity 2025",
    alt: "Sheffield Powerlifting Varsity 2025 photography",
    tags: ["Sport", "Event", "Powerlifting"],
    client: "University of Sheffield",
    role: "Director & Photographer",
    date: "2025",
    description: "Event photography coverage of Sheffield Varsity Powerlifting competition.",
    // All 13 images in the album
    albumImages: [
      {
        id: "sheffield-powerlifting-1",
        type: "image",
        src: "/images/portfolio/sheffield-powerlifting/DSC04648.jpg",
        alt: "Sheffield Varsity Powerlifting 2025",
      },
      {
        id: "sheffield-powerlifting-2",
        type: "image",
        src: "/images/portfolio/sheffield-powerlifting/DSC05031.jpg",
        alt: "Sheffield Varsity Powerlifting 2025",
      },
      {
        id: "sheffield-powerlifting-3",
        type: "image",
        src: "/images/portfolio/sheffield-powerlifting/DSC05342.jpg",
        alt: "Sheffield Varsity Powerlifting 2025",
      },
      {
        id: "sheffield-powerlifting-4",
        type: "image",
        src: "/images/portfolio/sheffield-powerlifting/DSC05374.jpg",
        alt: "Sheffield Varsity Powerlifting 2025",
      },
      {
        id: "sheffield-powerlifting-5",
        type: "image",
        src: "/images/portfolio/sheffield-powerlifting/DSC05443.jpg",
        alt: "Sheffield Varsity Powerlifting 2025",
      },
      {
        id: "sheffield-powerlifting-6",
        type: "image",
        src: "/images/portfolio/sheffield-powerlifting/DSC05662.jpg",
        alt: "Sheffield Varsity Powerlifting 2025",
      },
      {
        id: "sheffield-powerlifting-7",
        type: "image",
        src: "/images/portfolio/sheffield-powerlifting/DSC06993.jpg",
        alt: "Sheffield Varsity Powerlifting 2025",
      },
      {
        id: "sheffield-powerlifting-8",
        type: "image",
        src: "/images/portfolio/sheffield-powerlifting/DSC07068.jpg",
        alt: "Sheffield Varsity Powerlifting 2025",
      },
      {
        id: "sheffield-powerlifting-9",
        type: "image",
        src: "/images/portfolio/sheffield-powerlifting/DSC07689.jpg",
        alt: "Sheffield Varsity Powerlifting 2025",
      },
      {
        id: "sheffield-powerlifting-10",
        type: "image",
        src: "/images/portfolio/sheffield-powerlifting/DSC07987.jpg",
        alt: "Sheffield Varsity Powerlifting 2025",
      },
      {
        id: "sheffield-powerlifting-11",
        type: "image",
        src: "/images/portfolio/sheffield-powerlifting/DSC08037.jpg",
        alt: "Sheffield Varsity Powerlifting 2025",
      },
      {
        id: "sheffield-powerlifting-12",
        type: "image",
        src: "/images/portfolio/sheffield-powerlifting/DSC08132.jpg",
        alt: "Sheffield Varsity Powerlifting 2025",
      },
      {
        id: "sheffield-powerlifting-13",
        type: "image",
        src: "/images/portfolio/sheffield-powerlifting/DSC08283.jpg",
        alt: "Sheffield Varsity Powerlifting 2025",
      },
    ]
  },
];

export default function CreativePage() {
  const [activeFilter, setActiveFilter] = useState<PortfolioKind | "all">("all");
  // const [isCaseModalOpen, setIsCaseModalOpen] = useState(false);
  // const [activeCaseStudy, setActiveCaseStudy] = useState<PortfolioItem | null>(null);
  const [isAlbumModalOpen, setIsAlbumModalOpen] = useState(false);
  const [activeAlbum, setActiveAlbum] = useState<PortfolioItem | null>(null);
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const heroBgRef = useRef<HTMLDivElement | null>(null);

  useHeroParallax(heroSectionRef, heroBgRef);

  const filters: { label: string; value: PortfolioKind | "all" }[] = [
    { label: "All", value: "all" },
    { label: "Video", value: "video" },
    { label: "Photo", value: "photo" },
    { label: "Case Studies", value: "case" }
  ];

  const counts = useMemo(() => {
    const base = portfolioItems.reduce(
      (acc, item) => {
        const kind = item.kind || (item.type === "image" ? "photo" : "video");
        if (kind === "album") {
          acc.photo = (acc.photo || 0) + 1;
        } else {
          acc[kind] = (acc[kind] || 0) + 1;
        }
        acc.all += 1;
        return acc;
      },
      { all: 0, video: 0, photo: 0, case: 0 } as Record<PortfolioKind | "all", number>
    );
    return base;
  }, []);

  const filteredItems = useMemo(() => {
    if (activeFilter === "all") {
      return portfolioItems;
    }
    return portfolioItems.filter((item) => {
      const kind = item.kind || (item.type === "image" ? "photo" : "video");
      // Include albums when filtering by "photo"
      if (activeFilter === "photo" && kind === "album") {
        return true;
      }
      return kind === activeFilter;
    });
  }, [activeFilter]);

  const mediaItems = useMemo(() => {
    return filteredItems.filter((item) => {
      const kind = item.kind || (item.type === "image" ? "photo" : "video");
      return kind !== "case" && kind !== "album";
    });
  }, [filteredItems]);

  const albumItems = useMemo(() => {
    const albums = filteredItems.filter((item) => item.kind === "album");
    const priorityAlbumIds = ["fitness-portfolio"];

    const prioritized = priorityAlbumIds
      .map((id) => albums.find((item) => item.id === id))
      .filter((item): item is PortfolioItem => Boolean(item));

    const remaining = albums.filter((item) => !priorityAlbumIds.includes(item.id ?? ""));

    return [...prioritized, ...remaining];
  }, [filteredItems]);

  const caseItems = useMemo(() => {
    return filteredItems.filter((item) => item.kind === "case");
  }, [filteredItems]);

  const handleFilterClick = useCallback((value: PortfolioKind | "all") => {
    setActiveFilter(value);
  }, []);

  // const handleCaseStudyOpen = useCallback((item: PortfolioItem) => {
  //   setActiveCaseStudy(item);
  //   setIsCaseModalOpen(true);
  // }, []);

  // const handleCaseStudyClose = useCallback(() => {
  //   setIsCaseModalOpen(false);
  // }, []);

  const handleAlbumOpen = useCallback((item: PortfolioItem) => {
    setActiveAlbum(item);
    setIsAlbumModalOpen(true);
  }, []);

  const handleAlbumClose = useCallback(() => {
    setIsAlbumModalOpen(false);
  }, []);

  // Modal focus trap refs
  // const modalRef = useRef<HTMLDivElement>(null);
  const albumModalRef = useRef<HTMLDivElement>(null);

  return (
    <PageTransition>
      <div className="theme-creative min-h-screen bg-bg text-text transition-colors duration-300">
        {/* Nas.Create Branded Header */}
        <section ref={heroSectionRef} className="relative overflow-hidden py-20 px-6 sm:px-8 bg-bg">
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(11,15,10,0.82)_0%,rgba(6,10,8,0.94)_65%,rgba(0,0,0,1)_100%)]" />
          <div
            ref={heroBgRef}
            className="absolute inset-0 pointer-events-none will-change-transform"
            aria-hidden
            style={{ transform: "scale(1.24)" }}
          >
            <Image
              src={HERO_BACKGROUND}
              alt="Warm bokeh lights out of focus"
              fill
              priority
              sizes="100vw"
              className="absolute inset-0 object-cover object-center scale-[1.25] sm:scale-[1.15] lg:scale-[1.08] blur-[18px] sm:blur-[20px] lg:blur-[22px] brightness-[0.45]"
              style={{ filter: "grayscale(100%) blur(6px)" }}
            />
            <div aria-hidden className="absolute inset-0 overlay-tint" />
            <div aria-hidden className="absolute inset-0 gradient-vignette" />
            <div className="absolute inset-0 bg-grid hero-grid-mask" />
          </div>

          <div className="max-w-6xl mx-auto text-center relative z-10 px-2 sm:px-0">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="flex flex-col items-center mb-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="relative group isolate">
                    <div
                      aria-hidden
                      className="absolute -inset-8 -z-20 rounded-[40px] opacity-70 blur-3xl transition-transform duration-500 ease-out group-hover:opacity-100 group-hover:scale-110"
                      style={{ background: "radial-gradient(60% 60% at 50% 50%, rgb(var(--accent-rgb) / 0.6) 0%, rgb(var(--accent-rgb) / 0.18) 45%, rgb(var(--accent-rgb) / 0) 80%)" }}
                    />
                    <div className="relative flex items-center justify-center w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                      <Image
                        src="/logos/dark-trans-stacked.png"
                        alt="Nas.Create Logo"
                        width={320}
                        height={320}
                        className="w-full h-full object-contain drop-shadow-[0_0_25px_rgba(57,255,136,0.45)] transition-all duration-500 ease-out group-hover:drop-shadow-[0_0_35px_rgba(57,255,136,0.6)]"
                        priority
                      />
                    </div>
                  </div>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-text mb-4">Visual Storytelling</h1>
                <p className="text-xl md:text-2xl text-dim mb-6">Bringing ideas to life through the lens</p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
                <a
                  href="https://www.instagram.com/nas.create/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 font-medium rounded-xl transition-all duration-200 transform hover:scale-105 group text-accent"
                  style={{ background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-dim) 100%)" }}
                >
                  <Instagram size={20} />
                  <span>@nas.create</span>
                  <ExternalLink size={16} className="opacity-70 group-hover:opacity-100" />
                </a>
                <div className="flex items-center gap-2 text-accent">
                  <div className="w-2 h-2 rounded-full animate-pulse bg-accent"></div>
                  <span className="text-sm font-medium text-accent">Available for Projects</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.5}>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {skillHighlights.map(({ label, icon: Icon }) => (
                  <div key={label} className="flex items-center gap-2 text-sm font-medium text-accent tracking-wide">
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent-ghost text-accent">
                      <Icon size={16} strokeWidth={2} />
                    </span>
                    <span className="uppercase text-[0.75rem] tracking-[0.24em] text-accent opacity-80">{label}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Featured Work */}
        <section className="py-20 px-8 bg-panel transition-colors duration-300">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-text mb-3">Featured Work</h2>
                <p className="text-dim">A quick look at recent creative work.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.2}>
              <LightboxGallery
                items={featuredMedia}
                columns={1}
                className="grid-cols-1"
                showTitles={true}
                enableZoom={false}
                enableDownload={false}
                inlinePlayback={true}
              />
            </ScrollReveal>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-10 px-6 sm:px-8 bg-panel transition-colors duration-300">
          <Testimonials />
        </section>

        {/* Portfolio Section */}
        <section className="py-20 px-6 sm:px-8 bg-bg transition-colors duration-300">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-text mb-3">Creative Portfolio</h2>
                <p className="text-dim">Selected videography, photography, and case-led projects.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {filters.map((filter) => {
                  const isActive = activeFilter === filter.value;
                  return (
                    <button
                      key={filter.value}
                      type="button"
                      onClick={() => handleFilterClick(filter.value)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 focus:outline-none focus:ring-2 ring-accent ring-offset-bg ${
                        isActive
                          ? "bg-accent text-[#0B0C0E] border-transparent"
                          : "bg-muted text-accent border-subtle hover:bg-subtle"
                      }`}
                      aria-pressed={isActive}
                    >
                      {`${filter.label} (${counts[filter.value]})`}
                    </button>
                  );
                })}
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {/* Render videos using LightboxGallery for each item to enable modal view */}
                {mediaItems.map((item) => (
                  <LightboxGallery
                    key={item.id}
                    items={[item]}
                    columns={1}
                    className=""
                    showTitles={true}
                    enableDownload={false}
                    enableZoom={false}
                    useResponsiveGrid={false}
                  />
                ))}

                {/* Render album items with custom card that triggers Album Modal */}
                {albumItems.map((item) => (
                  <motion.div
                    key={item.id}
                    className="group cursor-pointer relative overflow-hidden transition-all duration-300 hover:-translate-y-1"
                    whileHover={{ scale: 1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAlbumOpen(item)}
                  >
                    <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-br from-[color:var(--accent)]/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 -z-0" />
                    <div className="relative aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden border border-subtle hover:border-[color:var(--ring)] hover:shadow-[0_18px_35px_-18px_rgba(57,255,136,0.6)] transition-all duration-300">
                      {item.cover && (
                        <>
                          <Image
                            src={item.cover}
                            alt={item.alt || item.title || "Album cover"}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="object-cover"
                          />
                          <div className="absolute top-2 left-2 z-10">
                            <div className="px-2 py-1 rounded-md bg-gradient-to-r from-emerald-400 to-green-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg animate-pulse">
                              Photos
                            </div>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="p-4 bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-full shadow-2xl group-hover:scale-110 transition-transform duration-300 flex items-center gap-2">
                              <Camera size={24} />
                              <span className="text-lg font-bold">{item.albumImages?.length || 0}</span>
                            </div>
                          </div>
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                        </>
                      )}
                    </div>
                    <div className="mt-3 space-y-2">
                      {item.title && <h4 className="text-sm font-medium text-gray-900 dark:text-white">{item.title}</h4>}
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {item.tags.slice(0, 5).map((tag) => (
                            <span key={tag} className="px-2.5 py-1 rounded-full text-xs font-medium border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Case Studies */}
                {caseItems.map((item) => (
                  <div key={item.id} className="relative w-full">
                    <button
                      // onClick={() => handleCaseStudyOpen(item)}
                      className="relative w-full text-left rounded-2xl border border-subtle bg-muted hover:bg-subtle transition-colors duration-200 focus:outline-none focus:ring-2 ring-accent ring-offset-bg overflow-hidden group"
                    >
                      {item.cover && (
                        <div className="relative aspect-video overflow-hidden">
                          <Image src={item.cover} alt={item.title || ""} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        </div>
                      )}
                      <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="px-3 py-1 text-xs font-semibold rounded-full border bg-accent-ghost text-accent" style={{ borderColor: 'var(--ring)' }}>Case Study</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-text mb-2">{item.title}</h3>
                          {item.caseSummary && <p className="text-sm text-dim line-clamp-3">{item.caseSummary}</p>}
                        </div>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
        {/* Album Modal */}
        <AnimatePresence>
          {isAlbumModalOpen && activeAlbum && activeAlbum.albumImages && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleAlbumClose}
              />
              <motion.div
                className="fixed inset-0 z-40 flex items-center justify-center px-4 py-10"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div ref={albumModalRef} className="relative w-full max-w-7xl max-h-[90vh] rounded-3xl border border-subtle bg-panel backdrop-blur-md text-text shadow-2xl overflow-auto">
                  <button onClick={handleAlbumClose} className="sticky top-4 right-4 float-right z-10 p-2 rounded-full bg-muted text-text hover:text-text ring-accent ring-offset-bg">
                    <X size={20} />
                  </button>
                  <div className="p-8 space-y-6">
                    <div className="mb-6">
                      <h2 className="text-3xl font-bold text-text mb-2">{activeAlbum.title}</h2>
                      <p className="text-dim leading-relaxed">{activeAlbum.description}</p>
                    </div>
                    <LightboxGallery
                      items={activeAlbum.albumImages}
                      columns={3}
                      className="columns-1 sm:columns-2 lg:columns-3 gap-4"
                      showTitles={false}
                      enableZoom={true}
                      useResponsiveGrid={false}
                      adaptiveAspectRatio={true}
                    />
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Contact and Footer */}
        <section className="py-20 px-8 bg-panel transition-colors duration-300">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal direction="up" delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold text-text mb-6 transition-colors duration-300">Ready to Create Something Amazing?</h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.5}>
              <CreativeCTA source="creative_footer" className="justify-center" />
            </ScrollReveal>
          </div>
        </section>
        <DesktopCtas />
      </div>
    </PageTransition>
  );
}

function DesktopCtas() {
  const [enabled, setEnabled] = useState(false);
  const [show, setShow] = useState(false);
  const [showFab, setShowFab] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(mq.matches);
    const onChange = () => setEnabled(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      const scrollingDown = window.scrollY > lastScrollY.current;
      lastScrollY.current = window.scrollY;
      const pastHalf = progress >= 0.5;
      setShow(pastHalf && !scrollingDown);
      setShowFab(pastHalf);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div className={`hidden md:block fixed left-1/2 z-40 -translate-x-1/2 transition-all duration-200 ${show ? "bottom-6 opacity-100" : "bottom-3 opacity-0 pointer-events-none"}`}>
        <div className="rounded-3xl border border-gray-200/40 bg-gray-900/80 px-4 py-3 backdrop-blur-md shadow-xl dark:border-white/10">
          <CreativeCTA source="creative_sticky" className="items-center" size="sm" />
        </div>
      </div>
      <div className={`hidden md:block fixed right-6 z-40 transition-all duration-200 ${showFab ? "bottom-24 opacity-100" : "bottom-20 opacity-0 pointer-events-none"}`}>
        <Link
          href="/contact?src=creative_fab#whatsapp"
          className="rounded-full bg-emerald-500/90 text-white px-5 py-3 font-semibold shadow-lg hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200"
          data-cta="creative_fab_whatsapp"
          onClick={(e) => trackCta("creative_fab_whatsapp", { href: e.currentTarget.href })}
        >
          WhatsApp Chat
        </Link>
      </div>
    </>
  );
}
