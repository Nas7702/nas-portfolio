"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
}

// Helpers: detect/embed external video platforms and choose safe thumbnails
function isYouTubeUrl(url: string): boolean {
  return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i.test(url);
}

function isVimeoUrl(url: string): boolean {
  return /^(https?:\/\/)?(www\.)?vimeo\.com\//i.test(url);
}

function isEmbedUrl(url: string): boolean {
  return isYouTubeUrl(url) || isVimeoUrl(url);
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
  return null;
}

function getThumbnailSrc(item: MediaItem): string {
  if (item.thumbnail) return item.thumbnail;
  // Avoid Next/Image remote domain issues: fall back to local placeholder for videos
  if (item.type === "video") return "/window.svg";
  return item.src;
}

  interface LightboxGalleryProps {
  items: MediaItem[];
  columns?: number;
  className?: string;
  showTitles?: boolean;
  enableZoom?: boolean;
  enableDownload?: boolean;
  inlinePlayback?: boolean; // if true, embeds can play directly in grid
}

export default function LightboxGallery({
  items,
  columns = 3,
  className = "",
  showTitles = true,
  enableZoom = true,
  enableDownload = true,
  inlinePlayback = false,
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

  return (
    <>
      {/* Thumbnail Grid */}
      <div
        className={`grid gap-4 ${className}`}
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {items.map((item, index) => (
          <ThumbnailCard
            key={item.id}
            item={item}
            index={index}
            onClick={() => openLightbox(index)}
            showTitle={showTitles}
            inlinePlayback={inlinePlayback}
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
                <div className="flex-1 flex items-center justify-center relative overflow-hidden">
                  {currentItem.type === "image" ? (
                    <motion.div
                      className="relative max-w-full max-h-full"
                      style={{
                        transform: `scale(${zoom}) rotate(${rotation}deg)`,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <Image
                        src={currentItem.src}
                        alt={currentItem.alt || currentItem.title || "Gallery image"}
                        width={1200}
                        height={800}
                        className="max-w-full max-h-full object-contain"
                        priority
                      />
                    </motion.div>
                  ) : isEmbedUrl(currentItem.src) ? (
                    <div className="relative w-full max-w-[min(100%,1280px)] aspect-video">
                      {(() => {
                        const embedUrl = getEmbedUrl(currentItem.src);
                        return embedUrl ? (
                          <iframe
                            src={embedUrl}
                            className="absolute inset-0 w-full h-full rounded-lg"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />
                        ) : null;
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

// Thumbnail Card Component with Lazy Loading
function ThumbnailCard({
  item,
  index,
  onClick,
  showTitle,
  inlinePlayback,
}: {
  item: MediaItem;
  index: number;
  onClick: () => void;
  showTitle: boolean;
  inlinePlayback: boolean;
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
      className={`group ${inlinePlayback && isEmbed ? '' : 'cursor-pointer'}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={inlinePlayback && isEmbed ? undefined : onClick}
    >
      <div
        ref={imgRef}
        className={`relative ${inlinePlayback && isEmbed ? 'aspect-video' : 'aspect-square'} bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden`}
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
              isLocalThumb ? (
                <Image
                  src={thumbSrc}
                  alt={item.alt || item.title || `Media ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={() => setImageError(true)}
                />
              ) : (
                <img
                  src={thumbSrc}
                  alt={item.alt || item.title || `Media ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  onError={() => setImageError(true)}
                />
              )
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <Maximize2 size={24} />
              </div>
            )}

            {/* Media Type Indicator */}
            {!inlinePlayback && item.type === "video" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-3 bg-black/70 text-white rounded-full">
                  <Play size={20} />
                </div>
              </div>
            )}

            {/* Overlay */}
            {!inlinePlayback && (
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            )}
          </>
        )}
      </div>

      {/* Title */}
      {showTitle && item.title && (
        <h4 className="mt-2 text-sm font-medium text-gray-900 dark:text-white truncate">
          {item.title}
        </h4>
      )}
    </motion.div>
  );
}

// Thumbnail Preview Component (for lightbox strip)
function ThumbnailPreview({ item }: { item: MediaItem }) {
  return (
    <div className="relative w-full h-full bg-gray-200 dark:bg-gray-800">
      {(() => {
        const thumb = getThumbnailSrc(item);
        if (thumb.startsWith("/")) {
          return (
            <Image src={thumb} alt={item.alt || item.title || "Thumbnail"} fill className="object-cover" />
          );
        }
        return (
          <img src={thumb} alt={item.alt || item.title || "Thumbnail"} className="absolute inset-0 w-full h-full object-cover" />
        );
      })()}
      {item.type === "video" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Play size={12} className="text-white" />
        </div>
      )}
    </div>
  );
}
