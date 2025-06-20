"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, CheckCircle, Zap, Target, Trophy } from "lucide-react";
import { Project } from "../../data/projects";
import LightboxGallery, { MediaItem } from "./LightboxGallery";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <div
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-6 z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {project.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <motion.a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      whileTap={{ scale: 0.85 }}
                    >
                      <Github size={20} />
                    </motion.a>

                    {project.liveLink && (
                      <motion.a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                        whileHover={{ scale: 1.15, rotate: -5 }}
                        whileTap={{ scale: 0.85 }}
                      >
                        <ExternalLink size={20} />
                      </motion.a>
                    )}

                    <motion.button
                      onClick={onClose}
                      className="p-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      whileHover={{ scale: 1.15, rotate: 180 }}
                      whileTap={{ scale: 0.85 }}
                    >
                      <X size={20} />
                    </motion.button>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.stack.map((tech: string) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-8">
                {/* Overview */}
                <section>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Target className="text-blue-500" size={20} />
                    Project Overview
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {project.caseStudy.overview}
                  </p>
                </section>

                {/* Problem & Solution */}
                <div className="grid md:grid-cols-2 gap-6">
                  <section>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <Zap className="text-red-500" size={18} />
                      Problem
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {project.caseStudy.problem}
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <CheckCircle className="text-green-500" size={18} />
                      Solution
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {project.caseStudy.solution}
                    </p>
                  </section>
                </div>

                {/* Technologies */}
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Technologies Used
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {project.caseStudy.technologies.map((tech: string) => (
                      <div
                        key={tech}
                        className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        {tech}
                      </div>
                    ))}
                  </div>
                </section>

                {/* Features */}
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Key Features
                  </h3>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {project.caseStudy.features.map((feature: string, index: number) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={16} />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Challenges */}
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Technical Challenges
                  </h3>
                  <ul className="space-y-3">
                    {project.caseStudy.challenges.map((challenge: string, index: number) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg"
                      >
                        <Zap className="text-orange-500 flex-shrink-0 mt-0.5" size={16} />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          {challenge}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Results */}
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Trophy className="text-yellow-500" size={20} />
                    Results & Impact
                  </h3>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {project.caseStudy.results.map((result: string, index: number) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg"
                      >
                        <Trophy className="text-green-500 flex-shrink-0 mt-0.5" size={16} />
                        <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                          {result}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Project Gallery */}
                {project.caseStudy.images && project.caseStudy.images.length > 0 && (
                  <section>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Project Gallery
                    </h3>
                    <LightboxGallery
                      items={project.caseStudy.images.map((imageSrc: string, index: number): MediaItem => ({
                        id: `${project.id}-image-${index}`,
                        type: "image",
                        src: imageSrc,
                        title: `${project.title} - Image ${index + 1}`,
                        alt: `${project.title} screenshot ${index + 1}`,
                        description: `Screenshot from the ${project.title} project`
                      }))}
                      columns={2}
                      showTitles={false}
                      enableZoom={true}
                      enableDownload={false}
                      className="max-w-2xl"
                    />
                  </section>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
