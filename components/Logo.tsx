"use client";

import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        height={30}
        width={90}
        src={"/logo-light.png"}
        alt="Rent Wheels Logo"
        className="dark:hidden"
      />
      <Image
        height={30}
        width={90}
        src={"/logo-dark.png"}
        alt="Rent Wheels Logo"
        className="hidden dark:block"
      />
    </Link>
  );
};

export default Logo;
