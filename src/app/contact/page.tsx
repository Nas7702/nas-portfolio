'use client';
import { useEffect, useState } from "react";
import PageTransition from "../components/PageTransition";
import ScrollReveal from "../components/ScrollReveal";
import { Check, Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
const WHATSAPP_URL =
  "https://wa.me/447475437833?text=Hi%20Nas%2C%20I%E2%80%99m%20interested%20in%20[service].%20Budget%3A%20%5B%5D%20Timeline%3A%20%5B%5D";
const CALL_URL = "tel:+447475437833";
const EMAIL_URL =
  "mailto:nascreate0@gmail.com?subject=New%20enquiry%20from%20nascreate.com&body=Hi%20Nas%2C%0AProject%20type%3A%20%5BTech%2FVideo%5D%0ABudget%3A%20%5B%5D%0ATimeline%3A%20%5B%5D%0ALinks%3A%20%5B%5D";
const INSTAGRAM_URL = "https://instagram.com/nas.create";
const quickActions = [
  { label: "WhatsApp", href: WHATSAPP_URL, icon: MessageCircle, aria: "Start WhatsApp chat" },
  { label: "Call", href: CALL_URL, icon: Phone, aria: "Call Nas" },
  { label: "Email", href: EMAIL_URL, icon: Mail, aria: "Email Nas" },
  { label: "Instagram", href: INSTAGRAM_URL, icon: Instagram, aria: "Open Instagram" },
];
const secondaryActions = quickActions.slice(1);
const gridItems = [
  {
    title: "Phone",
    value: "+44 7475 437833",
    caption: "Weekdays 10:00–19:00",
    icon: Phone,
    href: CALL_URL,
    copyValue: "+44 7475 437833",
    id: "phone",
  },
  {
    title: "Email",
    value: "nascreate0@gmail.com",
    caption: "Detailed briefs welcome",
    icon: Mail,
    href: EMAIL_URL,
    copyValue: "nascreate0@gmail.com",
    id: "email",
  },
  {
    title: "Instagram",
    value: "@nas.create",
    caption: "DMs open",
    icon: Instagram,
    href: INSTAGRAM_URL,
    copyValue: "@nas.create",
    id: "instagram",
  },
  {
    title: "Location",
    value: "UK • Remote/Local",
    caption: "Typically replies < 24h",
    icon: MapPin,
    id: "location",
  },
];
export default function ContactPage() {
  const [copied, setCopied] = useState<string | null>(null);
  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(null), 1400);
    return () => window.clearTimeout(timeout);
  }, [copied]);
  const handleCopy = async (value: string, id: string) => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(value);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = value;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
    } catch (error) {
      console.error("Clipboard copy failed", error);
    } finally {
      setCopied(id);
    }
  };
  return (
    <PageTransition>
      <div className="relative min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
        <div
          role="status"
          aria-live="polite"
          aria-hidden={!copied}
          className={`pointer-events-none fixed left-1/2 top-4 z-30 -translate-x-1/2 transform rounded-full bg-gray-900/95 px-4 py-2 text-sm font-semibold text-gray-100 shadow-lg transition-all duration-200 sm:top-6 dark:bg-gray-800/90 ${copied ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"}`}
        >
          Copied!
        </div>
        <div className="mx-auto flex max-w-5xl flex-col gap-16 px-6 pb-28 pt-24 sm:pb-32 md:gap-20 md:px-8 md:pt-32">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="space-y-4 text-center">
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Start a conversation.</h1>
              <p className="text-base text-gray-600 dark:text-gray-300">Fastest reply via WhatsApp. Email works too.</p>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg reply &lt; 24h • UK (GMT/BST)</p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <div className="rounded-3xl border border-gray-200/40 bg-white/80 p-8 shadow-xl backdrop-blur-lg transition-colors dark:border-white/10 dark:bg-gray-900/70 dark:shadow-emerald-500/10">
              <div className="flex flex-col gap-6">
                <a
                  href={WHATSAPP_URL}
                  aria-label="Start WhatsApp chat"
                  className="group flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500 px-6 py-5 text-lg font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all duration-200 hover:shadow-emerald-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900"
                >
                  <MessageCircle className="size-5 transition-transform group-hover:scale-110" aria-hidden="true" />
                  WhatsApp Chat (fastest)
                </a>
                <div className="grid gap-3 sm:grid-cols-3">
                  {secondaryActions.map(({ label, href, icon: Icon, aria }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={aria}
                      className="flex items-center justify-center gap-2 rounded-2xl border border-gray-200/50 bg-transparent px-4 py-4 text-sm font-semibold text-gray-700 transition-all duration-200 hover:border-emerald-300 hover:text-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/10 dark:text-gray-200 dark:hover:border-emerald-400/60 dark:hover:text-emerald-300 dark:focus-visible:ring-offset-gray-900"
                    >
                      <Icon className="size-4" aria-hidden="true" />
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.3}>
            <div className="grid gap-4 sm:grid-cols-2">
              {gridItems.map(({ title, value, caption, icon: Icon, href, copyValue, id }) => (
                <div
                  key={title}
                  className="group rounded-2xl border border-gray-200/40 bg-white/70 p-5 shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-gray-900/60 dark:hover:shadow-emerald-500/10"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-500 dark:bg-emerald-400/10 dark:text-emerald-300">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">{title}</p>
                        {href ? (
                          <a
                            href={href}
                            className="text-lg font-semibold text-gray-900 transition-colors hover:text-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-gray-100 dark:hover:text-emerald-300 dark:focus-visible:ring-offset-gray-900"
                          >
                            {value}
                          </a>
                        ) : (
                          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{value}</p>
                        )}
                      </div>
                    </div>
                    {copyValue && (
                      <button
                        type="button"
                        onClick={() => handleCopy(copyValue, id!)}
                        aria-label={`Copy ${title}`}
                        className={`flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900 ${
                          copied === id
                            ? "border-emerald-400/80 text-emerald-500"
                            : "border-gray-200/60 text-gray-600 hover:border-emerald-300 hover:text-emerald-500 dark:border-white/10 dark:text-gray-300 dark:hover:border-emerald-400/60 dark:hover:text-emerald-300"
                        }`}
                      >
                        {copied === id ? (
                          <>
                            <Check className="size-3.5" aria-hidden="true" />
                            Copied
                          </>
                        ) : (
                          "Copy"
                        )}
                      </button>
                    )}
                  </div>
                  <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">{caption}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.35}>
            <p className="text-center text-xs font-medium text-gray-500 dark:text-gray-400">Prefer email? I reply within 24h.</p>
          </ScrollReveal>
        </div>
        <nav className="md:hidden" aria-label="Quick contact actions">
          <div
            className="fixed inset-x-4 bottom-4 z-40 rounded-3xl border border-gray-200/60 bg-white/95 shadow-xl backdrop-blur-lg dark:border-white/10 dark:bg-gray-900/95"
            style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 0.5rem)" }}
          >
            <div className="grid grid-cols-4 gap-1">
              {quickActions.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex flex-col items-center gap-1 rounded-2xl px-2 py-3 text-xs font-semibold text-gray-600 transition-colors hover:text-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-gray-200 dark:hover:text-emerald-300 dark:focus-visible:ring-offset-gray-900"
                >
                  <Icon className="size-5" aria-hidden="true" />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </PageTransition>
  );
}
