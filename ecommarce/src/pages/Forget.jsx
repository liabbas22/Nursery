import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Forget = () => {
    const [email, setEmail] = useState("");
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            toast.error("Please enter your email");
            return;
        }

        try {
            // Get all users
            const response = await axios.get(`${backendURL}/api/user`);
            const users = response.data.users || [];
            console.log("Email", users);

            const userExists = users.some(user => user.email === email);

            if (userExists) {
                toast.success("Thanks! A reset link will be sent to your email.");
                setEmail("");
            } else {
                toast.error("Email not found in our records.");
            }

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 bg-gray-50">
            <div className="max-w-md w-full bg-white shadow-md p-6 rounded-lg">

                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">
                    Forgot Password
                </h2>

                <p className="text-center text-gray-600 text-sm mb-6">
                    Lost your password? Enter your email and we’ll check if it's in our records.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    <input
                        type="email"
                        placeholder="Enter your email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                    />

                    <button
                        type="submit"
                        className="bg-black text-white py-2 rounded hover:bg-gray-900 transition"
                    >
                        Check Email
                    </button>
                </form>

            </div>
        </div>
    );
};

export default Forget;
