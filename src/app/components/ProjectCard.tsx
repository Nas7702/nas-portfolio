"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Project } from "../../data/projects";
import { ExternalLink } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
}

export default function ProjectCard({ project, onOpenModal }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
      whileHover={{ y: -12, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onOpenModal(project)}
    >
      {/* Project Image */}
      <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-blue-500 via-green-500 to-emerald-500">
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
        {project.liveLink && (
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-black/70 text-white rounded-full hover:bg-black/90 transition-colors"
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.85 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={16} />
            </motion.a>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
          {project.title}
        </h3>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.stack.map((tech: string) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-xs font-medium rounded-full border border-accent/20 bg-accent/10 text-accent"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* View Details */}
        <div className="flex items-center justify-between">
          <span className="text-accent text-sm font-medium group-hover:underline">
            View Case Study →
          </span>
        </div>
      </div>

      {/* Hover border effect */}
      <div className="absolute inset-0 rounded-xl bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
    </motion.div>
  );
}
