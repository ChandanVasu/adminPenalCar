"use client";
import { useEffect, useState } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { Input, Button, Spinner } from "@nextui-org/react";
import CustomModal from "@/components/block/modal";

export default function Category() {
    const [categoryData, setCategoryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newCategory, setNewCategory] = useState("");
    const [newImage, setNewImage] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [error, setError] = useState("");
    const [deleteCategoryId, setDeleteCategoryId] = useState(null);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const apiEndpoint = "/api/posts/cat";

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(apiEndpoint);
            if (!response.ok) throw new Error("Network response was not ok");
            const data = await response.json();
            setCategoryData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddCategory = async (e) => {
        e.preventDefault();
        if (!newCategory.trim() || !newImage.trim()) {
            setError("Category name and image URL are required");
            return;
        }

        try {
            const response = await fetch(apiEndpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ category: newCategory, image: newImage })
            });
            if (!response.ok) throw new Error("Network response was not ok");
            setNewCategory("");
            setNewImage("");
            setError("");
            fetchData();
        } catch (error) {
            console.error("Error adding new category:", error);
            setError("Failed to add new category");
        }
    };

    const handleUpdateCategory = async () => {
        if (!selectedCategory || !newCategory.trim() || !newImage.trim()) {
            setError("Select a category, and provide category name and image URL");
            return;
        }

        try {
            const response = await fetch(apiEndpoint, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: selectedCategory._id,
                    updateData: { category: newCategory, image: newImage }
                })
            });
            if (!response.ok) throw new Error("Network response was not ok");
            setNewCategory("");
            setNewImage("");
            setSelectedCategory(null);
            setError("");
            fetchData();
        } catch (error) {
            console.error("Error updating category:", error);
            setError("Failed to update category");
        }
    };

    const handleDeleteCategory = async (id) => {
        try {
            const response = await fetch(apiEndpoint, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            });
            if (!response.ok) throw new Error("Network response was not ok");
            fetchData();
        } catch (error) {
            console.error("Error deleting category:", error);
            setError("Failed to delete category");
        }
    };

    const openDeleteModal = (id) => {
        setDeleteCategoryId(id);
        setIsDeleteModalVisible(true);
    };

    const closeDeleteModal = () => {
        setDeleteCategoryId(null);
        setIsDeleteModalVisible(false);
    };

    const confirmDeleteCategory = () => {
        handleDeleteCategory(deleteCategoryId);
        closeDeleteModal();
    };

    if (loading) return <div className="flex w-full h-full items-center justify-center mt-60 "> <Spinner color="primary" size="lg" /></div>;

    return (
        <div>
            <div className="flex justify-between p-6 space-x-6">
                <div className="w-1/2 p-4 rounded-lg shadow-md h-min">
                    <h2 className="text-xl font-bold mb-10 ml-2">
                        {selectedCategory ? "Update Category" : "Add New Category"}
                    </h2>
                    <form onSubmit={selectedCategory ? (e) => { e.preventDefault(); handleUpdateCategory(); } : handleAddCategory}>
                        <Input
                            label="Category Name"
                            // color="primary"
                            labelPlacement="outside" type="text"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            placeholder="Tata"
                            className="p-2 w-full mb-10"
                        />
                        <Input
                            label="Category Icon Url"
                            // color="primary"
                            labelPlacement="outside" type="text"
                            value={newImage}
                            onChange={(e) => setNewImage(e.target.value)}
                            placeholder="https://image-vasu.jpg"
                            className="p-2  w-full mb-6"
                        />
                        <Button className="ml-2 bg-black text-white"
                            type="submit">
                            {selectedCategory ? (
                                "Update"
                            ) : (
                                "Add"
                            )}
                        </Button>
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                    </form>
                </div>

                <div className="w-1/2 p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Category List</h2>
                    <ul className="list-disc pl-5" >
                        <li className="flex justify-between items-center px-5 py-2 mb-1">
                            <p>Image</p>
                            <p>Category</p>
                            <p>Edit</p>
                            <p>Delete</p>
                        </li>
                    </ul>
                    <ul className="list-disc pl-5">
                        {categoryData.map((categoryItem) => (
                            <li key={categoryItem._id} className="flex justify-between items-center px-5 py-2 mb-4 rounded-md bg-slate-50">
                                <img src={categoryItem.image} alt={categoryItem.category} className="bg-white w-14 h-14 object-cover mr-4 rounded-full shadow-md p-2" />
                                <p className="font-medium">{categoryItem.category}</p>
                                <button
                                    onClick={() => {
                                        setSelectedCategory(categoryItem);
                                        setNewCategory(categoryItem.category);
                                        setNewImage(categoryItem.image);
                                    }}
                                    className="h-8 w-8 shadow-inner rounded-full flex justify-center items-center bg-teal-50"
                                >
                                    <MdModeEdit />
                                </button>
                                <button
                                    onClick={() => openDeleteModal(categoryItem._id)}
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
                onConfirm={confirmDeleteCategory}
                title="Confirm Deletion"
            >
                <p>Are you sure you want to delete this category? This action cannot be undone.</p>
            </CustomModal>
        </div>
    );
}
