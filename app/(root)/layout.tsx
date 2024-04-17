import { ReactNode } from "react";

import { getProfileImage } from "@/lib/actions/user.actions";
import { NavBar, Footer } from "@/components/nav-bar";

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
