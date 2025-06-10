import PageTransition from "../components/PageTransition";
import ScrollReveal from "../components/ScrollReveal";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";

export default function ContactPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <section className="py-20 px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <ScrollReveal direction="up" delay={0.1}>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                  Get In Touch
                </h1>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.3}>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  I&apos;d love to hear from you! Whether you have a project in mind, want to collaborate,
                  or just say hello, feel free to reach out.
                </p>
              </ScrollReveal>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Information */}
              <ScrollReveal direction="left" delay={0.4}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Contact Information
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center">
                        <Mail size={20} />
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">Email</p>
                        <p className="text-gray-900 dark:text-white font-medium">hello@example.com</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg flex items-center justify-center">
                        <Phone size={20} />
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">Phone</p>
                        <p className="text-gray-900 dark:text-white font-medium">+1 (555) 123-4567</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg flex items-center justify-center">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">Location</p>
                        <p className="text-gray-900 dark:text-white font-medium">San Francisco, CA</p>
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Follow Me
                    </h3>
                    <div className="flex gap-3">
                      <a href="#" className="w-10 h-10 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <Github size={20} />
                      </a>
                      <a href="#" className="w-10 h-10 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <Linkedin size={20} />
                      </a>
                      <a href="#" className="w-10 h-10 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <Twitter size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Contact Form Placeholder */}
              <ScrollReveal direction="right" delay={0.6}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Send a Message
                  </h2>

                  <div className="space-y-4">
                    <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                        Contact Form Coming Soon
                      </h3>
                      <p className="text-blue-700 dark:text-blue-300 text-sm">
                        A fully functional contact form will be implemented here. For now,
                        please reach out using the contact information provided.
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <a
                        href="mailto:hello@example.com"
                        className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-center"
                      >
                        Send Email
                      </a>
                      <a
                        href="tel:+15551234567"
                        className="flex-1 py-3 px-6 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium rounded-lg transition-colors text-center"
                      >
                        Call Now
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
