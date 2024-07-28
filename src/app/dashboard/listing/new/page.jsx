"use client";
import { useState, useEffect } from "react";
import { Input, Button, Select, SelectItem, CheckboxGroup, Checkbox } from "@nextui-org/react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, editorConfig } from '@/lib/editorConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from "react";

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
    fetchMakeData();
    fetchColorData();
    fetchTypeData();
    fetchFeatureData();
    fetchSafetyFeatureData();
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

  const fetchFeatureData = async () => {
    try {
      const response = await fetch("/api/listing/features");
      const data = await response.json();
      setFeatureData(data);
    } catch (error) {
      console.error("Error fetching feature data:", error);
    }
  };

  const fetchSafetyFeatureData = async () => {
    try {
      const response = await fetch("/api/listing/safety-features");
      const data = await response.json();
      setSafetyFeatureData(data);
    } catch (error) {
      console.error("Error fetching safety feature data:", error);
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
          <Select
            label="Price Currency"
            variant="bordered"
            placeholder="Select Currency"
            name="priceCurrency"
            color="secondary"
            value={formData.priceCurrency}
            labelPlacement="outside"
            onChange={handleInputChange}>
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
            onChange={(e) => handleInputChange({ target: { name: 'make', value: e.target.value } })}>
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
            onChange={handleInputChange}>
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
            onChange={handleInputChange}>
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
            onChange={handleInputChange}>
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
            onChange={handleInputChange}>
            {availabilityOptions.map((availability) => (
              <SelectItem key={availability} value={availability}>
                {availability}
              </SelectItem>
            ))}
          </Select>
          {renderInputField("vin", "vin", "Enter vin", "Vin")}
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
            onChange={handleInputChange}>
            {typeData.map((type) => (
              <SelectItem key={type.type} value={type.type}>
                {type.type}
              </SelectItem>
            ))}
          </Select>
          <Select
            label="Color"
            variant="bordered"
            placeholder="Select Color"
            name="color"
            color="secondary"
            value={formData.color}
            labelPlacement="outside"
            onChange={handleInputChange}>
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
            onChange={handleInputChange}>
            {driveTypeOptions.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </Select>            </div>
        <div className="flex justify-center items-center gap-3">
          {renderInputField("numberOfDoors", "numberOfDoors", "Enter number of doors", "Number of Doors", "number")}
          <Select
            label="Fuel Type"
            variant="bordered"
            placeholder="Select Fuel Type"
            selectionMode="single"
            name="fuelType"
            color="secondary"
            value={formData.fuelType}
            labelPlacement="outside"
            onChange={handleInputChange}>
            {fuelTypeOptions.map((fuel) => (
              <SelectItem key={fuel} value={fuel}>
                {fuel}
              </SelectItem>
            ))}
          </Select>
          {renderInputField("vehicleEngine", "vehicleEngine", " vehicle engine Size In L", "Engine Size")}
        </div>
        <div className="flex justify-center items-center gap-3">
          {renderInputField("cylinders", "cylinders", "Enter cylinders", "Cylinders", "number")}
          {renderInputField("vehicleSeatingCapacity", "vehicleSeatingCapacity", "Enter vehicle seating capacity", "Vehicle Seating Capacity", "number")}
          <Select
            label="Vehicle Transmission"
            variant="bordered"
            placeholder="Select Vehicle Transmission"
            name="vehicleTransmission"
            selectionMode="multiple"
            color="secondary"
            value={formData.vehicleTransmission}
            labelPlacement="outside"
            onChange={handleInputChange}>
            {transmissionOptions.map((transmission) => (
              <SelectItem key={transmission} value={transmission}>
                {transmission}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="flex justify-between flex-col items-center gap-5">
          <CheckboxGroup
            label="Car Features"
            orientation="horizontal"
            color="secondary"
            value={formData.carFeature}
            onChange={(values) => handleCheckboxChange("carFeature", values)}>
            {featureData.map((feature) => (
              <Checkbox key={feature._id} value={feature.feature}>
                {feature.feature}
              </Checkbox>
            ))}
          </CheckboxGroup>
          <CheckboxGroup
            label="Car Safety Features"
            orientation="horizontal"
            color="secondary"
            value={formData.carSafetyFeature}
            onChange={(values) => handleCheckboxChange("carSafetyFeature", values)}>
            {safetyFeatureData.map((feature) => (
              <Checkbox key={feature._id} value={feature.feature}>
                {feature.feature}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </div>
        <CKEditor
          editor={ClassicEditor}
          config={editorConfig}
          data={formData.description}
          onChange={handleEditorChange}
        />
        <Button type="submit" color="secondary" >
          Submit
        </Button>
        <ToastContainer position="top-right" autoClose={3000} />
      </form></div>

  );
};

export default PostList;
