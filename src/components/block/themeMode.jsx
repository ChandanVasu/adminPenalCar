// components/ThemeSwitcher.js
"use client"
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Switch } from "@nextui-org/react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    if (!theme) {
      setTheme("system");
    }
  }, [theme, setTheme]);

  if (!mounted) return null;

  const handleThemeChange = (isSelected) => {
    setTheme(isSelected ? "light" : "dark");
  };

  return (
    <div className="">
      <Switch
        checked={resolvedTheme === "dark"}
        onChange={(e) => handleThemeChange(e.target.checked)}
        size="lg"
        color="secondary"
        thumbIcon={({ isSelected, className }) =>
          resolvedTheme === "dark" ? (
            <FaMoon className={className} />
          ) : (
            <FaSun className={className} />
          )
        }
      />
    </div>
  );
}
