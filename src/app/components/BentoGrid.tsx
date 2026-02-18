"use client";

import Link from "next/link";
import { ArrowRight, Camera, User, Mail, Instagram, Clapperboard, Palette, Trophy } from "lucide-react";

export default function BentoGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">

        {/* Creative Portfolio Card - Wide */}
        <Link
          href="/create"
          className="group relative col-span-1 md:col-span-2 row-span-1 overflow-hidden rounded-3xl bg-card border border-border p-8 transition-all hover:border-primary/30"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {/* Cinematic backdrop */}
          <div className="absolute inset-0 bg-[url('/images/bokeh-lights-dark-background.jpg')] bg-cover bg-center filter grayscale blur-sm brightness-50 opacity-70 group-hover:scale-105 transition-transform duration-700 dark:opacity-70 opacity-40" />

          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4 text-green-600 dark:text-green-400 backdrop-blur-sm">
                <Camera size={24} />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2 drop-shadow-md">Creative Portfolio</h3>
              <p className="text-foreground/80 max-w-md drop-shadow-sm">
                Cinematic videography, photography, and visual storytelling.
              </p>
            </div>
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-medium group-hover:translate-x-2 transition-transform backdrop-blur-sm">
              View Projects <ArrowRight size={16} />
            </div>
          </div>
        </Link>

        {/* About Me - Square */}
        <Link
          href="/about"
          className="group relative col-span-1 row-span-1 overflow-hidden rounded-3xl bg-card border border-border p-8 transition-all hover:border-primary/30"
        >
          <div className="absolute inset-0 bg-secondary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4 text-purple-500 dark:text-purple-400">
                <User size={24} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">About Me</h3>
              <p className="text-muted-foreground text-sm">My story, my craft, and what drives me.</p>
            </div>
            <ArrowRight className="text-muted-foreground group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors self-end" />
          </div>
        </Link>

        {/* Services Card - Wide */}
        <Link
          href="/contact"
          className="group relative col-span-1 md:col-span-2 row-span-1 overflow-hidden rounded-3xl bg-card border border-border p-8 transition-all hover:border-primary/30"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Services</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Clapperboard, label: "Videography", desc: "Brand films & reels" },
                  { icon: Camera, label: "Photography", desc: "Events & portraits" },
                  { icon: Trophy, label: "Event Coverage", desc: "Sport & live events" },
                  { icon: Palette, label: "Post-Production", desc: "Edit & color grade" },
                ].map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-500 dark:text-emerald-400 flex-shrink-0 mt-0.5">
                      <Icon size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{label}</p>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium group-hover:translate-x-2 transition-transform mt-4">
              Book a Shoot <ArrowRight size={16} />
            </div>
          </div>
        </Link>

        {/* Contact - Square */}
        <Link
          href="/contact"
          className="group relative col-span-1 row-span-1 overflow-hidden rounded-3xl bg-card border border-border p-8 transition-all hover:border-primary/30"
        >
          <div className="absolute inset-0 bg-secondary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center mb-4 text-orange-500 dark:text-orange-400">
                <Mail size={24} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Get in Touch</h3>
              <p className="text-muted-foreground text-sm">Let&apos;s create something amazing together.</p>
            </div>
            <ArrowRight className="text-muted-foreground group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors self-end" />
          </div>
        </Link>

        {/* Instagram Strip */}
        <a
          href="https://www.instagram.com/nas.create/"
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-1 md:col-span-3 row-span-1 md:h-[100px] flex items-center justify-center gap-3 rounded-3xl bg-card border border-border hover:bg-secondary transition-colors group"
        >
          <Instagram className="text-muted-foreground group-hover:text-pink-500 transition-colors" size={22} />
          <span className="text-muted-foreground group-hover:text-foreground transition-colors font-medium text-sm">@nas.create</span>
        </a>

      </div>
    </section>
  );
}
