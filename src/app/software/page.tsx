"use client";

import { useState } from "react";
import { projects } from "../../data/projects";
import { Project } from "../../data/projects";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import PageTransition from "../components/PageTransition";
import ScrollReveal from "../components/ScrollReveal";

export default function SoftwarePage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300); // Delay to allow exit animation
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header Section */}
        <section className="py-20 px-8">
          <div className="max-w-6xl mx-auto text-center">
            <ScrollReveal direction="up" delay={0.1}>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Software Projects
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                A showcase of full-stack applications, tools, and platforms I&apos;ve built using modern technologies.
                Each project represents a unique challenge and demonstrates different aspects of software development.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.5}>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                  React & Next.js
                </span>
                <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
                  Node.js & Express
                </span>
                <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm font-medium">
                  TypeScript
                </span>
                <span className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-full text-sm font-medium">
                  Three.js & WebGL
                </span>
                <span className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-full text-sm font-medium">
                  AI & Machine Learning
                </span>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="pb-20 px-8">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal direction="up" delay={0.2}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                  <ScrollReveal
                    key={project.id}
                    direction="up"
                    delay={0.1 * (index + 1)}
                  >
                    <ProjectCard
                      project={project}
                      onOpenModal={handleOpenModal}
                    />
                  </ScrollReveal>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-8 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal direction="up" delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12">
                Project Highlights
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <ScrollReveal direction="up" delay={0.2}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {projects.length}+
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium">
                    Projects Built
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.3}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                    15+
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium">
                    Technologies
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.4}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                    100K+
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium">
                    Users Served
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.5}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                    99%+
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium">
                    Uptime
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
                Let&apos;s Build Something Together
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Have a project in mind? I&apos;d love to help bring your ideas to life with modern technologies and best practices.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.5}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:hello@example.com"
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
                >
                  Start a Project
                </a>
                <a
                  href="https://github.com/username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium rounded-xl transition-colors"
                >
                  View on GitHub
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </PageTransition>
  );
}
