"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { trackCta } from "../../lib/analytics";

interface AnalyticsLinkProps {
  href: string;
  event: string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
  title?: string;
  target?: string;
  rel?: string;
}

export default function AnalyticsLink({
  href,
  event,
  className,
  children,
  ariaLabel,
  title,
  target,
  rel,
}: AnalyticsLinkProps) {
  const handleClick = () => {
    trackCta(event, { href });
  };

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      title={title}
      className={className}
      onClick={handleClick}
      target={target}
      rel={rel}
    >
      {children}
    </Link>
  );
}


