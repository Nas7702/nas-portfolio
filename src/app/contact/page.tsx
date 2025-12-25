"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import PageTransition from "../components/PageTransition";
import { motion } from "framer-motion";
import { Check, Instagram, Mail, MapPin, MessageCircle, ArrowRight } from "lucide-react";
import { trackCta } from "../../lib/analytics";

const WHATSAPP_BASE = "https://wa.me/447475437833";
const EMAIL_ADDRESS = "nascreate0@gmail.com";
const EMAIL_URL =
  "mailto:nascreate0@gmail.com?subject=New%20enquiry%20from%20nascreate.com&body=Hi%20Nas%2C%0AProject%20type%3A%20%5BTech%2FVideo%5D%0ABudget%3A%20%5B%5D%0ATimeline%3A%20%5B%5D%0ALinks%3A%20%5B%5D";
const INSTAGRAM_URL = "https://instagram.com/nas.create";

function ContactPageInner() {
  const searchParams = useSearchParams();
  const [copied, setCopied] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    business: "",
    email: "",
    message: "",
    company_website: "", // honeypot
  });

  // Get source from URL params for context
  const source = searchParams?.get("src") || "contact_page";
  const packageParam = searchParams?.get("package");

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (formData.company_website) {
      console.info("[honeypot] Spam submission blocked");
      return;
    }

    // Build WhatsApp message
    const lines = [`Hi Nas!`, ``];

    if (packageParam) {
      lines[0] = `Hi Nas! I'm interested in the *${packageParam}* package.`;
    }

    lines.push(`*Name:* ${formData.name}`);
    if (formData.business) {
      lines.push(`*Business:* ${formData.business}`);
    }
    if (formData.email) {
      lines.push(`*Email:* ${formData.email}`);
    }
    if (formData.message) {
      lines.push(``, `*Message:*`, formData.message);
    }

    const text = lines.join("\n");
    const whatsappUrl = `${WHATSAPP_BASE}?text=${encodeURIComponent(text)}`;

    trackCta("contact_form_whatsapp", {
      source,
      package: packageParam || null,
      has_email: !!formData.email,
      has_message: !!formData.message,
    });

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const handleEmail = (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (formData.company_website) {
      console.info("[honeypot] Spam submission blocked");
      return;
    }

    // Email requires email field
    if (!formData.email) {
      alert("Please enter your email address to use the email option.");
      return;
    }

    const subject = packageParam
      ? `Enquiry: ${packageParam} Package`
      : `Portfolio Enquiry: ${formData.name}`;

    const bodyLines = [`Hi Nas,`, ``];

    if (packageParam) {
      bodyLines.push(`I'm interested in the ${packageParam} package.`, ``);
    }

    bodyLines.push(`Name: ${formData.name}`);
    if (formData.business) {
      bodyLines.push(`Business: ${formData.business}`);
    }
    bodyLines.push(`Email: ${formData.email}`);

    if (formData.message) {
      bodyLines.push(``, `Message:`, formData.message);
    }

    const body = bodyLines.join("\n");
    const mailtoUrl = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    trackCta("contact_form_email", {
      source,
      package: packageParam || null,
      has_message: !!formData.message,
    });

    window.location.href = mailtoUrl;
  };

  const whatsappHref = `${WHATSAPP_BASE}?text=${encodeURIComponent("Hi Nas!")}`;

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
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Let&apos;s Talk
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Got a project in mind? Whether it&apos;s data science or visual storytelling,
              I&apos;m ready to help you build it.
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

            {/* Form Column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-border p-8 rounded-[2rem] shadow-sm"
            >
              <h2 className="text-2xl font-bold mb-2">Send a Message</h2>
              <p className="text-muted-foreground text-sm mb-6">
                Fill in your details and choose how to reach out.
              </p>

              <form className="space-y-5">
                {/* Honeypot */}
                <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
                  <label htmlFor="contact_company_website">Website</label>
                  <input
                    type="text"
                    id="contact_company_website"
                    name="company_website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.company_website}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact_name" className="text-sm font-medium text-muted-foreground ml-1">
                    Name <span className="text-primary">*</span>
                  </label>
                  <input
                    id="contact_name"
                    name="name"
                    type="text"
                    required
                    className="w-full bg-secondary/50 border border-transparent focus:border-primary focus:bg-background rounded-xl px-4 py-3 transition-all outline-none"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact_business" className="text-sm font-medium text-muted-foreground ml-1">
                    Business{" "}
                    <span className="text-muted-foreground/50 font-normal">(optional)</span>
                  </label>
                  <input
                    id="contact_business"
                    name="business"
                    type="text"
                    className="w-full bg-secondary/50 border border-transparent focus:border-primary focus:bg-background rounded-xl px-4 py-3 transition-all outline-none"
                    placeholder="Your business or brand"
                    value={formData.business}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact_email" className="text-sm font-medium text-muted-foreground ml-1">
                    Email{" "}
                    <span className="text-muted-foreground/50 font-normal">(required for email option)</span>
                  </label>
                  <input
                    id="contact_email"
                    name="email"
                    type="email"
                    className="w-full bg-secondary/50 border border-transparent focus:border-primary focus:bg-background rounded-xl px-4 py-3 transition-all outline-none"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact_message" className="text-sm font-medium text-muted-foreground ml-1">
                    Message{" "}
                    <span className="text-muted-foreground/50 font-normal">(optional)</span>
                  </label>
                  <textarea
                    id="contact_message"
                    name="message"
                    rows={3}
                    className="w-full bg-secondary/50 border border-transparent focus:border-primary focus:bg-background rounded-xl px-4 py-3 transition-all outline-none resize-none"
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                {/* Dual submit buttons */}
                <div className="space-y-3 pt-2">
                  <button
                    type="submit"
                    onClick={handleWhatsApp}
                    className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#22c55e] text-white font-semibold rounded-xl py-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                  >
                    <MessageCircle size={20} />
                    Message on WhatsApp
                  </button>

                  <button
                    type="button"
                    onClick={handleEmail}
                    className="w-full flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/80 text-foreground font-semibold rounded-xl py-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                  >
                    <Mail size={20} />
                    Send Email
                  </button>
                </div>
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
