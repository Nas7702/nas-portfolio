import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Nas",
  description: "Computer Science graduate from the University of Sheffield with expertise in software engineering, data science, and creative media. Freelance videographer since 2020.",
  openGraph: {
    title: "About - Nas",
    description: "Computer Science graduate specialising in software engineering, data science, and creative videography. Sheffield powerlifting photographer and filmmaker.",
    url: "/about",
    siteName: "Nas Portfolio",
    images: [
      {
        url: "/images/bokeh-lights-dark-background.jpg",
        width: 1200,
        height: 630,
        alt: "About Nas - Developer & Creative",
      },
    ],
    locale: "en_GB",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "About - Nas",
    description: "Computer Science graduate specialising in software engineering, data science, and creative videography.",
    images: ["/images/bokeh-lights-dark-background.jpg"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
