"use client";

import PageTransition from "../components/PageTransition";
import ScrollReveal from "../components/ScrollReveal";
import LightboxGallery, { MediaItem } from "../components/LightboxGallery";

// Sample media data
const sampleMedia: MediaItem[] = [
  {
    id: "1",
    type: "image",
    src: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop",
    title: "Mountain Landscape",
    alt: "Beautiful mountain landscape with clouds",
    description: "A stunning view of mountain peaks shrouded in clouds during golden hour."
  },
  {
    id: "2",
    type: "image",
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=800&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop",
    title: "Forest Path",
    alt: "Misty forest path",
    description: "A mysterious forest path disappearing into the mist."
  },
  {
    id: "3",
    type: "video",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnail: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=400&fit=crop",
    title: "Big Buck Bunny",
    alt: "Sample video",
    description: "Sample video file for testing video playback functionality."
  },
  {
    id: "4",
    type: "image",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    title: "Ocean Sunset",
    alt: "Ocean sunset with waves",
    description: "Golden sunset over the ocean with gentle waves rolling to shore."
  },
  {
    id: "5",
    type: "image",
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop",
    title: "Dense Forest",
    alt: "Dense green forest from above",
    description: "Aerial view of a lush, dense forest canopy."
  },
  {
    id: "6",
    type: "image",
    src: "https://images.unsplash.com/photo-1486282848674-c19f5f3c0b9a?w=1200&h=800&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1486282848674-c19f5f3c0b9a?w=400&h=400&fit=crop",
    title: "Desert Dunes",
    alt: "Sand dunes in the desert",
    description: "Rolling sand dunes under a clear blue sky."
  },
  {
    id: "7",
    type: "video",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    thumbnail: "https://images.unsplash.com/photo-1541963463532-d68292c34d19?w=400&h=400&fit=crop",
    title: "Elephant's Dream",
    alt: "Sample video 2",
    description: "Another sample video file showcasing different content."
  },
  {
    id: "8",
    type: "image",
    src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200&h=800&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop",
    title: "Waterfall",
    alt: "Powerful waterfall in nature",
    description: "A powerful waterfall cascading down rocky cliffs surrounded by greenery."
  },
  {
    id: "9",
    type: "image",
    src: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=1200&h=800&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=400&h=400&fit=crop",
    title: "City Skyline",
    alt: "Modern city skyline at night",
    description: "Illuminated city skyline reflecting in the water during blue hour."
  }
];

export default function GalleryPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header Section */}
        <section className="py-20 px-8">
          <div className="max-w-6xl mx-auto text-center">
            <ScrollReveal direction="up" delay={0.1}>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Lightbox Gallery
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
                A modern gallery component with lazy loading, lightbox functionality, and support for both images and videos.
                Click any item to open the lightbox viewer with full navigation controls.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.5}>
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                  ⚡ Lazy Loading
                </span>
                <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
                  🖼️ Image & Video Support
                </span>
                <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm font-medium">
                  🔍 Zoom & Rotate
                </span>
                <span className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-full text-sm font-medium">
                  ⌨️ Keyboard Navigation
                </span>
                <span className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-full text-sm font-medium">
                  📱 Mobile Optimized
                </span>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="pb-20 px-8">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal direction="up" delay={0.2}>
              <LightboxGallery
                items={sampleMedia}
                columns={3}
                showTitles={true}
                enableZoom={true}
                enableDownload={true}
                className="mb-16"
              />
            </ScrollReveal>

            {/* Features List */}
            <ScrollReveal direction="up" delay={0.4}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                  Gallery Features
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-3">
                      ⚡
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Lazy Loading</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Images load only when they come into viewport using Intersection Observer
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-3">
                      🎬
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Mixed Media</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Support for both images and videos with appropriate controls
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center mx-auto mb-3">
                      🔍
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Image Controls</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Zoom, rotate, and pan functionality for detailed viewing
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full flex items-center justify-center mx-auto mb-3">
                      ⌨️
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Keyboard Nav</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Navigate with arrow keys, ESC to close, spacebar for video control
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-3">
                      📱
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Responsive</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Optimized for all screen sizes with touch-friendly controls
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-3">
                      ⚙️
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Customizable</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Flexible props for columns, features, and styling options
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Usage Example */}
        <section className="py-16 px-8 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal direction="up" delay={0.1}>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                Usage Example
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <div className="bg-gray-900 dark:bg-gray-950 rounded-xl p-6 overflow-x-auto">
                <pre className="text-green-400 text-sm">
{`import LightboxGallery, { MediaItem } from './components/LightboxGallery';

const mediaItems: MediaItem[] = [
  {
    id: "1",
    type: "image",
    src: "/images/photo1.jpg",
    thumbnail: "/images/photo1-thumb.jpg",
    title: "Beautiful Landscape",
    description: "A stunning mountain view at sunset"
  },
  {
    id: "2",
    type: "video",
    src: "/videos/sample.mp4",
    thumbnail: "/images/video-thumb.jpg",
    title: "Sample Video",
    description: "Demo video with controls"
  }
];

<LightboxGallery
  items={mediaItems}
  columns={3}
  showTitles={true}
  enableZoom={true}
  enableDownload={true}
/>`}
                </pre>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
