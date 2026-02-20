"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Download,
  Maximize2
} from "lucide-react";

export interface MediaItem {
  id: string;
  type: "image" | "video";
  src: string;
  thumbnail?: string;
  alt?: string;
  title?: string;
  description?: string;
  tags?: string[];
  kind?: "video" | "photo" | "case" | "album";
  cover?: string;
  isVertical?: boolean;
}

// per-card CTA removed

// Helpers: detect/embed external video platforms and choose safe thumbnails
function isYouTubeUrl(url: string): boolean {
  return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i.test(url);
}

function isVimeoUrl(url: string): boolean {
  return /^(https?:\/\/)?(www\.)?vimeo\.com\//i.test(url);
}

function isInstagramUrl(url: string): boolean {
  return /^(https?:\/\/)?(www\.)?instagram\.com\/(reel|p)\//i.test(url);
}

function ensureInstagramEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    if (!u.pathname.includes("/embed")) {
      const parts = u.pathname.replace(/\/$/, "").split("/");
      if (parts.length >= 3) {
        // e.g. /reel/{id}
        return `https://www.instagram.com/${parts[1]}/${parts[2]}/embed`;
      }
    }
    return url.includes("/embed") ? url : `${url.replace(/\/$/, "")}/embed`;
  } catch {
    return null;
  }
}

function getInstagramPermalink(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.pathname.includes("/embed")) {
      const parts = u.pathname.replace(/\/$/, "").split("/");
      if (parts.length >= 3) {
        return `https://www.instagram.com/${parts[1]}/${parts[2]}/`;
      }
    }
    return isInstagramUrl(url) ? url.split("?", 1)[0] : null;
  } catch {
    return null;
  }
}

function getInstagramThumbnail(item: MediaItem): string | undefined {
  const permalink = getInstagramPermalink(item.src);
  if (!permalink) return undefined;
  const normalised = permalink.endsWith("/") ? permalink : `${permalink}/`;
  return `${normalised}media/?size=l`;
}

function isEmbedUrl(url: string): boolean {
  return isYouTubeUrl(url) || isVimeoUrl(url) || isInstagramUrl(url);
}

function getYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      return u.pathname.slice(1) || null;
    }
    if (u.searchParams.get("v")) return u.searchParams.get("v");
    const parts = u.pathname.split("/");
    const embedIndex = parts.indexOf("embed");
    if (embedIndex >= 0 && parts[embedIndex + 1]) return parts[embedIndex + 1];
    const shortsIndex = parts.indexOf("shorts");
    if (shortsIndex >= 0 && parts[shortsIndex + 1]) return parts[shortsIndex + 1];
    if (parts.length > 1 && parts[1]) return parts[parts.length - 1];
  } catch {}
  return null;
}

function getVimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  return match ? match[1] : null;
}

function getEmbedUrl(url: string): string | null {
  if (isYouTubeUrl(url)) {
    const id = getYouTubeId(url);
    if (!id) return null;
    // youtube-nocookie.com avoids tracking cookies and loads faster.
    // vq + hd are unofficial but widely respected quality hints; rel=0 keeps
    // end-screen suggestions within the same channel.
    const params = new URLSearchParams({
      rel: "0",
      modestbranding: "1",
      hd: "1",
      vq: "hd1080",
    });
    return `https://www.youtube-nocookie.com/embed/${id}?${params}`;
  }
  if (isVimeoUrl(url)) {
    const id = getVimeoId(url);
    if (!id) return null;
    // quality=1080p works on Vimeo Pro/Business; harmless on basic accounts.
    // title/byline/portrait=0 gives a cleaner, brandless player.
    const params = new URLSearchParams({
      quality: "1080p",
      autoplay: "0",
      title: "0",
      byline: "0",
      portrait: "0",
      dnt: "1",
    });
    return `https://player.vimeo.com/video/${id}?${params}`;
  }
  if (isInstagramUrl(url)) {
    return ensureInstagramEmbedUrl(url);
  }
  return null;
}

function getThumbnailSrc(item: MediaItem): string {
  if (item.thumbnail) return item.thumbnail;
  if (item.cover) return item.cover;
  if (item.type === "video" && isInstagramUrl(item.src)) {
    const preview = getInstagramThumbnail(item);
    if (preview) return preview;
  }
  // Avoid Next/Image remote domain issues: fall back to local placeholder for videos
  if (item.type === "video") return "/window.svg";
  return item.src;
}

type InstagramEmbedApi = {
  Embeds?: {
    process?: () => void;
  };
};

