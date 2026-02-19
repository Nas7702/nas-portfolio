"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/create", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setScrolled(false);

    if (typeof window === "undefined") return;

    window.scrollTo({ top: 0, behavior: "auto" });

    const updateScrollState = () => setScrolled(window.scrollY > 20);
    const rafId = window.requestAnimationFrame(updateScrollState);
    const timeoutId = window.setTimeout(updateScrollState, 120);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
    };
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const navBg = scrolled || isOpen
    ? "bg-background/90 backdrop-blur-md border-b border-border/40"
    : "bg-transparent";

  const mobileBg = theme === "dark"
    ? "border-border/30 bg-black/90 backdrop-blur-md"
    : "border-border/40 bg-background/95 backdrop-blur-md";

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${navBg}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo — inline wordmark */}
            <Link href="/" aria-label="Nas.Create — Home" className="flex-shrink-0">
              <Image
                src="/logos/darkmode-inline.png"
                alt="Nas.Create"
                width={140}
                height={25}
                className="hidden dark:block h-[22px] w-auto"
                priority
              />
              <Image
                src="/logos/lightmode-inline.png"
                alt="Nas.Create"
                width={140}
                height={25}
                className="block dark:hidden h-[22px] w-auto"
              />
            </Link>

            {/* Desktop nav — editorial small caps */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-[0.65rem] font-medium tracking-[0.22em] uppercase transition-colors duration-300 ${
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.label}
                    {active && (
                      <span className="block mt-0.5 h-px bg-foreground/40 w-full" />
                    )}
                  </Link>
                );
              })}

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
              </button>
            </div>

            {/* Mobile controls */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={18} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={18} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={`md:hidden border-t ${mobileBg}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="px-6 py-4 space-y-1">
                {navItems.map((item, index) => {
                  const active = isActive(item.href);
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.06 }}
                    >
                      <Link href={item.href}>
                        <div
                          className={`flex items-center py-3 text-[0.7rem] tracking-[0.2em] uppercase font-medium transition-colors ${
                            active
                              ? "text-foreground"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {item.label}
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}
