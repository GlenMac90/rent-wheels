"use client";

import Image from "next/image";
import { useTheme } from "@/providers/ThemeProvider";

const ThemeSwitcher = () => {
  const { setTheme, theme } = useTheme();
  const handleClick = () => {
    if (theme === "light") {
      setTheme("dark");
      localStorage.theme = "dark";
    } else {
      setTheme("light");
      localStorage.theme = "light";
    }
  };

  const imageSource = theme === "light" ? "/sun.svg" : "/moon.svg";

  return (
    <button onClick={handleClick}>
      <Image
        src={imageSource}
        height={20}
        width={20}
        alt={`Button to switch light or dark mode. Current mode is ${theme} mode`}
      />
    </button>
  );
};

export default ThemeSwitcher;
