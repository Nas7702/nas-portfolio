"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "dark";

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

  // Initialize dark theme
  useEffect(() => {
    const root = document.documentElement;

    // Always set dark theme
    root.classList.remove("light");
    root.classList.add("dark");
    root.style.colorScheme = "dark";

    setMounted(true);
  }, []);

  // Don't render children until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ theme: "dark", mounted: false }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  const contextValue = { theme: "dark" as Theme, mounted };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
