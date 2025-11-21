"use client";


// import { getCreativeProjects } from "../../data/projects";
// import { Project } from "../../data/projects";
// import ProjectCard from "../components/ProjectCard";
// import ProjectModal from "../components/ProjectModal";
import PageTransition from "../components/PageTransition";
import ScrollReveal from "../components/ScrollReveal";
import LightboxGallery, { MediaItem } from "../components/LightboxGallery";
import { Instagram, ExternalLink, X, Clapperboard, Camera, Palette, Sparkles } from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import CreativeCTA from "../components/CreativeCTA";
import { trackCta } from "../../lib/analytics";

const HERO_BACKGROUND = "/images/bokeh-lights-dark-background.jpg";

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
  // For photo albums - array of images in the album
  albumImages?: MediaItem[];
}

// Starter media: replace the src with your YouTube/Vimeo link
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
  // PHOTO ALBUM - Automotive Photography
  {
    id: "automotive-photography",
    type: "image",
    kind: "album",
    cover: "/images/Automotive/DSC07610-Enhanced-NR.jpg",
    src: "/images/Automotive/DSC07915-Enhanced-NR-Edit.jpg",
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
    cover: "/images/portfolio/sheffield-powerlifting/DSC05443-NAS.CREATE©-.jpg",
    src: "/images/portfolio/sheffield-powerlifting/DSC05662-NAS.CREATE©-.jpg",
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
        src: "/images/portfolio/sheffield-powerlifting/DSC04648-NAS.CREATE©-.jpg",
        alt: "Sheffield Varsity Powerlifting 2025",
      },
      {
        id: "sheffield-powerlifting-2",
        type: "image",
        src: "/images/portfolio/sheffield-powerlifting/DSC05031-NAS.CREATE©-.jpg",
        alt: "Sheffield Varsity Powerlifting 2025",
      },
      {
        id: "sheffield-powerlifting-3",
        type: "image",
        src: "/images/portfolio/sheffield-powerlifting/DSC05342-NAS.CREATE©-.jpg",
        alt: "Sheffield Varsity Powerlifting 2025",
      },
      {
        id: "sheffield-powerlifting-4",
        type: "image",
        src: "/images/portfolio/sheffield-powerlifting/DSC05374-NAS.CREATE©-.jpg",
        alt: "Sheffield Varsity Powerlifting 2025",
      },
      {
        id: "sheffield-powerlifting-5",
        type: "image",
        src: "/images/portfolio/sheffield-powerlifting/DSC05443-NAS.CREATE©-.jpg",
        alt: "Sheffield Varsity Powerlifting 2025",
      },
      {
        id: "sheffield-powerlifting-6",
        type: "image",
        src: "/images/portfolio/sheffield-powerlifting/DSC05662-NAS.CREATE©-.jpg",
        alt: "Sheffield Varsity Powerlifting 2025",
      },
      {
        id: "sheffield-powerlifting-7",
        type: "image",
        src: "/images/portfolio/sheffield-powerlifting/DSC06993-NAS.CREATE©-.jpg",
        alt: "Sheffield Varsity Powerlifting 2025",
      },
      {
        id: "sheffield-powerlifting-8",
        type: "image",
        src: "/images/portfolio/sheffield-powerlifting/DSC07068-NAS.CREATE©-.jpg",
        alt: "Sheffield Varsity Powerlifting 2025",
      },
      {
        id: "sheffield-powerlifting-9",
        type: "image",
        src: "/images/portfolio/sheffield-powerlifting/DSC07689-NAS.CREATE©-.jpg",
        alt: "Sheffield Varsity Powerlifting 2025",
      },
      {
        id: "sheffield-powerlifting-10",
        type: "image",
        src: "/images/portfolio/sheffield-powerlifting/DSC07987-NAS.CREATE©-.jpg",
        alt: "Sheffield Varsity Powerlifting 2025",
      },
      {
        id: "sheffield-powerlifting-11",
        type: "image",
        src: "/images/portfolio/sheffield-powerlifting/DSC08037-NAS.CREATE©-.jpg",
        alt: "Sheffield Varsity Powerlifting 2025",
      },
      {
        id: "sheffield-powerlifting-12",
        type: "image",
        src: "/images/portfolio/sheffield-powerlifting/DSC08132-NAS.CREATE©-.jpg",
        alt: "Sheffield Varsity Powerlifting 2025",
      },
      {
        id: "sheffield-powerlifting-13",
        type: "image",
        src: "/images/portfolio/sheffield-powerlifting/DSC08283-NAS.CREATE©-.jpg",
        alt: "Sheffield Varsity Powerlifting 2025",
      },
    ]
  },
  //
  // TEMPLATE: Add more photo albums like this:
  // {
  //   id: "your-album-name",
  //   type: "image",
  //   kind: "album",
  //   cover: "YOUR_COVER_IMAGE_URL",
  //   src: "YOUR_COVER_IMAGE_URL",
  //   title: "Your Album Title",
  //   alt: "Album description",
  //   tags: ["Tag1", "Tag2"],
  //   client: "Client Name",
  //   role: "Photographer",
  //   date: "2025",
  //   description: "Album description",
  //   albumImages: [
  //     { id: "img-1", type: "image", src: "URL1", title: "Photo 1", alt: "Description 1" },
  //     { id: "img-2", type: "image", src: "URL2", title: "Photo 2", alt: "Description 2" },
  //     // ... add as many photos as you want
  //   ]
  // },
  // {
  //   id: "portfolio-colorsuite",
  //   type: "video",
  //   kind: "video",
  //   src: "https://youtu.be/rmz75NnAR6Y",
  //   thumbnail: "https://i.ytimg.com/vi/rmz75NnAR6Y/hqdefault.jpg",
  //   title: "Color Suite Breakdown",
  //   alt: "Color grading breakdown thumbnail",
  //   tags: ["Color Grading", "BTS", "Tutorial"],
  //   description: "Behind-the-scenes grade showing how we dialed in a moody cinematic palette."
  // },
  // {
  //   id: "portfolio-case-brand-refresh",
  //   type: "image",
  //   kind: "case",
  //   src: "https://images.unsplash.com/photo-1618005198936-0fe5ce59da91?auto=format&fit=crop&w=1600&q=80",
  //   thumbnail: "https://images.unsplash.com/photo-1618005198936-0fe5ce59da91?auto=format&fit=crop&w=600&q=80",
  //   title: "Case Study: Brand Refresh",
  //   alt: "Brand refresh styleframes",
  //   tags: ["Case Study", "Brand", "Strategy"],
  //   client: "Solstice Brewing",
  //   role: "Creative Lead",
  //   date: "2024",
  //   caseSummary: "Immersive brand film and photo suite that modernised Solstice's identity.",
  //   caseDescription: "A full-funnel content refresh delivering launch film, verticals, and photography. From pre-production look development through delivery we positioned Solstice for national expansion.",
  //   slug: "brand-refresh",
  //   cover: "/images/portfolio/brand-refresh-thumb.jpg"
  // },
  // {
  //   id: "portfolio-case-fitness-membership",
  //   type: "image",
  //   kind: "case",
  //   src: "https://images.unsplash.com/photo-1574689049865-536c9db0b5fc?auto=format&fit=crop&w=1600&q=80",
  //   thumbnail: "https://images.unsplash.com/photo-1574689049865-536c9db0b5fc?auto=format&fit=crop&w=600&q=80",
  //   title: "Case Study: Membership Launch",
  //   alt: "Fitness membership campaign visuals",
  //   tags: ["Case Study", "Campaign", "Fitness"],
  //   client: "Elevate Athletics",
  //   role: "Director & Editor",
  //   date: "2023",
  //   caseSummary: "Campaign that drove a 32% increase in membership signups during launch week.",
  //   caseDescription: "We delivered hero film, photography, and paid social cutdowns showcasing Elevate's new training program with a bold emerald palette and dynamic motion.",
  //   slug: "fitness-membership",
  //   cover: "/images/portfolio/fitness-membership-thumb.jpg"
  // }
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<PortfolioKind | "all">("all");
  const [isCaseModalOpen, setIsCaseModalOpen] = useState(false);
  const [activeCaseStudy, setActiveCaseStudy] = useState<PortfolioItem | null>(null);
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
        // Count albums as photos
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
      // Exclude case studies and albums from regular media (albums handled separately)
      return kind !== "case" && kind !== "album";
    });
  }, [filteredItems]);

  const albumItems = useMemo(() => {
    return filteredItems.filter((item) => item.kind === "album");
  }, [filteredItems]);

  const caseItems = useMemo(() => {
    return filteredItems.filter((item) => {
      const kind = item.kind || (item.type === "image" ? "photo" : "video");
      return kind === "case";
    });
  }, [filteredItems]);

  const handleFilterClick = useCallback((value: PortfolioKind | "all") => {
    setActiveFilter(value);
  }, []);

  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  const handleCaseStudyOpen = useCallback((item: PortfolioItem) => {
    lastFocusedElementRef.current = document.activeElement as HTMLElement;
    setActiveCaseStudy(item);
    setIsCaseModalOpen(true);
  }, []);

  const handleCaseStudyClose = useCallback(() => {
    setIsCaseModalOpen(false);
    if (lastFocusedElementRef.current) {
      lastFocusedElementRef.current.focus();
    }
  }, []);

  const handleAlbumOpen = useCallback((item: PortfolioItem) => {
    lastFocusedElementRef.current = document.activeElement as HTMLElement;
    setActiveAlbum(item);
    setIsAlbumModalOpen(true);
  }, []);

  const handleAlbumClose = useCallback(() => {
    setIsAlbumModalOpen(false);
    if (lastFocusedElementRef.current) {
      lastFocusedElementRef.current.focus();
    }
  }, []);

  const modalRef = useRef<HTMLDivElement>(null);
  const albumModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isCaseModalOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCaseStudyClose();
      }
    };

    const handleFocusTrap = (event: FocusEvent) => {
      if (!modalRef.current) return;
      if (modalRef.current.contains(event.target as Node)) return;
      const focusable = modalRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length > 0) {
        focusable[0].focus();
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focus", handleFocusTrap, true);
    document.body.style.overflow = "hidden";

    if (modalRef.current) {
      const focusable = modalRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length > 0) {
        focusable[0].focus();
      }
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focus", handleFocusTrap, true);
      document.body.style.overflow = "auto";
    };
  }, [handleCaseStudyClose, isCaseModalOpen]);
  // const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const creativeProjects = getCreativeProjects();

  // const handleOpenModal = (project: Project) => {
  //   setSelectedProject(project);
  //   setIsModalOpen(true);
  // };

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  //   setTimeout(() => setSelectedProject(null), 300);
  // };

  return (
    <PageTransition>
      <div className="theme-creative min-h-screen bg-bg text-text transition-colors duration-300">
        {/* Nas.Create Branded Header */}
        <section ref={heroSectionRef} className="relative overflow-hidden py-20 px-6 sm:px-8 bg-bg">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(11,15,10,0.82)_0%,rgba(6,10,8,0.94)_65%,rgba(0,0,0,1)_100%)]"
          />
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
              className="absolute inset-0 object-cover object-center scale-[1.25] sm:scale-[1.15] lg:scale-[1.08] blur-[14px] sm:blur-[16px] lg:blur-[18px] brightness-[0.45]"
            />

            {/* Overlay 0: green tint */}
            <div aria-hidden className="absolute inset-0 overlay-tint" />

            {/* Overlay 1: subtle vignette */}
            <div aria-hidden className="absolute inset-0 gradient-vignette" />

            {/* Overlay 2: neutral dotted grid */}
            <div className="absolute inset-0 bg-grid hero-grid-mask" />

            {/* Overlay 3: faint green sprinkles */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div
                className="absolute -top-20 -left-20 w-[60vw] h-[40vh]"
                style={{ background: 'radial-gradient(600px 300px at 10% 20%, rgb(var(--accent-rgb) / var(--sprinkle-1)), transparent 60%)' }}
              />
              <div
                className="absolute -bottom-24 -right-24 w-[70vw] h-[50vh]"
                style={{ background: 'radial-gradient(800px 400px at 85% 80%, rgb(var(--accent-rgb) / var(--sprinkle-2)), transparent 65%)' }}
              />
            </div>
          </div>

          <div className="max-w-6xl mx-auto text-center relative z-10 px-2 sm:px-0">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="flex flex-col items-center mb-8">
                {/* Nas.Create Logo */}
                <div className="flex items-center justify-center mb-6">
                  <div className="relative group isolate">
                    <div
                      aria-hidden
                      className="absolute -inset-8 -z-20 rounded-[40px] opacity-70 blur-3xl transition-transform duration-500 ease-out group-hover:opacity-100 group-hover:scale-110"
                      style={{
                        background:
                          "radial-gradient(60% 60% at 50% 50%, rgb(var(--accent-rgb) / 0.6) 0%, rgb(var(--accent-rgb) / 0.18) 45%, rgb(var(--accent-rgb) / 0) 80%)"
                      }}
                    />
                    <div className="relative flex items-center justify-center w-32 h-20 md:w-48 md:h-32 transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                      <Image
                        src="/logos/nas.create-logo.svg"
                        alt="Nas.Create Logo"
                        width={192}
                        height={128}
                        className="w-full h-full object-contain drop-shadow-[0_0_25px_rgba(57,255,136,0.45)] transition-all duration-500 ease-out group-hover:drop-shadow-[0_0_35px_rgba(57,255,136,0.6)]"
                        priority
                      />
                    </div>
                  </div>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold text-text mb-4">
                  Visual Storytelling
                </h1>
                <p className="text-xl md:text-2xl text-dim mb-6">
                  Bringing ideas to life through the lens
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
                <a
                  href="https://www.instagram.com/nas.create/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 font-medium rounded-xl transition-all duration-200 transform hover:scale-105 group"
                  style={{
                    background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-dim) 100%)',
                    color: '#0B0C0E'
                  }}
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
                  <div
                    key={label}
                    className="flex items-center gap-2 text-sm font-medium text-accent tracking-wide"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent-ghost text-accent">
                      <Icon size={16} strokeWidth={2} />
                    </span>
                    <span className="uppercase text-[0.75rem] tracking-[0.24em] text-accent opacity-80">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.7}>
              <p className="text-dim max-w-3xl mx-auto leading-relaxed">
                Specialising in cinematic storytelling, brand content, and professional photography.
                Every frame crafted with precision and creativity to capture your unique vision.
              </p>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.35}>
              <div className="max-w-3xl mx-auto text-center mt-6">
                <p className="text-dim mb-4">Seen something you like? Let’s tailor it to your brand.</p>
                <CreativeCTA source="creative_portfolio" className="justify-center" size="sm" />
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

        {/* Portfolio Section */}
        <section className="py-20 px-6 sm:px-8 bg-bg transition-colors duration-300">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-text mb-3">
                  Creative Portfolio
                </h2>
                <p className="text-dim">
                  Selected videography, photography, and case-led projects.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {filters.map((filter) => {
                  const isActive = activeFilter === filter.value;
                  const count = counts[filter.value];

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
                      {`${filter.label} (${count})`}
                    </button>
                  );
                })}
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <div>
                {/* Unified grid for videos and photo albums */}
                {(mediaItems.length > 0 || albumItems.length > 0) && (
                  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Render video items */}
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

                    {/* Render album items */}
                    {albumItems.map((item) => (
                      <motion.div
                        key={item.id}
                        className="group cursor-pointer relative overflow-hidden transition-all duration-300 hover:-translate-y-1"
                        whileHover={{ scale: 1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAlbumOpen(item)}
                      >
                        {/* Gradient overlay on hover */}
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
                              {/* Corner badge */}
                              <div className="absolute top-2 left-2 z-10">
                                <div className="px-2 py-1 rounded-md bg-gradient-to-r from-emerald-400 to-green-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg animate-pulse">
                                  Photos
                                </div>
                              </div>
                              {/* Photo count indicator */}
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="p-4 bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-full shadow-2xl group-hover:scale-110 transition-transform duration-300 flex items-center gap-2">
                                  <Camera size={24} />
                                  <span className="text-lg font-bold">{item.albumImages?.length || 0}</span>
                                </div>
                              </div>
                              {/* Hover overlay */}
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                            </>
                          )}
                        </div>

                        {/* Title and Tags */}
                        <div className="mt-3 space-y-2">
                          {item.title && (
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                              {item.title}
                            </h4>
                          )}
                          {item.tags && item.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {item.tags.slice(0, 5).map((tag) => (
                                <span
                                  key={`${item.id}-${tag}`}
                                  className="px-2.5 py-1 rounded-full text-xs font-medium border border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {caseItems.length > 0 && (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {caseItems.map((item) => (
                      <div key={item.id} className="relative w-full">
                        <button
                          onClick={() => handleCaseStudyOpen(item)}
                          className="relative w-full text-left rounded-2xl border border-subtle bg-muted hover:bg-subtle transition-colors duration-200 focus:outline-none focus:ring-2 ring-accent ring-offset-bg overflow-hidden group"
                          aria-label={`Open case study ${item.title}`}
                        >
                          {item.cover && (
                            <div className="relative aspect-video overflow-hidden">
                              <Image
                                src={item.cover}
                                alt={item.alt || item.title || "Case study thumbnail"}
                                fill
                                sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                priority={false}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            </div>
                          )}

                          <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="px-3 py-1 text-xs font-semibold rounded-full border bg-accent-ghost text-accent" style={{ borderColor: 'var(--ring)' }}>
                                Case Study
                              </span>
                              {item.date && (
                                <span className="text-xs text-accent/70 uppercase tracking-wide">
                                  {item.date}
                                </span>
                              )}
                            </div>

                            <div>
                              <h3 className="text-lg font-semibold text-text mb-2">
                                {item.title}
                              </h3>
                              {item.caseSummary && (
                                <p className="text-sm text-dim line-clamp-3">
                                  {item.caseSummary}
                                </p>
                              )}
                            </div>

                            {(item.tags && item.tags.length > 0) && (
                              <div className="flex flex-wrap gap-2">
                                {item.tags.slice(0, 5).map((tag) => (
                                  <span
                                    key={`${item.id}-${tag}`}
                                    className="px-2.5 py-1 rounded-full text-xs font-medium border bg-accent-ghost text-accent" style={{ borderColor: 'var(--ring)' }}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}

                            <div className="flex items-center gap-2 text-accent text-sm font-medium">
                              <span>View Case Study</span>
                              <ExternalLink size={16} />
                            </div>
                          </div>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>
        </section>

        <AnimatePresence>
          {isCaseModalOpen && activeCaseStudy && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleCaseStudyClose}
              />
              <motion.div
                className="fixed inset-0 z-40 flex items-center justify-center px-4 py-10"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: [0.25, 0.25, 0.25, 0.75] }}
              >
                <div
                  ref={modalRef}
                  role="dialog"
                  aria-modal="true"
                  aria-label={`${activeCaseStudy.title} case study`}
                  className="relative w-full max-w-3xl rounded-3xl border border-subtle bg-panel backdrop-blur-md text-text shadow-2xl overflow-hidden"
                >
                  <button
                    onClick={handleCaseStudyClose}
                    className="absolute top-4 right-4 p-2 rounded-full bg-muted text-text hover:text-text focus:outline-none focus:ring-2 ring-accent ring-offset-bg"
                    aria-label="Close case study modal"
                  >
                    <X size={20} />
                  </button>

                  {activeCaseStudy.src && (
                    <div className="relative aspect-video w-full overflow-hidden">
                      <Image
                        src={activeCaseStudy.src}
                        alt={activeCaseStudy.alt || `${activeCaseStudy.title} cover image`}
                        fill
                        sizes="(min-width: 1280px) 1024px, (min-width: 768px) 768px, 100vw"
                        className="object-cover"
                        priority={false}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/10" />
                    </div>
                  )}

                  <div className="p-8 space-y-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-bold text-text mb-2">
                          {activeCaseStudy.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-accent/80">
                          {activeCaseStudy.client && <span className="font-medium">Client: {activeCaseStudy.client}</span>}
                          {activeCaseStudy.role && <span>Role: {activeCaseStudy.role}</span>}
                          {activeCaseStudy.date && <span>{activeCaseStudy.date}</span>}
                        </div>
                      </div>
                    </div>

                    {activeCaseStudy.caseDescription && (
                      <p className="text-dim leading-relaxed">
                        {activeCaseStudy.caseDescription}
                      </p>
                    )}

                    {activeCaseStudy.tags && activeCaseStudy.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {activeCaseStudy.tags.slice(0, 6).map((tag) => (
                          <span
                            key={`${activeCaseStudy.id}-tag-${tag}`}
                            className="px-3 py-1 rounded-full text-xs font-medium border bg-accent-ghost text-accent" style={{ borderColor: 'var(--ring)' }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: 0.05 }}
                      className="flex justify-end"
                    >
                      <a
                        href={activeCaseStudy.slug ? `/creative/${activeCaseStudy.slug}` : "/creative"}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-[#0B0C0E] font-semibold hover:brightness-110 focus:outline-none focus:ring-2 ring-accent ring-offset-bg"
                        target="_self"
                      >
                        View Project
                        <ExternalLink size={16} />
                      </a>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

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
                transition={{ duration: 0.3, ease: [0.25, 0.25, 0.25, 0.75] }}
              >
                <div
                  ref={albumModalRef}
                  role="dialog"
                  aria-modal="true"
                  aria-label={`${activeAlbum.title} photo album`}
                  className="relative w-full max-w-7xl max-h-[90vh] rounded-3xl border border-subtle bg-panel backdrop-blur-md text-text shadow-2xl overflow-auto"
                >
                  <button
                    onClick={handleAlbumClose}
                    className="sticky top-4 right-4 float-right z-10 p-2 rounded-full bg-muted text-text hover:text-text focus:outline-none focus:ring-2 ring-accent ring-offset-bg"
                    aria-label="Close album"
                  >
                    <X size={20} />
                  </button>

                  <div className="p-8 space-y-6">
                    <div className="mb-6">
                      <h2 className="text-3xl font-bold text-text mb-2">
                        {activeAlbum.title}
                      </h2>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-accent/80 mb-4">
                        {activeAlbum.client && <span className="font-medium">Client: {activeAlbum.client}</span>}
                        {activeAlbum.role && <span>Role: {activeAlbum.role}</span>}
                        {activeAlbum.date && <span>{activeAlbum.date}</span>}
                        <span className="flex items-center gap-1">
                          <Camera size={16} />
                          {activeAlbum.albumImages.length} photos
                        </span>
                      </div>
                      {activeAlbum.description && (
                        <p className="text-dim leading-relaxed">
                          {activeAlbum.description}
                        </p>
                      )}
                      {activeAlbum.tags && activeAlbum.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {activeAlbum.tags.map((tag) => (
                            <span
                              key={`${activeAlbum.id}-tag-${tag}`}
                              className="px-3 py-1 rounded-full text-xs font-medium border bg-accent-ghost text-accent"
                              style={{ borderColor: 'var(--ring)' }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Gallery of all album images - Masonry Layout */}
                    <LightboxGallery
                      items={activeAlbum.albumImages}
                      columns={3}
                      className="columns-1 sm:columns-2 lg:columns-3 gap-4"
                      showTitles={false}
                      enableZoom={true}
                      enableDownload={false}
                      useResponsiveGrid={false}
                      adaptiveAspectRatio={true}
                    />
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Creative Services */}
        <section className="py-20 px-8 bg-bg transition-colors duration-300">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-text mb-4 transition-colors duration-300">
                  Creative Services
                </h2>
                <div className="w-24 h-1 mx-auto" style={{
                  background: 'linear-gradient(90deg, var(--accent) 0%, var(--accent-dim) 100%)'
                }}></div>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              <ScrollReveal direction="up" delay={0.2}>
                <div className="group relative overflow-hidden rounded-2xl border border-subtle bg-muted p-6 text-center transition-all duration-300 sm:p-8 hover:-translate-y-1 hover:border-[color:var(--ring)] hover:shadow-[0_18px_35px_-18px_rgba(57,255,136,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 outline-accent">
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-[color:var(--accent)]/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
                  <div className="relative flex flex-col items-center">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-panel text-accent shadow-lg ring-1 ring-white/10 transition-all duration-300 group-hover:scale-105 group-hover:bg-gradient-to-br group-hover:from-[color:var(--accent)] group-hover:to-[color:var(--accent-dim)]">
                      <Clapperboard className="h-7 w-7" strokeWidth={2.2} />
                    </div>
                    <h3 className="mb-4 text-xl font-bold text-text">
                      Videography
                    </h3>
                    <p className="mb-6 text-base text-dim">
                      Cinematic storytelling for brands, events, and personal projects with professional editing.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      <span className="rounded-full border bg-accent-ghost px-3 py-1 text-xs font-medium text-accent" style={{ borderColor: 'var(--ring)' }}>
                        Business Promos
                      </span>
                      <span className="rounded-full border bg-accent-ghost px-3 py-1 text-xs font-medium text-accent" style={{ borderColor: 'var(--ring)' }}>
                        Corporate Videos
                      </span>
                      <span className="rounded-full border bg-accent-ghost px-3 py-1 text-xs font-medium text-accent" style={{ borderColor: 'var(--ring)' }}>
                        Event Coverage
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.3}>
                <div className="group relative overflow-hidden rounded-2xl border border-subtle bg-muted p-6 text-center transition-all duration-300 sm:p-8 hover:-translate-y-1 hover:border-[color:var(--ring)] hover:shadow-[0_18px_35px_-18px_rgba(57,255,136,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 outline-accent">
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-[color:var(--accent)]/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
                  <div className="relative flex flex-col items-center">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-panel text-accent shadow-lg ring-1 ring-white/10 transition-all duration-300 group-hover:scale-105 group-hover:bg-gradient-to-br group-hover:from-[color:var(--accent)] group-hover:to-[color:var(--accent-dim)]">
                      <Camera className="h-7 w-7" strokeWidth={2.2} />
                    </div>
                    <h3 className="mb-4 text-xl font-bold text-text">
                      Photography
                    </h3>
                    <p className="mb-6 text-base text-dim">
                      Professional portraits, headshots, and creative photography with advanced retouching.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      <span className="rounded-full border bg-accent-ghost px-3 py-1 text-xs font-medium text-accent" style={{ borderColor: 'var(--ring)' }}>
                        Portraits
                      </span>
                      <span className="rounded-full border bg-accent-ghost px-3 py-1 text-xs font-medium text-accent" style={{ borderColor: 'var(--ring)' }}>
                        Headshots
                      </span>
                      <span className="rounded-full border bg-accent-ghost px-3 py-1 text-xs font-medium text-accent" style={{ borderColor: 'var(--ring)' }}>
                        Editorial
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.4}>
                <div className="group relative overflow-hidden rounded-2xl border border-subtle bg-muted p-6 text-center transition-all duration-300 sm:p-8 hover:-translate-y-1 hover:border-[color:var(--ring)] hover:shadow-[0_18px_35px_-18px_rgba(57,255,136,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 outline-accent">
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-[color:var(--accent)]/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
                  <div className="relative flex flex-col items-center">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-panel text-accent shadow-lg ring-1 ring-white/10 transition-all duration-300 group-hover:scale-105 group-hover:bg-gradient-to-br group-hover:from-[color:var(--accent)] group-hover:to-[color:var(--accent-dim)]">
                      <Palette className="h-7 w-7" strokeWidth={2.2} />
                    </div>
                    <h3 className="mb-4 text-xl font-bold text-text">
                      Post-Production
                    </h3>
                    <p className="mb-6 text-base text-dim">
                      Professional editing, color grading, and post-processing to bring your vision to life.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      <span className="rounded-full border bg-accent-ghost px-3 py-1 text-xs font-medium text-accent" style={{ borderColor: 'var(--ring)' }}>
                        Color Grading
                      </span>
                      <span className="rounded-full border bg-accent-ghost px-3 py-1 text-xs font-medium text-accent" style={{ borderColor: 'var(--ring)' }}>
                        Editing
                      </span>
                      <span className="rounded-full border bg-accent-ghost px-3 py-1 text-xs font-medium text-accent" style={{ borderColor: 'var(--ring)' }}>
                        Retouching
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 px-8 bg-panel transition-colors duration-300">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal direction="up" delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold text-text mb-6 transition-colors duration-300">
                Ready to Create Something Amazing?
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <p className="text-lg text-dim mb-8 transition-colors duration-300">
                Whether it’s a brand film, product promo, or event coverage, I can help plan, shoot, and deliver polished visuals.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.5}>
              <CreativeCTA source="creative_footer" className="justify-center" />
            </ScrollReveal>
          </div>
        </section>

        {/* Optional desktop-only sticky/fab CTAs */}
        <DesktopCtas />
      </div>

      {/* Commented out until real projects are ready */}
      {/* <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      /> */}
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
      <div
        className={`hidden md:block fixed left-1/2 z-40 -translate-x-1/2 transition-all duration-200 ${show ? "bottom-6 opacity-100" : "bottom-3 opacity-0 pointer-events-none"}`}
        aria-hidden={!show}
      >
        <div className="rounded-3xl border border-gray-200/40 bg-gray-900/80 px-4 py-3 backdrop-blur-md shadow-xl dark:border-white/10">
          <CreativeCTA source="creative_sticky" className="items-center" size="sm" />
        </div>
      </div>

      <div
        className={`hidden md:block fixed right-6 z-40 transition-all duration-200 ${showFab ? "bottom-24 opacity-100" : "bottom-20 opacity-0 pointer-events-none"}`}
        aria-hidden={!showFab}
      >
        <Link
          href="/contact?src=creative_fab#whatsapp"
          aria-label="Open WhatsApp contact"
          className="rounded-full bg-emerald-500/90 text-white px-5 py-3 font-semibold shadow-lg hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200"
          data-cta="creative_fab_whatsapp"
          onClick={(e) => {
            const target = e.currentTarget as HTMLAnchorElement;
            trackCta("creative_fab_whatsapp", { href: target.href });
          }}
        >
          WhatsApp Chat
        </Link>
      </div>
    </>
  );
}
