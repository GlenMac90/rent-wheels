import React from "react";

import type { Metadata } from "next";

import { ThemeProvider } from "@/providers/ThemeProvider";

import { Plus_Jakarta_Sans as PlusJakartaSans } from "next/font/google";
import "./globals.css";

import NavBar from "@/components/nav-bar/NavBar";
const jakarta = PlusJakartaSans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rent Wheels",
  description: "A car rental app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jakarta.className}>
        <ThemeProvider>
          <NavBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
