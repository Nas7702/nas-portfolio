import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technical Projects - Nas",
  description: "A collection of data science projects and software applications demonstrating analytical skills and technical expertise. From machine learning models to interactive dashboards and web applications.",
  openGraph: {
    title: "Technical Projects - Nas",
    description: "Data science projects and software applications showcasing machine learning, analytics, and full-stack development.",
    url: "/tech",
    siteName: "Nas Portfolio",
    images: [
      {
        url: "/images/bokeh-lights-dark-background.jpg",
        width: 1200,
        height: 630,
        alt: "Technical Projects Portfolio",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Technical Projects - Nas",
    description: "Data science projects and software applications showcasing machine learning, analytics, and full-stack development.",
    images: ["/images/bokeh-lights-dark-background.jpg"],
  },
};

export default function TechLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
