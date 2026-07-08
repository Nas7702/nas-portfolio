"use client";

import Link from "next/link";
import { Instagram, Mail, MessageCircle } from "lucide-react";
import { trackCta } from "../../lib/analytics";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/create", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const CONTACT_LINKS = [
  {
    href: "mailto:hello@nascreate.com",
    label: "hello@nascreate.com",
    icon: Mail,
    cta: "footer_email",
    external: false,
  },
  {
    href: "https://wa.me/447475437833",
    label: "WhatsApp",
    icon: MessageCircle,
    cta: "footer_whatsapp",
    external: true,
  },
  {
    href: "https://instagram.com/nas.create",
    label: "@nas.create",
    icon: Instagram,
    cta: "footer_instagram",
    external: true,
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-background">
      <div aria-hidden="true" className="hairline" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-12">
          {/* Brand */}
          <div>
            <p className="text-cine text-2xl text-foreground mb-3">Nas Create</p>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Commercial video and photography, built around results. Brand
              films, Meta ads and event coverage.
            </p>
          </div>

          {/* Explore */}
          <nav aria-label="Footer navigation">
            <p className="eyebrow mb-4">Explore</p>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="eyebrow mb-4">Get in Touch</p>
            <ul className="space-y-2.5">
              {CONTACT_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.cta}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                      onClick={(e) =>
                        trackCta(link.cta, { href: e.currentTarget.href })
                      }
                    >
                      <Icon size={14} className="text-accent/70" />
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground/70">
            Based in Yorkshire &middot; Working across the UK
          </p>
          <p className="text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground/70">
            &copy; {year} Nas Create
          </p>
        </div>
      </div>
    </footer>
  );
}
