"use client";
import { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ClassicEditor, editorConfig } from "@/lib/editorConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";

const Page = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    thumbnail: "",
    category: "",
    tag: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setFormData((prevData) => ({ ...prevData, content: data }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      toast.success("Post added successfully!");
      // Optionally reset the form
      setFormData({
        title: "",
        content: "",
        thumbnail: "",
        category: "",
        tag: "",
      });
    } catch (error) {
      toast.error("Failed to add post");
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h3 className="ml-2 font-bold">Add New Post</h3>
      <div className="ml-2 mb-4">
        <Input
          className="pt-4"
          clearable
          underlined
          placeholder="Enter Title"
          label="Post Main Title"
          labelPlacement="outside"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
      </div>

      <div className="ml-2 mb-4 flex gap-4">
        <Input
          clearable
          underlined
          placeholder="Thumbnail URL"
          labelPlacement="outside"
          label="Thumbnail"
          name="thumbnail"
          value={formData.thumbnail}
          onChange={handleInputChange}
        />
        <Input
          clearable
          underlined
          placeholder="Enter tags, separated by commas (e.g., Vasu, Theme, Cars)"
          labelPlacement="outside"
          label="Tags"
          name="tag"
          value={formData.tag}
          onChange={handleInputChange}
        />
        <Input
          clearable
          underlined
          placeholder="Category"
          labelPlacement="outside"
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
        />
      </div>
      <div className="ml-2 mb-4">
        <CKEditor
          editor={ClassicEditor}
          config={editorConfig}
          data={formData.content}
          onChange={handleEditorChange}
        />
      </div>
      <Button className="bg-black text-white" onClick={handleSubmit}>
        Submit
      </Button>
      <ToastContainer />
    </div>
  );
};

export default Page;
