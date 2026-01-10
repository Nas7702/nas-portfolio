"use client";

import Link from "next/link";
import { ArrowRight, Code, Camera, User, Mail, Linkedin } from "lucide-react";

export default function BentoGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">

        {/* Tech Card - Large */}
        <Link
          href="/tech"
          className="group relative col-span-1 md:col-span-2 row-span-1 overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-800 p-8 transition-all hover:border-neutral-700"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4 text-blue-400">
                <Code size={24} />
              </div>
              <h3 className="text-2xl font-bold text-neutral-100 mb-2">Technical Portfolio</h3>
              <p className="text-neutral-400 max-w-md">
                Explore my work in data science, machine learning, and full-stack development.
                Building intelligent systems that solve real-world problems.
              </p>
            </div>
            <div className="flex items-center gap-2 text-blue-400 font-medium group-hover:translate-x-2 transition-transform">
              View Projects <ArrowRight size={16} />
            </div>
          </div>
          {/* Abstract Tech Visual */}
          <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-30 mask-image-linear-to-l">
             <div className="absolute inset-0 bg-[url('/next.svg')] bg-no-repeat bg-cover bg-right-bottom opacity-20 grayscale group-hover:grayscale-0 transition-all duration-500" />
          </div>
        </Link>

        {/* Creative Card - Tall */}
        <Link
          href="/create"
          className="group relative col-span-1 row-span-1 md:row-span-2 overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-800 p-8 transition-all hover:border-neutral-700"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {/* Monochrome blurred creative backdrop to match Creative page */}
          <div className="absolute inset-0 bg-[url('/images/bokeh-lights-dark-background.jpg')] bg-cover bg-center filter grayscale blur-sm brightness-50 opacity-70 group-hover:scale-105 transition-transform duration-700" />

          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4 text-green-400 backdrop-blur-sm">
                <Camera size={24} />
              </div>
              <h3 className="text-2xl font-bold text-neutral-100 mb-2 drop-shadow-md">Creative Gallery</h3>
              <p className="text-neutral-200/80 drop-shadow-sm">
                Cinematic videography, photography, and visual storytelling.
              </p>
            </div>
            <div className="flex items-center gap-2 text-green-400 font-medium group-hover:translate-x-2 transition-transform backdrop-blur-sm w-fit rounded-full px-2 py-1 -ml-2">
              View Gallery <ArrowRight size={16} />
            </div>
          </div>
        </Link>

        {/* About Me - Square */}
        <Link
          href="/about"
          className="group relative col-span-1 row-span-1 overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-800 p-8 transition-all hover:border-neutral-700"
        >
          <div className="absolute inset-0 bg-neutral-800/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
               <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4 text-purple-400">
                <User size={24} />
              </div>
              <h3 className="text-xl font-bold text-neutral-100 mb-2">About Me</h3>
              <p className="text-neutral-400 text-sm">My journey, skills, and experience.</p>
            </div>
            <ArrowRight className="text-neutral-500 group-hover:text-purple-400 transition-colors self-end" />
          </div>
        </Link>

        {/* Contact - Square */}
        <Link
          href="/contact"
          className="group relative col-span-1 row-span-1 overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-800 p-8 transition-all hover:border-neutral-700"
        >
          <div className="absolute inset-0 bg-neutral-800/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
               <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center mb-4 text-orange-400">
                <Mail size={24} />
              </div>
              <h3 className="text-xl font-bold text-neutral-100 mb-2">Get in Touch</h3>
              <p className="text-neutral-400 text-sm">Let&apos;s collaborate on something amazing.</p>
            </div>
             <ArrowRight className="text-neutral-500 group-hover:text-orange-400 transition-colors self-end" />
          </div>
        </Link>

         {/* Socials - Small Strip (Optional) */}
         <div className="col-span-1 md:col-span-2 row-span-1 md:h-[100px] grid grid-cols-2 gap-4">
            <a href="https://www.linkedin.com/in/nas-hoque/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center rounded-3xl bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 transition-colors group">
                <Linkedin className="text-neutral-400 group-hover:text-blue-400 transition-colors" />
            </a>
            <div className="flex flex-col items-center justify-center rounded-3xl bg-neutral-900 border border-neutral-800 p-4 text-center">
                <span className="text-xs text-neutral-500 uppercase tracking-wider">Status</span>
                <span className="text-sm font-medium text-green-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    Open for work
                </span>
            </div>
         </div>

      </div>
    </section>
  );
}



