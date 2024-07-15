import React, { useState, useEffect } from "react";
import { Image, Skeleton } from "@nextui-org/react";

export default function CarListing() {
  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);

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

  const renderSkeleton = () => (
    <div className="listingCard p-4 mb-4 rounded-lg flex flex-col gap-1 listing-card">
      <Skeleton className="h-[180px] w-[100%] rounded-xl mb-2" />
      <Skeleton className="h-5 w-[100%] mb-1" />
      <Skeleton className="h-5 w-[60%] mb-1" />
    </div>
  );

  return (
    <div className="container">
      {loading && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
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

      {notFound && !loading && (
        <p className="text-center mt-4">Not Found</p>
      )}

      {!loading && !error && !notFound && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {listing.map((item) => (
            <div key={item._id} className="listingCard p-4 mb-4 rounded-lg flex flex-col gap-1 listing-card bg-white">
              <Image
                src={item.image}
                className="h-[180px] w-[100%] rounded-xl mb-2"
                alt="Picture of the author"
              />
              <p className=" text-black dark:text-white">Title: {item.title}</p>
              <p className=" text-black dark:text-white">Price: {item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
