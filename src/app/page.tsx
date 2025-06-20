import Image from "next/image";
import PageTransition from "./components/PageTransition";
import Hero from "./components/Hero";
import ScrollReveal from "./components/ScrollReveal";
// import { getTechnicalProjects, getCreativeProjects } from "../data/projects";

export default function Home() {
  // const technicalProjects = getTechnicalProjects().slice(0, 2);
  // const creativeProjects = getCreativeProjects().slice(0, 2);

  return (
    <PageTransition>
      <Hero />

      {/* About Section */}
      <section className="min-h-screen flex items-center justify-center p-8 sm:p-20">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-gray-900 dark:text-white">
              About Nas
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed">
              I'm a passionate data analyst and visual storyteller who bridges the analytical and creative worlds.
              By day, I transform complex data into actionable insights. By passion, I capture and craft compelling
              visual stories through videography and photography.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.5}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  📊
                </div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900 dark:text-blue-300">Data Science</h3>
                <p className="text-gray-600 dark:text-gray-300">Python, SQL, Machine Learning, Tableau, Statistical Analysis</p>
              </div>
              <div className="p-6 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  🎨
                </div>
                <h3 className="text-xl font-semibold mb-4 text-green-900 dark:text-green-300">Visual Storytelling</h3>
                <p className="text-gray-600 dark:text-gray-300">Premiere Pro, After Effects, Photography, Colour Grading</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Work - Coming Soon */}
      <section className="min-h-screen flex items-center justify-center p-8 sm:p-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-gray-900 dark:text-white">
              Featured Work
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-xl border border-gray-200 dark:border-gray-700">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 via-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
                <span className="text-white text-4xl">🚀</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Coming Soon
              </h3>

              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                I'm currently putting together my portfolio showcase featuring exciting projects in
                <span className="font-semibold text-blue-600 dark:text-blue-400"> Data Science</span>,
                <span className="font-semibold text-blue-600 dark:text-blue-400"> Software Development</span>,
                <span className="font-semibold text-green-600 dark:text-green-400"> Videography</span>, and
                <span className="font-semibold text-green-600 dark:text-green-400"> Photography</span>.
              </p>

              <div className="flex flex-wrap justify-center gap-3 mb-8">
                <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                  📊 Data Analytics
                </span>
                <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                  💻 Web Development
                </span>
                <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
                  🎬 Videography
                </span>
                <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
                  📸 Photography
                </span>
              </div>

              <p className="text-gray-500 dark:text-gray-400">
                Check back soon for detailed case studies and project showcases!
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Skills Section */}
      <section className="min-h-screen flex items-center justify-center p-8 sm:p-20">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center text-gray-900 dark:text-white">
              Hybrid Skill Set
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Technical Skills */}
            <ScrollReveal direction="left" delay={0.2}>
              <div className="bg-blue-50 dark:bg-blue-900/10 rounded-2xl p-8">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  📊
                </div>
                <h3 className="text-2xl font-bold text-center mb-8 text-blue-900 dark:text-blue-300">
                  Data & Development
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: "Python", level: 95 },
                    { name: "SQL", level: 90 },
                    { name: "Machine Learning", level: 85 },
                    { name: "Tableau", level: 88 },
                    { name: "React", level: 82 },
                    { name: "Statistics", level: 90 },
                  ].map((skill, index) => (
                    <ScrollReveal key={skill.name} direction="up" delay={0.3 + index * 0.05}>
                      <div className="text-center">
                        <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-blue-200 dark:bg-blue-800 flex items-center justify-center text-blue-800 dark:text-blue-200 font-bold text-xs">
                          {skill.level}%
                        </div>
                        <h4 className="font-medium text-sm text-blue-900 dark:text-blue-300">{skill.name}</h4>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Creative Skills */}
            <ScrollReveal direction="right" delay={0.2}>
              <div className="bg-green-50 dark:bg-green-900/10 rounded-2xl p-8">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  🎨
                </div>
                <h3 className="text-2xl font-bold text-center mb-8 text-green-900 dark:text-green-300">
                  Creative & Visual
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: "Premiere Pro", level: 92 },
                    { name: "After Effects", level: 85 },
                    { name: "Photography", level: 90 },
                    { name: "Colour Grading", level: 88 },
                    { name: "Lightroom", level: 95 },
                    { name: "Storytelling", level: 93 },
                  ].map((skill, index) => (
                    <ScrollReveal key={skill.name} direction="up" delay={0.3 + index * 0.05}>
                      <div className="text-center">
                        <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-green-200 dark:bg-green-800 flex items-center justify-center text-green-800 dark:text-green-200 font-bold text-xs">
                          {skill.level}%
                        </div>
                        <h4 className="font-medium text-sm text-green-900 dark:text-green-300">{skill.name}</h4>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="min-h-screen flex items-center justify-center p-8 sm:p-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-gray-900 dark:text-white">
              Let&apos;s Create Together
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12">
              Whether you need data insights, software solutions, or compelling visual content,
              I'd love to help bring your vision to life.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.5}>
            <div className="flex gap-4 items-center justify-center flex-col sm:flex-row">
              <a
                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white gap-2 font-medium text-sm sm:text-base h-12 px-8"
                href="mailto:nas@example.com"
              >
                Get In Touch
              </a>
              <a
                className="rounded-full border border-solid border-gray-300 dark:border-gray-600 transition-colors flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-base h-12 px-8"
                href="/software"
              >
                View All Work
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <ScrollReveal direction="up" delay={0.1}>
        <footer className="py-12 flex gap-[24px] flex-wrap items-center justify-center border-t border-gray-200 dark:border-gray-800">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              <strong>Naseem Hoque</strong> - Data Analyst & Visual Storyteller
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Transforming Data & Capturing Stories
            </p>
          </div>
        </footer>
      </ScrollReveal>
    </PageTransition>
  );
}
