import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { AppProvider } from "@/components/providers/app-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Learn Craft AI",
  description: "A modular hackathon MVP for track-based AI, app, and web development learning."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <Navbar />
          <main className="pb-16">{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}
