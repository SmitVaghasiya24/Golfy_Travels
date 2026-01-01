import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../../services/api";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showPass, setShowPass] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            toast.error("All fields are required");
            return;
        }

        try {
            const res = await API.post("/api/login", formData);
            const { user, token, message } = res.data;

            if (!token || !user) {
                toast.error("Invalid login response");
                return;
            }

            login({ user, token });

            toast.success(message || "Login successful!");
            navigate("/my-account");
        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed. Try again.");
        }
    };

    return (
        <div className="py-10">
            <form
                onSubmit={handleSubmit}
                className="border border-gray-300 p-7 rounded-md w-full max-w-xl shadow-sm"
            >
                <h2 className="text-3xl font-semibold text-center mb-6">Sign In</h2>

                <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-md px-4 py-3 mb-4 focus:outline-blue-400"
                />

                <div className="relative mb-4">
                    <input
                        type={showPass ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-md px-4 py-3 pr-12 focus:outline-blue-400"
                    />
                    <span
                        className="absolute right-4 top-3.5 cursor-pointer text-gray-600"
                        onClick={() => setShowPass(!showPass)}
                    >
                        {showPass ? <FaEye /> : <FaEyeSlash />}
                    </span>
                </div>

                <div className="flex items-center gap-5 mb-4">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700"
                    >
                        LOG IN
                    </button>

                    <label className="flex items-center gap-2 text-gray-700">
                        <input type="checkbox" />
                        Remember me
                    </label>
                </div>

                <p className="text-blue-600 text-sm text-start cursor-pointer hover:underline">
                    Lost your password?
                </p>
            </form>
        </div>
    );
}

export default Login;
