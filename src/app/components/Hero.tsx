import Image from "next/image";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import ScrollReveal from "./ScrollReveal";

export default function Hero() {
  const { mounted } = useTheme();

  if (!mounted) {
    return null;
  }

  return (
    <section className="relative overflow-hidden -mt-16 pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Bokeh background (blue theme) */}
      <Image
        src="/images/bokeh-lights-dark-background.jpg"
        alt="Abstract bokeh lights background"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 object-cover object-center scale-105 blur-[18px] brightness-[0.45]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.16)_0%,rgba(15,23,42,0.92)_58%,rgba(3,7,18,0.95)_100%)]"
      />
      <div className="absolute inset-0 opacity-[0.08]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.2'%3E%3Ccircle cx='7' cy='7' r='7'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 md:flex-row md:items-center md:gap-16">
        <ScrollReveal direction="up" delay={0.1}>
          <div className="flex max-w-2xl flex-col gap-8">
            <div className="flex flex-col gap-4 text-left">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-white/40">
                Welcome
              </p>
              <h1 className="space-y-5 font-semibold text-white">
                <span className="relative inline-block w-fit text-5xl leading-tight sm:text-6xl md:text-7xl">
                  <span
                    aria-hidden
                    className="absolute inset-0 -z-10 rounded-full bg-blue-500/25 blur-[60px]"
                  />
                  <span className="bg-gradient-to-r from-blue-100 via-sky-300 to-blue-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(56,189,248,0.45)]">
                    I'm Nas
                  </span>
                </span>
                <div className="flex flex-wrap items-center gap-3 text-2xl text-white/85 sm:text-3xl md:text-4xl">
                  <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-medium uppercase tracking-[0.35em] text-white/70 sm:text-base">
                    Data Science
                  </span>
                  <span className="text-blue-400">×</span>
                  <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-medium uppercase tracking-[0.35em] text-white/70 sm:text-base">
                    Visual Storytelling
                  </span>
                </div>
              </h1>
              <p className="text-lg text-white/70 md:text-xl">
                I turn data into decisions and ideas into cinematic visuals for businesses.
              </p>
              <a
                href="https://www.stancefitness.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit text-sm font-medium text-blue-500 transition-colors duration-200 hover:text-blue-400 hover:underline"
              >
                Currently at Stance Fitness
              </a>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="#work"
                aria-label="Skip to Work hub"
                title="View my work"
                className="inline-flex h-12 items-center justify-center rounded-full bg-blue-600 px-8 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
              >
                View my work
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-8 text-sm font-semibold text-white transition-all duration-200 hover:border-blue-500 hover:text-blue-500"
              >
                Hire me
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
