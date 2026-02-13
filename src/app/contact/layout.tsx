import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - Nas",
  description: "Get in touch for videography, photography, software development, or data science projects. Available for freelance work and collaborations.",
  openGraph: {
    title: "Contact - Nas",
    description: "Get in touch for videography, photography, software development, or data science projects. Available for freelance work and collaborations.",
    url: "/contact",
    siteName: "Nas Portfolio",
    images: [
      {
        url: "/images/bokeh-lights-dark-background.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Nas",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact - Nas",
    description: "Get in touch for videography, photography, software development, or data science projects.",
    images: ["/images/bokeh-lights-dark-background.jpg"],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
