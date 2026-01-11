"use client";

import { motion } from "framer-motion";

interface LoadingSkeletonProps {
  variant?: 'card' | 'text' | 'image' | 'hero' | 'gallery' | 'bento';
  className?: string;
  count?: number;
}

export default function LoadingSkeleton({
  variant = 'card',
  className = '',
  count = 1
}: LoadingSkeletonProps) {
  const renderSkeleton = () => {
    switch (variant) {
      case 'hero':
        return (
          <div className="relative min-h-[calc(100vh-4rem)] w-full flex flex-col items-center justify-center pt-6 sm:pt-10 md:pt-0 pb-20">
            <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto space-y-6">
              <motion.div
                className="h-8 w-48 bg-secondary/50 rounded-full"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.div
                className="h-16 md:h-24 w-96 bg-secondary/70 rounded-2xl"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              />
              <motion.div
                className="h-24 w-full max-w-2xl bg-secondary/50 rounded-xl"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
              />
              <motion.div
                className="flex gap-4"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
              >
                <div className="h-12 w-40 bg-secondary/70 rounded-full" />
                <div className="h-12 w-40 bg-secondary/50 rounded-full" />
              </motion.div>
            </div>
          </div>
        );

      case 'bento':
        return (
          <div className="max-w-7xl mx-auto px-4 py-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`rounded-3xl bg-secondary/50 ${
                    i === 0 ? 'col-span-1 md:col-span-2' : i === 1 ? 'col-span-1 row-span-2' : 'col-span-1'
                  }`}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                />
              ))}
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(count)].map((_, i) => (
              <motion.div
                key={i}
                className="aspect-square bg-secondary/50 rounded-lg"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
          </div>
        );

      case 'card':
        return (
          <div className={`space-y-4 ${className}`}>
            {[...Array(count)].map((_, i) => (
              <motion.div
                key={i}
                className="bg-secondary/50 rounded-2xl p-6 space-y-4"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
              >
                <div className="h-6 w-3/4 bg-secondary/70 rounded" />
                <div className="h-4 w-full bg-secondary/60 rounded" />
                <div className="h-4 w-5/6 bg-secondary/60 rounded" />
              </motion.div>
            ))}
          </div>
        );

      case 'text':
        return (
          <div className={`space-y-3 ${className}`}>
            {[...Array(count)].map((_, i) => (
              <motion.div
                key={i}
                className="h-4 bg-secondary/50 rounded"
                style={{ width: `${Math.random() * 30 + 70}%` }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
          </div>
        );

      case 'image':
        return (
          <div className={`space-y-4 ${className}`}>
            {[...Array(count)].map((_, i) => (
              <motion.div
                key={i}
                className="aspect-video bg-secondary/50 rounded-xl"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return <div className={className}>{renderSkeleton()}</div>;
}
