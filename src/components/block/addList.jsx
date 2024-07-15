"use client"

import { useState } from "react"

export default function PostList() {
    const [formData, setFormData] = useState({
        title: "",
        image: "",
        price: ""
    });
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const submitData = async (e) => {
        e.preventDefault();
        
        // Validation check
        if (!formData.title || !formData.image || !formData.price) {
            setError("All fields are required");
            return;
        }

        setError(null); // Clear any previous error

        const res = await fetch("/api/listing", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const data = await res.json();
        setResponse(data);
    }

    return (
        <div className=" mx-auto p-6 bg-white rounded-lg shadow-md">
            <form onSubmit={submitData} className="space-y-4">
                {error && <div className="text-red-500 text-sm">{error}</div>}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input 
                        type="text" 
                        id="title"
                        name="title"
                        value={formData.title} 
                        onChange={handleChange} 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter title" 
                    />
                </div>
                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
                    <input 
                        type="text" 
                        id="image"
                        name="image"
                        value={formData.image} 
                        onChange={handleChange} 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter image URL" 
                    />
                </div>
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                    <input 
                        type="text" 
                        id="price"
                        name="price"
                        value={formData.price} 
                        onChange={handleChange} 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter price" 
                    />
                </div>
                <div>
                    <button 
                        type="submit" 
                        className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Submit
                    </button>
                </div>
            </form>
            {response && <div className="mt-4 p-4 bg-green-100 rounded-lg">{JSON.stringify(response)}</div>}
        </div>
    );
}
