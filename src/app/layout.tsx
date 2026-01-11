import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "./components/ThemeProvider";
import Navbar from "./components/Navbar";
import FloatingDock from "./components/FloatingDock";
import AnimationWrapper from "./components/AnimationWrapper";
import CustomCursor from "./components/CustomCursor";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nas - Data Scientist & Creative",
  description: "Portfolio of Nas - Developer, Data Scientist & Creative Professional.",
  openGraph: {
    title: "Nas - Data Scientist & Creative",
    description: "Bridging the gap between analytical precision and creative storytelling.",
    url: "https://nas-portfolio.dev",
    siteName: "Nas Portfolio",
    images: [
      {
        url: "/images/bokeh-lights-dark-background.jpg",
        width: 1200,
        height: 630,
        alt: "Nas Portfolio",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nas - Data Scientist & Creative",
    description: "Bridging the gap between analytical precision and creative storytelling.",
    images: ["/images/bokeh-lights-dark-background.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for faster resource loading */}
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://i.vimeocdn.com" />
        <link rel="preconnect" href="https://player.vimeo.com" />
        <link rel="preconnect" href="https://www.instagram.com" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://i.vimeocdn.com" />
        <link rel="dns-prefetch" href="https://player.vimeo.com" />
        <link rel="dns-prefetch" href="https://www.instagram.com" />

        {/* Prefetch critical routes */}
        <link rel="prefetch" href="/tech" />
        <link rel="prefetch" href="/create" />
        <link rel="prefetch" href="/about" />
        <link rel="prefetch" href="/contact" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen overflow-x-hidden selection:bg-accent/30 selection:text-accent-foreground cursor-none`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <Navbar /> {/* Keeping existing navbar for mobile fallback for now */}
          <FloatingDock />
          <CustomCursor />
          <AnimationWrapper>
            {children}
          </AnimationWrapper>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
