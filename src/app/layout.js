import { Toaster } from "react-hot-toast";
import "./globals.css";
import { ThemeProvider } from "@/Components/ThemeProvider";

export const metadata = {
  title: "IdeaVault – Pitch, Discover & Fund Ideas",
  description:
    "IdeaVault is the platform where innovators pitch ideas, gather feedback, and connect with investors.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        <ThemeProvider>{children}</ThemeProvider>
         <Toaster />
      </body>
    </html>
  );
}
