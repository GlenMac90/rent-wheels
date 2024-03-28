import { ReactNode } from "react";

import NavBar from "@/components/nav-bar/NavBar";
import Footer from "@/components/nav-bar/Footer";
import { getProfileImage } from "@/lib/actions/user.actions";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const profileImage = await getProfileImage();
  return (
    <main className="h-screen overflow-scroll overscroll-none">
      <NavBar profileImage={profileImage} />
      {children}
      <Footer />
    </main>
  );
}
