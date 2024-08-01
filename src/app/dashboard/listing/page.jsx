"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Image, Skeleton } from "@nextui-org/react";
import { MdOutlineDelete, MdModeEdit } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomModal from "@/components/block/modal";
export default function CarListing() {
  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/listing");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      if (data.length === 0) {
        setNotFound(true);
      } else {
        setListing(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await fetch(`/api/listing`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      setListing(listing.filter((item) => item._id !== id));
      toast.success("Item deleted successfully");
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Failed to delete item");
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteItemId(id);
    setIsDeleteModalVisible(true);
  };

  const handleConfirmDelete = () => {
    deleteItem(deleteItemId);
    setIsDeleteModalVisible(false);
  };

  const renderSkeleton = () => (
    <div className="listingCard p-4 mb-4 rounded-lg flex flex-col gap-1 listing-card shadow-md bg-white ">
      <Skeleton className="h-[180px] w-[100%] rounded-xl mb-2" />
      <Skeleton className="h-5 w-[100%] mb-1" />
      <Skeleton className="h-5 w-[60%] mb-1" />
    </div>
  );

  return (
    <div className="container">
      {loading && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 px-4">
          {renderSkeleton()}
          {renderSkeleton()}
          {renderSkeleton()}
          {renderSkeleton()}
          {renderSkeleton()}
          {renderSkeleton()}
          {renderSkeleton()}
          {renderSkeleton()}
        </div>
      )}

      {error && <p className="text-red-500 text-center mt-4">Error: {error}</p>}

      {notFound && !loading && <p className="text-center mt-4">Not Found</p>}

      {!loading && !error && !notFound && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 px-4 ">
          {listing.map((item, index) => (
            <div
              key={item._id}
              className="listingCard shadow-md p-4 mb-4 rounded-lg flex flex-col gap-1 listing-card bg-white "
            >
              <Image
                src={item.image}
                className="h-[180px] w-[100%] rounded-xl mb-2"
                alt={item.title}
              />
              <div className="flex justify-between">
                <div className="relative">
                  <p className="text-black dark:text-white">
                    Title: {item.title}
                  </p>
                  <p className="text-black dark:text-white">
                    Price: {item.price}
                  </p>
                  <p className="absolute top-0 left-0 text-6xl opacity-10 font-bold">
                    {index + 1}
                  </p>
                </div>

                <div className="flex gap-2 ">
                  <i className="w-min h-min p-2 rounded-lg bg-primary-50 cursor-pointer text-lg text-black shadow-inner">
                    <Link
                      href={{
                        pathname: "/dashboard/listing/new/update",
                        query: { id: item._id },
                      }}
                    >
                      <MdModeEdit />
                    </Link>
                  </i>
                  <i
                    onClick={() => handleDeleteClick(item._id)}
                    className="w-min h-min p-2 rounded-lg bg-red-50 cursor-pointer text-lg text-black shadow-inner"
                  >
                    <MdOutlineDelete />
                  </i>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <ToastContainer position="bottom-right" autoClose={2000} />

      <CustomModal
        isOpen={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
      >
        <p>
          Are you sure you want to delete this item? This action cannot be
          undone.
        </p>
      </CustomModal>
    </div>
  );
}
