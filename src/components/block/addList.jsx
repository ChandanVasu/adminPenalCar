"use client"

import { useState } from "react"
import { Input } from "@nextui-org/input";

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
        <div className=" p-2 bg-white rounded-lg ">
            <form onSubmit={submitData} className="space-y-6">
                {error && <div className="text-red-500 text-sm">{error}</div>}
                <div>
                    <Input
                        type="text"
                        id="title"
                        name="title"
                        color="primary"
                        value={formData.title}
                        onChange={handleChange}
                        className="mt-1 block w-full px-0 py-0 border-none shadow-none focus:outline-none focus:ring-0 sm:text-sm"
                        placeholder="Enter title"
                    />
                </div>
                <div>
                    <Input
                        type="text"
                        id="image"
                        name="image"
                        color="primary"
                        value={formData.image}
                        onChange={handleChange}
                        className="mt-1 block w-full px-0 py-0 border-none shadow-none focus:outline-none focus:ring-0 sm:text-sm"
                        placeholder="Enter Image Url"
                    />  
                </div>
                <div>
                    <Input
                        type="text"
                        id="price"
                        name="price"
                        value={formData.price}
                        color="primary"
                        onChange={handleChange}
                        className="mt-1 block w-full px-0 py-0 border-none shadow-none focus:outline-none focus:ring-0 sm:text-sm"
                        placeholder="Enter price"
                    />
                </div >
                <div >
                    <button
                        type="submit"
                        className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Submit
                    </button>
                </div>
            </form>

            {response && <div className="mt-4 p-4 bg-green-100 rounded-lg">{JSON.stringify(response)}</div>}
        </div>
    );
}
