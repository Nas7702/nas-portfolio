"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { usePathname } from "next/navigation";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark");
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    
    // Function to strictly enforce the theme based on inputs
    const updateTheme = (isSystemDark: boolean) => {
      // Force dark mode on creative pages regardless of system preference
      const isCreative = pathname?.startsWith("/create");
      const shouldBeDark = isCreative || isSystemDark;

      const newTheme = shouldBeDark ? "dark" : "light";
      setTheme(newTheme);
      
      // Manually manage the classList to ensure Tailwind picks it up
      if (shouldBeDark) {
        root.classList.add("dark");
        root.classList.remove("light");
        root.style.colorScheme = "dark";
      } else {
        root.classList.remove("dark");
        root.classList.add("light");
        root.style.colorScheme = "light";
      }
    };

    // 1. Initial Check on Mount
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    updateTheme(mediaQuery.matches);

    // 2. Robust Event Listener
    const handleChange = (e: MediaQueryListEvent) => {
      updateTheme(e.matches);
    };

    // Safari/Legacy support: some older browsers use addListener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      // Fallback for older browsers
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mediaQuery as any).addListener(handleChange);
    }

    setMounted(true);

    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        // Fallback for older browsers
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (mediaQuery as any).removeListener(handleChange);
      }
    };
  }, [pathname]); // Re-run logic if user navigates to/from /create

  const contextValue = { theme, mounted };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
