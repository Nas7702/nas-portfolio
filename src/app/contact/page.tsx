"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import PageTransition from "../components/PageTransition";
import { motion } from "framer-motion";
import { Check, Instagram, Mail, MapPin, MessageCircle, ArrowRight } from "lucide-react";

const WHATSAPP_BASE = "https://wa.me/447475437833";
const EMAIL_URL =
  "mailto:nascreate0@gmail.com?subject=New%20enquiry%20from%20nascreate.com&body=Hi%20Nas%2C%0AProject%20type%3A%20%5BVideo%2FPhoto%2FEvent%5D%0ABudget%3A%20%5B%5D%0ATimeline%3A%20%5B%5D%0ALinks%3A%20%5B%5D";
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
              Got a project in mind? Pick a service and let's talk it through.
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

          {/* Contact cards */}
          <div className="space-y-3">

            {/* WhatsApp — primary full-width */}
            <motion.a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="group flex items-center p-6 rounded-sm bg-green-600 border border-green-600 text-white shadow-lg shadow-green-500/20 hover:bg-green-700 transition-all duration-300"
            >
              <div className="p-3 rounded-sm bg-white/10 mr-4">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="flex-grow">
                <div className="text-sm font-medium text-green-100 mb-0.5">WhatsApp</div>
                <div className="font-semibold text-lg">+44 7475 437833</div>
              </div>
              <ArrowRight className="text-white transform transition-transform group-hover:translate-x-1" />
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
                  <div className="font-semibold text-sm truncate">nascreate0@gmail.com</div>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleCopy("nascreate0@gmail.com", "email");
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
