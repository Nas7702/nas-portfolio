"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, Camera, User, Mail, Sun, Moon } from "lucide-react";
import Logo from "./Logo";
import { useTheme } from "./ThemeProvider";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/create", label: "Work", icon: Camera },
  { href: "/about", label: "About", icon: User },
  { href: "/contact", label: "Contact", icon: Mail },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  // Handle scroll effect
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

    if (typeof window === "undefined") {
      return;
    }

    window.scrollTo({ top: 0, behavior: "auto" });

    const updateScrollState = () => {
      setScrolled(window.scrollY > 20);
    };

    const rafId = window.requestAnimationFrame(updateScrollState);
    const timeoutId = window.setTimeout(updateScrollState, 120);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
    };
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const isCreativePage = pathname.startsWith("/create");

  // Navbar background classes based on route and theme
  const getNavBg = () => {
    if (!(scrolled || isOpen)) return "bg-transparent";
    if (isCreativePage) return "bg-black/85 backdrop-blur-md shadow-lg";
    if (pathname.startsWith("/about")) {
      return theme === "dark"
        ? "bg-gray-900/85 backdrop-blur-md shadow-lg border-b border-gray-800/30"
        : "bg-white/85 backdrop-blur-md shadow-lg border-b border-gray-200/50";
    }
    return theme === "dark"
      ? "bg-gray-900/85 backdrop-blur-md shadow-lg"
      : "bg-white/85 backdrop-blur-md shadow-lg border-b border-gray-200/50";
  };

  // Mobile menu background
  const getMobileBg = () => {
    if (isCreativePage) return "border-white/10 bg-black/85";
    if (pathname.startsWith("/about")) {
      return theme === "dark"
        ? "border-gray-800/30 bg-gray-900/85"
        : "border-gray-200/50 bg-white/90";
    }
    return theme === "dark"
      ? "border-gray-700 bg-gray-900/85"
      : "border-gray-200 bg-white/90";
  };

  return (
    <>
      <motion.nav
        data-theme={isCreativePage ? "creative" : undefined}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${getNavBg()}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Logo variant={isCreativePage ? "record" : "default"} />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                // Use brand colors for Work/Creative item
                const isCreative = item.href === "/create";
                const activeColor = isCreative
                  ? "text-accent"
                  : "text-foreground";
                const hoverColor = isCreative
                  ? "text-foreground/70 hover:text-accent"
                  : "text-foreground/70 hover:text-foreground";
                const activeBackground = isCreative
                  ? "bg-accent/10"
                  : "bg-secondary";

                return (
                  <Link key={item.href} href={item.href}>
                    <motion.div
                      className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                        active
                          ? activeColor
                          : hoverColor
                      }`}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon size={16} />
                      {item.label}

                      {/* Active indicator */}
                      {active && (
                        <motion.div
                          className={`absolute inset-0 rounded-lg -z-10 ${activeBackground}`}
                          layoutId="activeTab"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </motion.div>
                  </Link>
                );
              })}
            </div>

            {/* Mobile buttons */}
            <div className="flex items-center gap-2">
              {/* Theme toggle (mobile) */}
              <motion.button
                onClick={toggleTheme}
                className="md:hidden p-2 rounded-lg bg-secondary text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.85 }}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg bg-secondary text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.85 }}
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
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={`md:hidden border-t backdrop-blur-md ${getMobileBg()}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-4 py-2 space-y-1">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);

                  // Use brand colors for Work/Creative item
                  const isCreative = item.href === "/create";

                  const activeStyles = isCreative
                    ? "bg-accent/10 text-accent"
                    : "bg-secondary text-foreground";

                  const inactiveStyles = isCreativePage
                    ? "text-gray-300 hover:bg-white/10"
                    : "text-foreground/70 hover:bg-secondary";

                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link href={item.href}>
                        <div
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                            active
                              ? activeStyles
                              : inactiveStyles
                          }`}
                        >
                          <Icon size={18} />
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
      </motion.nav>

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-16" />
    </>
  );
}
