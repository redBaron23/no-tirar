"use client";

import { useEffect, useState } from "react";
import { IoMdMoon as MoonIcon } from "react-icons/io";
import { IoSunnyOutline as SunIcon } from "react-icons/io5";

const ThemeSwitch = () => {
  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) {
        setTheme(storedTheme);
        document.documentElement.classList.add(storedTheme);
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="ml-1 mr-1 h-8 w-8 rounded p-1 sm:ml-4"
      onClick={toggleTheme}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="text-gray-900 dark:text-gray-100"
      >
        {theme === "dark" ? (
          <SunIcon className="fade-in text-xl" />
        ) : (
          <MoonIcon className="fade-in text-xl" />
        )}
      </svg>
    </button>
  );
};

export default ThemeSwitch;
