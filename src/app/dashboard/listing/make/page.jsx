"use client";

import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";

export default function Make() {
    const [makeData, setMakeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newMake, setNewMake] = useState("");
    const [newImage, setNewImage] = useState("");
    const [selectedMake, setSelectedMake] = useState(null);
    const [error, setError] = useState("");
    const apiEndpoint = "/api/listing/make";

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(apiEndpoint);
            if (!response.ok) throw new Error("Network response was not ok");
            const data = await response.json();
            setMakeData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddMake = async (e) => {
        e.preventDefault();
        if (!newMake.trim() || !newImage.trim()) {
            setError("Category name and image URL are required");
            return;
        }

        try {
            const response = await fetch(apiEndpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ make: newMake, image: newImage })
            });
            if (!response.ok) throw new Error("Network response was not ok");
            setNewMake("");
            setNewImage("");
            setError("");
            fetchData();
        } catch (error) {
            console.error("Error adding new make:", error);
            setError("Failed to add new category");
        }
    };

    const handleUpdateMake = async () => {
        if (!selectedMake || !newMake.trim() || !newImage.trim()) {
            setError("Select a make, and provide category name and image URL");
            return;
        }

        try {
            const response = await fetch(apiEndpoint, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: selectedMake._id,
                    updateData: { make: newMake, image: newImage }
                })
            });
            if (!response.ok) throw new Error("Network response was not ok");
            setNewMake("");
            setNewImage("");
            setSelectedMake(null);
            setError("");
            fetchData();
        } catch (error) {
            console.error("Error updating make:", error);
            setError("Failed to update category");
        }
    };

    const handleDeleteMake = async (id) => {
        try {
            const response = await fetch(apiEndpoint, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            });
            if (!response.ok) throw new Error("Network response was not ok");
            fetchData();
        } catch (error) {
            console.error("Error deleting make:", error);
            setError("Failed to delete category");
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="flex p-6 space-x-6">
            {/* Form Section for Adding/Updating Make */}
            <div className="w-full max-w-sm p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-4">
                    {selectedMake ? "Update Category" : "Add New Category"}
                </h2>
                <form onSubmit={selectedMake ? (e) => { e.preventDefault(); handleUpdateMake(); } : handleAddMake}>
                    <input
                        type="text"
                        value={newMake}
                        onChange={(e) => setNewMake(e.target.value)}
                        placeholder="Enter category name"
                        className="p-2 border border-gray-300 rounded w-full mb-4"
                    />
                    <input
                        type="text"
                        value={newImage}
                        onChange={(e) => setNewImage(e.target.value)}
                        placeholder="Enter image URL"
                        className="p-2 border border-gray-300 rounded w-full mb-4"
                    />
                    <button
                        type="submit"
                        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center"
                    >
                        {selectedMake ? (
                            <FaEdit className="text-lg" />
                        ) : (
                            <FaPlus className="text-lg" />
                        )}
                    </button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </form>
            </div>

            {/* Category List Section */}
            <div className="w-full max-w-sm p-4 bg-white border border-gray-300 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-4">Category List</h2>
                <ul className="list-disc pl-5">
                    {makeData.map((makeItem) => (
                        <li key={makeItem._id} className="mb-2 flex items-center">
                            <img src={makeItem.image} alt={makeItem.make} className="w-12 h-12 object-cover mr-4 rounded-full" />
                            {makeItem.make}
                            <button
                                onClick={() => {
                                    setSelectedMake(makeItem);
                                    setNewMake(makeItem.make);
                                    setNewImage(makeItem.image);
                                }}
                                className="ml-4 text-blue-500 hover:underline flex items-center"
                            >
                                <FaEdit className="mr-1" />
                            </button>
                            <button
                                onClick={() => handleDeleteMake(makeItem._id)}
                                className="ml-4 text-red-500 hover:underline flex items-center"
                            >
                                <FaTrashAlt className="mr-1" />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
