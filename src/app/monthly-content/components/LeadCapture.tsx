"use client";

import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { trackCta } from "../../../lib/analytics";
import AnalyticsLink from "../../components/AnalyticsLink";

const WHATSAPP_BASE = "https://wa.me/447475437833";

interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

function getUTMParams(): UTMParams {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
  const result: UTMParams = {};
  for (const key of utmKeys) {
    const value = params.get(key);
    if (value) result[key] = value;
  }
  return result;
}

function formatUTMString(utms: UTMParams): string {
  const entries = Object.entries(utms).filter(([, v]) => v);
  if (entries.length === 0) return "";
  return entries.map(([k, v]) => `${k.replace("utm_", "")}: ${v}`).join(", ");
}

export default function LeadCapture() {
  const [formData, setFormData] = useState({
    name: "",
    business: "",
    email: "",
    message: "",
    company_website: "", // honeypot
  });
  const [utms, setUtms] = useState<UTMParams>({});

  useEffect(() => {
    setUtms(getUTMParams());
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check - if filled, silently reject
    if (formData.company_website) {
      console.info("[honeypot] Spam submission blocked");
      return;
    }

    // Build WhatsApp message
    const lines = [
      `Hi Nas! I'm interested in your monthly content service.`,
      ``,
      `*Name:* ${formData.name}`,
      `*Business:* ${formData.business}`,
    ];

    if (formData.email) {
      lines.push(`*Email:* ${formData.email}`);
    }

    if (formData.message) {
      lines.push(``, `*Message:*`, formData.message);
    }

    const utmString = formatUTMString(utms);
    if (utmString) {
      lines.push(``, `---`, `Source: ${utmString}`);
    }

    const text = lines.join("\n");
    const whatsappUrl = `${WHATSAPP_BASE}?text=${encodeURIComponent(text)}`;

    // Track the intent
    trackCta("monthly_content_lead_intent", {
      channel: "whatsapp",
      has_email: formData.email ? true : false,
      has_message: formData.message ? true : false,
      ...utms,
    });

    // Open WhatsApp
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 max-w-md mx-auto">
      <h3 className="text-xl font-bold text-foreground mb-2">
        Ready to get started?
      </h3>
      <p className="text-muted-foreground text-sm mb-6">
        Fill out the form and message me directly on WhatsApp.
        <span className="block mt-1 text-xs text-muted-foreground/70">
          Usually replies within 24h.
        </span>
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot - hidden from users */}
        <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
          <label htmlFor="company_website">Website</label>
          <input
            type="text"
            id="company_website"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
            value={formData.company_website}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="lead_name"
            className="text-sm font-medium text-muted-foreground"
          >
            Name <span className="text-accent">*</span>
          </label>
          <input
            id="lead_name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-secondary/50 border border-transparent focus:border-accent focus:bg-background rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 transition-all outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="lead_business"
            className="text-sm font-medium text-muted-foreground"
          >
            Business <span className="text-accent">*</span>
          </label>
          <input
            id="lead_business"
            name="business"
            type="text"
            required
            placeholder="Your business or brand"
            value={formData.business}
            onChange={handleChange}
            className="w-full bg-secondary/50 border border-transparent focus:border-accent focus:bg-background rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 transition-all outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="lead_email"
            className="text-sm font-medium text-muted-foreground"
          >
            Email{" "}
            <span className="text-muted-foreground/50 font-normal">
              (optional but recommended)
            </span>
          </label>
          <input
            id="lead_email"
            name="email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-secondary/50 border border-transparent focus:border-accent focus:bg-background rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 transition-all outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="lead_message"
            className="text-sm font-medium text-muted-foreground"
          >
            Message{" "}
            <span className="text-muted-foreground/50 font-normal">
              (optional)
            </span>
          </label>
          <textarea
            id="lead_message"
            name="message"
            rows={3}
            placeholder="Tell me about your content needs..."
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-secondary/50 border border-transparent focus:border-accent focus:bg-background rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 transition-all outline-none resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#22c55e] text-white font-semibold rounded-xl py-3.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-card"
        >
          <MessageCircle size={20} />
          Message on WhatsApp
        </button>
      </form>

      <div className="mt-4 text-center">
        <AnalyticsLink
          href="/contact?src=monthly_content_form"
          event="monthly_content_cta_contact_click"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
        >
          Prefer email?
        </AnalyticsLink>
      </div>
    </div>
  );
}

