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
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState, useCallback, useEffect, useRef } from "react";

const HERO_BACKGROUND = "/images/bokeh-lights-dark-background.jpg";

const skillHighlights = [
  { label: "Videography", icon: Clapperboard },
  { label: "Photography", icon: Camera },
  { label: "Color Grading", icon: Palette },
  { label: "Post-Production", icon: Sparkles }
];

type PortfolioKind = "video" | "photo" | "case";

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
}

// Starter media: replace the src with your YouTube/Vimeo link
const featuredMedia: MediaItem[] = [
  {
    id: "featured-1",
    type: "video",
    // Replace with your video link (YouTube/Vimeo/native mp4)
    src: "https://youtu.be/lQ5mOoEOoqo",
    // Local placeholder thumbnail is auto-applied if not provided
    title: "Featured: Brand Film",
    alt: "Featured brand film video",
    description: "A cinematic brand piece demonstrating storytelling, pacing, and colour grading."
  }
];

const portfolioItems: PortfolioItem[] = [
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
    description: "A storytelling-first brand film highlighting craft and attention to detail."
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
    description: "High-energy launch spot capturing the spirit of Pulse Studio's new flagship gym."
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
  // {
  //   id: "portfolio-wedding",
  //   type: "image",
  //   kind: "photo",
  //   src: "https://images.unsplash.com/photo-1520854221050-0f4caff449fb?auto=format&fit=crop&w=1600&q=80",
  //   thumbnail: "https://images.unsplash.com/photo-1520854221050-0f4caff449fb?auto=format&fit=crop&w=600&q=80",
  //   title: "Evening Wedding Story",
  //   alt: "Wedding couple dancing during evening reception",
  //   tags: ["Wedding", "Storytelling", "Low Light"],
  //   description: "A single frame capturing the energy and intimacy of a Toronto celebration."
  // },
  // {
  //   id: "portfolio-headshots",
  //   type: "image",
  //   kind: "photo",
  //   src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1600&q=80",
  //   thumbnail: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
  //   title: "Founder Headshots",
  //   alt: "Collection of modern founder headshots",
  //   tags: ["Headshots", "Corporate", "Studio"],
  //   description: "Studio headshot set with refined lighting and retouch for leadership team."
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
        acc[kind] = (acc[kind] || 0) + 1;
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
      return kind === activeFilter;
    });
  }, [activeFilter]);

  const mediaItems = useMemo(() => {
    return filteredItems.filter((item) => {
      const kind = item.kind || (item.type === "image" ? "photo" : "video");
      return kind !== "case";
    });
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

  const modalRef = useRef<HTMLDivElement>(null);

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
      {/* Custom styles for Nas.Create brand colors */}
      <style jsx global>{`
        .nas-create-page {
          --nas-primary: #01FF70;
          --nas-secondary: #3D6A4B;
          --nas-accent: #196050;
          --nas-background: #1F1F1F;
          --nas-text-light: #FFFFFF;
          --nas-text-muted: #B0B0B0;
        }
      `}</style>

      <div className="nas-create-page min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Nas.Create Branded Header */}
        <section className="py-20 px-6 sm:px-8 relative overflow-hidden bg-[#1F1F1F]">
          <Image
            src={HERO_BACKGROUND}
            alt="Warm bokeh lights out of focus"
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 object-cover object-center scale-105 blur-[18px] brightness-[0.45]"
          />

          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(1,255,112,0.16)_0%,rgba(31,31,31,0.92)_58%,rgba(3,7,18,0.95)_100%)]"
          />

          <div className="absolute inset-0 opacity-[0.09]">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2301FF70' fill-opacity='0.2'%3E%3Ccircle cx='7' cy='7' r='7'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="max-w-6xl mx-auto text-center relative z-10 px-2 sm:px-0">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="flex flex-col items-center mb-8">
                {/* Nas.Create Logo */}
                <div className="flex items-center justify-center mb-6">
                  <div className="relative group">
                    <div className="w-32 h-20 md:w-48 md:h-32 flex items-center justify-center hover:scale-105 transform duration-200 transition-transform">
                      <Image
                        src="/logos/nas.create-logo.svg"
                        alt="Nas.Create Logo"
                        width={192}
                        height={128}
                        className="w-full h-full object-contain"
                        priority
                      />
                    </div>
                  </div>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                  Visual Storytelling
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-6">
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
                    background: 'linear-gradient(135deg, #01FF70 0%, #3D6A4B 100%)',
                    color: '#1F1F1F'
                  }}
                >
                  <Instagram size={20} />
                  <span>@nas.create</span>
                  <ExternalLink size={16} className="opacity-70 group-hover:opacity-100" />
                </a>

                <div className="flex items-center gap-2" style={{ color: '#01FF70' }}>
                  <div className="w-2 h-2 rounded-full animate-pulse bg-green-400"></div>
                  <span className="text-sm font-medium">Available for Projects</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.5}>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {skillHighlights.map(({ label, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 text-sm font-medium text-emerald-200/90 tracking-wide"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-300">
                      <Icon size={16} strokeWidth={2} />
                    </span>
                    <span className="uppercase text-[0.75rem] tracking-[0.24em] text-emerald-100/80">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.7}>
              <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Specialising in cinematic storytelling, brand content, and professional photography.
                Every frame crafted with precision and creativity to capture your unique vision.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Featured Work */}
        <section className="py-20 px-8 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">Featured Work</h2>
                <p className="text-gray-600 dark:text-gray-300">A quick look at recent creative work.</p>
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
        <section className="py-20 px-6 sm:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                  Creative Portfolio
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
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
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500/70 focus:ring-offset-gray-900 ${
                        isActive
                          ? "bg-emerald-500/90 text-gray-900 border-emerald-400"
                          : "bg-gray-900/40 text-emerald-300 border-emerald-500/40 hover:bg-gray-900/60"
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
              <div className="space-y-12">
                {mediaItems.length > 0 && (
                  <LightboxGallery
                    items={mediaItems}
                    columns={3}
                    className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    showTitles={true}
                    enableDownload={false}
                    enableZoom={false}
                    useResponsiveGrid
                  />
                )}

                {caseItems.length > 0 && (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {caseItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleCaseStudyOpen(item)}
                        className="relative w-full text-left rounded-2xl border border-emerald-500/20 bg-gray-900/40 hover:bg-gray-900/60 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-gray-900 overflow-hidden group"
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
                            <span className="px-3 py-1 text-xs font-semibold rounded-full border border-emerald-500/40 text-emerald-300 bg-emerald-500/10">
                              Case Study
                            </span>
                            {item.date && (
                              <span className="text-xs text-emerald-200/70 uppercase tracking-wide">
                                {item.date}
                              </span>
                            )}
                          </div>

                          <div>
                            <h3 className="text-lg font-semibold text-white mb-2">
                              {item.title}
                            </h3>
                            {item.caseSummary && (
                              <p className="text-sm text-gray-300 line-clamp-3">
                                {item.caseSummary}
                              </p>
                            )}
                          </div>

                          {(item.tags && item.tags.length > 0) && (
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

                          <div className="flex items-center gap-2 text-emerald-300 text-sm font-medium">
                            <span>View Case Study</span>
                            <ExternalLink size={16} />
                          </div>
                        </div>
                      </button>
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
                  className="relative w-full max-w-3xl rounded-3xl border border-emerald-500/20 bg-gray-900/90 backdrop-blur-md text-white shadow-2xl overflow-hidden"
                >
                  <button
                    onClick={handleCaseStudyClose}
                    className="absolute top-4 right-4 p-2 rounded-full bg-gray-900/70 text-emerald-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
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
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {activeCaseStudy.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-emerald-200/80">
                          {activeCaseStudy.client && <span className="font-medium">Client: {activeCaseStudy.client}</span>}
                          {activeCaseStudy.role && <span>Role: {activeCaseStudy.role}</span>}
                          {activeCaseStudy.date && <span>{activeCaseStudy.date}</span>}
                        </div>
                      </div>
                    </div>

                    {activeCaseStudy.caseDescription && (
                      <p className="text-gray-200 leading-relaxed">
                        {activeCaseStudy.caseDescription}
                      </p>
                    )}

                    {activeCaseStudy.tags && activeCaseStudy.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {activeCaseStudy.tags.slice(0, 6).map((tag) => (
                          <span
                            key={`${activeCaseStudy.id}-tag-${tag}`}
                            className="px-3 py-1 rounded-full text-xs font-medium border border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
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
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500 text-gray-900 font-semibold hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
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

        {/* Creative Services */}
        <section className="py-20 px-8 bg-white dark:bg-gray-900 transition-colors duration-300">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                  Creative Services
                </h2>
                <div className="w-24 h-1 mx-auto" style={{
                  background: 'linear-gradient(90deg, #01FF70 0%, #196050 100%)'
                }}></div>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              <ScrollReveal direction="up" delay={0.2}>
                <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gray-900/40 p-6 text-center transition-all duration-300 sm:p-8 hover:-translate-y-1 hover:border-emerald-400/60 hover:shadow-[0_18px_35px_-18px_rgba(16,185,129,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400">
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
                  <div className="relative flex flex-col items-center">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-900 text-white shadow-lg ring-1 ring-white/10 transition-all duration-300 group-hover:scale-105 group-hover:bg-gradient-to-br group-hover:from-emerald-400 group-hover:to-emerald-600">
                      🎬
                    </div>
                    <h3 className="mb-4 text-xl font-bold text-gray-100">
                      Videography
                    </h3>
                    <p className="mb-6 text-base text-gray-400">
                      Cinematic storytelling for brands, events, and personal projects with professional editing.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200">
                        Wedding Films
                      </span>
                      <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200">
                        Corporate Videos
                      </span>
                      <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200">
                        Event Coverage
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.3}>
                <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gray-900/40 p-6 text-center transition-all duration-300 sm:p-8 hover:-translate-y-1 hover:border-emerald-400/60 hover:shadow-[0_18px_35px_-18px_rgba(16,185,129,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400">
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-400/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
                  <div className="relative flex flex-col items-center">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-900 text-white shadow-lg ring-1 ring-white/10 transition-all duration-300 group-hover:scale-105 group-hover:bg-gradient-to-br group-hover:from-emerald-400 group-hover:to-emerald-600">
                      📸
                    </div>
                    <h3 className="mb-4 text-xl font-bold text-gray-100">
                      Photography
                    </h3>
                    <p className="mb-6 text-base text-gray-400">
                      Professional portraits, headshots, and creative photography with advanced retouching.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200">
                        Portraits
                      </span>
                      <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200">
                        Headshots
                      </span>
                      <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200">
                        Editorial
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.4}>
                <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gray-900/40 p-6 text-center transition-all duration-300 sm:p-8 hover:-translate-y-1 hover:border-emerald-400/60 hover:shadow-[0_18px_35px_-18px_rgba(16,185,129,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400">
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
                  <div className="relative flex flex-col items-center">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-900 text-white shadow-lg ring-1 ring-white/10 transition-all duration-300 group-hover:scale-105 group-hover:bg-gradient-to-br group-hover:from-emerald-400 group-hover:to-emerald-600">
                      🎨
                    </div>
                    <h3 className="mb-4 text-xl font-bold text-gray-100">
                      Post-Production
                    </h3>
                    <p className="mb-6 text-base text-gray-400">
                      Professional editing, color grading, and post-processing to bring your vision to life.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200">
                        Color Grading
                      </span>
                      <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200">
                        Editing
                      </span>
                      <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200">
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
        <section className="py-20 px-8 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal direction="up" delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
                Ready to Create Something Amazing?
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 transition-colors duration-300">
                                  Whether it&apos;s capturing your special moments or creating compelling brand content,
                I&apos;m here to help tell your story through stunning visuals.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.5}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="px-8 py-4 font-medium rounded-xl transition-all duration-200 transform hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #01FF70 0%, #3D6A4B 100%)',
                    color: '#1F1F1F'
                  }}
                >
                  Start Your Project
                </a>
                <a
                  href="https://www.instagram.com/nas.create/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 border font-medium rounded-xl transition-all duration-200 flex items-center gap-2 justify-center hover:bg-gray-800"
                  style={{
                    borderColor: '#3D6A4B',
                    color: '#01FF70'
                  }}
                >
                  <Instagram size={18} />
                  Follow on Instagram
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>
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
