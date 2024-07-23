// components/Header.js
"use client"

import Link from "next/link";


export default function Header() {
  return (
    <header className=" sticky top-0 z-50 main-head py-2 px-7 shadow-md bg-white">
      <div className="flex justify-between">
        <Link href="/"><img src="/logo.png" alt="" className="logo-img" /></Link>
        <div>
        </div>
      </div>

    </header>
  );
}
