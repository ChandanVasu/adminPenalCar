"use client";
import { FaHome, FaCar, FaPlus, FaList, FaUsers, FaCog } from 'react-icons/fa';
import { IoIosColorPalette } from "react-icons/io";
import { SiRollsroyce } from "react-icons/si";
import { GiCarDoor } from "react-icons/gi";
import { AiOutlineSafety } from "react-icons/ai";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AdminMenu = () => {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <nav className='w-full h-screen p-4 overflow-y-auto'>
      <ul className='adminMenuList flex-col flex gap-1'>
        <li className={`py-2 px-4 flex items-center rounded-lg mb-1 cursor-pointer hover:bg-slate-900 hover:text-white ${isActive("/") ? "bg-black text-white" : "bg-white text-black"}`}>
          <FaHome className='inline-block mr-2' />
          <Link href="/">Dashboard</Link>
        </li>
        <li className={`py-2 px-4 flex items-center rounded-lg cursor-pointer hover:bg-slate-900 hover:text-white ${isActive("/dashboard/listing") ? "bg-black text-white" : "bg-white text-black"}`}>
          <FaCar className='inline-block mr-2' />
          <Link href="/dashboard/listing">Car Listings</Link>
        </li>
        <li className={`py-2 px-4 flex items-center rounded-lg cursor-pointer hover:bg-slate-900 hover:text-white ${isActive("/dashboard/listing/new") ? "bg-black text-white" : "bg-white text-black"}`}>
          <FaPlus className='inline-block mr-2' />
          <Link href="/dashboard/listing/new">New Listing</Link>
        </li>
        <li className={`py-2 px-4 flex items-center rounded-lg cursor-pointer hover:bg-slate-900 hover:text-white ${isActive("/dashboard/listing/make") ? "bg-black text-white" : "bg-white text-black"}`}>
          <SiRollsroyce className='inline-block mr-2' />
          <Link href="/dashboard/listing/make">Make</Link>
        </li>
        <li className={`py-2 px-4 flex items-center rounded-lg cursor-pointer hover:bg-slate-900 hover:text-white ${isActive("/admin/categories/model") ? "bg-black text-white" : "bg-white text-black"}`}>
          <FaList className='inline-block mr-2' />
          <Link href="/admin/categories/model">Model</Link>
        </li>
        <li className={`py-2 px-4 flex items-center rounded-lg cursor-pointer hover:bg-slate-900 hover:text-white ${isActive("/admin/categories/color") ? "bg-black text-white" : "bg-white text-black"}`}>
          <IoIosColorPalette className='inline-block mr-2' />
          <Link href="/admin/categories/color">Color</Link>
        </li>
        <li className={`py-2 px-4 flex items-center rounded-lg cursor-pointer hover:bg-slate-900 hover:text-white ${isActive("/admin/categories/features") ? "bg-black text-white" : "bg-white text-black"}`}>
          <GiCarDoor className='inline-block mr-2' />
          <Link href="/admin/categories/features">Features</Link>
        </li>
        <li className={`py-2 px-4 flex items-center rounded-lg cursor-pointer hover:bg-slate-900 hover:text-white ${isActive("/admin/categories/safety-features") ? "bg-black text-white" : "bg-white text-black"}`}>
          <AiOutlineSafety className='inline-block mr-2' />
          <Link href="/admin/categories/safety-features">Safety Features</Link>
        </li>
        <li className={`py-2 px-4 flex items-center rounded-lg cursor-pointer hover:bg-slate-900 hover:text-white ${isActive("/admin/categories/type") ? "bg-black text-white" : "bg-white text-black"}`}>
          <FaList className='inline-block mr-2' />
          <Link href="/admin/categories/type">Type</Link>
        </li>
        <li className={`py-2 px-4 flex items-center rounded-lg mb-2 cursor-pointer hover:bg-slate-900 hover:text-white ${isActive("/admin/users") ? "bg-black text-white" : "bg-white text-black"}`}>
          <FaUsers className='inline-block mr-2' />
          <Link href="/admin/users">Manage Users</Link>
        </li>
        <li className={`py-2 px-4 flex items-center rounded-lg mb-2 cursor-pointer hover:bg-slate-900 hover:text-white ${isActive("/admin/settings") ? "bg-black text-white" : "bg-white text-black"}`}>
          <FaCog className='inline-block mr-2' />
          <Link href="/admin/settings">Settings</Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminMenu;
