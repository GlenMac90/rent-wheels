import React from "react";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";

import { ThemeProvider } from "@/providers/ThemeProvider";

import { Plus_Jakarta_Sans as PlusJakartaSans } from "next/font/google";
import "./globals.css";

import NavBar from "@/components/nav-bar/NavBar";
import Footer from "@/components/nav-bar/Footer";

const jakarta = PlusJakartaSans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rent Wheels",
  description: "A car rental app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body
          className={`${jakarta.className} bg-white-200_gray-900 overscroll-none`}
        >
          <NavBar />
          {children}
          <Footer />
          <Toaster />
        </body>
      </ThemeProvider>
    </html>
  );
}
