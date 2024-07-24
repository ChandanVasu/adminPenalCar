"use client";

import React from "react";

export const animals = [
  { key: "1", label: "Cat" },
  { key: "dog", label: "Dog" },
  { key: "elephant", label: "Elephant" },
  { key: "lion", label: "Lion" },
  { key: "tiger", label: "Tiger" },
  { key: "giraffe", label: "Giraffe" },
  { key: "dolphin", label: "Dolphin" },
  { key: "penguin", label: "Penguin" },
  { key: "zebra", label: "Zebra" },
  { key: "shark", label: "Shark" },
  { key: "whale", label: "Whale" },
  { key: "otter", label: "Otter" },
  { key: "crocodile", label: "Crocodile" },
];

export default function App() {
  const [value, setValue] = React.useState("");

  const handleSelectionChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <label htmlFor="animal-select" className="text-sm font-medium text-gray-700">
        Favorite Animal
      </label>
      <select
        id="animal-select"
        value={value}
        onChange={handleSelectionChange}
        className="max-w-xs border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      >
        <option value="" disabled>Select an animal</option>
        {animals.map((animal) => (
          <option key={animal.label} value={animal.key}>
            {animal.label}
          </option>
        ))}
      </select>
      <p className="text-small text-default-500">Selected: {value}</p>
    </div>
  );
}
