"use client";

import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface VideoPlayerHandle {
  togglePlayPause: () => void;
  play: () => void;
  pause: () => void;
}

// Vendor-prefixed fullscreen API types — defined once at module scope
type DocFS = Document & {
  webkitFullscreenElement?: Element;
  webkitExitFullscreen?: () => void;
};
type ElFS = HTMLElement & {
  webkitRequestFullscreen?: () => void;
};
type VidFS = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
};

interface VideoPlayerProps {
  src: string;
  poster?: string;
  loop?: boolean;
  muted?: boolean;
  autoPlay?: boolean;
  playsInline?: boolean;
  preload?: "none" | "metadata" | "auto";
  className?: string;
  videoClassName?: string;
  onContextMenu?: (e: React.MouseEvent) => void;
  onMuteChange?: (muted: boolean) => void;
}

const VideoPlayer = forwardRef<VideoPlayerHandle, VideoPlayerProps>(
  function VideoPlayer(
    {
      src,
      poster,
      loop = false,
      muted: initialMuted = false,
      autoPlay = false,
      playsInline = true,
      preload = "metadata",
      className,
      videoClassName,
      onContextMenu,
      onMuteChange,
    },
    ref
  ) {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const rafRef = useRef<number | null>(null);
    // Tracks whether the user is actively dragging the scrubber so RAF doesn't fight them
    const isDraggingRef = useRef(false);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(initialMuted);
    const [controlsVisible, setControlsVisible] = useState(true);

    // Expose imperative handle to parent
    useImperativeHandle(ref, () => ({
      togglePlayPause: () => {
        const v = videoRef.current;
        if (!v) return;
        if (v.paused) { v.play().catch(() => {}); } else { v.pause(); }
      },
      play: () => videoRef.current?.play().catch(() => {}),
      pause: () => videoRef.current?.pause(),
    }));

    // Set muted imperatively — React doesn't reliably update `muted` after initial render
    useEffect(() => {
      const v = videoRef.current;
      if (v) v.muted = isMuted;
    }, [isMuted]);

    // Autoplay on mount
    useEffect(() => {
      if (!autoPlay) return;
      const t = setTimeout(() => videoRef.current?.play().catch(() => {}), 50);
      return () => clearTimeout(t);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // RAF loop — writes directly to the input DOM node so React doesn't re-render on every frame
    const updateScrubber = useCallback(() => {
      const v = videoRef.current;
      const input = inputRef.current;
      if (!v || !input || !v.duration || isDraggingRef.current) return;
      const p = v.currentTime / v.duration;
      input.value = String(p);
      input.style.background = `linear-gradient(to right, var(--color-accent) ${p * 100}%, rgba(255,255,255,0.2) ${p * 100}%)`;
    }, []);

    const stopRAF = useCallback(() => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    }, []);

    const startRAF = useCallback(() => {
      if (rafRef.current !== null) return;
      const tick = () => {
        updateScrubber();
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    }, [updateScrubber]);

    // Cleanup hide timer and RAF on unmount
    useEffect(
      () => () => {
        stopRAF();
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      },
      [stopRAF]
    );

    const scheduleHide = useCallback(() => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      hideTimerRef.current = setTimeout(() => setControlsVisible(false), 3000);
    }, []);

    const revealControls = useCallback(() => {
      setControlsVisible(true);
      if (videoRef.current && !videoRef.current.paused) {
        scheduleHide();
      } else {
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      }
    }, [scheduleHide]);

    const handlePlayPause = useCallback(() => {
      const v = videoRef.current;
      if (!v) return;
      if (v.paused) { v.play().catch(() => {}); } else { v.pause(); }
    }, []);

    const handleMute = useCallback(() => {
      const newMuted = !isMuted;
      setIsMuted(newMuted);
      onMuteChange?.(newMuted);
    }, [isMuted, onMuteChange]);

    const handleSeek = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = videoRef.current;
        const input = inputRef.current;
        if (!v || !v.duration) return;
        const val = parseFloat(e.target.value);
        v.currentTime = val * v.duration;
        // Keep the gradient in sync immediately during drag (RAF is paused while dragging)
        if (input) {
          input.style.background = `linear-gradient(to right, var(--color-accent) ${val * 100}%, rgba(255,255,255,0.2) ${val * 100}%)`;
        }
        setControlsVisible(true);
      },
      []
    );

    const handleFullscreen = useCallback(() => {
      const el = containerRef.current;
      const v = videoRef.current;
      if (!el || !v) return;

      const doc = document as DocFS;
      const container = el as ElFS;
      const vid = v as VidFS;

      // Exit if already fullscreen (standard + webkit)
      if (document.fullscreenElement || doc.webkitFullscreenElement) {
        if (document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        } else {
          doc.webkitExitFullscreen?.();
        }
        return;
      }

      // Enter fullscreen — cascade for maximum device coverage:
      // 1. Standard API: Chrome/Firefox/Edge on Windows, Android, Linux, iPadOS 16.4+
      // 2. webkitRequestFullscreen: Safari on macOS
      // 3. webkitEnterFullscreen on <video>: iPhone Safari (divs cannot go fullscreen on iOS)
      //    Also used as rejection fallback for standard API (some Android WebViews)
      if (container.requestFullscreen) {
        container.requestFullscreen().catch(() => vid.webkitEnterFullscreen?.());
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      } else if (vid.webkitEnterFullscreen) {
        vid.webkitEnterFullscreen();
      }
    }, []);

    const handleVideoPlay = useCallback(() => {
      setIsPlaying(true);
      scheduleHide();
      startRAF();
    }, [scheduleHide, startRAF]);

    const handleVideoPause = useCallback(() => {
      setIsPlaying(false);
      setControlsVisible(true);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      stopRAF();
      // Snap scrubber to exact position on pause
      updateScrubber();
    }, [stopRAF, updateScrubber]);

    return (
      <div
        ref={containerRef}
        className={cn("relative", className)}
        onMouseMove={revealControls}
        onMouseLeave={() => {
          if (isPlaying) scheduleHide();
        }}
        onTouchStart={revealControls}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          loop={loop}
          playsInline={playsInline}
          preload={preload}
          disablePictureInPicture
          onPlay={handleVideoPlay}
          onPause={handleVideoPause}
          onContextMenu={onContextMenu}
          className={cn(videoClassName)}
        />

        {/* Frosted glass control bar — auto-hides when playing, always visible when paused */}
        <div
          className={cn(
            "absolute inset-x-0 bottom-0",
            "flex items-center gap-0.5 px-1",
            "min-h-[44px]",
            // Frosted glass — matches existing card/badge pattern (bg-black/60 backdrop-blur)
            "bg-black/60 backdrop-blur-md",
            // Auto-hide transition — respects prefers-reduced-motion
            "transition-opacity duration-300 motion-reduce:transition-none",
            controlsVisible ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          // Stop propagation so mouse movement over controls doesn't conflict with container
          onMouseMove={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Play / Pause */}
          <button
            type="button"
            aria-label={isPlaying ? "Pause" : "Play"}
            onClick={handlePlayPause}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-white/70 hover:text-white transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm"
          >
            {isPlaying ? (
              <Pause size={15} fill="currentColor" strokeWidth={0} />
            ) : (
              <Play size={15} fill="currentColor" strokeWidth={0} />
            )}
          </button>

          {/* Scrubber — uncontrolled, updated imperatively at 60fps via RAF */}
          <input
            ref={inputRef}
            type="range"
            min={0}
            max={1}
            step={0.001}
            defaultValue={0}
            onChange={handleSeek}
            onPointerDown={() => { isDraggingRef.current = true; }}
            onPointerUp={() => { isDraggingRef.current = false; }}
            aria-label="Seek"
            className={cn(
              "flex-1 h-[3px] cursor-pointer appearance-none rounded-full",
              // WebKit thumb
              "[&::-webkit-slider-thumb]:appearance-none",
              "[&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3",
              "[&::-webkit-slider-thumb]:rounded-full",
              "[&::-webkit-slider-thumb]:bg-accent",
              "[&::-webkit-slider-thumb]:shadow-sm",
              "[&::-webkit-slider-thumb]:cursor-pointer",
              // Firefox thumb
              "[&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3",
              "[&::-moz-range-thumb]:rounded-full",
              "[&::-moz-range-thumb]:bg-accent",
              "[&::-moz-range-thumb]:border-0",
              "[&::-moz-range-thumb]:cursor-pointer"
            )}
            style={{
              background: `linear-gradient(to right, var(--color-accent) 0%, rgba(255,255,255,0.2) 0%)`,
            }}
          />

          {/* Mute / Unmute */}
          <button
            type="button"
            aria-label={isMuted ? "Unmute" : "Mute"}
            onClick={handleMute}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-white/70 hover:text-white transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm"
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>

          {/* Fullscreen */}
          <button
            type="button"
            aria-label="Toggle fullscreen"
            onClick={handleFullscreen}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-white/70 hover:text-white transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm"
          >
            <Maximize2 size={15} />
          </button>
        </div>
      </div>
    );
  }
);

VideoPlayer.displayName = "VideoPlayer";
export default VideoPlayer;
