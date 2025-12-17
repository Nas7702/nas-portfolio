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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
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
