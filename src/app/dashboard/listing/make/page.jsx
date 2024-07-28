"use client";
import { useEffect, useState } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { Input, Button } from "@nextui-org/react";
import CustomModal from '@/components/block/modal'; 

export default function Make() {
    const [makeData, setMakeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newMake, setNewMake] = useState("");
    const [newImage, setNewImage] = useState("");
    const [selectedMake, setSelectedMake] = useState(null);
    const [error, setError] = useState("");
    const [deleteMakeId, setDeleteMakeId] = useState(null);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
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

    const openDeleteModal = (id) => {
        setDeleteMakeId(id);
        setIsDeleteModalVisible(true);
    };

    const closeDeleteModal = () => {
        setDeleteMakeId(null);
        setIsDeleteModalVisible(false);
    };

    const confirmDeleteMake = () => {
        handleDeleteMake(deleteMakeId);
        closeDeleteModal();
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex justify-between p-6 space-x-6">
                <div className="w-1/2 p-4 rounded-lg shadow-md h-min">
                    <h2 className="text-xl font-bold mb-10 ml-2">
                        {selectedMake ? "Update Make" : "Add New Make"}
                    </h2>
                    <form onSubmit={selectedMake ? (e) => { e.preventDefault(); handleUpdateMake(); } : handleAddMake}>
                        <Input
                            label="Make Brand Name"
                            color="primary"
                            labelPlacement="outside" type="text"
                            value={newMake}
                            onChange={(e) => setNewMake(e.target.value)}
                            placeholder="Tata"
                            className="p-2 w-full mb-10"
                        />
                        <Input
                            label="Make Logo Url"
                            color="primary"
                            labelPlacement="outside" type="text"
                            value={newImage}
                            onChange={(e) => setNewImage(e.target.value)}
                            placeholder="https://image-vasu.jpg"
                            className="p-2  w-full mb-6"
                        />
                        <Button color="secondary" className="ml-2"
                            type="submit">
                            {selectedMake ? (
                                "Update"
                            ) : (
                                "Add"
                            )}
                        </Button>
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                    </form>
                </div>

                <div className="w-1/2 p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Make List</h2>
                    <ul className="list-disc pl-5">
                        {makeData.map((makeItem) => (
                            <li key={makeItem._id} className="flex justify-between items-center px-5 py-2 mb-4 rounded-md bg-slate-50">
                                <img src={makeItem.image} alt={makeItem.make} className="bg-white w-14 h-14 object-cover mr-4 rounded-full shadow-md p-2" />
                                <p className="font-medium">{makeItem.make}</p>
                                <button
                                    onClick={() => {
                                        setSelectedMake(makeItem);
                                        setNewMake(makeItem.make);
                                        setNewImage(makeItem.image);
                                    }}
                                    className="h-8 w-8 shadow-inner rounded-full flex justify-center items-center bg-teal-50"
                                >
                                    <MdModeEdit />
                                </button>
                                <button
                                    onClick={() => openDeleteModal(makeItem._id)}
                                    className="h-8 w-8 shadow-inner rounded-full flex justify-center items-center bg-teal-50">
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
                onConfirm={confirmDeleteMake}
                title="Confirm Deletion"
            >
                <p>Are you sure you want to delete this make? This action cannot be undone.</p>
            </CustomModal>
        </div>
    );
}
