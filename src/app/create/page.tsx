"use client";


// import { getCreativeProjects } from "../../data/projects";
// import { Project } from "../../data/projects";
// import ProjectCard from "../components/ProjectCard";
// import ProjectModal from "../components/ProjectModal";
import PageTransition from "../components/PageTransition";
import ScrollReveal from "../components/ScrollReveal";
import LightboxGallery, { MediaItem } from "../components/LightboxGallery";
import { Instagram, ExternalLink } from "lucide-react";
import Image from "next/image";

const HERO_BACKGROUND = "/images/bokeh-lights-dark-background.jpg";

// Starter media: replace the src with your YouTube/Vimeo link
const featuredMedia: MediaItem[] = [
  {
    id: "featured-1",
    type: "video",
    // Replace with your video link (YouTube/Vimeo/native mp4)
    src: "https://youtu.be/lQ5mOoEOoqo",
    // Local placeholder thumbnail is auto-applied if not provided
    title: "Featured: Brand Film",
    alt: "Featured brand film video",
    description: "A cinematic brand piece demonstrating storytelling, pacing, and colour grading."
  }
];

export default function GalleryPage() {
  // const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const creativeProjects = getCreativeProjects();

  // const handleOpenModal = (project: Project) => {
  //   setSelectedProject(project);
  //   setIsModalOpen(true);
  // };

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  //   setTimeout(() => setSelectedProject(null), 300);
  // };

  return (
    <PageTransition>
      {/* Custom styles for Nas.Create brand colors */}
      <style jsx global>{`
        .nas-create-page {
          --nas-primary: #01FF70;
          --nas-secondary: #3D6A4B;
          --nas-accent: #196050;
          --nas-background: #1F1F1F;
          --nas-text-light: #FFFFFF;
          --nas-text-muted: #B0B0B0;
        }
      `}</style>

      <div className="nas-create-page min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Nas.Create Branded Header */}
        <section className="py-20 px-6 sm:px-8 relative overflow-hidden bg-[#1F1F1F]">
          <Image
            src={HERO_BACKGROUND}
            alt="Warm bokeh lights out of focus"
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 object-cover object-center scale-105 blur-[18px] brightness-[0.45]"
          />

          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(1,255,112,0.16)_0%,rgba(31,31,31,0.92)_58%,rgba(3,7,18,0.95)_100%)]"
          />

          <div className="absolute inset-0 opacity-[0.09]">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2301FF70' fill-opacity='0.2'%3E%3Ccircle cx='7' cy='7' r='7'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="max-w-6xl mx-auto text-center relative z-10 px-2 sm:px-0">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="flex flex-col items-center mb-8">
                {/* Nas.Create Logo */}
                <div className="flex items-center justify-center mb-6">
                  <div className="relative group">
                    <div className="w-32 h-20 md:w-48 md:h-32 flex items-center justify-center hover:scale-105 transform duration-200 transition-transform">
                      <Image
                        src="/logos/nas.create-logo.svg"
                        alt="Nas.Create Logo"
                        width={192}
                        height={128}
                        className="w-full h-full object-contain"
                        priority
                      />
                    </div>
                  </div>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                  Visual Storytelling
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-6">
                  Bringing ideas to life through the lens
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
                <a
                  href="https://www.instagram.com/nas.create/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 font-medium rounded-xl transition-all duration-200 transform hover:scale-105 group"
                  style={{
                    background: 'linear-gradient(135deg, #01FF70 0%, #3D6A4B 100%)',
                    color: '#1F1F1F'
                  }}
                >
                  <Instagram size={20} />
                  <span>@nas.create</span>
                  <ExternalLink size={16} className="opacity-70 group-hover:opacity-100" />
                </a>

                <div className="flex items-center gap-2" style={{ color: '#01FF70' }}>
                  <div className="w-2 h-2 rounded-full animate-pulse bg-green-400"></div>
                  <span className="text-sm font-medium">Available for Projects</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.5}>
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                <span className="px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm border"
                  style={{
                    backgroundColor: 'rgba(1, 255, 112, 0.15)',
                    borderColor: 'rgba(1, 255, 112, 0.3)',
                    color: '#01FF70'
                  }}>
                  🎬 Videography
                </span>
                <span className="px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm border"
                  style={{
                    backgroundColor: 'rgba(1, 255, 112, 0.15)',
                    borderColor: 'rgba(1, 255, 112, 0.3)',
                    color: '#01FF70'
                  }}>
                  📸 Photography
                </span>
                <span className="px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm border"
                  style={{
                    backgroundColor: 'rgba(1, 255, 112, 0.15)',
                    borderColor: 'rgba(1, 255, 112, 0.3)',
                    color: '#01FF70'
                  }}>
                  🎨 Color Grading
                </span>
                <span className="px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm border"
                  style={{
                    backgroundColor: 'rgba(1, 255, 112, 0.15)',
                    borderColor: 'rgba(1, 255, 112, 0.3)',
                    color: '#01FF70'
                  }}>
                  ✨ Post-Production
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.7}>
              <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Specialising in cinematic storytelling, brand content, and professional photography.
                Every frame crafted with precision and creativity to capture your unique vision.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Featured Work */}
        <section className="py-20 px-8 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">Featured Work</h2>
                <p className="text-gray-600 dark:text-gray-300">A quick look at recent creative work.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <LightboxGallery
                items={featuredMedia}
                columns={1}
                className="grid-cols-1"
                showTitles={true}
                enableZoom={false}
                enableDownload={false}
                inlinePlayback={true}
              />
            </ScrollReveal>
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className="py-20 px-8 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal direction="up" delay={0.2}>
              <div className="bg-white dark:bg-gray-700 rounded-2xl p-12 shadow-xl border border-gray-200 dark:border-gray-600 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-8">
                  <span className="text-white text-4xl">🎥</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Portfolio Coming Soon
                </h3>

                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  I&apos;m currently curating and preparing a showcase of my creative work, including
                  cinematic films, professional photography, and brand content for the
                  <span className="font-semibold text-green-600 dark:text-green-400"> Nas.Create</span> portfolio.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Videography</h4>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">•</span>
                        Cinematic Wedding Films
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">•</span>
                        Corporate Brand Videos
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">•</span>
                        Event Highlight Reels
                      </li>
                    </ul>
                  </div>

                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Photography</h4>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      <li className="flex items-center gap-2">
                        <span className="text-emerald-500">•</span>
                        Professional Portraits
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-emerald-500">•</span>
                        Corporate Headshots
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-emerald-500">•</span>
                        Creative Editorial Shoots
                      </li>
                    </ul>
                  </div>
                </div>

                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Each project will include behind-the-scenes insights, technical details, and client testimonials.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://www.instagram.com/nas.create/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 font-medium rounded-lg transition-all duration-200 flex items-center gap-2 justify-center hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #01FF70 0%, #3D6A4B 100%)',
                      color: '#1F1F1F'
                    }}
                  >
                    <Instagram size={18} />
                    Follow @nas.create
                  </a>
                  <a
                    href="/contact"
                    className="px-6 py-3 border font-medium rounded-lg transition-all duration-200 flex items-center gap-2 justify-center hover:bg-gray-800"
                    style={{
                      borderColor: '#3D6A4B',
                      color: '#01FF70'
                    }}
                  >
                    <ExternalLink size={18} />
                    Get In Touch
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Creative Services */}
        <section className="py-20 px-8 bg-white dark:bg-gray-900 transition-colors duration-300">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                  Creative Services
                </h2>
                <div className="w-24 h-1 mx-auto" style={{
                  background: 'linear-gradient(90deg, #01FF70 0%, #196050 100%)'
                }}></div>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ScrollReveal direction="up" delay={0.2}>
                <div className="rounded-2xl p-8 text-center border hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  style={{
                    background: 'linear-gradient(135deg, rgba(1, 255, 112, 0.05) 0%, rgba(1, 255, 112, 0.1) 100%)',
                  }}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg text-white"
                    style={{ background: 'linear-gradient(135deg, #01FF70 0%, #3D6A4B 100%)' }}>
                    🎬
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">
                    Videography
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-300">
                    Cinematic storytelling for brands, events, and personal projects with professional editing.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-xs">
                      Wedding Films
                    </span>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-xs">
                      Corporate Videos
                    </span>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-xs">
                      Event Coverage
                    </span>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.3}>
                <div className="rounded-2xl p-8 text-center border hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  style={{
                    background: 'linear-gradient(135deg, rgba(61, 106, 75, 0.05) 0%, rgba(61, 106, 75, 0.1) 100%)',
                  }}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg text-white"
                    style={{ background: 'linear-gradient(135deg, #3D6A4B 0%, #196050 100%)' }}>
                    📸
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">
                    Photography
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-300">
                    Professional portraits, headshots, and creative photography with advanced retouching.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-full text-xs">
                      Portraits
                    </span>
                    <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-full text-xs">
                      Headshots
                    </span>
                    <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-full text-xs">
                      Editorial
                    </span>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.4}>
                <div className="rounded-2xl p-8 text-center border hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  style={{
                    background: 'linear-gradient(135deg, rgba(25, 96, 80, 0.05) 0%, rgba(25, 96, 80, 0.1) 100%)',
                  }}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg text-white"
                    style={{ background: 'linear-gradient(135deg, #196050 0%, #01FF70 100%)' }}>
                    🎨
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">
                    Post-Production
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-300">
                    Professional editing, color grading, and post-processing to bring your vision to life.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 rounded-full text-xs">
                      Color Grading
                    </span>
                    <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 rounded-full text-xs">
                      Editing
                    </span>
                    <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 rounded-full text-xs">
                      Retouching
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 px-8 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal direction="up" delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
                Ready to Create Something Amazing?
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 transition-colors duration-300">
                                  Whether it&apos;s capturing your special moments or creating compelling brand content,
                I&apos;m here to help tell your story through stunning visuals.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.5}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="px-8 py-4 font-medium rounded-xl transition-all duration-200 transform hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #01FF70 0%, #3D6A4B 100%)',
                    color: '#1F1F1F'
                  }}
                >
                  Start Your Project
                </a>
                <a
                  href="https://www.instagram.com/nas.create/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 border font-medium rounded-xl transition-all duration-200 flex items-center gap-2 justify-center hover:bg-gray-800"
                  style={{
                    borderColor: '#3D6A4B',
                    color: '#01FF70'
                  }}
                >
                  <Instagram size={18} />
                  Follow on Instagram
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
