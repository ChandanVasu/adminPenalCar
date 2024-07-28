"use client"
import { FaHome, FaCar, FaPlus, FaList, FaUsers, FaCog } from 'react-icons/fa';
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import Link from 'next/link';
import { useState } from 'react';

const AdminMenu = () => {
  const [isCarListingsOpen, setIsCarListingsOpen] = useState(false);
  const [isBlogPostOpen, setIsBlogPostOpen] = useState(false);

  const handleMenuClick = (menu) => {
    if (menu === "carListings") {
      setIsCarListingsOpen(!isCarListingsOpen);
    } else if (menu === "blogPost") {
      setIsBlogPostOpen(!isBlogPostOpen);
    }
  };

  return (
    <nav className='w-full p-4'>
      <ul className='adminMenuList flex-col flex gap-1'>
        <li className='menu-item py-2 px-4 flex items-center rounded-lg mb-2 cursor-pointer bg-white text-black hover:bg-blue-100'>
          <FaHome className='inline-block mr-2' />
          <Link href="/">Dashboard</Link>
        </li>
        <li className='menu-item flex flex-col mb-2'>
          <div
            className={`py-2 px-4 flex items-center rounded-lg cursor-pointer justify-between bg-white text-black hover:bg-blue-100`}
            onClick={() => handleMenuClick("carListings")}
          >
            <div className='flex items-center'>
              <FaCar className='inline-block mr-2' />
              <Link href="/dashboard/listing">Car Listings</Link>
            </div>
            {isCarListingsOpen ? <IoIosArrowDown className='float-right' /> : <IoIosArrowForward className='float-right' />}
          </div>
          {isCarListingsOpen && (
            <ul className="pl-6 mt-2 space-y-2">
              <li className='px-3 py-2 bg-white rounded-lg hover:bg-blue-100'>
                <FaPlus className='inline-block mr-2' />
                <Link href="/dashboard/listing/new">Add New Listing</Link>
              </li>
              <li className='menu-item py-2 px-4 flex items-center rounded-lg mb-2 cursor-pointer bg-white text-black hover:bg-blue-100'>
                <FaList className='inline-block mr-2' />
                <Link href="/dashboard/listing/make">Make</Link>
              </li>
              <li className='menu-item py-2 px-4 flex items-center rounded-lg mb-2 cursor-pointer bg-white text-black hover:bg-blue-100'>
                <FaList className='inline-block mr-2' />
                <Link href="/admin/categories">Model</Link>
              </li>
              <li className='menu-item py-2 px-4 flex items-center rounded-lg mb-2 cursor-pointer bg-white text-black hover:bg-blue-100'>
                <FaList className='inline-block mr-2' />
                <Link href="/admin/categories">Color</Link>
              </li>
              <li className='menu-item py-2 px-4 flex items-center rounded-lg mb-2 cursor-pointer bg-white text-black hover:bg-blue-100'>
                <FaList className='inline-block mr-2' />
                <Link href="/admin/categories">Features</Link>
              </li>
              <li className='menu-item py-2 px-4 flex items-center rounded-lg mb-2 cursor-pointer bg-white text-black hover:bg-blue-100'>
                <FaList className='inline-block mr-2' />
                <Link href="/admin/categories">Safety Features</Link>
              </li>
              <li className='menu-item py-2 px-4 flex items-center rounded-lg mb-2 cursor-pointer bg-white text-black hover:bg-blue-100'>
                <FaList className='inline-block mr-2' />
                <Link href="/admin/categories">Type</Link>
              </li>
            </ul>
          )}
        </li>

        <li className='menu-item py-2 px-4 flex items-center rounded-lg mb-2 cursor-pointer bg-white text-black hover:bg-blue-100'>
          <FaUsers className='inline-block mr-2' />
          <Link href="/admin/users">Manage Users</Link>
        </li>
        <li className='menu-item flex flex-col mb-2'>
          <div
            className={`py-2 px-4 flex items-center rounded-lg cursor-pointer justify-between bg-white text-black hover:bg-blue-100`}
            onClick={() => handleMenuClick("blogPost")}
          >
            <div className='flex items-center'>
              <FaCar className='inline-block mr-2' />
              <Link href="/dashboard/listing">Blog Post</Link>
            </div>
            {isBlogPostOpen ? <IoIosArrowDown className='float-right' /> : <IoIosArrowForward className='float-right' />}
          </div>
          {isBlogPostOpen && (
            <ul className="pl-6 mt-2 space-y-2">
              <li className='px-3 py-2 bg-white rounded-lg hover:bg-blue-100'>
                <FaPlus className='inline-block mr-2' />
                <Link href="/dashboard/listing/new">Add New Post</Link>
              </li>
              <li className='menu-item py-2 px-4 flex items-center rounded-lg mb-2 cursor-pointer bg-white text-black hover:bg-blue-100'>
                <FaList className='inline-block mr-2' />
                <Link href="/admin/categories">Categories</Link>
              </li>
            </ul>
          )}
        </li>
        <li className='menu-item py-2 px-4 flex items-center rounded-lg mb-2 cursor-pointer bg-white text-black hover:bg-blue-100'>
          <FaCog className='inline-block mr-2' />
          <Link href="/admin/settings">Settings</Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminMenu;
