"use client";

import Link from "next/link";
import { trackCta } from "../../lib/analytics";

type CreativeCTAProps = {
  source?: string;
  className?: string;
  size?: "md" | "sm";
};

export default function CreativeCTA({
  source = "creative_footer",
  className = "",
  size = "md",
}: CreativeCTAProps) {
  const whatsappHref = `/contact?src=${encodeURIComponent(source)}#whatsapp`;
  const contactHref = `/contact?src=${encodeURIComponent(source)}`;

  const primaryBase =
    "group inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500 font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all duration-200 hover:shadow-emerald-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900";
  const secondaryBase =
    "inline-flex items-center justify-center rounded-2xl border border-border bg-transparent font-semibold text-foreground/70 transition-all duration-200 hover:border-emerald-500/60 hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-white/10 dark:text-gray-200 dark:hover:border-emerald-400/60 dark:hover:text-emerald-300";

  const sizeClasses = size === "sm" ? { p: "px-5 py-3 text-sm", p2: "px-5 py-3 text-sm" } : { p: "px-6 py-4 text-base", p2: "px-6 py-4 text-base" };

  return (
    <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 ${className}`}>
      <Link
        href={whatsappHref}
        aria-label="WhatsApp Chat (fastest)"
        data-cta={`${source}_whatsapp`}
        className={`${primaryBase} ${sizeClasses.p}`}
        onClick={(e) => {
          const target = e.currentTarget as HTMLAnchorElement;
          trackCta(`${source}_whatsapp`, { href: target.href });
        }}
      >
        WhatsApp Chat (fastest)
      </Link>
      <Link
        href={contactHref}
        aria-label="Go to Contact"
        data-cta={`${source}_contact`}
        className={`${secondaryBase} ${sizeClasses.p2}`}
        onClick={(e) => {
          const target = e.currentTarget as HTMLAnchorElement;
          trackCta(`${source}_contact`, { href: target.href });
        }}
      >
        Go to Contact
      </Link>
    </div>
  );
}


