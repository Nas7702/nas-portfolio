"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import PageTransition from "../components/PageTransition";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Camera, Instagram, ExternalLink, X } from "lucide-react";
import CreativeCTA from "../components/CreativeCTA";
import CineSectionTitle from "../components/CineSectionTitle";
import VelocitySkew from "../components/VelocitySkew";
import TestimonialMarquee from "../components/TestimonialMarquee";
import type { MediaItem } from "../components/LightboxGallery";
import ScrollReveal from "../components/ScrollReveal";
import Link from "next/link";
import { trackCta } from "../../lib/analytics";
import LoadingSkeleton from "../components/LoadingSkeleton";

function toSlug(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

// Dynamic imports for heavy components
const LightboxGallery = dynamic(() => import("../components/LightboxGallery"), {
  loading: () => <LoadingSkeleton variant="gallery" count={3} />,
});

const Testimonials = dynamic(() => import("../components/Testimonials"), {
  loading: () => <LoadingSkeleton variant="card" count={2} />,
});

const CreativeBokehShaderScene = dynamic(
  () =>
    import("../components/CreativeBokehShaderScene").then(
      (module) => module.CreativeBokehShaderScene
    ),
  { ssr: false }
);
// Force rebuild for logo update

// Extended type for Portfolio items
type PortfolioKind = "video" | "photo" | "case" | "album";

interface PortfolioItem extends MediaItem {
  kind?: PortfolioKind;
  tags?: string[];
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
    const IDLE_AFTER_MS = 850;
    const bgTarget = { x: 0, y: 0, rotate: 0 };
    const bgCurrent = { x: 0, y: 0, rotate: 0 };
    let rafId: number | null = null;
    let lastPointer = { x: 0, y: 0, has: false };
    let isInView = true;
    let lastActivityAt = performance.now();

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

    const stopLoop = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const startLoop = () => {
      if (!isInView || rafId !== null) return;
      rafId = requestAnimationFrame(tick);
    };

    const markActive = () => {
      lastActivityAt = performance.now();
      startLoop();
    };

    const tick = () => {
      const bgEl = bgRef.current;
      if (!bgEl || !isInView) {
        stopLoop();
        return;
      }

      bgCurrent.x += (bgTarget.x - bgCurrent.x) * 0.2;
      bgCurrent.y += (bgTarget.y - bgCurrent.y) * 0.2;
      bgCurrent.rotate += (bgTarget.rotate - bgCurrent.rotate) * 0.12;

      const clampedX = clamp(bgCurrent.x, -BG_MAX_X, BG_MAX_X);
      const clampedY = clamp(bgCurrent.y, -BG_MAX_Y, BG_MAX_Y);
      const clampedRotate = clamp(bgCurrent.rotate, -BG_MAX_ROTATE, BG_MAX_ROTATE);
      bgEl.style.transform = `translate3d(${clampedX}px, ${clampedY}px, 0) rotate(${clampedRotate}deg) scale(${BG_SCALE})`;

      const idle = performance.now() - lastActivityAt > IDLE_AFTER_MS;
      const settled =
        Math.abs(bgTarget.x - bgCurrent.x) < 0.35 &&
        Math.abs(bgTarget.y - bgCurrent.y) < 0.35 &&
        Math.abs(bgTarget.rotate - bgCurrent.rotate) < 0.03;

      if (idle && settled) {
        stopLoop();
        return;
      }

      rafId = requestAnimationFrame(tick);
    };

    const onPointerMove = (e: PointerEvent) => {
      lastPointer = { x: e.clientX, y: e.clientY, has: true };
      computeTargets();
      markActive();
    };

    const onScrollOrResize = () => {
      computeTargets();
      markActive();
    };

    const sectionEl = sectionRef.current;
    let observer: IntersectionObserver | null = null;
    if (sectionEl && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        ([entry]) => {
          isInView = entry.isIntersecting;
          if (isInView) {
            computeTargets();
            markActive();
          } else {
            stopLoop();
          }
        },
        { threshold: 0.01, rootMargin: "160px 0px" }
      );
      observer.observe(sectionEl);
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    computeTargets();
    markActive();

    return () => {
      stopLoop();
      observer?.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [prefersReduced, sectionRef, bgRef]);
}

// Starter media for Featured Work
const featuredMedia: MediaItem[] = [
  {
    id: "featured-1",
    type: "video",
    src: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/ADJ_Meadowhead.mp4",
    thumbnail: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/thumbnail/sq_adj_meadowhead_thumbnail.webp",
    title: "Commercial Resurfacing, Morrisons Meadowhead",
    alt: "ADJ Surfacing Morrisons Meadowhead completion film",
    client: "ADJ Surfacing & Consultancy Ltd",
    outcome: "ADJ's best-performing industrial film to date, already generating inbound enquiries.",
    description: "Start-to-finish completion film for ADJ Surfacing's Morrisons Meadowhead car park resurfacing in Sheffield, tracking the job from golden-hour prep through an overnight graft to the finished reveal. Drone, camera and GoPro BTS coverage combine with a same-waypoint drone timelapse device for the widest range of any ADJ film to date, already the best-performing industrial piece and generating inbound enquiries."
  }
];

const portfolioItems: PortfolioItem[] = [
  {
    id: "ADJ Meadowhead",
    type: "video",
    kind: "video",
    src: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/ADJ_Meadowhead.mp4",
    thumbnail: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/thumbnail/sq_adj_meadowhead_thumbnail.webp",
    cover: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/thumbnail/sq_adj_meadowhead_thumbnail.webp",
    title: "ADJ: Meadowhead",
    alt: "ADJ Surfacing Morrisons Meadowhead completion film thumbnail",
    tags: ["Commercial", "Drone", "Corporate Film", "Night Works", "Cinematic"],
    client: "ADJ Surfacing & Consultancy Ltd",
    outcome: "ADJ's best-performing industrial film to date, already generating inbound enquiries.",
    role: "Director, DP & Editor",
    date: "2026",
    description: "Completion film for ADJ Surfacing's Morrisons Meadowhead car park resurfacing project in Sheffield, covering the full start-to-finish arc: golden-hour daytime prep, an overnight graft, and the finished reveal. Drone, camera and GoPro BTS footage combine with a same-waypoint drone timelapse device, giving the widest range of any ADJ piece to date. ADJ's best-performing industrial film so far, already generating inbound enquiries.",
  },
  {
    id: "ADJ Aintree",
    type: "video",
    kind: "video",
    src: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/ADJ_Aintree.mp4",
    thumbnail: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/thumbnail/sq_adj_aintree_thumbnail.webp",
    cover: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/thumbnail/sq_adj_aintree_thumbnail.webp",
    title: "ADJ: Aintree",
    alt: "ADJ Surfacing Aintree completion film thumbnail",
    tags: ["Commercial", "Drone", "Corporate Film", "Cinematic"],
    client: "ADJ Surfacing & Consultancy Ltd",
    role: "Director, DP & Editor",
    date: "2025",
    description: "Completion film for ADJ Surfacing's Aintree project. Cinematic drone footage and motion graphic overlays turn the technical scope of works into a polished client-facing asset for pitches and LinkedIn.",
  },
  {
    id: "Property Social Reel",
    type: "video",
    kind: "video",
    src: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/property2.mp4",
    thumbnail: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/thumbnail/sq_prop2_thumbnail.webp",
    title: "Property Social Reel",
    alt: "Vertical social media property reel thumbnail",
    tags: ["Real Estate", "Social", "Vertical", "Property"],
    client: "Estate Agent",
    role: "Director, DP & Editor",
    date: "2025",
    cover: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/thumbnail/sq_prop2_thumbnail.webp",
    description: "Social-first property reel built to stand out from average local listing videos. The premium treatment sells the property quicker, positions the agent as the obvious premium choice in their area, and attracts higher-end vendors who reward that quality with better instructions.",
    isVertical: true,
  },
  {
    id: "Talking Property Showcase",
    type: "video",
    kind: "video",
    src: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/Talking%20Property%20Showcase.mp4",
    thumbnail: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/thumbnail/sq_talking_property_thumbnail.webp",
    cover: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/thumbnail/sq_talking_property_thumbnail.webp",
    title: "Talking Property Showcase",
    alt: "Presenter-led property showcase video thumbnail",
    tags: ["Real Estate", "Presenter-Led", "Vertical", "Property"],
    client: "Link Agency",
    role: "Director, DP & Editor",
    date: "2026",
    description: "Presenter-led property showcase for Link Agency, pairing the agent talking to camera with drone aerials and interior coverage of a detached home in Barmby. The talking format puts the agent front and centre, building trust with vendors while giving buyers a proper feel for the property before they ever book a viewing.",
    isVertical: true,
  },
  {
    id: "Sheffield Food Festival 2026",
    type: "video",
    kind: "video",
    src: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/Sheff_Food_Fest2026.mov",
    thumbnail: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/thumbnail/sq_sheff_food_fest_thumbnail.webp",
    cover: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/thumbnail/sq_sheff_food_fest_thumbnail.webp",
    title: "Sheffield Food Festival 2026",
    alt: "Sheffield Food Festival 2026 event recap reel thumbnail",
    tags: ["Events", "Social", "Vertical", "Food"],
    client: "Sheffield Food Festival",
    outcome: "Delivered within 12 hours; 87.5% of reach came from beyond existing followers.",
    role: "Director, DP & Editor",
    date: "2026",
    description: "Event recap reel for the 15th Sheffield Food Festival. Filmed on day one and delivered within 12 hours to drive footfall across the rest of the bank holiday weekend. 87.5% of accounts reached and 83.5% of engagement came from outside the existing follower base, putting the festival in front of new audiences.",
    isVertical: true,
  },
  {
    id: "ADJ Enfield Night Works",
    type: "video",
    kind: "video",
    src: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/Night_works.mp4",
    thumbnail: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/thumbnail/sq_adj_enfield_night_works_thumbnail.webp",
    cover: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/thumbnail/sq_adj_enfield_night_works_thumbnail.webp",
    title: "ADJ: Enfield Night Works",
    alt: "ADJ Surfacing Enfield night works reel thumbnail",
    tags: ["Commercial", "Corporate Film", "Night Works", "Cinematic"],
    client: "ADJ Surfacing & Consultancy Ltd",
    role: "Director, DP & Editor",
    date: "2026",
    description: "Night-works reel for ADJ Surfacing, captured on a live out-of-hours resurfacing job on a retail site in Enfield, North London. Crew, plant and surface course laying shot during a single overnight shift. Built to show ADJ's out-of-hours capability to prospective clients and running as part of the ongoing LinkedIn series.",
  },
  {
    id: "Audi RS6",
    type: "video",
    kind: "video",
    src: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/RS6.mov",
    thumbnail: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/thumbnail/sq_rs6_thumbnail.webp",
    cover: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/thumbnail/sq_rs6_thumbnail.webp",
    title: "Audi RS6",
    alt: "Audi RS6 cinematic automotive film thumbnail",
    tags: ["Automotive", "Cinematic", "Cars"],
    client: "Personal",
    role: "Director, DP & Editor",
    date: "2026",
    description: "Cinematic automotive piece on the Audi RS6. Shot and graded to feel like a manufacturer film.",
  },
  {
    id: "Property Showcase",
    type: "video",
    kind: "video",
    src: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/property1.mov",
    thumbnail: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/thumbnail/sq_prop1_thumbnail.webp",
    title: "Property Showcase",
    alt: "Cinematic property video thumbnail",
    tags: ["Real Estate", "Cinematic", "Property"],
    client: "Estate Agent",
    role: "Director, DP & Editor",
    date: "2025",
    cover: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/thumbnail/sq_prop1_thumbnail.webp",
    description: "Cinematic property film for a real estate agent. Designed to attract buyers and win sellers, shot and edited to a premium standard that elevates listings on Rightmove, Zoopla and social.",
  },
  {
    id: "Paint Correction Detail",
    type: "video",
    kind: "video",
    src: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/Detailing1.mov",
    thumbnail: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/thumbnail/sq_detailing1_thumbnail.webp",
    cover: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/thumbnail/sq_detailing1_thumbnail.webp",
    title: "Paint Correction Detail",
    alt: "Cinematic car detailing video thumbnail",
    tags: ["Automotive", "Detailing", "Cinematic"],
    client: "Detailing Studio",
    role: "Director, DP & Editor",
    date: "2025",
    description: "Cinematic look at a paint correction job. Follows the machine polisher cutting compound into the clear coat, a paint depth gauge reading thickness on the panel, and the deep, mirror-like finish revealed after.",
  },
  {
    id: "The JMC",
    type: "video",
    kind: "video",
    src: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/theJMC.mp4",
    thumbnail: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/thumbnail/sq_theJMC_thumbnail.webp",
    cover: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/thumbnail/sq_theJMC_thumbnail.webp",
    title: "The JMC",
    alt: "The JMC brand film thumbnail",
    tags: ["Brand Film", "Cinematic", "Promo"],
    client: "The JMC",
    role: "Director, DP & Editor",
    date: "2025",
    description: "Brand film for JMC, a creative director working with leading YouTubers. Produced to capture his creative identity and attract high-profile creator clients.",
  },
  {
    id: "ADJ St Helens Retail Park",
    type: "video",
    kind: "video",
    src: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/ADJ_St_Helens.mp4",
    thumbnail: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/thumbnail/sq_adj_st_helens.webp",
    cover: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/thumbnail/sq_adj_st_helens.webp",
    title: "ADJ: St Helens",
    alt: "ADJ Surfacing St Helens completion film thumbnail",
    tags: ["Commercial", "Drone", "Corporate Film", "Cinematic"],
    client: "ADJ Surfacing & Consultancy Ltd",
    outcome: "Reached senior industry figures within days of posting.",
    role: "Director, DP & Editor",
    date: "2025",
    description: "Completion film for ADJ Surfacing's St Helens Retail Park project. 5,000m² of commercial resurfacing documented at sunrise before the site opened. Cinematic drone footage, motion graphics overlaying scope of works, and golden-hour framing turned a technical deliverable into a LinkedIn asset that reached senior industry figures within days of posting.",
  },
  {
    id: "Kyle Allen Physique Coaching",
    type: "video",
    kind: "video",
    src: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/final.mov",
    thumbnail: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/thumbnail/sq_K1_thumbnail.webp",
    title: "Kyle Allen Physique Coaching Reel",
    alt: "Kyle Allen coaching promo reel thumbnail",
    tags: ["Fitness", "Promo", "Story Reel"],
    client: "Kyle Allen Coaching",
    outcome: "Became the client's most viewed post.",
    role: "Director, DP & Editor",
    date: "2025",
    cover: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/thumbnail/sq_K1_thumbnail.webp",
    description: "Story-led Instagram reel for Kyle Allen's online coaching business. Opens with his transformation narrative, closes with a DM call-to-action.",
    isVertical: true
  },
  {
    id: "Sheffield Varsity Basketball",
    type: "video",
    kind: "video",
    src: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/shef_varsity_bb.mp4_compressed.mov",
    thumbnail: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/thumbnail/sq_varsity_bb_thumbnail.webp",
    title: "Sheffield Varsity Basketball",
    alt: "Sheffield Varsity Basketball thumbnail",
    tags: ["Sport", "Cinematic", "Highlight"],
    client: "University of Sheffield",
    outcome: "Shot, edited and delivered the next day.",
    role: "DP & Editor",
    date: "2025",
    cover: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/thumbnail/sq_varsity_bb_thumbnail.webp",
    description: "Event highlight reel for Sheffield Varsity Basketball. Shot, edited and delivered the next day."
  },
  {
    id: "Sheffield Varsity Powerlifting",
    type: "video",
    kind: "video",
    src: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/shf_varsity_pl_compressed.mp4",
    thumbnail: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/thumbnail/sq_varsity_pl_thumbnail.webp",
    title: "Sheffield Varsity Powerlifting",
    alt: "Sheffield Varsity Powerlifting thumbnail",
    tags: ["Sport", "Cinematic", "Highlight"],
    client: "University of Sheffield",
    role: "Director, Editor",
    date: "2025",
    cover: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/thumbnail/sq_varsity_pl_thumbnail.webp",
    description: "Highlight reel for Sheffield Varsity Powerlifting. Covered the full event as sole videographer and editor."
  },
  {
    id: "Stance Fitness Promo",
    type: "video",
    kind: "video",
    src: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/stance.mp4",
    thumbnail: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/thumbnail/sq_stance_thumbnail.webp",
    title: "Stance Fitness Promo",
    alt: "Stance Fitness Promo thumbnail",
    tags: ["Brand Film", "Cinematic", "Color Grading"],
    client: "Stance Fitness",
    role: "Director & Editor",
    date: "2024",
    cover: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/thumbnail/sq_stance_thumbnail.webp",
    description: "Brand film and ongoing content partnership for a fitness studio. Covers reels, ads and website content."
  },
  {
    id: "Vizual Mods Promo",
    type: "video",
    kind: "video",
    src: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/vm_urus.mov",
    thumbnail: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/thumbnail/sq_vm_urus_thumnail.webp",
    title: "Vizual Mods Promo",
    alt: "Vizual Mods Promo thumbnail",
    tags: ["Automotive", "Promo", "Motion"],
    client: "Vizual Mods",
    role: "Director, Editor",
    date: "2024",
    cover: "https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/thumbnail/sq_vm_urus_thumnail.webp",
    description: "Meta ad for a vehicle wrap and car modification garage. Shot to build local trust and drive enquiries.",
    isVertical: true
  },
  // PHOTO ALBUM - Fitness
  {
    id: "fitness-portfolio",
    type: "image",
    kind: "album",
    cover: "/images/portfolio/sheffield-powerlifting/fitness/DSC02758.jpg",
    src: "/images/portfolio/sheffield-powerlifting/fitness/DSC02758.jpg",
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
        src: "/images/portfolio/sheffield-powerlifting/fitness/DSC02872.jpg",
        alt: "Fitness photography",
      },
      {
        id: "fitness-2",
        type: "image",
        src: "/images/portfolio/sheffield-powerlifting/fitness/DSC02902.jpg",
        alt: "Fitness photography",
      },
      {
        id: "fitness-3",
        type: "image",
        src: "/images/portfolio/sheffield-powerlifting/fitness/DSC02948.jpg",
        alt: "Fitness photography",
      },
      {
        id: "fitness-4",
        type: "image",
        src: "/images/portfolio/sheffield-powerlifting/fitness/DSC02984.jpg",
        alt: "Fitness photography",
      },
      {
        id: "fitness-5",
        type: "image",
        src: "/images/portfolio/sheffield-powerlifting/fitness/DSC00947.jpg",
        alt: "Fitness photography",
      },
      {
        id: "fitness-6",
        type: "image",
        src: "/images/portfolio/sheffield-powerlifting/fitness/DSC00944.jpg",
        alt: "Fitness photography",
      },
      {
        id: "fitness-7",
        type: "image",
        src: "/images/portfolio/sheffield-powerlifting/fitness/DSC00917.jpg",
        alt: "Fitness photography",
      },
      {
        id: "fitness-8",
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
    client: "Vizual Mods",
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
        src: "/images/Automotive/DSC09689-Enhanced-NR-Edit.jpg",
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

type VideoSubFilter = "all" | "short-form";

export default function CreativePage() {
  const [activeFilter, setActiveFilter] = useState<PortfolioKind | "all">("all");
  const [videoSubFilter, setVideoSubFilter] = useState<VideoSubFilter>("all");
  // const [isCaseModalOpen, setIsCaseModalOpen] = useState(false);
  // const [activeCaseStudy, setActiveCaseStudy] = useState<PortfolioItem | null>(null);
  const [isAlbumModalOpen, setIsAlbumModalOpen] = useState(false);
  const [activeAlbum, setActiveAlbum] = useState<PortfolioItem | null>(null);
  const [isScrollCueHidden, setIsScrollCueHidden] = useState(false);
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const heroBgRef = useRef<HTMLDivElement | null>(null);
  const scrollCueRef = useRef<HTMLAnchorElement | null>(null);

  useHeroParallax(heroSectionRef, heroBgRef);

  const filters: { label: string; value: PortfolioKind | "all" }[] = [
    { label: "All", value: "all" },
    { label: "Video", value: "video" },
    { label: "Photo", value: "photo" },
  ];

  const videoSubFilters: { label: string; value: VideoSubFilter }[] = [
    { label: "All", value: "all" },
    { label: "Short Form", value: "short-form" },
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

  const videoSubCounts = useMemo(() => {
    const videos = portfolioItems.filter(
      (item) => (item.kind || (item.type === "image" ? "photo" : "video")) === "video"
    );
    return {
      all: videos.length,
      "short-form": videos.filter((item) => item.isVertical).length,
    } as Record<VideoSubFilter, number>;
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
      if (kind !== activeFilter) {
        return false;
      }
      if (activeFilter === "video" && videoSubFilter === "short-form") {
        return Boolean(item.isVertical);
      }
      return true;
    });
  }, [activeFilter, videoSubFilter]);

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
    setVideoSubFilter("all");
    if (window.location.hash === "#short-form") {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  // Shareable URL: /create#short-form deep-links to the short form video subsection
  const handleVideoSubFilterClick = useCallback((value: VideoSubFilter) => {
    setVideoSubFilter(value);
    window.history.replaceState(
      null,
      "",
      value === "short-form" ? "#short-form" : window.location.pathname
    );
  }, []);

  // Hash-based deep-linking: /create#the-jmc opens that item's lightbox or album modal
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    // Short form subsection deep-link
    if (hash === "short-form") {
      setActiveFilter("video");
      setVideoSubFilter("short-form");
      const timer = setTimeout(() => {
        document.getElementById("creative-portfolio")?.scrollIntoView({ behavior: "smooth" });
      }, 400);
      return () => clearTimeout(timer);
    }

    // Check albums first
    const albumMatch = portfolioItems.find(
      (item) => item.kind === "album" && toSlug(item.id) === hash
    );
    if (albumMatch) {
      setActiveFilter("all");
      const timer = setTimeout(() => {
        setActiveAlbum(albumMatch);
        setIsAlbumModalOpen(true);
      }, 400);
      return () => clearTimeout(timer);
    }

    // Then check regular media items
    const allMedia = portfolioItems.filter((item) => {
      const kind = item.kind || (item.type === "image" ? "photo" : "video");
      return kind !== "case" && kind !== "album";
    });
    const match = allMedia.find((item) => toSlug(item.id) === hash);
    if (!match) return;
    setActiveFilter("all");
    const timer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent("open-lightbox-item", { detail: { itemId: match.id } }));
    }, 400);
    return () => clearTimeout(timer);
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
    window.history.replaceState(null, "", "#" + toSlug(item.id));
  }, []);

  const handleAlbumClose = useCallback(() => {
    setIsAlbumModalOpen(false);
    window.history.replaceState(null, "", window.location.pathname);
  }, []);

  useEffect(() => {
    let rafId: number | null = null;

    const updateScrollCueState = () => {
      const cue = scrollCueRef.current;
      if (!cue) return;

      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const rect = cue.getBoundingClientRect();
      const cueMidpoint = rect.top + (rect.height / 2);
      const distanceFromBottom = viewportHeight - cueMidpoint;
      const shouldHide = distanceFromBottom >= viewportHeight * 0.7;

      setIsScrollCueHidden((prev) => (prev === shouldHide ? prev : shouldHide));
    };

    const scheduleUpdate = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        updateScrollCueState();
      });
    };

    updateScrollCueState();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  // Modal focus trap refs
  // const modalRef = useRef<HTMLDivElement>(null);
  const albumModalRef = useRef<HTMLDivElement>(null);

  return (
    <PageTransition>
      <div className="theme-creative min-h-screen bg-bg text-text transition-colors duration-300">
        {/* Nas Create Branded Header */}
        <section ref={heroSectionRef} className="relative overflow-hidden py-10 sm:py-20 px-6 sm:px-8 bg-background">
          {/* Base vignette layer beneath shader */}
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_100%)] dark:bg-[radial-gradient(circle_at_center,rgba(11,15,10,0.82)_0%,rgba(6,10,8,0.94)_65%,rgba(0,0,0,1)_100%)] transition-all duration-500" />

          <div
            ref={heroBgRef}
            className="absolute inset-0 pointer-events-none will-change-transform"
            aria-hidden
            style={{ transform: "scale(1.24)" }}
          >
            <CreativeBokehShaderScene />
            {/* Dark Mode Overlay Tints */}
            <div aria-hidden className="absolute inset-0 overlay-tint hidden dark:block" />
            <div aria-hidden className="absolute inset-0 gradient-vignette hidden dark:block" />
          </div>

          <div className="max-w-6xl mx-auto text-center relative z-10 px-2 sm:px-0">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="flex flex-col items-center mb-6 sm:mb-8">
                <div className="flex items-center justify-center mb-4 sm:mb-6">
                  <div className="relative group isolate">
                    <div
                      aria-hidden
                      className="absolute -inset-8 -z-20 rounded-[40px] opacity-70 blur-3xl transition-transform duration-500 ease-out group-hover:opacity-100 group-hover:scale-110"
                      style={{ background: "radial-gradient(60% 60% at 50% 50%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0) 80%)" }}
                    />
                    <div className="relative flex items-center justify-center w-40 h-20 sm:w-56 sm:h-28 md:w-64 md:h-32 lg:w-72 lg:h-36 transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                      {/* Light Mode Logo */}
                      <Image
                        src="/logos/lightmode-workmark.png"
                        alt="Nas Create Logo"
                        width={480}
                        height={240}
                        className="w-full h-full object-contain drop-shadow-sm dark:hidden block"
                        priority
                      />
                      {/* Dark Mode Logo */}
                      <Image
                        src="/logos/darkmode-wordmark.png"
                        alt="Nas Create Logo"
                        width={480}
                        height={240}
                        className="w-full h-full object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.45)] transition-all duration-500 ease-out group-hover:drop-shadow-[0_0_35px_rgba(255,255,255,0.6)] hidden dark:block"
                        priority
                      />
                    </div>
                  </div>
                </div>
                <h1 className="text-cine text-[clamp(2.25rem,5.5vw,4.5rem)] text-foreground max-w-4xl mx-auto">
                  Every piece of content has a <em className="text-accent">job</em> to do.
                </h1>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <div className="flex flex-row flex-wrap items-center justify-center gap-4 sm:gap-6 mb-0 sm:mb-6">
                <a
                  href="https://www.instagram.com/nas.create/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 sm:gap-3 px-5 sm:px-6 py-3 font-medium rounded-sm transition-colors duration-300 group bg-accent hover:bg-accent/90 text-white shadow-lg shadow-accent/20"
                >
                  <Instagram size={18} className="text-white" />
                  <span className="text-sm sm:text-base text-white">@nas.create</span>
                  <ExternalLink size={15} className="opacity-70 group-hover:opacity-100 text-white" />
                </a>
                <div className="flex items-center gap-2 text-accent">
                  <div className="w-2 h-2 rounded-full animate-pulse bg-accent"></div>
                  <span className="text-sm font-medium text-accent">Available for Projects</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Mobile scroll cue — the hero is compressed so Featured Work peeks, this reinforces it */}
            <a
              href="#featured-work"
              className="sm:hidden mt-7 inline-flex w-full justify-center"
              aria-label="Scroll to featured work"
            >
              <div className="flex flex-col items-center gap-1.5">
                <span className="font-sans text-[0.6rem] font-medium tracking-[0.3em] uppercase text-foreground/40">The Work</span>
                <div className="w-px h-8 bg-gradient-to-b from-accent/60 to-transparent" />
              </div>
            </a>
          </div>
        </section>

        {/* Featured Work */}
        <section id="featured-work" className="scroll-mt-16 pt-12 sm:pt-20 pb-10 px-6 sm:px-8 bg-[var(--color-creative-band)] transition-colors duration-300">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal direction="up" delay={0.1}>
              <CineSectionTitle
                eyebrow="Featured"
                title="Featured Work"
                sub="A quick look at recent creative work."
                ghost="Featured"
                className="mb-10"
              />
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
            <a
              ref={scrollCueRef}
              href="#creative-portfolio"
              className={`mt-6 inline-flex w-full justify-center transition-all duration-300 ${
                isScrollCueHidden ? "opacity-0 -translate-y-1 pointer-events-none" : "opacity-100 translate-y-0"
              }`}
              aria-label="Scroll to the creative portfolio"
            >
              <div className="flex flex-col items-center gap-2">
                <span className="font-sans text-[0.6rem] font-medium tracking-[0.3em] uppercase text-foreground/35">More Work</span>
                <div className="w-px h-10 bg-gradient-to-b from-accent/60 to-transparent" />
              </div>
            </a>
          </div>
        </section>

        {/* Client stories teaser — compact marquee so social proof is seen before the portfolio */}
        <TestimonialMarquee />

        {/* Portfolio Section */}
        <section id="creative-portfolio" className="scroll-mt-16 py-16 sm:py-20 px-6 sm:px-8 bg-background transition-colors duration-300">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal direction="up" delay={0.1}>
              <CineSectionTitle
                eyebrow="The Work"
                title="Creative Portfolio"
                sub="Selected videography and photography projects."
                ghost="Portfolio"
                className="mb-12"
              />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <div className="flex flex-wrap justify-center gap-1 mb-12 border-b border-border pb-0">
                {filters.map((filter) => {
                  const isActive = activeFilter === filter.value;
                  return (
                    <button
                      key={filter.value}
                      type="button"
                      onClick={() => handleFilterClick(filter.value)}
                      className={`px-5 py-3 text-sm font-medium transition-all duration-200 focus:outline-none border-b-2 -mb-px ${
                        isActive
                          ? "border-accent text-foreground"
                          : "border-transparent text-muted-foreground hover:text-foreground"
                      }`}
                      aria-pressed={isActive}
                    >
                      {`${filter.label} (${counts[filter.value]})`}
                    </button>
                  );
                })}
              </div>

              {/* Video subsection tabs */}
              {activeFilter === "video" && (
                <div className="flex flex-wrap justify-center gap-2 -mt-6 mb-12" role="group" aria-label="Video subsections">
                  {videoSubFilters.map((subFilter) => {
                    const isActive = videoSubFilter === subFilter.value;
                    return (
                      <button
                        key={subFilter.value}
                        type="button"
                        onClick={() => handleVideoSubFilterClick(subFilter.value)}
                        className={`px-4 py-1.5 text-xs font-medium uppercase tracking-wider rounded-sm border transition-all duration-200 focus:outline-none focus-visible:ring-2 ring-accent ${
                          isActive
                            ? "border-accent/40 bg-accent/10 text-accent"
                            : "border-border text-muted-foreground hover:text-foreground hover:border-accent/30"
                        }`}
                        aria-pressed={isActive}
                      >
                        {`${subFilter.label} (${videoSubCounts[subFilter.value]})`}
                      </button>
                    );
                  })}
                </div>
              )}
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <div className="flex flex-col gap-6">
                {/* All media items in one LightboxGallery — enables prev/next arrow navigation */}
                {mediaItems.length > 0 && (
                  <VelocitySkew>
                    <LightboxGallery
                      key={`${activeFilter}-${videoSubFilter}`}
                      items={mediaItems}
                      className="gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                      showTitles={true}
                      enableDownload={false}
                      enableZoom={false}
                      useResponsiveGrid={true}
                      onItemClick={(item) => {
                        window.history.replaceState(null, "", "#" + toSlug(item.id));
                      }}
                      onLightboxClose={() => {
                        // Restore the subsection hash so the URL stays shareable
                        const baseHash =
                          activeFilter === "video" && videoSubFilter === "short-form"
                            ? "#short-form"
                            : "";
                        window.history.replaceState(null, "", window.location.pathname + baseHash);
                      }}
                    />
                  </VelocitySkew>
                )}

                {/* Album items */}
                {albumItems.length > 0 && (
                  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {albumItems.map((item) => (
                      <motion.div
                        key={item.id}
                        className="group cursor-pointer relative overflow-hidden transition-all duration-300 hover:-translate-y-1"
                        whileHover={{ scale: 1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAlbumOpen(item)}
                      >
                        <div className="relative aspect-square bg-muted rounded-md overflow-hidden border border-border group-hover:border-accent transition-all duration-300 shadow-sm group-hover:shadow-md">
                          {item.cover && (
                            <>
                              <Image
                                src={item.cover}
                                alt={item.alt || item.title || "Album cover"}
                                fill
                                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                              />
                              <div className="absolute top-3 left-3 z-10">
                                <div className="px-2 py-1 rounded-sm bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium uppercase tracking-widest shadow-sm">
                                  Photos
                                </div>
                              </div>
                              <div className="absolute bottom-3 right-3 z-10">
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-black/60 backdrop-blur-sm text-white text-xs font-medium shadow-sm">
                                  <Camera size={14} />
                                  <span>{item.albumImages?.length || 0}</span>
                                </div>
                              </div>
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                            </>
                          )}
                        </div>
                        <div className="mt-3 space-y-2">
                          {item.title && <h4 className="font-sans font-medium text-[0.95rem] text-foreground group-hover:text-accent transition-colors">{item.title}</h4>}
                          {item.tags && item.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {item.tags.slice(0, 4).map((tag) => (
                                <span key={tag} className="px-2 py-0.5 rounded-sm text-[10px] font-medium border border-accent/20 bg-accent/5 text-accent uppercase tracking-wider">
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

                {/* Case study items */}
                {caseItems.length > 0 && (
                  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {caseItems.map((item) => (
                      <div key={item.id} className="relative w-full">
                        <button
                          // onClick={() => handleCaseStudyOpen(item)}
                          className="relative w-full text-left rounded-2xl border border-border bg-card hover:border-accent transition-all duration-200 focus:outline-none focus:ring-2 ring-accent ring-offset-background overflow-hidden group shadow-sm hover:shadow-md"
                        >
                          {item.cover && (
                            <div className="relative aspect-video overflow-hidden">
                              <Image src={item.cover} alt={item.title || ""} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
                            </div>
                          )}
                          <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="px-3 py-1 text-xs font-semibold rounded-full border border-accent/20 bg-accent/10 text-accent">Case Study</span>
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                              {item.caseSummary && <p className="text-sm text-muted-foreground line-clamp-3">{item.caseSummary}</p>}
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
        {/* Testimonials */}
        <section id="create-testimonials" className="scroll-mt-16 pt-12 pb-10 px-6 sm:px-8 bg-[var(--color-creative-band)] transition-colors duration-300">
          <Testimonials />
        </section>

        {/* Numbers strip — subtle proof points between testimonials and the footer CTA */}
        <section className="py-6 md:py-8 px-6 sm:px-8 bg-[var(--color-creative-band)] transition-colors duration-300">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-3 border-y border-border/60">
                <div className="py-5 px-5 border-b md:border-b-0 md:border-r border-border/60">
                  <p className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 leading-none">63<span className="text-xl md:text-2xl">%</span></p>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-2">of consumers prefer short video to learn about a product.</p>
                  <a
                    href="https://www.wyzowl.com/video-marketing-statistics/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] tracking-[0.18em] uppercase font-semibold text-muted-foreground hover:text-accent transition-colors"
                  >Wyzowl 2024 ↗</a>
                </div>
                <div className="py-5 px-5 border-b md:border-b-0 md:border-r border-border/60">
                  <p className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 leading-none">+125<span className="text-xl md:text-2xl">%</span></p>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-2">Reels reach over single-photo posts on Instagram.</p>
                  <a
                    href="https://buffer.com/library/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] tracking-[0.18em] uppercase font-semibold text-muted-foreground hover:text-accent transition-colors"
                  >Buffer 2024 ↗</a>
                </div>
                <div className="py-5 px-5">
                  <p className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 leading-none">78<span className="text-xl md:text-2xl">%</span></p>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-2">of consumers trust video with real people more than AI-generated content.</p>
                  <a
                    href="https://animoto.com/business"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] tracking-[0.18em] uppercase font-semibold text-muted-foreground hover:text-accent transition-colors"
                  >Animoto 2024-25 ↗</a>
                </div>
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
                <div ref={albumModalRef} className="relative w-full max-w-7xl max-h-[90vh] rounded-sm border border-white/10 bg-[#0B0C0E] text-white shadow-2xl overflow-auto">
                  <button onClick={handleAlbumClose} className="sticky top-4 right-4 float-right z-10 p-2 rounded-sm bg-white/10 text-white hover:bg-white/20 transition-colors">
                    <X size={20} />
                  </button>
                  <div className="p-8 space-y-6">
                    <div className="mb-6">
                      <h2 className="font-display font-light text-3xl tracking-tight text-white mb-2">{activeAlbum.title}</h2>
                      <p className="text-white/60 leading-relaxed">{activeAlbum.description}</p>
                    </div>
                    <LightboxGallery
                      items={activeAlbum.albumImages}
                      columns={3}
                      className="columns-1 sm:columns-2 lg:columns-3 gap-4"
                      showTitles={false}
                      enableZoom={true}
                      enableDownload={false}
                      useResponsiveGrid={false}
                      adaptiveAspectRatio={true}
                      autoOpen={0}
                      onLightboxClose={handleAlbumClose}
                    />
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Contact and Footer */}
        <section className="py-20 md:pb-24 px-8 bg-panel transition-colors duration-300">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal direction="up" delay={0.1}>
              <p className="eyebrow mb-3" style={{ color: "var(--color-accent)" }}>Get In Touch</p>
              <h2 className="text-cine text-4xl md:text-5xl text-text mb-6 transition-colors duration-300">Got a project? Let&apos;s talk.</h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.5}>
              <CreativeCTA source="creative_footer" className="justify-center" />
            </ScrollReveal>
          </div>
        </section>
        <StickyCtas />
      </div>
    </PageTransition>
  );
}

function StickyCtas() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [show, setShow] = useState(false);
  const [showFab, setShowFab] = useState(false);
  const [showMobileBar, setShowMobileBar] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsDesktop(mq.matches);
    const onChange = () => setIsDesktop(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      const scrollingDown = window.scrollY > lastScrollY.current;
      lastScrollY.current = window.scrollY;
      const pastHalf = progress >= 0.5;
      setShow(pastHalf && !scrollingDown);
      setShowFab(pastHalf);
      // Mobile: appear once the visitor has scrolled past the hero, hide near the footer CTA
      const pastHero = window.scrollY > window.innerHeight * 0.7;
      setShowMobileBar(pastHero && progress < 0.92);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Mobile sticky CTA — sits above the bottom nav */}
      <div
        className={`md:hidden fixed left-4 right-4 z-40 transition-all duration-300 ${
          showMobileBar ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
        }`}
        style={{ bottom: "calc(4.25rem + env(safe-area-inset-bottom, 0px))" }}
      >
        <div className="dark flex items-center gap-2 rounded-sm border border-white/10 bg-black/85 p-2 backdrop-blur-md shadow-xl">
          <Link
            href="/contact?src=creative_sticky_mobile#calendly"
            className="flex-1 inline-flex items-center justify-center rounded-sm bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
            data-cta="creative_sticky_mobile_calendly"
            onClick={(e) => trackCta("creative_sticky_mobile_calendly", { href: e.currentTarget.href })}
          >
            Book a free call
          </Link>
          <Link
            href="/contact?src=creative_sticky_mobile#whatsapp"
            className="inline-flex items-center justify-center rounded-sm border border-white/15 px-4 py-3 text-sm font-medium text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
            data-cta="creative_sticky_mobile_whatsapp"
            onClick={(e) => trackCta("creative_sticky_mobile_whatsapp", { href: e.currentTarget.href })}
          >
            WhatsApp
          </Link>
        </div>
      </div>

      {isDesktop && (
        <>
          <div className={`hidden md:block fixed left-1/2 z-40 -translate-x-1/2 transition-all duration-200 ${show ? "bottom-28 opacity-100" : "bottom-24 opacity-0 pointer-events-none"}`}>
            <div className="rounded-sm border border-white/10 bg-black/80 px-4 py-3 backdrop-blur-md shadow-xl dark">
              <CreativeCTA source="creative_sticky" className="items-center" size="sm" />
            </div>
          </div>
          <div className={`hidden md:block fixed right-6 z-40 transition-all duration-200 ${showFab ? "bottom-24 opacity-100" : "bottom-20 opacity-0 pointer-events-none"}`}>
            <Link
              href="/contact?src=creative_fab#calendly"
              className="rounded-sm bg-accent text-accent-foreground px-5 py-3 font-medium text-sm shadow-lg hover:opacity-90 transition-opacity focus-visible:outline-none"
              data-cta="creative_fab_calendly"
              onClick={(e) => trackCta("creative_fab_calendly", { href: e.currentTarget.href })}
            >
              Book Free Call
            </Link>
          </div>
        </>
      )}
    </>
  );
}


