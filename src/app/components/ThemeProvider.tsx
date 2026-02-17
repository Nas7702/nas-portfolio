"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { usePathname } from "next/navigation";

type Theme = "dark" | "light";

const STORAGE_KEY = "nas-theme";

interface ThemeContextType {
  theme: Theme;
  /** The user's stored preference (unaffected by /create forcing). */
  resolvedTheme: Theme;
  mounted: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
    root.classList.remove("light");
    root.style.colorScheme = "dark";
  } else {
    root.classList.remove("dark");
    root.classList.add("light");
    root.style.colorScheme = "light";
  }
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);
  const [userTheme, setUserTheme] = useState<Theme>("dark");
  const pathname = usePathname();

  // /create always forces dark mode
  const isCreative = pathname?.startsWith("/create") ?? false;
  const activeTheme: Theme = isCreative ? "dark" : userTheme;

  // Read stored preference on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const initial: Theme = stored === "light" ? "light" : "dark";
    setUserTheme(initial);
    setMounted(true);
  }, []);

  // Apply the active theme to the DOM whenever it changes
  useEffect(() => {
    if (!mounted) return;
    applyTheme(activeTheme);
  }, [activeTheme, mounted]);

  const setTheme = useCallback((next: Theme) => {
    setUserTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const toggleTheme = useCallback(() => {
    setUserTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme: activeTheme,
        resolvedTheme: userTheme,
        mounted,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
