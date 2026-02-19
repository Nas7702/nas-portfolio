"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
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
    return id ? `https://www.youtube.com/embed/${id}` : null;
  }
  if (isVimeoUrl(url)) {
    const id = getVimeoId(url);
    return id ? `https://player.vimeo.com/video/${id}` : null;
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

  const closeLightbox = () => {
    setIsOpen(false);
    setIsPlaying(false);
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
        className={adaptiveAspectRatio ? className : `grid gap-4 ${className}`}
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
                    <div className="relative w-full max-w-[min(100%,1280px)] aspect-video">
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
                      muted={isMuted}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
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

  return (
    <motion.div
      className={`group ${inlinePlayback && isEmbed ? "" : "cursor-pointer"} ${adaptiveAspectRatio ? "break-inside-avoid mb-4" : ""} relative overflow-hidden ${
        !inlinePlayback && !adaptiveAspectRatio
          ? "transition-all duration-300 hover:-translate-y-1"
          : ""
      }`}
      whileHover={{ scale: adaptiveAspectRatio ? 1.02 : 1 }}
      whileTap={{ scale: 0.95 }}
      onClick={inlinePlayback && isEmbed ? undefined : () => onSelect(item, index)}
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
            : adaptiveAspectRatio
              ? 'w-full'
              : 'aspect-square'
        } bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden ${
          !inlinePlayback && !adaptiveAspectRatio
            ? "border border-subtle hover:border-[color:var(--ring)] hover:shadow-[0_18px_35px_-18px_rgba(57,255,136,0.6)]"
            : ""
        } transition-all duration-300`}
      >
        {isInView && (
          <>
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
                <Image
                  src={thumbSrc}
                  alt={item.alt || item.title || `Media ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110 select-none"
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
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <Maximize2 size={24} />
              </div>
            )}

            {/* Media Type Indicator */}
            {!inlinePlayback && item.type === "video" && (
              <>
                {/* Corner badge */}
                <div className="absolute top-2 left-2 z-10">
                  <div className="px-2 py-1 rounded-md bg-gradient-to-r from-emerald-400 to-green-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg animate-pulse">
                    Video
                  </div>
                </div>
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="p-4 bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-full shadow-2xl group-hover:scale-110 transition-transform duration-300">
                    <Play size={24} fill="white" />
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
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
              {item.title}
            </h4>
          )}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {item.tags.slice(0, 5).map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full text-xs font-medium border border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
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
  return (
    <div className="relative w-full h-full bg-gray-200 dark:bg-gray-800">
      {(() => {
        const thumb = getThumbnailSrc(item);
        if (thumb.startsWith("/")) {
          return (
            <Image
              src={thumb}
              alt={item.alt || item.title || "Thumbnail"}
              fill
              className="object-cover select-none"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
            />
          );
        }
        return (
          <Image
            src={thumb}
            alt={item.alt || item.title || "Thumbnail"}
            fill
            sizes="(min-width: 1024px) 120px, (min-width: 640px) 96px, 72px"
            className="object-cover select-none"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
          />
        );
      })()}
      {item.type === "video" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Play size={12} className="text-white" />
        </div>
      )}
    </div>
  );
});
