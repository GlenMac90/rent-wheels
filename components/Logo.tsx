"use client";

import Link from "next/link";
import Image from "next/image";

import { useTheme } from "next-themes";

const Logo = () => {
  const { theme } = useTheme();
  return (
    <Link href="/">
      <Image
        height={30}
        width={90}
        src={theme === "light" ? "/logo-light.png" : "/logo-dark.png"}
        alt="Rent Wheels Logo"
      />
    </Link>
  );
};

export default Logo;
