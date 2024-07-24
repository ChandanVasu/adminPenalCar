"use client";
import { useState, useEffect } from "react";
import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, editorConfig } from '@/lib/editorConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from "react";

const PostList = () => {
    // Initialize formData directly
    const [formData, setFormData] = useState({
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
        fuelType: "",
        vehicleEngine: "",
        vehicleInteriorColor: "",
        vehicleInteriorType: "",
        vehicleSeatingCapacity: "",
        vehicleTransmission: "",
        carFeature: "",
        carSafetyFeature: "",
        cylinders: ""
    });

    const [makeData, setMakeData] = useState([]);
    const [modelData, setModelData] = useState([]);
    const [colorData, setColorData] = useState([]);
    const [typeData, setTypeData] = useState([]);
    const [isModelDisabled, setIsModelDisabled] = useState(true);

    // Local select data
    const [availabilityOptions] = useState(["InStock", "OutOfStock"]);
    const [mileageUnitOptions] = useState(["KMT", "SMI"]);
    const [priceCurrencyOptions] = useState(["INR", "USD", "EUR", "GBP"]);
    const [itemConditionOptions] = useState(["New", "Used"]);
    const [fuelTypeOptions] = useState(["Petrol", "Diesel", "Electric", "Hybrid"]);
    const [transmissionOptions] = useState(["Automatic", "Manual"]);
    const [driveTypeOptions] = useState(["FWD", "RWD", "AWD", "4WD"]);

    useEffect(() => {
        fetchMakeData();
        fetchColorData();
        fetchTypeData();
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

    const fetchTypeData = async () => {
        try {
            const response = await fetch("/api/listing/type");
            const data = await response.json();
            setTypeData(data);
        } catch (error) {
            console.error("Error fetching type data:", error);
        }
    };

    const fetchColorData = async () => {
        try {
            const response = await fetch("/api/listing/color");
            const data = await response.json();
            setColorData(data);
        } catch (error) {
            console.error("Error fetching color data:", error);
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
                <Select
                    label="Price Currency"
                    variant="bordered"
                    placeholder="Select Currency"
                    name="priceCurrency"
                    color="secondary"
                    value={formData.priceCurrency}
                    labelPlacement="outside"
                    onChange={handleInputChange}
                >
                    {priceCurrencyOptions.map((currency) => (
                        <SelectItem key={currency} value={currency}>
                            {currency}
                        </SelectItem>
                    ))}
                </Select>
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
                <Select
                    label="Mileage Unit"
                    variant="bordered"
                    placeholder="Select Mileage Unit"
                    name="mileageUnit"
                    color="secondary"
                    value={formData.mileageUnit}
                    labelPlacement="outside"
                    onChange={handleInputChange}
                >
                    {mileageUnitOptions.map((unit) => (
                        <SelectItem key={unit} value={unit}>
                            {unit}
                        </SelectItem>
                    ))}
                </Select>
            </div>
            <div className="flex justify-center items-center gap-3">
                <Select
                    label="Item Condition"
                    variant="bordered"
                    placeholder="Select Item Condition"
                    name="itemCondition"
                    color="secondary"
                    value={formData.itemCondition}
                    labelPlacement="outside"
                    onChange={handleInputChange}
                >
                    {itemConditionOptions.map((condition) => (
                        <SelectItem key={condition} value={condition}>
                            {condition}
                        </SelectItem>
                    ))}
                </Select>
                <Select
                    label="Availability"
                    variant="bordered"
                    placeholder="Select Availability"
                    name="availability"
                    color="secondary"
                    value={formData.availability}
                    labelPlacement="outside"
                    onChange={handleInputChange}
                >
                    {availabilityOptions.map((availability) => (
                        <SelectItem key={availability} value={availability}>
                            {availability}
                        </SelectItem>
                    ))}
                </Select>
                {renderInputField("vin", "vin", "Enter VIN", "VIN")}
            </div>
            <div className="flex justify-center items-center gap-3">
                <Select
                    label="Body Type"
                    variant="bordered"
                    placeholder="Select Body Type"
                    name="bodyType"
                    color="secondary"
                    value={formData.bodyType}
                    labelPlacement="outside"
                    onChange={handleInputChange}
                >
                    {typeData.map((type) => (
                        <SelectItem key={type.type} value={type.type}>
                            {type.type}
                        </SelectItem>
                    ))}
                </Select>
                <Select
                    label="Exterior Color"
                    variant="bordered"
                    placeholder="Select Exterior Color"
                    name="color"
                    color="secondary"
                    value={formData.color}
                    labelPlacement="outside"
                    onChange={handleInputChange}
                >
                    {colorData.map((color) => (
                        <SelectItem key={color.color} value={color.color}>
                            {color.color}
                        </SelectItem>
                    ))}
                </Select>
                <Select
                    label="Drive Type"
                    variant="bordered"
                    placeholder="Select Drive Type"
                    name="driveWheelConfiguration"
                    color="secondary"
                    value={formData.driveWheelConfiguration}
                    labelPlacement="outside"
                    onChange={handleInputChange}
                >
                    {driveTypeOptions.map((type) => (
                        <SelectItem key={type} value={type}>
                            {type}
                        </SelectItem>
                    ))}
                </Select>
            </div>
            <div className="flex justify-center items-center gap-3">
                {renderInputField("numberOfDoors", "numberOfDoors", "Enter number of doors", "Number of Doors", "number")}
                <Select
                    label="Fuel Type"
                    variant="bordered"
                    placeholder="Select Fuel Type"
                    name="fuelType"
                    color="secondary"
                    value={formData.fuelType}
                    labelPlacement="outside"
                    onChange={handleInputChange}
                >
                    {fuelTypeOptions.map((fuelType) => (
                        <SelectItem key={fuelType} value={fuelType}>
                            {fuelType}
                        </SelectItem>
                    ))}
                </Select>
                {renderInputField("vehicleEngine", "vehicleEngine", "Enter engine size", "Engine size")}
            </div>
            <div className="flex justify-center items-center gap-3">
                <Select
                    label="Interior Color"
                    variant="bordered"
                    placeholder="Select Interior Color"
                    name="vehicleInteriorColor"
                    color="secondary"
                    value={formData.vehicleInteriorColor}
                    labelPlacement="outside"
                    onChange={handleInputChange}
                >
                    {colorData.map((color) => (
                        <SelectItem key={color.color} value={color.color}>
                            {color.color}
                        </SelectItem>
                    ))}
                </Select>
                {renderInputField("vehicleTransmission", "vehicleTransmission", "Enter transmission specification", "Transmission Specification")}
                {renderInputField("vehicleSeatingCapacity", "vehicleSeatingCapacity", "Enter seating capacity", "Seating Capacity", "number")}
            </div>
            <div className="flex justify-center items-center gap-3">
                {renderInputField("carFeature", "carFeature", "Enter car features", "Car Features")}
                {renderInputField("carSafetyFeature", "carSafetyFeature", "Enter car safety features", "Car Safety Features")}
                {renderInputField("cylinders", "cylinders", "Enter number of cylinders", "Cylinders", "number")}
            </div>
            <div>
                <p className="pb-3" htmlFor="description">Description</p>
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
