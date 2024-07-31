"use client";
import { useEffect, useState } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { Input, Button, Spinner } from "@nextui-org/react";
import CustomModal from '@/components/block/modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SafetyFeatures() {
    const [safetyFeaturesData, setSafetyFeaturesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newFeature, setNewFeature] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [selectedFeature, setSelectedFeature] = useState(null);
    const [error, setError] = useState("");
    const [deleteFeatureId, setDeleteFeatureId] = useState(null);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const safetyFeaturesApiEndpoint = "/api/listing/safety-features";

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(safetyFeaturesApiEndpoint);
            if (!response.ok) throw new Error("Network response was not ok");
            const data = await response.json();
            setSafetyFeaturesData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddFeature = async (e) => {
        e.preventDefault();
        if (!newFeature.trim() || !newDescription.trim()) {
            setError("Feature and description are required");
            return;
        }

        try {
            const response = await fetch(safetyFeaturesApiEndpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ feature: newFeature, description: newDescription })
            });
            if (!response.ok) throw new Error("Network response was not ok");
            setNewFeature("");
            setNewDescription("");
            setError("");
            fetchData();
            toast.success("Safety feature added successfully!");
        } catch (error) {
            console.error("Error adding new safety feature:", error);
            setError("Failed to add new safety feature");
            toast.error("Failed to add new safety feature");
        }
    };

    const handleUpdateFeature = async () => {
        if (!selectedFeature || !newFeature.trim() || !newDescription.trim()) {
            setError("Select a feature and provide feature and description");
            return;
        }

        try {
            const response = await fetch(safetyFeaturesApiEndpoint, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: selectedFeature._id,
                    updateData: { feature: newFeature, description: newDescription }
                })
            });
            if (!response.ok) throw new Error("Network response was not ok");
            setNewFeature("");
            setNewDescription("");
            setSelectedFeature(null);
            setError("");
            fetchData();
            toast.success("Safety feature updated successfully!");
        } catch (error) {
            console.error("Error updating safety feature:", error);
            setError("Failed to update safety feature");
            toast.error("Failed to update safety feature");
        }
    };

    const handleDeleteFeature = async (id) => {
        try {
            const response = await fetch(safetyFeaturesApiEndpoint, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            });
            if (!response.ok) throw new Error("Network response was not ok");
            fetchData();
            toast.success("Safety feature deleted successfully!");
        } catch (error) {
            console.error("Error deleting safety feature:", error);
            setError("Failed to delete safety feature");
            toast.error("Failed to delete safety feature");
        }
    };

    const openDeleteModal = (id) => {
        setDeleteFeatureId(id);
        setIsDeleteModalVisible(true);
    };

    const closeDeleteModal = () => {
        setDeleteFeatureId(null);
        setIsDeleteModalVisible(false);
    };

    const confirmDeleteFeature = () => {
        handleDeleteFeature(deleteFeatureId);
        closeDeleteModal();
    };

    if (loading) return <div className="flex w-full h-full items-center justify-center mt-60 "> <Spinner color="primary" size="lg" /></div>;

    return (
        <div>
            <div className="flex justify-between p-6 space-x-6">
                <div className="w-1/2 p-4 rounded-lg shadow-md h-min">
                    <h2 className="text-xl font-bold mb-10 ml-2">
                        {selectedFeature ? "Update Safety Feature" : "Add New Safety Feature"}
                    </h2>
                    <form onSubmit={selectedFeature ? (e) => { e.preventDefault(); handleUpdateFeature(); } : handleAddFeature}>
                        <Input
                            label="Feature"
                            labelPlacement="outside"
                            type="text"
                            value={newFeature}
                            onChange={(e) => setNewFeature(e.target.value)}
                            placeholder="Feature"
                            className="p-2 w-full mb-4"
                        />
                        <Input
                            label="Description"
                            labelPlacement="outside"
                            type="text"
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                            placeholder="Description"
                            className="p-2 w-full mb-6"
                        />
                        <Button className="ml-2 bg-black text-white" type="submit">
                            {selectedFeature ? "Update" : "Add"}
                        </Button>
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                    </form>
                </div>

                <div className="w-1/2 p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Safety Feature List</h2>
                    <ul className="list-disc pl-5">
                        {safetyFeaturesData.map((featureItem) => (
                            <li key={featureItem._id} className="flex justify-between items-center px-5 py-2 mb-4 rounded-md bg-slate-50">
                                <div className="flex-1">
                                    <p className="font-medium">{featureItem.feature}</p>
                                    <p className="text-gray-600">{featureItem.description}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => {
                                            setSelectedFeature(featureItem);
                                            setNewFeature(featureItem.feature);
                                            setNewDescription(featureItem.description);
                                        }}
                                        className="h-8 w-8 shadow-inner rounded-full flex justify-center items-center bg-teal-50">
                                        <MdModeEdit />
                                    </button>
                                    <button
                                        onClick={() => openDeleteModal(featureItem._id)}
                                        className="h-8 w-8 shadow-inner rounded-full flex justify-center items-center bg-red-50">
                                        <MdDelete className="" />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <CustomModal
                isOpen={isDeleteModalVisible}
                onClose={closeDeleteModal}
                onConfirm={confirmDeleteFeature}
                title="Confirm Deletion">
                <p>Are you sure you want to delete this safety feature? This action cannot be undone.</p>
            </CustomModal>

            <ToastContainer />
        </div>
    );
}
