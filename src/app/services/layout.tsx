import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Videography, photography, event coverage and post-production for businesses. Every project starts with a brief and ends with content that has a job to do.",
  openGraph: {
    title: "Services | Nas Create",
    description:
      "Videography, photography, event coverage and post-production for businesses. Every project starts with a brief and ends with content that has a job to do.",
    url: "/services",
    siteName: "Nas Create",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Nas Create",
    description:
      "Videography, photography, event coverage and post-production for businesses across the UK.",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
