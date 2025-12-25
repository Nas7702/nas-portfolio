"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import FloatingDock from "./FloatingDock";
import CustomCursor from "./CustomCursor";

/**
 * Conditionally renders Navbar and FloatingDock on all routes
 * except /monthly-content to reduce distractions and increase
 * conversions on that landing page.
 * CustomCursor is always rendered (body has cursor-none globally).
 */
export default function ConditionalChrome() {
  const pathname = usePathname();
  const isMonthlyContent = pathname.startsWith("/monthly-content");

  return (
    <>
      {!isMonthlyContent && (
        <>
          <Navbar />
          <FloatingDock />
        </>
      )}
      <CustomCursor />
    </>
  );
}

