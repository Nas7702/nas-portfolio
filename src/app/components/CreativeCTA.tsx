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
  const calendlyHref = `/contact?src=${encodeURIComponent(source)}#calendly`;
  const whatsappHref = `/contact?src=${encodeURIComponent(source)}#whatsapp`;

  const primaryBase =
    "group inline-flex items-center justify-center gap-3 rounded-sm bg-accent font-semibold text-accent-foreground shadow-lg shadow-black/25 transition-all duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background";
  const secondaryBase =
    "inline-flex items-center justify-center rounded-sm border border-border bg-transparent font-semibold text-foreground/70 transition-all duration-200 hover:border-accent/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-white/10 dark:text-gray-200";

  const sizeClasses = size === "sm" ? { p: "px-5 py-3 text-sm", p2: "px-5 py-3 text-sm" } : { p: "px-6 py-4 text-base", p2: "px-6 py-4 text-base" };

  return (
    <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 ${className}`}>
      <Link
        href={calendlyHref}
        aria-label="Book a free discovery call"
        data-cta={`${source}_calendly`}
        className={`${primaryBase} ${sizeClasses.p}`}
        onClick={(e) => {
          const target = e.currentTarget as HTMLAnchorElement;
          trackCta(`${source}_calendly`, { href: target.href });
        }}
      >
        Book a free call
      </Link>
      <Link
        href={whatsappHref}
        aria-label="Open WhatsApp option"
        data-cta={`${source}_whatsapp`}
        className={`${secondaryBase} ${sizeClasses.p2}`}
        onClick={(e) => {
          const target = e.currentTarget as HTMLAnchorElement;
          trackCta(`${source}_whatsapp`, { href: target.href });
        }}
      >
        WhatsApp instead
      </Link>
    </div>
  );
}
