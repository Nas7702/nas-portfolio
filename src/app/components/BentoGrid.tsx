"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Camera, User, Mail, Instagram, Clapperboard, Palette, Trophy } from "lucide-react";

function SpotlightCard({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  const [pos, setPos] = useState({ x: 0, y: 0, show: false });
  return (
    <Link
      href={href}
      className={className}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top, show: true });
      }}
      onMouseLeave={() => setPos((p) => ({ ...p, show: false }))}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-500"
        style={{
          opacity: pos.show ? 1 : 0,
          background: `radial-gradient(280px circle at ${pos.x}px ${pos.y}px, rgba(0,200,150,0.12), transparent 65%)`,
        }}
      />
      {children}
    </Link>
  );
}

function SpotlightAnchor({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  const [pos, setPos] = useState({ x: 0, y: 0, show: false });
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top, show: true });
      }}
      onMouseLeave={() => setPos((p) => ({ ...p, show: false }))}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-500"
        style={{
          opacity: pos.show ? 1 : 0,
          background: `radial-gradient(280px circle at ${pos.x}px ${pos.y}px, rgba(0,200,150,0.12), transparent 65%)`,
        }}
      />
      {children}
    </a>
  );
}

export default function BentoGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <div className="mb-10 flex items-end justify-between">
        <div className="w-full text-center md:text-left">
          <p className="eyebrow mb-3">Selected Work</p>
          <h2 className="font-display font-light text-3xl md:text-4xl tracking-tight text-foreground">
            At a Glance
          </h2>
        </div>
        <span className="text-xs text-muted-foreground hidden md:block pb-1 flex-shrink-0">Yorkshire — UK</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 auto-rows-[300px]">

        {/* Creative Portfolio Card - Wide */}
        <Link
          href="/create"
          className="group relative col-span-1 md:col-span-2 row-span-1 overflow-hidden rounded-sm bg-card border border-border p-8 transition-all duration-300 hover:border-foreground/30"
        >
          {/* Cinematic backdrop */}
          <div className="absolute inset-0 bg-[url('/images/bokeh-lights-dark-background.jpg')] bg-cover bg-center filter grayscale blur-sm brightness-50 opacity-70 group-hover:scale-105 transition-transform duration-700 dark:opacity-70 opacity-40" />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />

          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              <div className="w-10 h-10 rounded-sm bg-white/10 flex items-center justify-center mb-4 text-white backdrop-blur-sm">
                <Camera size={20} />
              </div>
              <h3 className="font-display font-light text-2xl text-white mb-2 drop-shadow-md">Creative Portfolio</h3>
              <p className="text-white/70 max-w-md text-sm drop-shadow-sm">
                Brand films, Meta ads, event coverage and commercial photography. See the work.
              </p>
            </div>
            <div className="flex items-center gap-2 text-white/60 group-hover:text-white text-sm font-medium group-hover:translate-x-1 transition-all duration-200 backdrop-blur-sm">
              View Projects <ArrowRight size={14} />
            </div>
          </div>
        </Link>

        {/* About Me - Square */}
        <SpotlightCard
          href="/about"
          className="group relative col-span-1 row-span-1 overflow-hidden rounded-sm bg-card border border-border p-8 transition-all duration-300 hover:border-foreground/30"
        >
          <span
            aria-hidden="true"
            className="absolute bottom-4 right-5 font-display text-8xl font-light leading-none text-foreground/[0.04] select-none pointer-events-none"
          >
            01
          </span>
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              <div className="w-10 h-10 rounded-sm bg-accent/15 flex items-center justify-center mb-4 text-accent">
                <User size={20} />
              </div>
              <h3 className="font-display font-light text-xl text-foreground mb-2">About Me</h3>
              <p className="text-muted-foreground text-sm">How I got here and what I&apos;m working on.</p>
            </div>
            <ArrowRight size={16} className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all duration-200 self-end" />
          </div>
        </SpotlightCard>

        {/* Services Card - Wide */}
        <SpotlightCard
          href="/services"
          className="group relative col-span-1 md:col-span-2 row-span-1 overflow-hidden rounded-sm bg-card border border-border p-8 transition-all duration-300 hover:border-foreground/30"
        >
          {/* Diagonal accent gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.05] via-transparent to-transparent pointer-events-none z-[1]" />
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              <h3 className="font-display font-light text-2xl text-foreground mb-4">Services</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Clapperboard, label: "Videography", desc: "Brand films, promos & Meta ads" },
                  { icon: Camera, label: "Photography", desc: "Commercial, fitness & events" },
                  { icon: Trophy, label: "Event Coverage", desc: "Live events & multi-day projects" },
                  { icon: Palette, label: "Post-Production", desc: "Edit, grade & sound design" },
                ].map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-sm bg-secondary flex items-center justify-center text-foreground flex-shrink-0 mt-0.5">
                      <Icon size={14} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{label}</p>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all duration-200 text-sm font-medium mt-4">
              See Services <ArrowRight size={14} />
            </div>
          </div>
        </SpotlightCard>

        {/* Contact - Square */}
        <SpotlightCard
          href="/contact"
          className="group relative col-span-1 row-span-1 overflow-hidden rounded-sm bg-card border border-border p-8 transition-all duration-300 hover:border-foreground/30"
        >
          <span
            aria-hidden="true"
            className="absolute bottom-4 right-5 font-display text-8xl font-light leading-none text-foreground/[0.04] select-none pointer-events-none"
          >
            02
          </span>
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              <div className="w-10 h-10 rounded-sm bg-accent/15 flex items-center justify-center mb-4 text-accent">
                <Mail size={20} />
              </div>
              <h3 className="font-display font-light text-xl text-foreground mb-2">Get in Touch</h3>
              <p className="text-muted-foreground text-sm">Got a project? Let&apos;s talk.</p>
            </div>
            <ArrowRight size={16} className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all duration-200 self-end" />
          </div>
        </SpotlightCard>

        {/* Instagram Strip */}
        <SpotlightAnchor
          href="https://www.instagram.com/nas.create/"
          className="col-span-1 md:col-span-3 row-span-1 md:h-[80px] relative flex items-center justify-center gap-3 rounded-sm bg-card border border-border hover:border-foreground/30 transition-all duration-300 group"
        >
          <Instagram className="text-muted-foreground group-hover:text-foreground transition-colors duration-200 relative z-10" size={18} />
          <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200 font-medium text-sm tracking-wide relative z-10">@nas.create</span>
        </SpotlightAnchor>

      </div>
    </section>
  );
}
