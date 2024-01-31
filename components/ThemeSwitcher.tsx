"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

const ThemeSwitcher = () => {
  const { setTheme, theme } = useTheme();
  const handleClick = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const imageSource = theme === "light" ? "/sun.svg" : "/moon.svg";

  return (
    <button onClick={handleClick}>
      <Image
        src={imageSource}
        height={20}
        width={20}
        alt={`Button to switch light or dark mode. Currrent mode is ${theme} mode`}
      />
    </button>
  );
};

export default ThemeSwitcher;
