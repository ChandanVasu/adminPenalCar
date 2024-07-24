"use client";
import { useState, useEffect } from "react";
import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, editorConfig } from '@/lib/editorConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from "react";


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
        selectData: "",
    });

    const [formData, setFormData] = useState(getInitialFormData());
    const [makeData, setMakeData] = useState([]);
    const [modelData, setModelData] = useState([]);
    const [colorData, setColorData] = useState([]);
    const [isModelDisabled, setIsModelDisabled] = useState(true);

    useEffect(() => {
        fetchMakeData();
        fetchColorData();
    }, []);

    useEffect(() => {
        if (formData.make) {
            fetchModelData(formData.make);
            setIsModelDisabled(false);
        } else {
            setModelData([]);
            setIsModelDisabled(true);
        }
    }, [formData.make]);

    const fetchMakeData = async () => {
        try {
            const response = await fetch("/api/listing/make");
            const data = await response.json();
            setMakeData(data);
        } catch (error) {
            console.error("Error fetching make data:", error);
        }
    };

    const fetchColorData = async () => {
        try {
            const response = await fetch("/api/listing/color");
            const data = await response.json();
            setColorData(data);
        } catch (error) {
            console.error("Error fetching make data:", error);
        }
    };

    const fetchModelData = async (make) => {
        try {
            const response = await fetch(`/api/listing/model?make=${make}`);
            const data = await response.json();
            setModelData(data);
        } catch (error) {
            console.error("Error fetching model data:", error);
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
                    value={formData.make}
                    labelPlacement="outside"
                    onChange={(e) => handleInputChange({ target: { name: 'make', value: e.target.value } })}
                >
                    {makeData.map((make) => (
                        <SelectItem key={make.make} value={make.make}>
                            {make.make}
                        </SelectItem>
                    ))}
                </Select>
                <Select
                    label="Model"
                    variant="bordered"
                    placeholder="Select Model"
                    name="model"
                    color="secondary"
                    value={formData.model}
                    isDisabled={isModelDisabled}
                    labelPlacement="outside"
                    onChange={handleInputChange}
                >
                    {modelData.map((model) => (
                        <SelectItem key={model.model} value={model.model}>
                            {model.model}
                        </SelectItem>
                    ))}
                </Select>
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
                <Select
                    label="Exterior Color"
                    variant="bordered"
                    placeholder="Select exterior color"
                    name="color"
                    color="secondary"
                    value={formData.color}
                    labelPlacement="outside"
                    onChange={handleInputChange}>
                    {colorData.map((color) => (
                        <SelectItem key={color.color}>
                            {color.color}
                        </SelectItem>
                    ))}
                </Select>
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
                <Select
                    label="Interior Color"
                    variant="bordered"
                    placeholder="Select interior color"
                    name="vehicleInteriorColor"
                    color="secondary"
                    value={formData.color}
                    labelPlacement="outside"
                    onChange={handleInputChange}>
                    {colorData.map((color) => (
                        <SelectItem key={color.color}>
                            {color.color}
                        </SelectItem>
                    ))}
                </Select>
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
