"use client";
import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import { Input, Button, Select, SelectItem, CheckboxGroup, Checkbox } from "@nextui-org/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from "react";

// Dynamically import CKEditor with SSR disabled
const CKEditor = dynamic(() => import('@ckeditor/ckeditor5-react').then(mod => mod.CKEditor), { ssr: false });
const ClassicEditor = dynamic(() => import('@ckeditor/ckeditor5-build-classic'), { ssr: false });

const PostList = () => {
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
    vehicleSeatingCapacity: "",
    vehicleTransmission: "",
    carFeature: [],
    carSafetyFeature: [],
    cylinders: ""
  });

  const [makeData, setMakeData] = useState([]);
  const [modelData, setModelData] = useState([]);
  const [colorData, setColorData] = useState([]);
  const [typeData, setTypeData] = useState([]);
  const [featureData, setFeatureData] = useState([]);
  const [safetyFeatureData, setSafetyFeatureData] = useState([]);
  const [isModelDisabled, setIsModelDisabled] = useState(true);

  const [availabilityOptions] = useState(["InStock", "OutOfStock"]);
  const [mileageUnitOptions] = useState(["KMT", "SMI"]);
  const [priceCurrencyOptions] = useState(["INR", "USD", "EUR", "GBP"]);
  const [itemConditionOptions] = useState(["New", "Used"]);
  const [fuelTypeOptions] = useState(["Petrol", "Diesel", "Electric", "Hybrid"]);
  const [transmissionOptions] = useState(["Automatic", "Manual", "Semi-Automatic"]);
  const [driveTypeOptions] = useState(["Front Wheel Drive", "Rear Wheel Drive", "All Wheel Drive", "Four Wheel Drive"]);

  useEffect(() => {
    fetchData("/api/listing/make", setMakeData);
    fetchData("/api/listing/type", setTypeData);
    fetchData("/api/listing/color", setColorData);
    fetchData("/api/listing/features", setFeatureData);
    fetchData("/api/listing/safety-features", setSafetyFeatureData);
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

  const fetchData = async (url, setState) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setState(data);
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
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

  const handleCheckboxChange = (name, values) => {
    setFormData((prevData) => ({ ...prevData, [name]: values }));
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
      color="default"
      labelPlacement="outside"
    />
  );

  const renderSelectField = (label, name, value, options, isDisabled = false) => (
    <Select
      label={label}
      variant="bordered"
      placeholder={`Select ${label}`}
      name={name}
      color="secondary"
      value={value}
      labelPlacement="outside"
      isDisabled={isDisabled}
      onChange={(e) => handleInputChange({ target: { name, value: e.target.value } })}>
      {options.map((option) => (
        <SelectItem key={option} value={option}>
          {option}
        </SelectItem>
      ))}
    </Select>
  );

  return (
    <div>
      <h3 className="ml-2 font-bold">Add New Listing</h3>
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <div className="flex justify-center items-center gap-3">
          {renderInputField("title", "title", "Enter title", "Title")}
          {renderInputField("image", "image", "Enter image URL", "Image URL")}
          {renderInputField("price", "price", "Enter price", "Price", "number")}
        </div>
        <div className="flex justify-center items-center gap-3">
          {renderSelectField("Price Currency", "priceCurrency", formData.priceCurrency, priceCurrencyOptions)}
          {renderSelectField("Make", "make", formData.make, makeData.map((make) => make.make))}
          {renderSelectField("Model", "model", formData.model, modelData.map((model) => model.model), isModelDisabled)}
        </div>
        <div className="flex justify-center items-center gap-3">
          {renderInputField("year", "year", "Enter car year", "Year", "number")}
          {renderInputField("mileage", "mileage", "Enter car mileage", "Mileage", "number")}
          {renderSelectField("Mileage Unit", "mileageUnit", formData.mileageUnit, mileageUnitOptions)}
        </div>
        <div className="flex justify-center items-center gap-3">
          {renderSelectField("Item Condition", "itemCondition", formData.itemCondition, itemConditionOptions)}
          {renderSelectField("Availability", "availability", formData.availability, availabilityOptions)}
          {renderInputField("vin", "vin", "Enter vin", "Vin")}
        </div>
        <div className="flex justify-center items-center gap-3">
          {renderSelectField("Body Type", "bodyType", formData.bodyType, typeData.map((type) => type.type))}
          {renderSelectField("Color", "color", formData.color, colorData.map((color) => color.color))}
          {renderSelectField("Drive Type", "driveWheelConfiguration", formData.driveWheelConfiguration, driveTypeOptions)}
        </div>
        <div className="flex justify-center items-center gap-3">
          {renderInputField("numberOfDoors", "numberOfDoors", "Enter number of doors", "Number of Doors", "number")}
          {renderSelectField("Fuel Type", "fuelType", formData.fuelType, fuelTypeOptions)}
          {renderInputField("vehicleEngine", "vehicleEngine", "Enter vehicle engine", "Vehicle Engine")}
        </div>
        <div className="flex justify-center items-center gap-3">
          {renderInputField("vehicleSeatingCapacity", "vehicleSeatingCapacity", "Enter vehicle seating capacity", "Vehicle Seating Capacity", "number")}
          {renderSelectField("Vehicle Transmission", "vehicleTransmission", formData.vehicleTransmission, transmissionOptions)}
          {renderInputField("cylinders", "cylinders", "Enter cylinders", "Cylinders")}
        </div>
        <div>
          <CheckboxGroup
            label="Features"
            value={formData.carFeature}
            onChange={(values) => handleCheckboxChange("carFeature", values)}>
            {featureData.map((feature) => (
              <Checkbox key={feature.feature} value={feature.feature}>
                {feature.feature}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </div>
        <div>
          <CheckboxGroup
            label="Safety Features"
            value={formData.carSafetyFeature}
            onChange={(values) => handleCheckboxChange("carSafetyFeature", values)}>
            {safetyFeatureData.map((feature) => (
              <Checkbox key={feature.feature} value={feature.feature}>
                {feature.feature}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </div>
        <div className="mt-4">
          <CKEditor
            editor={ClassicEditor}
            data={formData.description}
            onChange={handleEditorChange}
          />
        </div>
        <div className="mt-4">
          <Button type="submit" color="secondary" variant="flat" className="w-full">
            Submit
          </Button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default PostList;
