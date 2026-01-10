"use client";

import Link from "next/link";
import { trackCta } from "../../../lib/analytics";

type LandingCTAProps = {
  source?: string;
  className?: string;
  size?: "md" | "sm";
};

export default function LandingCTA({
  source = "landing_footer",
  className = "",
  size = "md",
}: LandingCTAProps) {
  const whatsappHref = `/contact?src=${encodeURIComponent(source)}#whatsapp`;
  const contactHref = `/contact?src=${encodeURIComponent(source)}`;

  const sizeClasses = size === "sm"
    ? { p: "px-5 py-3 text-sm", p2: "px-5 py-3 text-sm" }
    : { p: "px-7 py-4 text-base", p2: "px-7 py-4 text-base" };

  return (
    <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 ${className}`}>
      <Link
        href={whatsappHref}
        aria-label="WhatsApp Chat (fastest)"
        data-cta={`${source}_whatsapp`}
        className={`group inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 font-semibold text-white shadow-lg shadow-emerald-600/25 transition-all duration-200 hover:shadow-emerald-600/40 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${sizeClasses.p}`}
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
        className={`inline-flex items-center justify-center rounded-2xl border-2 border-neutral-300 bg-transparent font-semibold text-neutral-700 transition-all duration-200 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${sizeClasses.p2}`}
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






