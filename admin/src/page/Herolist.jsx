import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify";
import { backendURL } from '../App';
import axios from 'axios'
import { MdDelete, MdEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom'
const Herolist = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const fetchHeroData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${backendURL}/api/hero`);
            setData(res?.data?.data || []);
        } catch (error) {
            toast.error(error?.message || 'Error fetching Hero data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHeroData();
    }, []);

    const handleDelete = (id) => {
        const confirmDelete = async () => {
            try {
                const res = await axios.delete(`${backendURL}/api/hero/${id}`);
                toast.dismiss();
                toast.success("Banner is Deleted Successfully!");
                fetchHeroData();
            } catch (error) {
                toast.error(error?.response?.data?.message || "Something went wrong. Please try again.");
            }
        };

        toast.info(
            <div className="flex flex-col gap-3">
                <span>Are you sure you want to delete this banner?</span>
                <div className="flex gap-3">
                    <button
                        onClick={confirmDelete}
                        className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-all"
                    >
                        Yes
                    </button>
                    <button
                        onClick={() => toast.dismiss()}
                        className="bg-gray-400 text-white px-3 py-1 rounded-md hover:bg-gray-500 transition-all"
                    >
                        No
                    </button>
                </div>
            </div>,
            { autoClose: false }
        );
    };
    const handleUpdate = async (item) => {
        navigate('/add-hero-section', {
            state: {
                id: item._id,
                title: item.title,
                subtitle: item.subtitle,
                image: item.image
            }
        })
    }

    return (
        <div className="min-h-screen py-8 px-4 bg-gray-50">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Banner List</h2>

            {loading ? (
                <div className="fixed inset-0 flex items-center justify-center bg-black/5 backdrop-blur-sm">
                    <div className="w-10 h-10 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : data.length === 0 ? (
                <span className="text-gray-500 text-center w-full block mt-10">No banners available</span>
            ) : (
                <div className="flex flex-col gap-5">
                    {data.map((item) => (
                        <div
                            key={item._id}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all overflow-hidden"
                        >
                            <img
                                src={`${item?.image}`}
                                alt={item.title}
                                className="w-full h-52 md:h-80 object-cover object-center rounded-t-xl"
                            />
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4">
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                                    <p className="text-gray-600">{item.subtitle}</p>
                                </div>
                                <div className="flex items-center gap-2 mt-3 md:mt-0">
                                    <button
                                        className="text-green-600 hover:text-green-700 text-2xl transition"
                                        title="Edit"
                                        onClick={() => handleUpdate(item)}>
                                        <MdEdit />
                                    </button>
                                    <button
                                        className="text-red-500 hover:text-red-600 text-2xl transition"
                                        title="Delete"
                                        onClick={() => handleDelete(item?._id)}
                                    >
                                        <MdDelete />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Herolist;
