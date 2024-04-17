"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

const ThemeSwitcher = () => {
  const { setTheme, theme } = useTheme();
  const handleClick = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button onClick={handleClick}>
      <Image
        src={"/icons/sun.svg"}
        height={20}
        width={20}
        alt={`Button to switch light or dark mode. Current mode is light mode`}
        className="dark:hidden"
      />
      <Image
        src={"/icons/moon.svg"}
        height={20}
        width={20}
        alt={`Button to switch light or dark mode. Current mode is dark mode`}
        className="hidden dark:block"
      />
    </button>
  );
};

export default ThemeSwitcher;
