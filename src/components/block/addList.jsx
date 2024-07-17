import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import dynamic from "next/dynamic";
import JoditEditor from "jodit-react";

const PostList = () => {
    const [formData, setFormData] = useState({
        title: "",
        image: "",
        price: "",
        description: ""
    });
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        // Validation check
        if (!formData.title || !formData.image || !formData.price || !formData.description) {
            setError("All fields are required");
            return;
        }

        setError(null); // Clear any previous error

        try {
            const res = await fetch("/api/listing", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await res.json();
            setResponse(data);
        } catch (error) {
            setError("Error submitting data. Please try again.");
            console.error("Error submitting data:", error);
        }
    };

    return (
        <div className="p-2 bg-white rounded-lg">
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <div className="space-y-6">
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
                </div>
                <div>
                    <JoditEditor
                        value={formData.description}
                        onChange={(newContent) => setFormData({ ...formData, description: newContent })}
                        tabIndex={1} // tabIndex of textarea
                        className="mt-1 block w-full h-48"
                        placeholder="Enter description"
                    />
                </div>
                <div className="!mt-16">
                    <Button
                        type="button"
                        onClick={handleSubmit}
                        color="primary"
                        variant="shadow"
                        className="">
                        Submit
                    </Button>
                </div>
            </div>
            {response && <div className="mt-4 p-4 bg-green-100 rounded-lg">{JSON.stringify(response)}</div>}
        </div>
    );
};

export default PostList;
