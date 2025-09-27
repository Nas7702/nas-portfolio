import PageTransition from "../components/PageTransition";
import ScrollReveal from "../components/ScrollReveal";
import { Mail, MapPin, Phone, Calendar, Code, Camera } from "lucide-react";

export default function ContactPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <section className="py-20 px-8">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                  Let&apos;s Work Together
                </h1>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  Whether you need data insights, software solutions, or compelling visual content,
                  I&apos;d love to help bring your vision to life. Let&apos;s discuss your project!
                </p>
              </div>
            </ScrollReveal>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <ScrollReveal direction="left" delay={0.3}>
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      Get In Touch
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                      I&apos;m always excited to work on new projects and collaborate with interesting people.
                      Drop me a line and let&apos;s create something amazing together.
                    </p>
                  </div>

                  {/* Contact Details */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center">
                        <Mail size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Email</h3>
                        <a
                          href="mailto:nas@example.com"
                          className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          nhoque7702@gmail.com
                          nas.create0@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center">
                        <Phone size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Phone</h3>
                        <a
                          href="tel:+44747547833"
                          className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                        >
                          +44 747547833
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Location</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Available for remote work & local projects
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full flex items-center justify-center">
                        <Calendar size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Availability</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Currently accepting new projects
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Services Overview */}
              <ScrollReveal direction="right" delay={0.3}>
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Services Offered
                  </h2>

                  {/* Technical Services */}
                  <div className="bg-blue-50 dark:bg-blue-900/10 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center">
                        <Code size={20} />
                      </div>
                      <h3 className="text-xl font-bold text-blue-900 dark:text-blue-300">
                        Technical Services
                      </h3>
                    </div>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      <li>• Data Analysis & Visualization</li>
                      <li>• Machine Learning Models</li>
                      <li>• Interactive Dashboards</li>
                      <li>• Web Application Development</li>
                      <li>• Database Design & Optimization</li>
                      <li>• Statistical Analysis & Reporting</li>
                    </ul>
                  </div>

                  {/* Creative Services */}
                  <div className="bg-green-50 dark:bg-green-900/10 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center">
                        <Camera size={20} />
                      </div>
                      <h3 className="text-xl font-bold text-green-900 dark:text-green-300">
                        Creative Services
                      </h3>
                    </div>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      <li>• Corporate Video Production</li>
                      <li>• Professional Portrait Photography</li>
                      <li>• Wedding & Event Videography</li>
                      <li>• Video Editing & Post-Production</li>
                      <li>• Colour Grading & Correction</li>
                      <li>• Photo Retouching & Enhancement</li>
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* CTA Section */}
            <ScrollReveal direction="up" delay={0.5}>
              <div className="mt-16 text-center">
                <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Ready to Start Your Project?
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed max-w-2xl mx-auto">
                    Whether you&apos;re looking to unlock insights from your data or capture your story through visuals,
                    I&apos;m here to help. Let&apos;s discuss how we can work together to achieve your goals.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="mailto:nascreate0@gmail.com?subject=Project Inquiry"
                      className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
                    >
                      Send Email
                    </a>
                    <a
                      href="tel:+44747547833"
                      className="px-8 py-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium rounded-xl transition-colors"
                    >
                      Call Now
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Response Time */}
            <ScrollReveal direction="up" delay={0.7}>
              <div className="mt-12 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  I typically respond to all inquiries within 24 hours.
                  For urgent projects, feel free to call directly.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
