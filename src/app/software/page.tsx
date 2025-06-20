"use client";


// import { getTechnicalProjects } from "../../data/projects";
// import { Project } from "../../data/projects";
// import ProjectCard from "../components/ProjectCard";
// import ProjectModal from "../components/ProjectModal";
import PageTransition from "../components/PageTransition";
import ScrollReveal from "../components/ScrollReveal";

export default function SoftwarePage() {
  // const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const technicalProjects = getTechnicalProjects();

  // const handleOpenModal = (project: Project) => {
  //   setSelectedProject(project);
  //   setIsModalOpen(true);
  // };

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  //   setTimeout(() => setSelectedProject(null), 300); // Delay to allow exit animation
  // };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header Section */}
        <section className="py-20 px-8">
          <div className="max-w-6xl mx-auto text-center">
            <ScrollReveal direction="up" delay={0.1}>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Technical Projects
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                A collection of data science projects and software applications that demonstrate my analytical
                skills and technical expertise. From machine learning models to interactive dashboards and web applications.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.5}>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                  Python & Data Science
                </span>
                <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
                  Machine Learning
                </span>
                <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm font-medium">
                  React & Next.js
                </span>
                <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
                  Data Visualization
                </span>
                <span className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-full text-sm font-medium">
                  Analytics & Insights
                </span>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className="pb-20 px-8">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal direction="up" delay={0.2}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-xl border border-gray-200 dark:border-gray-700 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-8">
                  <span className="text-white text-4xl">🔬</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Technical Projects Coming Soon
                </h3>

                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  I&apos;m currently documenting and preparing detailed case studies for my technical projects, including
                  machine learning models, data analytics dashboards, and full-stack applications.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Data Science Projects</h4>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      <li className="flex items-center gap-2">
                        <span className="text-blue-500">•</span>
                        Customer Churn Prediction Models
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-blue-500">•</span>
                        Sales Analytics Dashboards
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-blue-500">•</span>
                        Market Sentiment Analysis
                      </li>
                    </ul>
                  </div>

                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Software Applications</h4>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      <li className="flex items-center gap-2">
                        <span className="text-purple-500">•</span>
                        Interactive Web Applications
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-purple-500">•</span>
                        Automation & Workflow Tools
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-purple-500">•</span>
                        API Development & Integration
                      </li>
                    </ul>
                  </div>
                </div>

                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Each project will include detailed case studies, technical challenges, and measurable results.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/contact"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  >
                    Get Notified When Live
                  </a>
                  <a
                    href="/gallery"
                    className="px-6 py-3 border border-green-300 dark:border-green-600 text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-800/20 font-medium rounded-lg transition-colors"
                  >
                    View Creative Work
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Skills Highlight Section */}
        <section className="py-16 px-8 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal direction="up" delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12">
                Technical Expertise
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <ScrollReveal direction="up" delay={0.2}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    Python
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium">
                    Data Science
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.3}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                    ML
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium">
                    Machine Learning
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.4}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                    React
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium">
                    Web Development
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.5}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                    SQL
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium">
                    Database Analytics
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-8">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal direction="up" delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Let&apos;s Solve Problems Together
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Have a data challenge or need a custom software solution? I&apos;d love to help turn your data into insights
                and ideas into applications.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.5}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
                >
                  Start a Project
                </a>
                <a
                  href="/gallery"
                  className="px-8 py-4 border border-green-300 dark:border-green-600 text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-800/20 font-medium rounded-xl transition-colors"
                >
                  View Creative Work
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>

      {/* Commented out until real projects are ready */}
      {/* <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      /> */}
    </PageTransition>
  );
}
