"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import PageTransition from "../components/PageTransition";
import { motion } from "framer-motion";
import { Check, Instagram, Mail, MapPin, MessageCircle, ArrowRight } from "lucide-react";

const WHATSAPP_BASE = "https://wa.me/447475437833";
const EMAIL_URL =
  "mailto:nascreate0@gmail.com?subject=New%20enquiry%20from%20nascreate.com&body=Hi%20Nas%2C%0AProject%20type%3A%20%5BVideo%2FPhoto%2FEvent%5D%0ABudget%3A%20%5B%5D%0ATimeline%3A%20%5B%5D%0ALinks%3A%20%5B%5D";
const INSTAGRAM_URL = "https://instagram.com/nas.create";

const SERVICES = ["videography", "photography", "post-production", "color-grading"] as const;
type Service = typeof SERVICES[number];

function ContactPageInner() {
  const searchParams = useSearchParams();
  const [copied, setCopied] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form submission via mailto
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const subject = `Portfolio Enquiry: ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;

    window.location.href = `mailto:nascreate0@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setIsSubmitting(false);
    setFormData({ name: "", email: "", message: "" });
  };

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(null), 1400);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  const handleCopy = async (value: string, id: string) => {
    try {
        await navigator.clipboard.writeText(value);
    } catch (error) {
      console.error("Clipboard copy failed", error);
    } finally {
      setCopied(id);
    }
  };

  useEffect(() => {
    const service = searchParams?.get("service") as Service | null;
    if (service && SERVICES.includes(service)) setSelectedService(service);
  }, [searchParams]);

  const whatsappHref = useMemo(() => {
    const serviceText = selectedService ? selectedService.replace("-", " ") : "[service]";
    const text = `Hi Nas, I’m interested in ${serviceText}. Budget: [] Timeline: []`;
    const q = new URLSearchParams({ text });
    return `${WHATSAPP_BASE}?${q.toString()}`;
  }, [selectedService]);

  const contactMethods = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      label: "WhatsApp",
      value: "+44 7475 437833",
      href: whatsappHref,
      action: "Chat",
      primary: true,
    },
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "nascreate0@gmail.com",
      href: EMAIL_URL,
      action: "Write",
      copyId: "email",
    },
    {
      icon: <Instagram className="w-6 h-6" />,
      label: "Instagram",
      value: "@nas.create",
      href: INSTAGRAM_URL,
      action: "Follow",
    },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-32 pt-24 px-6">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-foreground">
              Let&apos;s Talk
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Got a project? Whether it&apos;s a brand film, event coverage or a photo shoot, get in touch.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-start">

            {/* Contact Methods Column */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold mb-8">Direct Channels</h2>

              <div className="grid gap-4">
                {contactMethods.map((method, index) => (
                  <motion.div
                    key={method.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`group relative flex items-center p-6 rounded-3xl border transition-all duration-300 ${
                      method.primary
                        ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700"
                        : "bg-card border-border hover:border-primary/50"
                    }`}
                  >
                    <a
                      href={method.href}
                      className="absolute inset-0 z-10"
                      target={method.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                    />

                    <div className={`p-3 rounded-2xl mr-4 ${
                      method.primary ? "bg-white/10" : "bg-secondary"
                    }`}>
                      {method.icon}
                    </div>

                    <div className="flex-grow">
                      <div className={`text-sm font-medium mb-0.5 ${
                        method.primary ? "text-blue-100" : "text-muted-foreground"
                      }`}>
                        {method.label}
                      </div>
                      <div className="font-semibold text-lg">{method.value}</div>
                    </div>

                    {method.copyId && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleCopy(method.value, method.copyId!);
                        }}
                        className="relative z-20 p-2 hover:bg-secondary rounded-full transition-colors"
                      >
                         {copied === method.copyId ? <Check size={18} /> : <span className="text-xs font-medium px-2">Copy</span>}
                      </button>
                    )}

                    <ArrowRight className={`transform transition-transform group-hover:translate-x-1 ${
                      method.primary ? "text-white" : "text-muted-foreground group-hover:text-primary"
                    }`} />
                  </motion.div>
                ))}
              </div>

              <div className="bg-secondary/30 p-6 rounded-3xl border border-border/50">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-muted-foreground mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Based in the UK</h3>
                    <p className="text-muted-foreground text-sm">
                      Available for remote work worldwide and local shoots across the UK.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Simple Form Column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-border p-8 rounded-[2rem] shadow-sm"
            >
              <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-muted-foreground ml-1">Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    className="w-full bg-secondary/50 border border-transparent focus:border-primary focus:bg-background rounded-xl px-4 py-3 transition-all outline-none"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-muted-foreground ml-1">Email</label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="w-full bg-secondary/50 border border-transparent focus:border-primary focus:bg-background rounded-xl px-4 py-3 transition-all outline-none"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-muted-foreground ml-1">Message</label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    className="w-full bg-secondary/50 border border-transparent focus:border-primary focus:bg-background rounded-xl px-4 py-3 transition-all outline-none resize-none"
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground font-semibold rounded-xl py-4 hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </motion.div>

          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={null}>
      <ContactPageInner />
    </Suspense>
  );
}
