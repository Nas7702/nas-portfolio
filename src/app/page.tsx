import Image from "next/image";
import PageTransition from "./components/PageTransition";
import Hero from "./components/Hero";
import ScrollReveal from "./components/ScrollReveal";

export default function Home() {
  return (
    <PageTransition>
      <Hero />

      {/* About Section */}
      <section className="min-h-screen flex items-center justify-center p-8 sm:p-20">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-gray-900 dark:text-white">
              About Me
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed">
              I&apos;m a passionate developer who creates beautiful, functional, and user-centered digital experiences.
              With expertise in modern web technologies, I bring ideas to life through clean code and thoughtful design.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.5}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-lg bg-gray-50 dark:bg-gray-800">
                <h3 className="text-xl font-semibold mb-4">Frontend</h3>
                <p className="text-gray-600 dark:text-gray-300">React, Next.js, TypeScript, Tailwind CSS</p>
              </div>
              <div className="p-6 rounded-lg bg-gray-50 dark:bg-gray-800">
                <h3 className="text-xl font-semibold mb-4">3D & Animation</h3>
                <p className="text-gray-600 dark:text-gray-300">Three.js, Framer Motion, WebGL</p>
              </div>
              <div className="p-6 rounded-lg bg-gray-50 dark:bg-gray-800">
                <h3 className="text-xl font-semibold mb-4">Tools</h3>
                <p className="text-gray-600 dark:text-gray-300">Git, Figma, VS Code, Node.js</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Projects Section */}
      <section className="min-h-screen flex items-center justify-center p-8 sm:p-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal direction="left" delay={0.1}>
            <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center text-gray-900 dark:text-white">
              Featured Projects
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ScrollReveal direction="left" delay={0.2}>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
                <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg mb-6"></div>
                <h3 className="text-2xl font-bold mb-4">Interactive Portfolio</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  A modern portfolio website with Three.js animations and smooth transitions.
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">React</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Three.js</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.4}>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
                <div className="w-full h-48 bg-gradient-to-br from-green-400 to-teal-600 rounded-lg mb-6"></div>
                <h3 className="text-2xl font-bold mb-4">E-commerce Platform</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Full-stack e-commerce solution with real-time inventory and payment processing.
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Next.js</span>
                  <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">Stripe</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="min-h-screen flex items-center justify-center p-8 sm:p-20">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-4xl md:text-6xl font-bold mb-16 text-gray-900 dark:text-white">
              Skills & Expertise
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "React", level: 95 },
              { name: "TypeScript", level: 90 },
              { name: "Three.js", level: 85 },
              { name: "Node.js", level: 80 },
              { name: "Next.js", level: 92 },
              { name: "Tailwind", level: 88 },
              { name: "Framer Motion", level: 85 },
              { name: "Git", level: 90 },
            ].map((skill, index) => (
              <ScrollReveal key={skill.name} direction="up" delay={0.1 * (index + 1)}>
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                    {skill.level}%
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{skill.name}</h3>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="min-h-screen flex items-center justify-center p-8 sm:p-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-gray-900 dark:text-white">
              Let&apos;s Work Together
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12">
              Ready to bring your ideas to life? Let&apos;s create something amazing together.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.5}>
            <div className="flex gap-4 items-center justify-center flex-col sm:flex-row">
              <a
                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-12 px-8"
                href="mailto:hello@example.com"
              >
                Get In Touch
              </a>
              <a
                className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-12 px-8"
                href="#projects"
              >
                View Projects
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <ScrollReveal direction="up" delay={0.1}>
        <footer className="py-12 flex gap-[24px] flex-wrap items-center justify-center border-t border-gray-200 dark:border-gray-800">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-gray-600 dark:text-gray-300"
            href="https://nextjs.org/learn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Learn
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-gray-600 dark:text-gray-300"
            href="https://vercel.com/templates?framework=next.js"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Examples
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-gray-600 dark:text-gray-300"
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Go to nextjs.org &rarr;
          </a>
        </footer>
      </ScrollReveal>
    </PageTransition>
  );
}
