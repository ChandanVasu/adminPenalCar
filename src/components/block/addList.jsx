"use client";
import { useState, useEffect } from "react";
import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, editorConfig } from '@/lib/editorConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from "react";

export const demo = [
    { key: "cat", label: "Cat" },
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
    { key: "crocodile", label: "Crocodile" }
];

const PostList = () => {
    const getInitialFormData = () => ({
        title: "",
        image: "",
        price: "",
        priceCurrency: "USD",
        description: "",
        make: "",
        model: "",
        year: "",
        mileage: "",
        mileageUnit: "KMT",
        itemCondition: "",
        availability: "",
        vin: "",
        bodyType: "",
        color: "",
        driveWheelConfiguration: "",
        numberOfDoors: "",
        url: "",
        vehicleConfiguration: "",
        fuelType: "",
        vehicleEngine: "",
        vehicleInteriorColor: "",
        vehicleInteriorType: "",
        vehicleSeatingCapacity: "",
        vehicleTransmission: "",
        selectData: ""
    });

    const [formData, setFormData] = useState(getInitialFormData());
    const [makeData, setMakeData] = useState([]);

    useEffect(() => {
        fetchMakeData();
    }, []);

    const fetchMakeData = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/listing/make");
            const data = await response.json();
            setMakeData(data);
        } catch (error) {
            console.error("Error fetching make data:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setFormData((prevData) => ({ ...prevData, description: data }));
    };

    const handleSelectChange = (key) => {
        setFormData((prevData) => ({ ...prevData, make: key }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/listing", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const contentType = response.headers.get("content-type");
            if (!response.ok) {
                if (contentType && contentType.includes("application/json")) {
                    const errorData = await response.json();
                    toast.error(errorData.message);
                } else {
                    toast.error(`Error: ${response.status} - ${response.statusText}`);
                }
            } else {
                const data = await response.json();
                toast.success(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const renderInputField = (id, name, placeholder, label, type = "text") => (
        <Input
            type={type}
            id={id}
            name={name}
            value={formData[name]}
            onChange={handleInputChange}
            fullWidth
            placeholder={placeholder}
            label={label}
            color="secondary"
            labelPlacement="outside"
        />
    );

    return (
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div className="flex justify-center items-center gap-3">
                {renderInputField("title", "title", "Enter title", "Title")}
                {renderInputField("image", "image", "Enter image URL", "Image URL")}
                {renderInputField("price", "price", "Enter price", "Price", "number")}
            </div>
            <div className="flex justify-center items-center gap-3">
                {renderInputField("priceCurrency", "priceCurrency", "Enter price currency", "Price Currency")}
                <Select
                    label="Make"
                    variant="bordered"
                    placeholder="Select Make"
                    name="make"
                    color="secondary"
                    selectionMode="single"
                    selectedKey={formData.make}
                    onSelectionChange={handleSelectChange}
                    labelPlacement="outside">
                    {makeData.map((make) => (
                        <SelectItem key={make.make} value={make.make}>
                            {make.make}
                        </SelectItem>
                    ))}
                </Select>
                {renderInputField("model", "model", "Enter car model", "Model")}
            </div>
            <div className="flex justify-center items-center gap-3">
                {renderInputField("year", "year", "Enter car year", "Year", "number")}
                {renderInputField("mileage", "mileage", "Enter car mileage", "Mileage", "number")}
                {renderInputField("mileageUnit", "mileageUnit", "Enter mileage unit", "Mileage Unit (SMI/KMT)")}
            </div>
            <div className="flex justify-center items-center gap-3">
                {renderInputField("itemCondition", "itemCondition", "Enter item condition", "Item Condition (New/Used)")}
                {renderInputField("availability", "availability", "Enter availability", "Availability (InStock/OutOfStock)")}
                {renderInputField("vin", "vin", "Enter VIN", "VIN")}
            </div>
            <div className="flex justify-center items-center gap-3">
                {renderInputField("bodyType", "bodyType", "Enter body type", "Body Type")}
                {renderInputField("color", "color", "Enter exterior color", "Exterior Color")}
                {renderInputField("driveWheelConfiguration", "driveWheelConfiguration", "Enter drive wheel configuration", "Drive Wheel Configuration")}
            </div>
            <div className="flex justify-center items-center gap-3">
                {renderInputField("numberOfDoors", "numberOfDoors", "Enter number of doors", "Number of Doors", "number")}
                {renderInputField("url", "url", "Enter vehicle details page URL", "Vehicle Details Page URL")}
                {renderInputField("vehicleConfiguration", "vehicleConfiguration", "Enter vehicle configuration", "Vehicle Configuration")}
            </div>
            <div className="flex justify-center items-center gap-3">
                {renderInputField("fuelType", "fuelType", "Enter fuel type", "Fuel Type")}
                {renderInputField("vehicleEngine", "vehicleEngine", "Enter engine specification", "Engine Specification")}
                {renderInputField("vehicleInteriorColor", "vehicleInteriorColor", "Enter interior color", "Interior Color")}
            </div>
            <div className="flex justify-center items-center gap-3">
                {renderInputField("vehicleInteriorType", "vehicleInteriorType", "Enter interior type", "Interior Type")}
                {renderInputField("vehicleSeatingCapacity", "vehicleSeatingCapacity", "Enter seating capacity", "Seating Capacity", "number")}
                {renderInputField("vehicleTransmission", "vehicleTransmission", "Enter transmission specification", "Transmission Specification")}
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <CKEditor
                    editor={ClassicEditor}
                    config={editorConfig}
                    data={formData.description}
                    onChange={handleEditorChange}
                />
            </div>
            <Button type="submit" color="primary">Submit</Button>
            <ToastContainer autoClose={1000} position="bottom-center" />
        </form>
    );
};

export default PostList;
