"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import PageTransition from "../components/PageTransition";
import { motion } from "framer-motion";
import { Calendar, Check, Instagram, Mail, MapPin, MessageCircle, ArrowRight } from "lucide-react";
import { trackCta } from "../../lib/analytics";

const WHATSAPP_BASE = "https://wa.me/447475437833";
const CALENDLY_URL = "https://calendly.com/nas-create0/30min";
const EMAIL_URL =
  "mailto:hello@nascreate.com?subject=New%20enquiry%20from%20nascreate.com&body=Hi%20Nas%2C%0AProject%20type%3A%20%5BVideo%2FPhoto%2FEvent%5D%0ABudget%3A%20%5B%5D%0ATimeline%3A%20%5B%5D%0ALinks%3A%20%5B%5D";
const INSTAGRAM_URL = "https://instagram.com/nas.create";

const SERVICES = ["videography", "photography", "post-production", "color-grading"] as const;
type Service = typeof SERVICES[number];

const SERVICE_LABELS: Record<Service, string> = {
  "videography": "Videography",
  "photography": "Photography",
  "post-production": "Post-production",
  "color-grading": "Colour Grading",
};

function ContactPageInner() {
  const searchParams = useSearchParams();
  const [copied, setCopied] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(null), 1400);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  const handleCopy = async (value: string, id: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch (error) {
      console.error("Clipboard copy failed", error);
    } finally {
      setCopied(id);
    }
  };

  useEffect(() => {
    const service = searchParams?.get("service") as Service | null;
    if (service && SERVICES.includes(service)) setSelectedService(service);
  }, [searchParams]);

  const whatsappHref = useMemo(() => {
    const serviceText = selectedService ? selectedService.replace("-", " ") : "[service]";
    const text = `Hi Nas, I'm interested in ${serviceText}. Budget: [] Timeline: []`;
    const q = new URLSearchParams({ text });
    return `${WHATSAPP_BASE}?${q.toString()}`;
  }, [selectedService]);

  const calendlyEmbedHref = useMemo(() => {
    const params = new URLSearchParams({
      "hide_event_type_details": "1",
      "hide_gdpr_banner": "1",
    });
    if (selectedService) {
      params.set("utm_content", selectedService);
    }
    return `${CALENDLY_URL}?${params.toString()}`;
  }, [selectedService]);

  const selectedServiceHint = selectedService
    ? ` for ${SERVICE_LABELS[selectedService].toLowerCase()}`
    : "";

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-32 pt-24 px-6">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-14"
          >
            <h1 className="font-display font-light text-6xl md:text-8xl tracking-tight text-foreground mb-5">
              Let&apos;s Talk
            </h1>
            <p className="text-lg text-muted-foreground">
              Got a project in mind? Book a free call and let&apos;s talk through exactly what you need.
            </p>
          </motion.div>

          {/* Service chips */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-10"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground text-center mb-4">
              What are you after?
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {SERVICES.map((service) => {
                const active = selectedService === service;
                return (
                  <button
                    key={service}
                    onClick={() => setSelectedService(active ? null : service)}
                    className={`px-4 py-2 rounded-sm text-sm font-medium border transition-all duration-200 ${
                      active
                        ? "bg-accent border-accent text-accent-foreground"
                        : "bg-card border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                    }`}
                  >
                    {SERVICE_LABELS[service]}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Booking and contact cards */}
          <div className="space-y-3">

            {/* Calendly — inline primary booking block */}
            <motion.section
              id="calendly"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="rounded-sm bg-card border border-border p-4 sm:p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 mb-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="p-3 rounded-sm bg-accent text-accent-foreground shrink-0">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-0.5">Free Discovery Call</div>
                    <div className="font-semibold text-lg text-foreground">Book a free 30-minute call</div>
                    <div className="text-sm mt-1 text-muted-foreground">
                      We&apos;ll talk through exactly what you need{selectedServiceHint}.
                    </div>
                  </div>
                </div>
                <a
                  href={calendlyEmbedHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-sm bg-accent text-accent-foreground px-4 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
                  onClick={(e) =>
                    trackCta("contact_calendly_primary", {
                      href: e.currentTarget.href,
                      service: selectedService ?? "none",
                    })
                  }
                >
                  Open in new tab
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <div className="rounded-sm border border-border overflow-hidden bg-background">
                <iframe
                  title="Book a free call with Nas.Create"
                  src={calendlyEmbedHref}
                  className="w-full h-[760px] md:h-[720px]"
                />
              </div>

              <p className="text-xs text-muted-foreground mt-3">
                Prefer messaging first? WhatsApp is just below.
              </p>
            </motion.section>

            {/* WhatsApp — fast secondary option */}
            <motion.a
              href={whatsappHref}
              id="whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="group flex items-center p-6 rounded-sm bg-card border border-border hover:border-primary/50 transition-all duration-300"
              onClick={(e) =>
                trackCta("contact_whatsapp_secondary", {
                  href: e.currentTarget.href,
                  service: selectedService ?? "none",
                })
              }
            >
              <div className="p-3 rounded-sm bg-secondary mr-4">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="flex-grow">
                <div className="text-sm font-medium text-muted-foreground mb-0.5">WhatsApp</div>
                <div className="font-semibold text-lg text-foreground">+44 7475 437833</div>
              </div>
              <ArrowRight className="text-muted-foreground transform transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </motion.a>

            {/* Email + Instagram — 2-col grid */}
            <div className="grid sm:grid-cols-2 gap-3">

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="group relative flex items-center p-5 rounded-sm bg-card border border-border hover:border-primary/50 transition-all duration-300"
              >
                <a
                  href={EMAIL_URL}
                  className="absolute inset-0 z-10"
                  target="_blank"
                  rel="noopener noreferrer"
                />
                <div className="p-3 rounded-sm bg-secondary mr-4 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="text-xs font-medium text-muted-foreground mb-0.5">Email</div>
                  <div className="font-semibold text-sm truncate">hello@nascreate.com</div>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleCopy("hello@nascreate.com", "email");
                  }}
                  className="relative z-20 p-2 hover:bg-secondary rounded-full transition-colors ml-2 shrink-0"
                >
                  {copied === "email" ? <Check size={16} /> : <span className="text-xs font-medium px-1">Copy</span>}
                </button>
              </motion.div>

              {/* Instagram */}
              <motion.a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="group flex items-center p-5 rounded-sm bg-card border border-border hover:border-primary/50 transition-all duration-300"
              >
                <div className="p-3 rounded-sm bg-secondary mr-4 shrink-0">
                  <Instagram className="w-5 h-5" />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="text-xs font-medium text-muted-foreground mb-0.5">Instagram</div>
                  <div className="font-semibold text-sm">@nas.create</div>
                </div>
                <ArrowRight className="text-muted-foreground transform transition-transform group-hover:translate-x-1 group-hover:text-primary shrink-0" />
              </motion.a>

            </div>
          </div>

          {/* Location badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="flex items-center justify-center gap-2 mt-10 text-sm text-muted-foreground"
          >
            <MapPin className="w-4 h-4" />
            <span>Based in the UK &middot; Available for remote work worldwide</span>
          </motion.div>

        </div>
      </div>
    </PageTransition>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={null}>
      <ContactPageInner />
    </Suspense>
  );
}
