import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { backendURL } from "../App";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const AddHeroSection = () => {
    const navigate = useNavigate();
    const { state } = useLocation();

    const isEdit = Boolean(state?.id);

    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        image: null,
        preview: null,
    });
    console.log("Check", state);

    useEffect(() => {
        if (isEdit) {
            setFormData({
                title: state.title,
                subtitle: state.subtitle,
                image: null,
                preview: state?.image || null,
            });
        }
    }, [state]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
            preview: files ? URL.createObjectURL(files[0]) : prev.preview,
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = new FormData();
            data.append("title", formData.title);
            data.append("subtitle", formData.subtitle);

            if (formData.image) {
                data.append("image", formData.image);
            }

            if (isEdit) {
                const res = await axios.put(
                    `${backendURL}/api/hero/${state.id}`,
                    data,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
                console.log("Check Update Method", res);

                toast.success(res?.data?.message || "Hero updated successfully!");
                navigate("/hero-sec-list");

            } else {
                const res = await axios.post(
                    `${backendURL}/api/hero/add`,
                    data,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );

                toast.success(res?.data?.message || "Hero added successfully!");
                setFormData({
                    title: "",
                    subtitle: "",
                    image: null,
                    preview: null,
                });
                document.getElementById("imageInput").value = "";
            }

        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                (isEdit ? "Error updating Hero Section" : "Error adding Hero Section")
            );
        }
    };

    return (
        <div className="min-h-screen py-6 px-4 sm:px-8 md:px-16 lg:px-24 bg-gray-50">
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">

                <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-600">
                    {isEdit ? "Update Hero Section" : "Add Banner Section"}
                </h2>

                <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">

                    <div>
                        <label className="block text-gray-600 font-medium mb-1">Title</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="write short title here..."
                            onChange={handleChange}
                            value={formData.title}
                            required
                            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-green-600"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 font-medium mb-1">Sub Title</label>
                        <input
                            type="text"
                            name="subtitle"
                            placeholder="write short subtitle here..."
                            onChange={handleChange}
                            value={formData.subtitle}
                            required
                            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-green-600"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Upload Image</label>

                        <div
                            className="relative w-full h-52 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                            onClick={() => document.getElementById("imageInput").click()}
                        >
                            {!formData.preview && (
                                <span className="text-gray-500 text-sm">Click to upload image</span>
                            )}
                            {formData.preview && (
                                <img
                                    src={formData.preview}
                                    alt="Preview"
                                    className="absolute inset-0 w-full h-full object-cover rounded-xl"
                                />
                            )}
                        </div>

                        <input
                            id="imageInput"
                            type="file"
                            accept="image/*"
                            name="image"
                            onChange={handleChange}
                            className="hidden"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-all duration-300 ease-in-out"
                    >
                        {isEdit ? "Update Hero Section" : "Add Banner Section"}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default AddHeroSection;
