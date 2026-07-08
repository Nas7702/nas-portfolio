"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MobileBottomNav from "./MobileBottomNav";
import CustomCursor from "./CustomCursor";
import DebugFpsCounter from "./DebugFpsCounter";
import AnimationWrapper from "./AnimationWrapper";
import RouteReveal from "./RouteReveal";
import ScrollProgress from "./ScrollProgress";

const STANDALONE_ROUTES = ["/property"];

interface SiteChromeProps {
  children: React.ReactNode;
}

export default function SiteChrome({ children }: SiteChromeProps) {
  const pathname = usePathname();
  const isStandalone = STANDALONE_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  if (isStandalone) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <ScrollProgress />
      <RouteReveal />
      <CustomCursor />
      <DebugFpsCounter />
      <AnimationWrapper>{children}</AnimationWrapper>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
