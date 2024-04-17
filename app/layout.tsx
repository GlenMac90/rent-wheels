import React from "react";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/SessionProvider";
import Provider from "@/providers/ThemeProvider";

import { Plus_Jakarta_Sans as PlusJakartaSans } from "next/font/google";
import "./globals.css";

// Load Jakarta font

const jakarta = PlusJakartaSans({ subsets: ["latin"] });

// RootLayout component metadata

export const metadata: Metadata = {
  title: "Rent Wheels",
  description: "A car rental app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body
          className={`${jakarta.className} bg-white-200_gray-900 h-screen overscroll-none`}
        >
          <Provider>
            {children}
            <Toaster />
          </Provider>
        </body>
      </SessionProvider>
    </html>
  );
}
