"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";


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
  // Initialise from the class the pre-hydration <head> script already set,
  // so the first client render agrees with the DOM and nothing flashes.
  const [userTheme, setUserTheme] = useState<Theme>(() => {
    if (typeof document === "undefined") return "dark";
    return document.documentElement.classList.contains("light") ? "light" : "dark";
  });
  const activeTheme: Theme = userTheme;

  // Read stored preference on mount; fall back to the dark brand default
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored === "light" || stored === "dark") {
      setUserTheme(stored);
    }
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
