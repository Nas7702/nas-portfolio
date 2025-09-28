"use client";

import { track } from "@vercel/analytics";

type AllowedPropertyValue = string | number | boolean | null;
export type AnalyticsPayload = Record<string, AllowedPropertyValue> | undefined;

export function trackCta(event: string, payload?: AnalyticsPayload): void {
  try {
    const props: Record<string, AllowedPropertyValue> = payload ?? {};
    track(event, props);
    if (process.env.NODE_ENV !== "production") {
      console.info("[cta]", event, props);
    }
  } catch {
    // no-op
  }
}


