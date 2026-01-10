"use client";

import type { AllowedPropertyValue } from "./analytics";

// ────────────────────────────────────────────────────────────────────────────
// UTM Constants
// ────────────────────────────────────────────────────────────────────────────
export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export type UtmKey = (typeof UTM_KEYS)[number];
export type UtmParams = Partial<Record<UtmKey, string>>;

const STORAGE_KEY = "nas_utm";
const TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

interface StoredUtm {
  params: UtmParams;
  timestamp: number;
}

// ────────────────────────────────────────────────────────────────────────────
// Parse UTMs from URL (client-side only)
// ────────────────────────────────────────────────────────────────────────────
export function parseUtmFromUrl(): UtmParams {
  if (typeof window === "undefined") return {};

  const searchParams = new URLSearchParams(window.location.search);
  const params: UtmParams = {};

  for (const key of UTM_KEYS) {
    const value = searchParams.get(key);
    if (value) {
      params[key] = value;
    }
  }

  return params;
}

// ────────────────────────────────────────────────────────────────────────────
// localStorage helpers with 7-day TTL
// ────────────────────────────────────────────────────────────────────────────
function getStoredUtm(): UtmParams {
  if (typeof window === "undefined") return {};

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};

    const stored: StoredUtm = JSON.parse(raw);
    const age = Date.now() - stored.timestamp;

    // Expired – clear and return empty
    if (age > TTL_MS) {
      localStorage.removeItem(STORAGE_KEY);
      return {};
    }

    return stored.params;
  } catch {
    return {};
  }
}

function storeUtm(params: UtmParams): void {
  if (typeof window === "undefined") return;
  if (Object.keys(params).length === 0) return;

  try {
    const stored: StoredUtm = {
      params,
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // localStorage unavailable or quota exceeded – no-op
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Capture UTMs: parse from URL (if present) and persist, or return stored
// ────────────────────────────────────────────────────────────────────────────
export function captureUtm(): UtmParams {
  const fromUrl = parseUtmFromUrl();

  // If URL has UTMs, store them (overwrites existing)
  if (Object.keys(fromUrl).length > 0) {
    storeUtm(fromUrl);
    return fromUrl;
  }

  // Otherwise return stored (may be empty)
  return getStoredUtm();
}

// ────────────────────────────────────────────────────────────────────────────
// getUtmPayload: returns current UTM object (from storage) or {}
// Compatible with AnalyticsPayload
// ────────────────────────────────────────────────────────────────────────────
export function getUtmPayload(): Record<string, AllowedPropertyValue> {
  const params = getStoredUtm();
  const payload: Record<string, AllowedPropertyValue> = {};

  for (const key of UTM_KEYS) {
    if (params[key]) {
      payload[key] = params[key] as string;
    }
  }

  return payload;
}

// ────────────────────────────────────────────────────────────────────────────
// appendUtmToHref: merge current UTMs into href without duplicating
// ────────────────────────────────────────────────────────────────────────────
export function appendUtmToHref(href: string): string {
  if (typeof window === "undefined") return href;

  const params = getStoredUtm();
  if (Object.keys(params).length === 0) return href;

  try {
    const url = new URL(href, window.location.origin);

    for (const key of UTM_KEYS) {
      const value = params[key];
      // Only add if not already present in href
      if (value && !url.searchParams.has(key)) {
        url.searchParams.set(key, value);
      }
    }

    // Return full URL for external links, pathname+search for internal
    if (url.origin !== window.location.origin) {
      return url.toString();
    }
    return url.pathname + url.search + url.hash;
  } catch {
    // Invalid URL – return as-is
    return href;
  }
}






