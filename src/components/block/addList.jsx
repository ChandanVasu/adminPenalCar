import { useState } from "react";
import { Input, Textarea } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, editorConfig } from '@/lib/editorConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        url: "",
        vehicleConfiguration: "",
        fuelType: "",
        vehicleEngine: "",
        vehicleInteriorColor: "",
        vehicleInteriorType: "",
        vehicleSeatingCapacity: "",
        vehicleTransmission: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setFormData({ ...formData, description: data });
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

            if (!response.ok) {
                const contentType = response.headers.get("content-type");
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

    return (
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div className="flex justify-center items-center gap-3">
                <Input
                    type="text"
                    id="title"
                    name="title"
                    color="secondary"
                    value={formData.title}
                    onChange={handleChange}
                    fullWidth
                    placeholder="Enter title"
                    label="Title"
                    labelPlacement="outside"
                />
                <Input
                    type="text"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    fullWidth
                    placeholder="Enter image URL"
                    label="Image URL"
                    color="secondary"
                    labelPlacement="outside"
                />
                <Input
                    type="text"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    fullWidth
                    placeholder="Enter price"
                    label="Price"
                    color="secondary"
                    labelPlacement="outside"
                />
            </div>
            <div className="flex justify-center items-center gap-3">
                <Input
                    type="text"
                    id="priceCurrency"
                    name="priceCurrency"
                    value={formData.priceCurrency}
                    onChange={handleChange}
                    fullWidth
                    placeholder="Enter price currency"
                    label="Price Currency"
                    color="secondary"
                    labelPlacement="outside"
                />
                <Input
                    type="text"
                    id="make"
                    name="make"
                    value={formData.make}
                    onChange={handleChange}
                    fullWidth
                    placeholder="Enter car make"
                    label="Make"
                    color="secondary"
                    labelPlacement="outside"
                />
                <Input
                    type="text"
                    id="model"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    fullWidth
                    placeholder="Enter car model"
                    label="Model"
                    color="secondary"
                    labelPlacement="outside"
                />
            </div>
            <div className="flex justify-center items-center gap-3">
                <Input
                    type="text"
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    fullWidth
                    placeholder="Enter car year"
                    label="Year"
                    color="secondary"
                    labelPlacement="outside"
                />
                <Input
                    type="text"
                    id="mileage"
                    name="mileage"
                    value={formData.mileage}
                    onChange={handleChange}
                    fullWidth
                    placeholder="Enter car mileage"
                    label="Mileage"
                    color="secondary"
                    labelPlacement="outside"
                />
                <Input
                    type="text"
                    id="mileageUnit"
                    name="mileageUnit"
                    value={formData.mileageUnit}
                    onChange={handleChange}
                    fullWidth
                    placeholder="Enter mileage unit"
                    label="Mileage Unit (SMI/KMT)"
                    color="secondary"
                    labelPlacement="outside"
                />
            </div>
            <div className="flex justify-center items-center gap-3">
                <Input
                    type="text"
                    id="itemCondition"
                    name="itemCondition"
                    value={formData.itemCondition}
                    onChange={handleChange}
                    fullWidth
                    placeholder="Enter item condition"
                    label="Item Condition (New/Used)"
                    color="secondary"
                    labelPlacement="outside"
                />
                <Input
                    type="text"
                    id="availability"
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    fullWidth
                    placeholder="Enter availability"
                    label="Availability (InStock/OutOfStock)"
                    color="secondary"
                    labelPlacement="outside"
                />
                <Input
                    type="text"
                    id="vin"
                    name="vin"
                    value={formData.vin}
                    onChange={handleChange}
                    fullWidth
                    placeholder="Enter VIN"
                    label="VIN"
                    color="secondary"
                    labelPlacement="outside"
                />
            </div>
            <div className="flex justify-center items-center gap-3">
                <Input
                    type="text"
                    id="bodyType"
                    name="bodyType"
                    value={formData.bodyType}
                    onChange={handleChange}
                    fullWidth
                    placeholder="Enter body type"
                    label="Body Type"
                    color="secondary"
                    labelPlacement="outside"
                />
                <Input
                    type="text"
                    id="color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    fullWidth
                    placeholder="Enter exterior color"
                    label="Exterior Color"
                    color="secondary"
                    labelPlacement="outside"
                />
                <Input
                    type="text"
                    id="driveWheelConfiguration"
                    name="driveWheelConfiguration"
                    value={formData.driveWheelConfiguration}
                    onChange={handleChange}
                    fullWidth
                    placeholder="Enter drive wheel configuration"
                    label="Drive Wheel Configuration"
                    color="secondary"
                    labelPlacement="outside"
                />
            </div>
            <div className="flex justify-center items-center gap-3">
                <Input
                    type="text"
                    id="numberOfDoors"
                    name="numberOfDoors"
                    value={formData.numberOfDoors}
                    onChange={handleChange}
                    fullWidth
                    placeholder="Enter number of doors"
                    label="Number of Doors"
                    color="secondary"
                    labelPlacement="outside"
                />
                <Input
                    type="text"
                    id="url"
                    name="url"
                    value={formData.url}
                    onChange={handleChange}
                    fullWidth
                    placeholder="Enter vehicle details page URL"
                    label="Vehicle Details Page URL"
                    color="secondary"
                    labelPlacement="outside"
                />
                <Input
                    type="text"
                    id="vehicleConfiguration"
                    name="vehicleConfiguration"
                    value={formData.vehicleConfiguration}
                    onChange={handleChange}
                    fullWidth
                    placeholder="Enter vehicle configuration"
                    label="Vehicle Configuration"
                    color="secondary"
                    labelPlacement="outside"
                />
            </div>
            <div className="flex justify-center items-center gap-3">
                <Input
                    type="text"
                    id="fuelType"
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleChange}
                    fullWidth
                    placeholder="Enter fuel type"
                    label="Fuel Type"
                    color="secondary"
                    labelPlacement="outside"
                />
                <Input
                    type="text"
                    id="vehicleEngine"
                    name="vehicleEngine"
                    value={formData.vehicleEngine}
                    onChange={handleChange}
                    fullWidth
                    placeholder="Enter engine specification"
                    label="Engine Specification"
                    color="secondary"
                    labelPlacement="outside"
                />
                <Input
                    type="text"
                    id="vehicleInteriorColor"
                    name="vehicleInteriorColor"
                    value={formData.vehicleInteriorColor}
                    onChange={handleChange}
                    fullWidth
                    placeholder="Enter interior color"
                    label="Interior Color"
                    color="secondary"
                    labelPlacement="outside"
                />
            </div>
            <div className="flex justify-center items-center gap-3">
                <Input
                    type="text"
                    id="vehicleInteriorType"
                    name="vehicleInteriorType"
                    value={formData.vehicleInteriorType}
                    onChange={handleChange}
                    fullWidth
                    placeholder="Enter interior type"
                    label="Interior Type"
                    color="secondary"
                    labelPlacement="outside"
                />
                <Input
                    type="text"
                    id="vehicleSeatingCapacity"
                    name="vehicleSeatingCapacity"
                    value={formData.vehicleSeatingCapacity}
                    onChange={handleChange}
                    fullWidth
                    placeholder="Enter seating capacity"
                    label="Seating Capacity"
                    color="secondary"
                    labelPlacement="outside"
                />
                <Input
                    type="text"
                    id="vehicleTransmission"
                    name="vehicleTransmission"
                    value={formData.vehicleTransmission}
                    onChange={handleChange}
                    fullWidth
                    placeholder="Enter transmission specification"
                    label="Transmission Specification"
                    color="secondary"
                    labelPlacement="outside"
                />
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
            <ToastContainer position="bottom-center" />
        </form>
    );
};

export default PostList;
