"use client";

import { motion, MotionValue, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { Home, Camera, User, Mail, Sun, Moon } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTheme } from "./ThemeProvider";

export default function FloatingDock() {
  const pathname = usePathname();
  const mouseX = useMotionValue(Infinity);
  const { theme, toggleTheme, mounted } = useTheme();

  const links = [
    { title: "Home", icon: <Home className="h-full w-full" />, href: "/" },
    { title: "Work", icon: <Camera className="h-full w-full" />, href: "/create" },
    { title: "About", icon: <User className="h-full w-full" />, href: "/about" },
    { title: "Contact", icon: <Mail className="h-full w-full" />, href: "/contact" },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-end gap-4 pb-3">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="mx-auto flex h-16 items-end gap-4 rounded-2xl bg-card/50 backdrop-blur-xl border border-border px-4 pb-3"
      >
        {links.map((link) => (
          <IconContainer mouseX={mouseX} key={link.title} {...link} isActive={pathname === link.href} />
        ))}

        {/* Theme divider */}
        <div className="h-8 w-px bg-border self-center" />

        {/* Theme toggle */}
        <ThemeToggleIcon mouseX={mouseX} theme={theme} onToggle={toggleTheme} mounted={mounted} />
      </motion.div>
    </div>
  );
}

function ThemeToggleIcon({
  mouseX,
  theme,
  onToggle,
  mounted,
}: {
  mouseX: MotionValue;
  theme: string;
  onToggle: () => void;
  mounted: boolean;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.button
      ref={ref}
      onClick={onToggle}
      style={{ width, height }}
      className="aspect-square rounded-full flex items-center justify-center relative group bg-secondary text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
      aria-label={mounted ? `Switch to ${theme === "dark" ? "light" : "dark"} mode` : "Toggle theme"}
    >
      <span className="absolute -top-8 rounded-md border border-border bg-card px-2 py-0.5 text-xs text-foreground opacity-0 transition-opacity group-hover:opacity-100 whitespace-nowrap">
        {theme === "dark" ? "Light mode" : "Dark mode"}
      </span>
      <div className="flex items-center justify-center h-full w-full p-2.5">
        {theme === "dark" ? <Sun className="h-full w-full" /> : <Moon className="h-full w-full" />}
      </div>
    </motion.button>
  );
}

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  isActive,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
  isActive: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <Link href={href}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        className={cn(
          "aspect-square rounded-full flex items-center justify-center relative group",
          isActive ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        <span className="absolute -top-8 rounded-md border border-border bg-card px-2 py-0.5 text-xs text-foreground opacity-0 transition-opacity group-hover:opacity-100 whitespace-nowrap">
          {title}
        </span>
        <div className="flex items-center justify-center h-full w-full p-2.5">
           {icon}
        </div>
      </motion.div>
    </Link>
  );
}
