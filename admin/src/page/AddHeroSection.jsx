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
    }, [state,isEdit]);

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
        <div className="min-h-screen px-4 py-6 sm:px-8 md:px-16 lg:px-24 bg-gray-50">
            <div className="max-w-2xl p-6 mx-auto bg-white rounded-lg shadow-md">

                <h2 className="mb-4 text-xl font-semibold text-gray-600 md:text-2xl">
                    {isEdit ? "Update Hero Section" : "Add Banner Section"}
                </h2>

                <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">

                    <div>
                        <label className="block mb-1 font-medium text-gray-600">Title</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="write short title here..."
                            onChange={handleChange}
                            value={formData.title}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-600"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-600">Sub Title</label>
                        <input
                            type="text"
                            name="subtitle"
                            placeholder="write short subtitle here..."
                            onChange={handleChange}
                            value={formData.subtitle}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-600"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 font-semibold text-gray-700">Upload Image</label>

                        <div
                            className="relative flex items-center justify-center w-full transition-colors border-2 border-gray-300 border-dashed cursor-pointer h-52 rounded-xl bg-gray-50 hover:bg-gray-100"
                            onClick={() => document.getElementById("imageInput").click()}
                        >
                            {!formData.preview && (
                                <span className="text-sm text-gray-500">Click to upload image</span>
                            )}
                            {formData.preview && (
                                <img
                                    src={formData.preview}
                                    alt="Preview"
                                    className="absolute inset-0 object-cover w-full h-full rounded-xl"
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
                        className="px-4 py-2 text-white transition-all duration-300 ease-in-out bg-green-800 rounded-md hover:bg-green-700"
                    >
                        {isEdit ? "Update Hero Section" : "Add Banner Section"}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default AddHeroSection;
