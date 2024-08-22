"use client";
import { FaHome, FaCar, FaPlus, FaList, FaUsers, FaCog, FaBlogger, FaTags } from 'react-icons/fa';
import { IoIosColorPalette } from "react-icons/io";
import { SiRollsroyce } from "react-icons/si";
import { IoChatbox } from "react-icons/io5";
import { GiCarDoor } from "react-icons/gi";
import { AiOutlineSafety } from "react-icons/ai";
import Link from 'next/link';
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { usePathname } from 'next/navigation';

const AdminMenu = () => {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <nav className='w-full h-screen p-4 overflow-y-auto custom-scrollbar'>
      <ul className='adminMenuList flex-col flex gap-1 mb-20'>
        <li className={`py-2 px-4 flex items-center rounded-lg mb-1 cursor-pointer hover:bg-slate-900 hover:text-white ${isActive("/") ? "bg-black text-white" : "bg-white text-black"}`}>
          <FaHome className='inline-block mr-2' />
          <Link href="/">Dashboard</Link>
        </li>
        {/* <li className={`py-2 px-4 flex items-center rounded-lg mb-1 cursor-pointer hover:bg-slate-900 hover:text-white ${isActive("/layouts") ? "bg-black text-white" : "bg-white text-black"}`}>
          <TbLayoutDashboardFilled className='inline-block mr-2' />
          <Link href="/">Layouts</Link>
        </li>
        <li className={`py-2 px-4 flex items-center rounded-lg mb-1 cursor-pointer hover:bg-slate-900 hover:text-white ${isActive("/chat") ? "bg-black text-white" : "bg-white text-black"}`}>
          <IoChatbox  className='inline-block mr-2' />
          <Link href="/">Message</Link>
        </li> */}
        <p className='ml-4 text-stone-300 font-semibold  text-sm my-2'>CAR LISTING</p>
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
        <li className={`py-2 px-4 flex items-center rounded-lg cursor-pointer hover:bg-slate-900 hover:text-white ${isActive("/dashboard/listing/model") ? "bg-black text-white" : "bg-white text-black"}`}>
          <FaList className='inline-block mr-2' />
          <Link href="/dashboard/listing/model">Model</Link>
        </li>
        <li className={`py-2 px-4 flex items-center rounded-lg cursor-pointer hover:bg-slate-900 hover:text-white ${isActive("/dashboard/listing/color") ? "bg-black text-white" : "bg-white text-black"}`}>
          <IoIosColorPalette className='inline-block mr-2' />
          <Link href="/dashboard/listing/color">Color</Link>
        </li>
        <li className={`py-2 px-4 flex items-center rounded-lg cursor-pointer hover:bg-slate-900 hover:text-white ${isActive("/dashboard/listing/features") ? "bg-black text-white" : "bg-white text-black"}`}>
          <GiCarDoor className='inline-block mr-2' />
          <Link href="/dashboard/listing/features">Features</Link>
        </li>
        <li className={`py-2 px-4 flex items-center rounded-lg cursor-pointer hover:bg-slate-900 hover:text-white ${isActive("/dashboard/listing/safety-features") ? "bg-black text-white" : "bg-white text-black"}`}>
          <AiOutlineSafety className='inline-block mr-2' />
          <Link href="/dashboard/listing/safety-features">Safety Features</Link>
        </li>
        <li className={`py-2 px-4 flex items-center rounded-lg cursor-pointer hover:bg-slate-900 hover:text-white ${isActive("/dashboard/listing/type") ? "bg-black text-white" : "bg-white text-black"}`}>
          <FaList className='inline-block mr-2' />
          <Link href="/dashboard/listing/type">Type</Link>
        </li>
        <p className='ml-4 text-stone-300 font-semibold  text-sm my-2'>BLOG POST</p>
        <li className={`py-2 px-4 flex items-center rounded-lg mb-2 cursor-pointer hover:bg-slate-900 hover:text-white ${isActive("/dashboard/blog") ? "bg-black text-white" : "bg-white text-black"}`}>
          <FaBlogger className='inline-block mr-2' />
          <Link href="/dashboard/blog">Blog Posts</Link>
        </li>
        <li className={`py-2 px-4 flex items-center rounded-lg mb-2 cursor-pointer hover:bg-slate-900 hover:text-white ${isActive("/dashboard/blog/new") ? "bg-black text-white" : "bg-white text-black"}`}>
          <FaPlus className='inline-block mr-2' />
          <Link href="/dashboard/blog/new">New Post</Link>
        </li>
        <li className={`py-2 px-4 flex items-center rounded-lg mb-2 cursor-pointer hover:bg-slate-900 hover:text-white ${isActive("/dashboard/blog/cat") ? "bg-black text-white" : "bg-white text-black"}`}>
          <FaTags className='inline-block mr-2' />
          <Link href="/dashboard/blog/cat">Categories</Link>
        </li>
        {/* <li className={`py-2 px-4 flex items-center rounded-lg mb-2 cursor-pointer hover:bg-slate-900 hover:text-white ${isActive("/admin/users") ? "bg-black text-white" : "bg-white text-black"}`}>
          <FaUsers className='inline-block mr-2' />
          <Link href="/admin/users">Manage Users</Link>
        </li>
        <li className={`py-2 px-4 flex items-center rounded-lg mb-2 cursor-pointer hover:bg-slate-900 hover:text-white ${isActive("/admin/settings") ? "bg-black text-white" : "bg-white text-black"}`}>
          <FaCog className='inline-block mr-2' />
          <Link href="/admin/settings">Settings</Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default AdminMenu;
