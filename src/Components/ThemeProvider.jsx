"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }) {
  return (
    <NextThemesProvider
      attribute={["class", "data-theme"]}
      defaultTheme="light"
      enableSystem
    >
      {children}
    </NextThemesProvider>
  );
}

