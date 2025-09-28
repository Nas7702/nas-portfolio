"use client";

export type AnalyticsPayload = Record<string, unknown> | undefined;

export function trackCta(event: string, payload?: AnalyticsPayload): void {
  try {
    // Lightweight, safe stub for production
    // Replace with your analytics provider if available
    // eslint-disable-next-line no-console
    console.info("[cta]", event, payload ?? {});
  } catch {
    // no-op
  }
}


