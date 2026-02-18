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
  metadataBase: new URL("https://nascreate.com"),
  title: {
    default: "Nas.Create — Visual Storyteller",
    template: "%s | Nas.Create",
  },
  description: "Cinematic videography, photography & brand content. Based in the UK, available worldwide.",
  icons: {
    icon: [
      { url: "/logos/darkmode-wordmark.png", type: "image/png" },
    ],
    shortcut: "/logos/darkmode-wordmark.png",
    apple: "/logos/darkmode-wordmark.png",
  },
  openGraph: {
    title: "Nas.Create — Visual Storyteller",
    description: "Cinematic videography, photography & brand content. Based in the UK, available worldwide.",
    url: "https://nascreate.com",
    siteName: "Nas.Create",
    images: [
      {
        url: "/images/bokeh-lights-dark-background.jpg",
        width: 1200,
        height: 630,
        alt: "Nas.Create — Visual Storyteller",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nas.Create — Visual Storyteller",
    description: "Cinematic videography, photography & brand content. Based in the UK, available worldwide.",
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
        {/* Prevent flash of wrong theme on load */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("nas-theme");if(t==="light"&&!location.pathname.startsWith("/create")){document.documentElement.classList.remove("dark");document.documentElement.classList.add("light");document.documentElement.style.colorScheme="light"}}catch(e){}})()`,
          }}
        />
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
