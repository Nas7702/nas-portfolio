import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creative Portfolio - Nas",
  description: "Professional videography and photography portfolio featuring brand content, sports coverage, fitness media, and cinematic storytelling for businesses and athletes.",
  openGraph: {
    title: "Creative Portfolio - Nas",
    description: "Professional videography and photography portfolio featuring brand content, sports coverage, fitness media, and cinematic storytelling.",
    url: "/create",
    siteName: "Nas Portfolio",
    images: [
      {
        url: "/images/bokeh-lights-dark-background.jpg",
        width: 1200,
        height: 630,
        alt: "Creative Portfolio - Videography & Photography",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creative Portfolio - Nas",
    description: "Professional videography and photography portfolio featuring brand content, sports coverage, and cinematic storytelling.",
    images: ["/images/bokeh-lights-dark-background.jpg"],
  },
};

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
