"use client";

import { track } from "@vercel/analytics";
import { trackMetaCustomEvent, trackLead } from "./meta-pixel";

type AllowedPropertyValue = string | number | boolean | null;
export type AnalyticsPayload = Record<string, AllowedPropertyValue> | undefined;

/**
 * Track CTA events to both Vercel Analytics and Meta Pixel
 */
export function trackCta(event: string, payload?: AnalyticsPayload): void {
  try {
    const props: Record<string, AllowedPropertyValue> = payload ?? {};

    // Track to Vercel Analytics
    track(event, props);

    // Track to Meta Pixel as custom event
    // Convert payload to Meta-compatible format (remove null values)
    const metaPayload: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(props)) {
      if (value !== null) {
        metaPayload[key] = value;
      }
    }
    trackMetaCustomEvent(event, metaPayload);

    if (process.env.NODE_ENV !== "production") {
      console.info("[cta]", event, props);
    }
  } catch {
    // no-op
  }
}

/**
 * Track a lead conversion - fires to both Vercel and Meta Pixel as a Lead event
 * Use this for form submissions that represent potential customers
 */
export function trackLeadConversion(
  event: string,
  payload?: AnalyticsPayload & {
    content_name?: string;
    content_category?: string;
    value?: number;
    currency?: string;
  }
): void {
  try {
    const props: Record<string, AllowedPropertyValue> = payload ?? {};

    // Track to Vercel Analytics
    track(event, props);

    // Track to Meta Pixel as a standard Lead event (optimized for Meta ad campaigns)
    trackLead({
      content_name: payload?.content_name,
      content_category: payload?.content_category,
      value: payload?.value,
      currency: payload?.currency,
    });

    if (process.env.NODE_ENV !== "production") {
      console.info("[lead]", event, props);
    }
  } catch {
    // no-op
  }
}
