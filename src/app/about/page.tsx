import PageTransition from "../components/PageTransition";
import ScrollReveal from "../components/ScrollReveal";

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <section className="py-20 px-8">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal direction="up" delay={0.1}>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                About Nas
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <div className="text-center mb-16">
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  I&apos;m Naseem Hoque, a passionate data analyst and visual storyteller who bridges the gap between
                  analytical insights and creative expression. By day, I transform complex data into actionable
                  insights, and by passion, I capture and edit compelling visual stories through videography and photography.
                </p>
              </div>
            </ScrollReveal>

            {/* Two columns layout */}
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              {/* Data Science Side */}
              <ScrollReveal direction="left" delay={0.4}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    📊
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                    Data Analyst
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    Working in data science, I specialise in extracting meaningful insights from complex datasets.
                    I transform raw data into compelling narratives that drive business decisions and uncover
                    hidden patterns.
                  </p>
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Skills & Tools:</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm">Python</span>
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm">Java</span>
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm">NextJS</span>
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm">SQL</span>
                      <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-full text-sm">Vercel</span>
                      <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-full text-sm">Machine Learning</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Creative Side */}
              <ScrollReveal direction="right" delay={0.4}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    📸
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                    Visual Storyteller
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    My creative passion lies in videography and photography editing. I capture moments and
                    craft visual narratives that evoke emotion and tell compelling stories through the lens
                    and in post-production.
                  </p>
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Creative Tools:</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-full text-sm">DaVinci Resolve Studio</span>
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm">Lightroom</span>
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm">Photoshop</span>
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm">After Effects</span>
                      <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-full text-sm">Final Cut Pro</span>
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm">Colour Grading</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Philosophy Section */}
            <ScrollReveal direction="up" delay={0.6}>
              <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-2xl p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  My Philosophy
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
                  &quot;Both data analysis and visual storytelling share a common thread – they&apos;re about finding the
                  story within. Whether it&apos;s discovering insights in datasets or crafting emotional narratives
                  through video, I believe in the power of compelling storytelling to make an impact.&quot;
                </p>
              </div>
            </ScrollReveal>

            {/* Personal Touch */}
            <ScrollReveal direction="up" delay={0.8}>
              <div className="text-center mt-16">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  When I&apos;m Not Working
                </h2>
                                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
                  You&apos;ll find me exploring new locations for photography, experimenting with new editing techniques,
                  diving deep into the latest data science trends, or training as a competitive powerlifter. My analytical
                  approach extends to strength training, where I track performance metrics, analyse movement patterns,
                  and optimise training programs using data-driven insights. I&apos;m always looking for ways to merge my
                  analytical mindset with both creative expression and athletic performance.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
