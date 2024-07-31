"use client";
import { useEffect, useState } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { Input, Button, Spinner } from "@nextui-org/react";
import { SketchPicker } from 'react-color';
import CustomModal from '@/components/block/modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Color() {
    const [colorData, setColorData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newColor, setNewColor] = useState("");
    const [colorHex, setColorHex] = useState("#000");
    const [selectedColor, setSelectedColor] = useState(null);
    const [error, setError] = useState("");
    const [deleteColorId, setDeleteColorId] = useState(null);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const colorApiEndpoint = "/api/listing/color";

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(colorApiEndpoint);
            if (!response.ok) throw new Error("Network response was not ok");
            const data = await response.json();
            setColorData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddColor = async (e) => {
        e.preventDefault();
        if (!newColor.trim()) {
            setError("Color name is required");
            return;
        }

        try {
            const response = await fetch(colorApiEndpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ color: newColor, hex: colorHex })
            });
            if (!response.ok) throw new Error("Network response was not ok");
            setNewColor("");
            setColorHex("#000");
            setError("");
            fetchData();
            toast.success("Color added successfully!");
        } catch (error) {
            console.error("Error adding new color:", error);
            setError("Failed to add new color");
            toast.error("Failed to add new color");
        }
    };

    const handleUpdateColor = async () => {
        if (!selectedColor || !newColor.trim()) {
            setError("Select a color and provide a color name");
            return;
        }

        try {
            const response = await fetch(colorApiEndpoint, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: selectedColor._id,
                    updateData: { color: newColor, hex: colorHex }
                })
            });
            if (!response.ok) throw new Error("Network response was not ok");
            setNewColor("");
            setColorHex("#000");
            setSelectedColor(null);
            setError("");
            fetchData();
            toast.success("Color updated successfully!");
        } catch (error) {
            console.error("Error updating color:", error);
            setError("Failed to update color");
            toast.error("Failed to update color");
        }
    };

    const handleDeleteColor = async (id) => {
        try {
            const response = await fetch(colorApiEndpoint, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            });
            if (!response.ok) throw new Error("Network response was not ok");
            fetchData();
            toast.success("Color deleted successfully!");
        } catch (error) {
            console.error("Error deleting color:", error);
            setError("Failed to delete color");
            toast.error("Failed to delete color");
        }
    };

    const openDeleteModal = (id) => {
        setDeleteColorId(id);
        setIsDeleteModalVisible(true);
    };

    const closeDeleteModal = () => {
        setDeleteColorId(null);
        setIsDeleteModalVisible(false);
    };

    const confirmDeleteColor = () => {
        handleDeleteColor(deleteColorId);
        closeDeleteModal();
    };

    if (loading) return <div className="flex w-full h-full items-center justify-center mt-60 "> <Spinner color="primary" size="lg" /></div>;

    return (
        <div>
            <div className="flex justify-between p-6 space-x-6">
                <div className="w-1/2 p-4 rounded-lg shadow-md h-min">
                    <h2 className="text-xl font-bold mb-10 ml-2">
                        {selectedColor ? "Update Color" : "Add New Color"}
                    </h2>
                    <form onSubmit={selectedColor ? (e) => { e.preventDefault(); handleUpdateColor(); } : handleAddColor}>
                        <Input
                            label="Color Name"
                            labelPlacement="outside"
                            type="text"
                            value={newColor}
                            onChange={(e) => setNewColor(e.target.value)}
                            placeholder="Color Name"
                            className="p-2 w-full mb-5"
                        />
                        <SketchPicker
                            label = "Pick Color"
                            color={colorHex}
                            onChangeComplete={(color) => setColorHex(color.hex)}
                            className="mb-10 ml-3"
                        />
                        <Button className="ml-2 bg-black text-white" type="submit">
                            {selectedColor ? "Update" : "Add"}
                        </Button>
                        {error && <p className="text-red-500 mt-2 ml-3">{error}</p>}
                    </form>
                </div>

                <div className="w-1/2 p-4 rounded-lg shadow-md h-min">
                    <h2 className="text-xl font-bold mb-4">Color List</h2>
                    <ul className="list-disc pl-5">
                        {colorData.map((colorItem) => (
                            <li key={colorItem._id} className="flex justify-between items-center px-5 py-2 mb-4 rounded-md bg-slate-50">
                                <div className="flex items-center">
                                    <div
                                        style={{ backgroundColor: colorItem.hex }}
                                        className="w-6 h-6 rounded-full mr-4"
                                    ></div>
                                    <p className="font-medium">{colorItem.color}</p>
                                </div>
                                <button
                                    onClick={() => {
                                        setSelectedColor(colorItem);
                                        setNewColor(colorItem.color);
                                        setColorHex(colorItem.hex);
                                    }}
                                    className="h-8 w-8 shadow-inner rounded-full flex justify-center items-center bg-teal-50">
                                    <MdModeEdit />
                                </button>
                                <button
                                    onClick={() => openDeleteModal(colorItem._id)}
                                    className="h-8 w-8 shadow-inner rounded-full flex justify-center items-center bg-red-50">
                                    <MdDelete className="" />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <CustomModal
                isOpen={isDeleteModalVisible}
                onClose={closeDeleteModal}
                onConfirm={confirmDeleteColor}
                title="Confirm Deletion">
                <p>Are you sure you want to delete this color? This action cannot be undone.</p>
            </CustomModal>

            <ToastContainer />
        </div>
    );
}
