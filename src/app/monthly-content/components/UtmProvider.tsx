"use client";

import { useEffect, useCallback, useRef } from "react";
import { trackCta, type AnalyticsPayload } from "../../../lib/analytics";
import {
  captureUtm,
  getUtmPayload,
  appendUtmToHref,
  type UtmParams,
} from "../../../lib/utm";

// ────────────────────────────────────────────────────────────────────────────
// Event names for monthly-content page
// ────────────────────────────────────────────────────────────────────────────
export const MONTHLY_CONTENT_EVENTS = {
  WHATSAPP_CLICK: "monthly_content_cta_whatsapp_click",
  CONTACT_CLICK: "monthly_content_cta_contact_click",
  EXAMPLES_CLICK: "monthly_content_cta_examples_click",
  LEAD_INTENT: "monthly_content_lead_intent",
} as const;

export type CtaSource = "hero" | "mid" | "footer";

interface TrackPayload {
  source: CtaSource;
  href?: string;
}

// ────────────────────────────────────────────────────────────────────────────
// useMonthlyContentUtm hook
// - Captures UTMs on mount
// - Provides tracking helpers with UTM + route context
// ────────────────────────────────────────────────────────────────────────────
export function useMonthlyContentUtm() {
  const capturedRef = useRef(false);

  // Capture UTMs on mount (once)
  useEffect(() => {
    if (!capturedRef.current) {
      captureUtm();
      capturedRef.current = true;
    }
  }, []);

  // Build payload with route, source, href, and UTMs
  const buildPayload = useCallback(
    (base: TrackPayload): AnalyticsPayload => {
      const utmFields = getUtmPayload();
      return {
        route: "/monthly-content",
        source: base.source,
        ...(base.href ? { href: base.href } : {}),
        ...utmFields,
      };
    },
    []
  );

  // Track WhatsApp CTA click
  const trackWhatsAppClick = useCallback(
    (source: CtaSource, href: string) => {
      trackCta(MONTHLY_CONTENT_EVENTS.WHATSAPP_CLICK, buildPayload({ source, href }));
    },
    [buildPayload]
  );

  // Track Contact CTA click
  const trackContactClick = useCallback(
    (source: CtaSource, href: string) => {
      trackCta(MONTHLY_CONTENT_EVENTS.CONTACT_CLICK, buildPayload({ source, href }));
    },
    [buildPayload]
  );

  // Track Examples CTA click
  const trackExamplesClick = useCallback(
    (source: CtaSource, href: string) => {
      trackCta(MONTHLY_CONTENT_EVENTS.EXAMPLES_CLICK, buildPayload({ source, href }));
    },
    [buildPayload]
  );

  // Track lead intent (form focus or WhatsApp open)
  const trackLeadIntent = useCallback(
    (source: CtaSource) => {
      trackCta(MONTHLY_CONTENT_EVENTS.LEAD_INTENT, buildPayload({ source }));
    },
    [buildPayload]
  );

  return {
    // Tracking functions
    trackWhatsAppClick,
    trackContactClick,
    trackExamplesClick,
    trackLeadIntent,
    // Helpers
    getUtmPayload,
    appendUtmToHref,
  };
}

// Re-export for convenience
export { getUtmPayload, appendUtmToHref, type UtmParams };

