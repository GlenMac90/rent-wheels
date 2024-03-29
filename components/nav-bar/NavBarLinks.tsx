"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navBarLinks } from "@/constants";

const NavBarLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {navBarLinks.map((link) => {
        const isActive = pathname === link.page;
        return (
          <Link
            key={link.name}
            href={link.path}
            className={`${isActive ? "semibold-16 text-blue-500 dark:text-blue-300" : "text-gray-700_white-200 medium-16"}`}
          >
            {link.name}
          </Link>
        );
      })}
    </>
  );
};

export default NavBarLinks;
