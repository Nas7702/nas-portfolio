import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Nas, the commercial videographer and photographer behind Nas Create. Brand films, Meta ads and event coverage for businesses across the UK.",
  openGraph: {
    title: "About | Nas Create",
    description:
      "Meet Nas, the commercial videographer and photographer behind Nas Create. Brand films, Meta ads and event coverage for businesses across the UK.",
    url: "/about",
    siteName: "Nas Create",
    locale: "en_GB",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Nas Create",
    description:
      "Meet Nas, the commercial videographer and photographer behind Nas Create.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