type InstagramEmbedWindow = Window & {
  instgrm?: InstagramEmbedApi;
};

function processInstagramEmbeds() {
  if (typeof window === "undefined") return;
  const instgrm = (window as InstagramEmbedWindow).instgrm;
  instgrm?.Embeds?.process?.();
}

  interface LightboxGalleryProps {
  items: MediaItem[];
  columns?: number;
  className?: string;
  showTitles?: boolean;
  enableZoom?: boolean;
  enableDownload?: boolean;
  inlinePlayback?: boolean; // if true, embeds can play directly in grid
  useResponsiveGrid?: boolean;
  adaptiveAspectRatio?: boolean; // if true, images keep their natural aspect ratio
  onItemClick?: (item: MediaItem, index: number) => boolean | void;
  autoOpen?: number; // if set, opens the lightbox at this index on mount
  onLightboxClose?: () => void; // called when the lightbox is closed
  // per-card CTA removed
}

export default function LightboxGallery({
  items,
  columns = 3,
  className = "",
  showTitles = true,
  enableZoom = true,
  enableDownload = true,
  inlinePlayback = false,
  useResponsiveGrid = false,
  adaptiveAspectRatio = false,
  onItemClick,
  autoOpen,
  onLightboxClose,
  // per-card CTA removed
}: LightboxGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentItem = items[currentIndex];

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Block save shortcuts to prevent downloading images
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        return false;
      }

      switch (e.key) {
        case "Escape":
          setIsOpen(false);
          break;
        case "ArrowLeft":
          goToPrevious();
          break;
        case "ArrowRight":
          goToNext();
          break;
        case " ":
          e.preventDefault();
          if (currentItem.type === "video" && !isEmbedUrl(currentItem.src)) {
            togglePlayPause();
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, currentIndex, currentItem.type]); // eslint-disable-line react-hooks/exhaustive-deps

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
    setZoom(1);
    setRotation(0);
  };

  const handleItemSelect = useCallback((item: MediaItem, index: number) => {
    if (onItemClick) {
      const result = onItemClick(item, index);
      if (result === false) {
        return;
      }
    }
    openLightbox(index);
  // openLightbox has no external deps; onItemClick is the only external reference
  }, [onItemClick]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-open lightbox on mount (used by album cards to skip the grid step)
  useEffect(() => {
    if (typeof autoOpen === "number" && autoOpen >= 0 && autoOpen < items.length) {
      setCurrentIndex(autoOpen);
      setIsOpen(true);
      setZoom(1);
      setRotation(0);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const closeLightbox = () => {
    setIsOpen(false);
    setIsPlaying(false);
    onLightboxClose?.();
  };

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
    setZoom(1);
    setRotation(0);
    setIsPlaying(false);
  }, [items.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    setZoom(1);
    setRotation(0);
    setIsPlaying(false);
  }, [items.length]);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.5, 0.5));
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = currentItem.src;
    link.download = currentItem.title || `media-${currentIndex + 1}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Image protection handlers
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault();
    return false;
  };

  useEffect(() => {
    if (!isOpen) return;

    const focusableSelectors = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
    const modalElement = document.querySelector<HTMLDivElement>('[data-lightbox-modal="true"]');
    const focusable = modalElement?.querySelectorAll<HTMLElement>(focusableSelectors) || [];
    const firstFocusable = focusable[0];
    const lastFocusable = focusable[focusable.length - 1];

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || focusable.length === 0) {
        return;
      }

      if (event.shiftKey) {
        if (document.activeElement === firstFocusable) {
          event.preventDefault();
          lastFocusable.focus();
        }
      } else if (document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    };

    if (firstFocusable) {
      firstFocusable.focus();
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Listen for external open-lightbox-item events (e.g. from Testimonials relatedWork links)
  useEffect(() => {
    const handleOpenItem = (e: Event) => {
      const { itemId } = (e as CustomEvent<{ itemId: string }>).detail;
      const idx = items.findIndex((item) => item.id === itemId);
      if (idx !== -1) openLightbox(idx);
    };
    window.addEventListener("open-lightbox-item", handleOpenItem);
    return () => window.removeEventListener("open-lightbox-item", handleOpenItem);
  }, [items]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-play self-hosted video when lightbox opens or user navigates to a video item
  useEffect(() => {
    if (!isOpen) return;
    if (currentItem.type !== "video" || isEmbedUrl(currentItem.src)) return;
    const timer = setTimeout(() => {
      videoRef.current?.play().catch(() => {
        // Autoplay blocked by browser — user can click play manually
      });
    }, 50);
    return () => clearTimeout(timer);
  }, [isOpen, currentIndex, currentItem.type, currentItem.src]);

  useEffect(() => {
    if (!isOpen) return;

    const embedUrl = getEmbedUrl(currentItem.src);
    if (!embedUrl || !isInstagramUrl(embedUrl)) {
      return;
    }

    const ensureScript = () => {
      const existingScript = document.querySelector<HTMLScriptElement>('script[data-instagram-embed-script]');
      if (existingScript) {
        processInstagramEmbeds();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      script.defer = true;
      script.dataset.instagramEmbedScript = "true";
      script.onload = () => {
        processInstagramEmbeds();
      };
      document.body.appendChild(script);
    };

    ensureScript();
  }, [isOpen, currentItem.src]);

  return (
    <>
      {/* Thumbnail Grid */}
      <div
        className={adaptiveAspectRatio ? className : cn("grid gap-4", className)}
        style={
          adaptiveAspectRatio || useResponsiveGrid ? undefined : { gridTemplateColumns: `repeat(${columns}, 1fr)` }
        }
      >
        {items.map((item, index) => (
          <ThumbnailCard
            key={item.id}
            item={item}
            index={index}
            onSelect={handleItemSelect}
            showTitle={showTitles}
            inlinePlayback={inlinePlayback}
            adaptiveAspectRatio={adaptiveAspectRatio}
          />
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
            />

            {/* Modal Content */}
            <motion.div
              data-lightbox-modal="true"
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <div className="relative w-full h-full max-w-6xl max-h-[90vh] flex flex-col">
                {/* Header Controls */}
                <div className="flex items-center justify-between p-4 text-white">
                  <div className="flex items-center gap-4">
                    <span className="text-sm">
                      {currentIndex + 1} of {items.length}
                    </span>
                    {currentItem.title && (
                      <h3 className="text-lg font-semibold">{currentItem.title}</h3>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Media-specific controls */}
                    {currentItem.type === "image" && enableZoom && (
                      <>
                        <button
                          onClick={handleZoomOut}
                          className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                        >
                          <ZoomOut size={20} />
                        </button>
                        <button
                          onClick={handleZoomIn}
                          className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                        >
                          <ZoomIn size={20} />
                        </button>
                        <button
                          onClick={handleRotate}
                          className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                        >
                          <RotateCw size={20} />
                        </button>
                      </>
                    )}

                    {currentItem.type === "video" && !isEmbedUrl(currentItem.src) && (
                      <>
                        <button
                          onClick={togglePlayPause}
                          className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                        >
                          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                        </button>
                        <button
                          onClick={toggleMute}
                          className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                        >
                          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                        </button>
                      </>
                    )}

                    {enableDownload && !isEmbedUrl(currentItem.src) && (
                      <button
                        onClick={handleDownload}
                        className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                      >
                        <Download size={20} />
                      </button>
                    )}

                    <button
                      onClick={closeLightbox}
                      className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                {/* Media Display */}
                <div className="flex-1 flex items-center justify-center relative overflow-hidden p-4">
                  {currentItem.type === "image" ? (
                    <motion.div
                      className="relative flex items-center justify-center"
                      style={{
                        transform: `scale(${zoom}) rotate(${rotation}deg)`,
                        maxWidth: "100%",
                        maxHeight: "100%",
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      onContextMenu={handleContextMenu}
                    >
                      <Image
                        src={currentItem.src}
                        alt={currentItem.alt || currentItem.title || "Gallery image"}
                        width={1920}
                        height={1080}
                        className="max-w-full max-h-[80vh] w-auto h-auto object-contain pointer-events-none select-none"
                        style={{ display: "block" }}
                        draggable={false}
                        onContextMenu={handleContextMenu}
                        onDragStart={handleDragStart}
                      />
                    </motion.div>
                  ) : isEmbedUrl(currentItem.src) ? (
                    <div
                      className={`relative w-full ${
                        currentItem.isVertical
                          ? 'max-w-[min(100%,360px)] aspect-[9/16]'
                          : 'max-w-[min(100%,1280px)] aspect-video'
                      }`}
                    >
                      {(() => {
                        const embedUrl = getEmbedUrl(currentItem.src);
                        if (!embedUrl) return null;

                        if (isInstagramUrl(embedUrl)) {
                          const permalink = getInstagramPermalink(embedUrl) || embedUrl;
                          return (
                            <blockquote
                              className="instagram-media absolute inset-0 w-full h-full rounded-lg overflow-hidden"
                              data-instgrm-permalink={permalink}
                              data-instgrm-version="14"
                              style={{ background: "transparent" }}
                            >
                              <a href={permalink} className="sr-only">View on Instagram</a>
                            </blockquote>
                          );
                        }

                        return (
                          <iframe
                            src={embedUrl}
                            className="absolute inset-0 w-full h-full rounded-lg"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />
                        );
                      })()}
                    </div>
                  ) : (
                    <video
                      ref={videoRef}
                      src={currentItem.src}
                      className="max-w-full max-h-full object-contain"
                      controls
                      controlsList="nodownload noremoteplayback"
                      disablePictureInPicture
                      muted={isMuted}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onContextMenu={handleContextMenu}
                    />
                  )}

                  {/* Navigation Arrows */}
                  {items.length > 1 && (
                    <>
                      <button
                        onClick={goToPrevious}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={goToNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </>
                  )}
                </div>

                {/* Description */}
                {currentItem.description && (
                  <div className="p-4 text-white text-center">
                    <p className="text-sm text-gray-300">{currentItem.description}</p>
                  </div>
                )}

                {/* Thumbnail Strip */}
                {items.length > 1 && (
                  <div className="p-4">
                    <div className="flex gap-2 justify-center overflow-x-auto">
                      {items.map((item, index) => (
                        <button
                          key={item.id}
                          onClick={() => setCurrentIndex(index)}
                          className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                            index === currentIndex
                              ? "border-white scale-110"
                              : "border-transparent hover:border-gray-400"
                          }`}
                        >
                          <ThumbnailPreview item={item} />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// Thumbnail Card Component with Lazy Loading — memoised to prevent re-renders when parent state changes
