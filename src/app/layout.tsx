import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "./components/ThemeProvider";
import Navbar from "./components/Navbar";
import MobileBottomNav from "./components/MobileBottomNav";
import AnimationWrapper from "./components/AnimationWrapper";
import CustomCursor from "./components/CustomCursor";
import DebugFpsCounter from "./components/DebugFpsCounter";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

// viewport-fit=cover: lets position:fixed elements cover the full screen on iOS,
// including the Dynamic Island/notch strip at top and home indicator strip at bottom.
export const viewport: Viewport = {
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://nascreate.com"),
  title: {
    default: "Nas.Create — Visual Storyteller",
    template: "%s | Nas.Create",
  },
  description: "Cinematic videography, photography & brand content. Based in the UK, available worldwide.",
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
            __html: `(function(){try{var t=localStorage.getItem("nas-theme");if(!t){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}if(t==="light"){document.documentElement.classList.remove("dark");document.documentElement.classList.add("light");document.documentElement.style.colorScheme="light";}else{document.documentElement.classList.add("dark");document.documentElement.classList.remove("light");document.documentElement.style.colorScheme="dark";}}catch(e){}})()`,
          }}
        />
        {/* Google Fonts preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
        {/* Preconnect to Cloudflare R2 for self-hosted videos */}
        <link rel="preconnect" href="https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev" />

        {/* Prefetch critical routes */}
        <link rel="prefetch" href="/create" />
        <link rel="prefetch" href="/about" />
        <link rel="prefetch" href="/contact" />
      </head>
      <body
        className="font-sans antialiased bg-background text-foreground min-h-screen flex flex-col overflow-x-hidden selection:bg-accent/30 selection:text-accent-foreground cursor-none"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <Navbar />
          <CustomCursor />
          <DebugFpsCounter />
          <AnimationWrapper>
            {children}
          </AnimationWrapper>
          <MobileBottomNav />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
