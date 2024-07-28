"use client"
import React, { useState } from "react";
import { Input } from "@nextui-org/react";

export default function App() {
  const [email, setEmail] = useState("demo");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Input 
        type="email" 
        value={email} 
        label="Email" 
        placeholder="Enter your email" 
        onChange={handleChange} 
      />
    </div>
  );
}
