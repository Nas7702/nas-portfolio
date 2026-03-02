"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Camera, Briefcase, User, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/",         label: "Home",     Icon: Home      },
  { href: "/create",   label: "Work",     Icon: Camera    },
  { href: "/services", label: "Services", Icon: Briefcase },
  { href: "/about",    label: "About",    Icon: User      },
  { href: "/contact",  label: "Contact",  Icon: Mail      },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Fixed bottom nav — mobile only */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background/80 supports-[backdrop-filter]:bg-background/55 backdrop-blur-2xl"
        aria-label="Site navigation"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <div className="border-t border-border/40 shadow-[0_-8px_32px_rgba(0,0,0,0.3)]">
          <div className="flex items-stretch h-14">
            {tabs.map((tab) => {
              const active = isActive(tab.href);
              const { Icon } = tab;

              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className="flex-1 flex flex-col items-center justify-center gap-[5px] relative group"
                  aria-current={active ? "page" : undefined}
                >
                  {/* Sliding accent indicator — top edge */}
                  {active && (
                    <motion.span
                      layoutId="mobile-nav-indicator"
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-px bg-foreground/50"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}

                  <Icon
                    size={17}
                    strokeWidth={active ? 1.75 : 1.4}
                    className={cn(
                      "transition-colors duration-200 shrink-0",
                      active
                        ? "text-foreground"
                        : "text-muted-foreground group-active:text-foreground/70"
                    )}
                  />

                  <span
                    className={cn(
                      "text-[0.48rem] tracking-[0.14em] uppercase font-medium leading-none transition-colors duration-200 select-none",
                      active
                        ? "text-foreground"
                        : "text-muted-foreground group-active:text-foreground/70"
                    )}
                  >
                    {tab.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Spacer — prevents page content from hiding under the fixed bar */}
      <div
        className="md:hidden"
        aria-hidden="true"
        style={{ height: "calc(3.5rem + env(safe-area-inset-bottom, 0px))" }}
      />
    </>
  );
}
