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
                console.log("Hero Section Delete:",res);
                
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
                        className="px-3 py-1 text-white transition-all bg-red-600 rounded-md hover:bg-red-700"
                    >
                        Yes
                    </button>
                    <button
                        onClick={() => toast.dismiss()}
                        className="px-3 py-1 text-white transition-all bg-gray-400 rounded-md hover:bg-gray-500"
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
        <div className="min-h-screen px-4 py-8 bg-gray-50">
            <h2 className="mb-6 text-2xl font-semibold text-gray-700">Banner List</h2>

            {loading ? (
                <div className="fixed inset-0 flex items-center justify-center bg-black/5 backdrop-blur-sm">
                    <div className="w-10 h-10 border-4 border-blue-900 rounded-full border-t-transparent animate-spin"></div>
                </div>
            ) : data.length === 0 ? (
                <span className="block w-full mt-10 text-center text-gray-500">No banners available</span>
            ) : (
                <div className="flex flex-col gap-5">
                    {data.map((item) => (
                        <div
                            key={item._id}
                            className="overflow-hidden transition-all bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md"
                        >
                            <img
                                src={`${item?.image}`}
                                alt={item.title}
                                className="object-cover object-center w-full h-52 md:h-80 rounded-t-xl"
                            />
                            <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                                    <p className="text-gray-600">{item.subtitle}</p>
                                </div>
                                <div className="flex items-center gap-2 mt-3 md:mt-0">
                                    <button
                                        className="text-2xl text-green-600 transition hover:text-green-700"
                                        title="Edit"
                                        onClick={() => handleUpdate(item)}>
                                        <MdEdit />
                                    </button>
                                    <button
                                        className="text-2xl text-red-500 transition hover:text-red-600"
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
