"use client";

import { MouseEvent } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import Logo from "../Logo";
import { navBarLinks } from "@/constants";
import { MobileNavBarProps } from "@/types/navbar.index";
import { useSession } from "next-auth/react";

const MobileNavBar = ({ handleCloseClick }: MobileNavBarProps) => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  // check if user is logged in

  const loggedIn = !!session;

  // styles for login/logout button

  const logInLogOutButtonStyles =
    "flex-center bg-white_gray-700 mt-5 semibold-14 h-12 w-full gap-1.5 rounded border text-purple dark:border-none dark:text-purple-mid";

  return (
    // modal background made natively
    <div
      className="fixed z-50 flex h-screen w-screen justify-center bg-black/40 px-3 pt-6 dark:bg-black/10"
      onClick={handleCloseClick}
    >
      {/* modal itself */}
      <div
        className="bg-white-100_gray-850 flex h-fit w-full flex-col rounded-xl p-6"
        onClick={handleClick}
      >
        <div className="flex-between w-full">
          <Logo />
          <button onClick={handleCloseClick}>
            <Image
              src="/icons/close.svg"
              height={24}
              width={24}
              alt="Close button for mobile nav menu"
              className="dark:grayscale dark:invert"
            />
          </button>
        </div>
        <ul className="mt-10 flex w-full flex-col gap-2">
          {navBarLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <li
                key={link.name}
                className={`rounded p-3 dark:text-white ${isActive && "bg-purple text-white"}`}
                onClick={handleCloseClick}
              >
                <Link className="medium-14 flex gap-1.5" href={link.path}>
                  <Image
                    src={link.icon}
                    height={18}
                    width={18}
                    alt={`NavBar icon for ${link.name}`}
                    className="dark:grayscale dark:invert"
                  />
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
        {loggedIn ? (
          <div className="flex w-full flex-col gap-2.5">
            <Link href="/profile" className={logInLogOutButtonStyles}>
              <Image
                src="/fallback/text-avatar.png"
                height={20}
                width={20}
                alt="Profile Picture"
                className="shrink-0 rounded-full"
              />
              My Profile
            </Link>
            <button className="flex-center semibold-14 h-12 rounded bg-red-400 text-white">
              Logout
            </button>
          </div>
        ) : (
          <button className={logInLogOutButtonStyles}>Login</button>
        )}
      </div>
    </div>
  );
};

export default MobileNavBar;
