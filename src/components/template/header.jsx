"use client";
import { useState } from "react";
import Link from "next/link";
import AdminMenu from "@/components/template/adminMenu";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons from react-icons

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="sticky top-0 z-999 main-head py-2 px-1 md:px-7 shadow-md bg-white">
      <div className="flex justify-between items-center">
        {/* Logo with space between */}
        <Link href="/">
          <img src="/logo.png" alt="Logo" className="logo-img" />
        </Link>

        {/* Hamburger menu on the right side */}
        <div className="md:hidden flex items-center">
          <button
            className="text-gray-800 focus:outline-none"
            onClick={toggleMenu}
          >
            {menuOpen ? (
              <FiX className="w-6 h-6" /> // Close icon
            ) : (
              <FiMenu className="w-6 h-6" /> // Hamburger menu icon
            )}
          </button>
        </div>
      </div>

      {/* Slide-in Menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="bg-white w-64 h-full shadow-lg">
          <button
            className="text-gray-800 focus:outline-none p-4"
            onClick={toggleMenu}
          >
            <FiX className="w-6 h-6" /> {/* Close icon */}
          </button>
          <AdminMenu />
        </div>
      </div>
    </header>
  );
}
