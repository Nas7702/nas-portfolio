import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a free discovery call for commercial videography and photography. Based in Yorkshire, working with businesses across the UK.",
  openGraph: {
    title: "Contact | Nas Create",
    description:
      "Book a free discovery call for commercial videography and photography. Based in Yorkshire, working with businesses across the UK.",
    url: "/contact",
    siteName: "Nas Create",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Nas Create",
    description:
      "Book a free discovery call for commercial videography and photography. Based in Yorkshire, working across the UK.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
