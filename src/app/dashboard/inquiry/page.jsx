"use client";
import React, { useState, useEffect } from "react";
import { Input, Button, Spinner } from "@nextui-org/react";

const Page = () => {
  // State to hold the fetched data
  const [data, setData] = useState([]);

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users/inquiry");
      const result = await response.json();
      setData(result); // Set the fetched data to state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Render the data
  return (
    <div>
      <h1 className="font-semibold text-2xl my-4">Car Inquiry Data</h1>
      {data.length > 0 ? (
        data.map((item) => (
          <div key={item._id} className="flex gap-6 shadow-md p-4 rounded-lg">
            <div className="1/4">
              <a href={item.url}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="mt-2 w-60 h-36 rounded-md"
                />
              </a>
            </div>
            <div className="w-3/4">
              <h1 className="font-semibold">{item.title}</h1>
              <div className="flex gap-4">
                <h4 className="font-semibold">{item.name}</h4>
                <p className="font-semibold">Number:- {item.mobile}</p>
                <p className="font-semibold">Email:- {item.email}</p>
              </div>
              <p>{item.message}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="flex w-full h-full items-center justify-center mt-60">
          <Spinner color="primary" size="lg" />
        </div>
      )}
    </div>
  );
};

export default Page;
