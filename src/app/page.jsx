"use client";
import React from "react";
import {Select, SelectItem} from "@nextui-org/react";

export const animals = [
  {key: "cat", label: "Cat"},
  {key: "dog", label: "Dog"},
  {key: "elephant", label: "Elephant"},
  {key: "lion", label: "Lion"},
  {key: "tiger", label: "Tiger"},
  {key: "giraffe", label: "Giraffe"},
  {key: "dolphin", label: "Dolphin"},
  {key: "penguin", label: "Penguin"},
  {key: "zebra", label: "Zebra"},
  {key: "shark", label: "Shark"},
  {key: "whale", label: "Whale"},
  {key: "otter", label: "Otter"},
  {key: "crocodile", label: "Crocodile"}
];

export default function App() {
  return (
    <Select
      items={animals}
      label="Favorite Animal"
      placeholder="Select an animal"
      className="max-w-xs"
    >
      {(animal) => <SelectItem>{animal.label}</SelectItem>}
    </Select>
  );
}

