"use client"
import dynamic from 'next/dynamic';
import React from "react";

const ProductList = dynamic(() => import("@/components/block/listingBox"), { ssr: false });
const AddListButtom = dynamic(() => import("@/components/addListButtom"), { ssr: false });

export default function App() {
  return (
    <div className="">
      <AddListButtom></AddListButtom>
      <ProductList></ProductList>
    </div>
  );
}
