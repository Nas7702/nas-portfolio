"use client";

import { useEffect, useState } from "react";
import { useFPS } from "@/hooks/useFPS";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";

const STORAGE_KEY = "nas-debug-fps";

function getDebugFlagFromRuntime(): boolean {
  if (typeof window === "undefined") return false;

  try {
    const params = new URLSearchParams(window.location.search);
    const param = params.get("debugFps");

    if (param === "1") {
      localStorage.setItem(STORAGE_KEY, "1");
      return true;
    }

    if (param === "0") {
      localStorage.removeItem(STORAGE_KEY);
      return false;
    }

    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export default function DebugFpsCounter() {
  const [enabled, setEnabled] = useState(false);
  const fps = useFPS(enabled);
  const mode = usePerformanceMode();

  useEffect(() => {
    setEnabled(getDebugFlagFromRuntime());
  }, []);

  if (!enabled) return null;

  return (
    <div className="fixed bottom-4 left-4 z-[120] rounded-md border border-foreground/20 bg-background/85 px-3 py-2 text-[11px] font-mono text-foreground shadow-lg backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <span>FPS: {fps}</span>
        <span>mode: {mode}</span>
        <button
          type="button"
          onClick={() => {
            try {
              localStorage.removeItem(STORAGE_KEY);
            } catch {
              // no-op
            }
            setEnabled(false);
          }}
          className="rounded border border-foreground/20 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground hover:text-foreground"
        >
          hide
        </button>
      </div>
    </div>
  );
}
