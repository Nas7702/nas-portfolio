import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creative Portfolio",
  description:
    "Commercial videography and photography portfolio. Brand films, Meta ads, event coverage and cinematic content built around business goals.",
  openGraph: {
    title: "Creative Portfolio | Nas Create",
    description:
      "Commercial videography and photography portfolio. Brand films, Meta ads, event coverage and cinematic content built around business goals.",
    url: "/create",
    siteName: "Nas Create",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creative Portfolio | Nas Create",
    description:
      "Brand films, Meta ads, event coverage and cinematic content built around business goals.",
  },
};

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
