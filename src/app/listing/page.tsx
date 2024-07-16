"use client"
import React from "react";
import ProductList from "@/components/block/listingBox"
import AddListButtom from "@/components/addListButtom"

export default function App() {
  return (
    <div className="">
      <AddListButtom></AddListButtom>
      <ProductList></ProductList>
    </div>
    );
}
