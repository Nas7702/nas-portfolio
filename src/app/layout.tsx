import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "./components/ThemeProvider";
import Navbar from "./components/Navbar";
import AnimationWrapper from "./components/AnimationWrapper";
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <Navbar />
          <AnimationWrapper>
            {children}
          </AnimationWrapper>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
