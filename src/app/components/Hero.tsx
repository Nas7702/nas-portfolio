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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(154,91,255,0.18),_transparent_55%),_linear-gradient(135deg,_#0f172a_0%,_#111827_60%,_#0f172a_100%)]" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 md:flex-row md:items-center md:gap-16">
        <ScrollReveal direction="up" delay={0.1}>
          <div className="flex max-w-2xl flex-col gap-8">
            <div className="flex flex-col gap-4 text-left">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-white/40">
                Welcome
              </p>
              <h1 className="text-4xl font-semibold text-white sm:text-5xl md:text-6xl">
                Nas Hoque — Data Science & Videography
              </h1>
              <p className="text-lg text-white/70 md:text-xl">
                I turn data into decisions and ideas into cinematic visuals for sports & tech brands.
              </p>
              <a
                href="https://www.stancefitness.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit text-sm font-medium text-[#9A5BFF] transition-colors duration-200 hover:text-[#b78cff] hover:underline"
              >
                Currently at Stance Fitness
              </a>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/tech"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#9A5BFF] px-8 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#8a49f3]"
              >
                View my work
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-8 text-sm font-semibold text-white transition-all duration-200 hover:border-[#9A5BFF] hover:text-[#9A5BFF]"
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
