// components/PostList.js
import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, editorConfig } from '@/components/block/ckeditorConfig';

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
        setFormData({ ...formData, [name]: value });
    };

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setFormData({ ...formData, description: data });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("api/listing", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                setResponse(data);
            } else {
                const errorData = await response.json();
                setError(errorData.message);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div>
                <label htmlFor="title">Title</label>
                <Input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    fullWidth
                    placeholder="Enter title"
                />
            </div>
            <div>
                <label htmlFor="image">Image URL</label>
                <Input
                    type="text"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    fullWidth
                    placeholder="Enter image URL"
                />
            </div>
            <div>
                <label htmlFor="price">Price</label>
                <Input
                    type="text"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    fullWidth
                    placeholder="Enter price"
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
            {response && <div className="text-green-500">Success: {response.message}</div>}
            {error && <div className="text-red-500">Error: {error}</div>}
        </form>
    );
};

export default PostList;
