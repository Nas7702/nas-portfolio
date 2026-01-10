"use client";

// Meta Pixel (Facebook Pixel) event tracking utilities
// Get your Pixel ID from Meta Events Manager: https://business.facebook.com/events_manager

// Define the fbq function type for TypeScript
type FbqFunction = {
  (command: "init", pixelId: string): void;
  (command: "track", eventName: string, parameters?: Record<string, unknown>): void;
  (command: "trackCustom", eventName: string, parameters?: Record<string, unknown>): void;
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  loaded?: boolean;
  version?: string;
  push?: (...args: unknown[]) => void;
};

declare global {
  interface Window {
    fbq: FbqFunction;
    _fbq: FbqFunction;
  }
}

// Your Meta Pixel ID - Replace with your actual Pixel ID from Meta Business Suite
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";

/**
 * Check if the pixel is available
 */
function isFbqAvailable(): boolean {
  return typeof window !== "undefined" && typeof window.fbq === "function";
}

/**
 * Track standard Meta Pixel events
 * See all standard events: https://developers.facebook.com/docs/meta-pixel/reference
 */
export function trackMetaEvent(
  eventName: string,
  parameters?: Record<string, unknown>
): void {
  if (!isFbqAvailable()) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[meta-pixel] fbq not available, event skipped:", eventName);
    }
    return;
  }

  try {
    if (parameters) {
      window.fbq("track", eventName, parameters);
    } else {
      window.fbq("track", eventName);
    }

    if (process.env.NODE_ENV !== "production") {
      console.info("[meta-pixel]", eventName, parameters ?? {});
    }
  } catch (error) {
    console.error("[meta-pixel] Error tracking event:", error);
  }
}

/**
 * Track custom Meta Pixel events (for events not in the standard list)
 */
export function trackMetaCustomEvent(
  eventName: string,
  parameters?: Record<string, unknown>
): void {
  if (!isFbqAvailable()) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[meta-pixel] fbq not available, custom event skipped:", eventName);
    }
    return;
  }

  try {
    if (parameters) {
      window.fbq("trackCustom", eventName, parameters);
    } else {
      window.fbq("trackCustom", eventName);
    }

    if (process.env.NODE_ENV !== "production") {
      console.info("[meta-pixel:custom]", eventName, parameters ?? {});
    }
  } catch (error) {
    console.error("[meta-pixel] Error tracking custom event:", error);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Convenience functions for common conversion events
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Track a Lead event - use when someone submits a lead form
 */
export function trackLead(parameters?: {
  content_name?: string;
  content_category?: string;
  value?: number;
  currency?: string;
}): void {
  trackMetaEvent("Lead", parameters);
}

/**
 * Track a Contact event - use when someone initiates contact
 */
export function trackContact(): void {
  trackMetaEvent("Contact");
}

/**
 * Track a ViewContent event - use for important page views
 */
export function trackViewContent(parameters?: {
  content_name?: string;
  content_category?: string;
  content_type?: string;
  value?: number;
  currency?: string;
}): void {
  trackMetaEvent("ViewContent", parameters);
}

/**
 * Track a CompleteRegistration event
 */
export function trackCompleteRegistration(parameters?: {
  content_name?: string;
  status?: string;
  value?: number;
  currency?: string;
}): void {
  trackMetaEvent("CompleteRegistration", parameters);
}

/**
 * Track a Schedule event - use when someone books a call/meeting
 */
export function trackSchedule(): void {
  trackMetaEvent("Schedule");
}

/**
 * Track InitiateCheckout - if you ever add payments
 */
export function trackInitiateCheckout(parameters?: {
  content_name?: string;
  value?: number;
  currency?: string;
  num_items?: number;
}): void {
  trackMetaEvent("InitiateCheckout", parameters);
}

/**
 * Track a Purchase event - if you ever add payments
 */
export function trackPurchase(parameters: {
  value: number;
  currency: string;
  content_name?: string;
  content_type?: string;
  content_ids?: string[];
}): void {
  trackMetaEvent("Purchase", parameters);
}




