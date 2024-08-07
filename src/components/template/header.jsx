"use client";
import { Avatar } from "@nextui-org/react";
import Link from "next/link";

export default function Header() {
  return (
    <header className=" sticky top-0 z-999 main-head py-2 px-7 shadow-md bg-white">
      <div className="flex justify-between items-center">
        <Link href="/">
          <img src="/logo.png" alt="" className="logo-img" />
        </Link>

        {/* <Avatar
          isBordered
          color="secondary"
          size="sm"
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        /> */}
      </div>
    </header>
  );
}
