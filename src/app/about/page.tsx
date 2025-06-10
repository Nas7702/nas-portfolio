import PageTransition from "../components/PageTransition";
import ScrollReveal from "../components/ScrollReveal";

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <section className="py-20 px-8">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal direction="up" delay={0.1}>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                About Me
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                This is a placeholder for the About page. Here you can add your personal story,
                experience, skills, and what drives your passion for development and design.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.5}>
              <div className="mt-12 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Coming Soon
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  This page is under construction. Check back soon for my detailed biography,
                  career journey, and personal insights.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
