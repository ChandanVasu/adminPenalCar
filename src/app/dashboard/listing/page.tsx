"use client"
import dynamic from 'next/dynamic';
import React from "react";

const ProductList = dynamic(() => import("@/components/block/listingBox"), { ssr: false });

export default function App() {
  return (
    <div className="">
      <ProductList></ProductList>
    </div>
  );
}
