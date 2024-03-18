"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

import Logo from "../Logo";
import NavBarLinks from "./NavBarLinks";
import ThemeSwitcher from "./ThemeSwitcher";
import Button from "../Button";
import Avatar from "./Avatar";
import MobileNavBar from "./MobileNavBar";

const NavBar = () => {
  const { data: session } = useSession();
  const [showMobileNavbar, setShowMobileNavbar] = useState(false);
  const isLoggedIn = true;

  const handleCloseClick = () => {
    setShowMobileNavbar(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640) {
        setShowMobileNavbar(false);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav className="flex-center bg-white_gray-900 fixed top-0 z-40 h-[5.75rem] w-full border-b border-b-blue-50/40 px-6 dark:border-b-gray-850 sm:h-[6.25rem]">
        <div className="flex-between w-full max-w-[82rem]">
          <Logo />
          <div className="flex items-center gap-2.5 sm:gap-5">
            <div className="hidden items-center gap-5 sm:flex">
              <NavBarLinks />
              {session ? (
                <Button
                  width="w-[6.875rem]"
                  height="h-[2.75rem]"
                  handleClick={() => signOut()}
                >
                  Sign Out
                </Button>
              ) : (
                <Button
                  width="w-[6.875rem]"
                  height="h-[2.75rem]"
                  linkPath="/sign-in"
                >
                  Login
                </Button>
              )}
              <span className="h-[2.25rem] border-r border-r-blue-50 dark:border-r-gray-850" />
            </div>
            <ThemeSwitcher />
            {isLoggedIn && <Avatar />}
            <button
              className="flex sm:hidden"
              onClick={() => setShowMobileNavbar(true)}
            >
              <Image
                src="/icons/menu.svg"
                height={24}
                width={24}
                alt="Mobile Menu Button"
                className="dark:grayscale dark:invert"
              />
            </button>
          </div>
        </div>
      </nav>
      {showMobileNavbar && <MobileNavBar handleCloseClick={handleCloseClick} />}
    </>
  );
};

export default NavBar;
