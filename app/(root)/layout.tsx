import { ReactNode } from "react";

import NavBar from "@/components/nav-bar/NavBar";
import Footer from "@/components/nav-bar/Footer";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="overscroll-none">
      <NavBar />
      {children}
      <Footer />
    </main>
  );
}
