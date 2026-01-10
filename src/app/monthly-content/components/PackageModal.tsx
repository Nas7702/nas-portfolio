"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Mail } from "lucide-react";
import { trackCta } from "../../../lib/analytics";

const WHATSAPP_BASE = "https://wa.me/447475437833";
const EMAIL_ADDRESS = "nascreate0@gmail.com";

interface PackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageName: string;
  packageId: string;
}

interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

function getUTMParams(): UTMParams {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
  const result: UTMParams = {};
  for (const key of utmKeys) {
    const value = params.get(key);
    if (value) result[key] = value;
  }
  return result;
}

function formatUTMString(utms: UTMParams): string {
  const entries = Object.entries(utms).filter(([, v]) => v);
  if (entries.length === 0) return "";
  return entries.map(([k, v]) => `${k.replace("utm_", "")}: ${v}`).join(", ");
}

export default function PackageModal({
  isOpen,
  onClose,
  packageName,
  packageId,
}: PackageModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    business: "",
    email: "",
    message: "",
    company_website: "", // honeypot
  });
  const [utms, setUtms] = useState<UTMParams>({});

  useEffect(() => {
    setUtms(getUTMParams());
  }, []);

  // Track modal open
  useEffect(() => {
    if (isOpen) {
      trackCta("monthly_content_modal_open", { package_id: packageId });
    }
  }, [isOpen, packageId]);

  // Handle escape key
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleEscape]);

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
    const lines = [
      `Hi Nas! I'm interested in the *${packageName}* package.`,
      ``,
      `*Name:* ${formData.name}`,
      `*Business:* ${formData.business}`,
    ];

    if (formData.email) {
      lines.push(`*Email:* ${formData.email}`);
    }

    if (formData.message) {
      lines.push(``, `*Message:*`, formData.message);
    }

    const utmString = formatUTMString(utms);
    if (utmString) {
      lines.push(``, `---`, `Source: ${utmString}`);
    }

    const text = lines.join("\n");
    const whatsappUrl = `${WHATSAPP_BASE}?text=${encodeURIComponent(text)}`;

    trackCta("monthly_content_modal_whatsapp", {
      package_id: packageId,
      has_email: !!formData.email,
      has_message: !!formData.message,
      ...utms,
    });

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    onClose();
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

    const subject = `Enquiry: ${packageName} Package`;
    const bodyLines = [
      `Hi Nas,`,
      ``,
      `I'm interested in the ${packageName} package.`,
      ``,
      `Name: ${formData.name}`,
      `Business: ${formData.business}`,
      `Email: ${formData.email}`,
    ];

    if (formData.message) {
      bodyLines.push(``, `Message:`, formData.message);
    }

    const body = bodyLines.join("\n");
    const mailtoUrl = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    trackCta("monthly_content_modal_email", {
      package_id: packageId,
      has_message: !!formData.message,
      ...utms,
    });

    window.location.href = mailtoUrl;
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="relative bg-card border border-border rounded-2xl p-6 md:p-8 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary/80 transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              {/* Header */}
              <div className="mb-6">
                <div className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-3">
                  {packageName} Package
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Get started with {packageName}
                </h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Fill in your details and choose how to reach out.
                </p>
              </div>

              {/* Form */}
              <form className="space-y-4">
                {/* Honeypot */}
                <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
                  <label htmlFor="modal_company_website">Website</label>
                  <input
                    type="text"
                    id="modal_company_website"
                    name="company_website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.company_website}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="modal_name"
                    className="text-sm font-medium text-muted-foreground"
                  >
                    Name <span className="text-accent">*</span>
                  </label>
                  <input
                    id="modal_name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-secondary/50 border border-transparent focus:border-accent focus:bg-background rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 transition-all outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="modal_business"
                    className="text-sm font-medium text-muted-foreground"
                  >
                    Business <span className="text-accent">*</span>
                  </label>
                  <input
                    id="modal_business"
                    name="business"
                    type="text"
                    required
                    placeholder="Your business or brand"
                    value={formData.business}
                    onChange={handleChange}
                    className="w-full bg-secondary/50 border border-transparent focus:border-accent focus:bg-background rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 transition-all outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="modal_email"
                    className="text-sm font-medium text-muted-foreground"
                  >
                    Email{" "}
                    <span className="text-muted-foreground/50 font-normal">
                      (required for email option)
                    </span>
                  </label>
                  <input
                    id="modal_email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-secondary/50 border border-transparent focus:border-accent focus:bg-background rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 transition-all outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="modal_message"
                    className="text-sm font-medium text-muted-foreground"
                  >
                    Message{" "}
                    <span className="text-muted-foreground/50 font-normal">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    id="modal_message"
                    name="message"
                    rows={2}
                    placeholder="Anything else you'd like to share..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-secondary/50 border border-transparent focus:border-accent focus:bg-background rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 transition-all outline-none resize-none"
                  />
                </div>

                {/* Submit buttons */}
                <div className="space-y-3 pt-2">
                  <button
                    type="submit"
                    onClick={handleWhatsApp}
                    className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#22c55e] text-white font-semibold rounded-xl py-3.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                  >
                    <MessageCircle size={20} />
                    Message on WhatsApp
                  </button>

                  <button
                    type="button"
                    onClick={handleEmail}
                    className="w-full flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/80 text-foreground font-semibold rounded-xl py-3.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                  >
                    <Mail size={20} />
                    Send Email
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}