const ThumbnailCard = React.memo(function ThumbnailCard({
  item,
  index,
  onSelect,
  showTitle,
  inlinePlayback,
  adaptiveAspectRatio = false,
}: {
  item: MediaItem;
  index: number;
  onSelect: (item: MediaItem, index: number) => void;
  showTitle: boolean;
  inlinePlayback: boolean;
  adaptiveAspectRatio?: boolean;
}) {
  const [isInView, setIsInView] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);
  const inlineVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const thumbSrc = getThumbnailSrc(item);
  const isLocalThumb = thumbSrc.startsWith("/");
  const isEmbed = item.type === "video" && isEmbedUrl(item.src);
  const isSelfHostedVideo = item.type === "video" && !isEmbedUrl(item.src);
  const isInlineVideo = inlinePlayback && item.type === "video";

  // Autoplay inline self-hosted video (muted) when scrolled into view; pause when scrolled out
  useEffect(() => {
    if (!inlinePlayback || !isSelfHostedVideo || !isInView) return;
    const videoEl = inlineVideoRef.current;
    if (!videoEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoEl.play().catch(() => {});
        } else {
          videoEl.pause();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(videoEl);
    return () => observer.disconnect();
  }, [isInView, inlinePlayback, isSelfHostedVideo]);

  return (
    <motion.div
      className={`group ${isInlineVideo ? "" : "cursor-pointer"} ${adaptiveAspectRatio ? "break-inside-avoid mb-4" : ""} relative overflow-hidden ${
        !inlinePlayback && !adaptiveAspectRatio
          ? "transition-all duration-300 hover:-translate-y-1"
          : ""
      }`}
      whileHover={{ scale: adaptiveAspectRatio ? 1.02 : 1 }}
      whileTap={{ scale: 0.95 }}
      onClick={isInlineVideo ? undefined : () => onSelect(item, index)}
    >
      {/* Gradient overlay on hover */}
      {!inlinePlayback && !adaptiveAspectRatio && (
        <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-br from-[color:var(--accent)]/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 -z-0" />
      )}

      <div
        ref={imgRef}
        className={`relative ${
          inlinePlayback && isEmbed
            ? 'aspect-video'
            : inlinePlayback && isSelfHostedVideo
              ? 'w-full'
              : adaptiveAspectRatio
                ? 'w-full'
                : 'aspect-square'
        } bg-card rounded-lg overflow-hidden ${
          !inlinePlayback && !adaptiveAspectRatio
            ? "border border-border hover:border-accent hover:shadow-lg transition-all duration-300"
            : ""
        }`}
      >
        {isInView && (
          <>
            {/* Blurred backdrop fill — video cards only, rendered first so image stacks on top */}
            {!inlinePlayback && item.type === "video" && !thumbSrc.endsWith(".svg") && (
              <div
                aria-hidden
                className="absolute inset-0 scale-110 blur-xl brightness-50"
                style={{ backgroundImage: `url(${thumbSrc})`, backgroundSize: "cover", backgroundPosition: "center" }}
              />
            )}

            {inlinePlayback && isEmbed ? (
              (() => {
        const embedUrl = getEmbedUrl(item.src);
                return embedUrl ? (
                  <iframe
                    src={embedUrl}
                    className="absolute inset-0 w-full h-full"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : null;
              })()
            ) : inlinePlayback && isSelfHostedVideo ? (
              <video
                ref={inlineVideoRef}
                src={item.src}
                poster={item.thumbnail || item.cover}
                className="w-full h-auto block"
                controls
                controlsList="nodownload noremoteplayback"
                disablePictureInPicture
                preload="auto"
                playsInline
                muted
                loop
                onContextMenu={(e) => e.preventDefault()}
              />
            ) : !imageError ? (
              adaptiveAspectRatio ? (
                <Image
                  src={thumbSrc}
                  alt={item.alt || item.title || `Media ${index + 1}`}
                  width={1200}
                  height={800}
                  className="w-full h-auto rounded-lg select-none"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  onError={() => setImageError(true)}
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                />
              ) : isLocalThumb ? (
                item.type === "video" ? (
                  // Plain img for video thumbnails — bypasses Next.js/Vercel optimisation
                  // pipeline so the browser fetches R2 directly, same path as the CSS backdrop
                  <img
                    src={thumbSrc}
                    alt={item.alt || item.title || `Media ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-contain select-none"
                    style={{ zIndex: 1 }}
                    onError={() => setImageError(true)}
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                ) : (
                  <Image
                    src={thumbSrc}
                    alt={item.alt || item.title || `Media ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110 select-none"
                    onError={() => setImageError(true)}
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                )
              ) : (
                item.type === "video" ? (
                  <img
                    src={thumbSrc}
                    alt={item.alt || item.title || `Media ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-contain select-none"
                    style={{ zIndex: 1 }}
                    onError={() => setImageError(true)}
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                ) : (
                  <Image
                    src={thumbSrc}
                    alt={item.alt || item.title || `Media ${index + 1}`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover select-none"
                    onError={() => setImageError(true)}
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                )
              )
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <Maximize2 size={24} />
              </div>
            )}

            {/* Media Type Indicator */}
            {!inlinePlayback && item.type === "video" && (
              <>
                {/* Corner badge — frosted, minimal */}
                <div className="absolute top-2 left-2 z-10">
                  <div className="px-2 py-1 rounded-sm bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium uppercase tracking-widest shadow-sm">
                    Video
                  </div>
                </div>
                {/* Play indicator — bottom-right corner, out of the way */}
                <div className="absolute bottom-2 right-2 z-10 pointer-events-none">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full border border-white/30 bg-black/40 backdrop-blur-sm opacity-70 group-hover:opacity-100 group-hover:border-white/70 group-hover:bg-white/10 group-hover:scale-110 transition-all duration-300 ease-out">
                    <Play size={9} fill="white" className="text-white ml-px" />
                  </div>
                </div>
              </>
            )}

            {/* Overlay */}
            {!inlinePlayback && (
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            )}
          </>
        )}
      </div>

      {/* Title */}
      {(showTitle && (item.title || (item.tags && item.tags.length > 0))) && (
        <div className="mt-3 space-y-2">
          {item.title && (
            <h4 className="font-display font-light text-base text-foreground group-hover:text-accent transition-colors">
              {item.title}
            </h4>
          )}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {item.tags.slice(0, 5).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-sm text-[10px] font-medium border border-accent/20 bg-accent/5 text-accent uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
});

// Thumbnail Preview Component (for lightbox strip) — memoised; re-renders only when item changes
const ThumbnailPreview = React.memo(function ThumbnailPreview({ item }: { item: MediaItem }) {
  const thumb = getThumbnailSrc(item);
  return (
    <div className="relative w-full h-full bg-gray-200 dark:bg-gray-800">
      {thumb.startsWith("/") ? (
        <Image
          src={thumb}
          alt={item.alt || item.title || "Thumbnail"}
          fill
          className="object-cover select-none"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
        />
      ) : (
        // Plain img — bypasses Vercel optimisation pipeline for R2 remote URLs
        <img
          src={thumb}
          alt={item.alt || item.title || "Thumbnail"}
          className="absolute inset-0 w-full h-full object-cover select-none"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
        />
      )}
      {item.type === "video" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Play size={12} className="text-white" />
        </div>
      )}
    </div>
  );
});
