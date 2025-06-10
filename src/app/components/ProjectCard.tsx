"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Project } from "../../data/projects";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
}

export default function ProjectCard({ project, onOpenModal }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onOpenModal(project)}
    >
      {/* Project Image */}
      <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
        {!imageError ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white font-bold text-xl">
            {project.title.charAt(0)}
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Action buttons */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-black/70 text-white rounded-full hover:bg-black/90 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Github size={16} />
          </motion.a>
          {project.liveLink && (
            <motion.a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-black/70 text-white rounded-full hover:bg-black/90 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={16} />
            </motion.a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.stack.slice(0, 3).map((tech: string) => (
            <span
              key={tech}
              className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full font-medium"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full font-medium">
              +{project.stack.length - 3} more
            </span>
          )}
        </div>

        {/* View Details */}
        <div className="flex items-center justify-between">
          <span className="text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:underline">
            View Case Study →
          </span>
        </div>
      </div>

      {/* Hover border effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
    </motion.div>
  );
}
