import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("All fields are required");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/login", {
                email,
                password,
            });

            if (response.data.success) {
                login(response.data);
               toast.success(
  <span className="flex items-center gap-2">
    <span className="text-green-500 text-lg">✔</span>
    Login successful!
  </span>,
  {
    icon: null,
  }
);





                navigate("/my-account");
            } else {
                toast.error(response.data.message);
            }
        } catch (err) {
            console.log(err);
            toast.error("Login failed. Try again.");
        }
    };

    return (
        <div className="py-10">
            <div className="border border-gray-300 p-7 rounded-md w-full max-w-lg shadow-sm">

                <h2 className="text-3xl font-semibold text-center mb-6">Sign In</h2>

                <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-200 rounded-md px-4 py-3 mb-4 focus:outline-blue-400"
                />

                <div className="relative mb-4">
                    <input
                        type={showPass ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        onClick={handleLogin}
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

            </div>
        </div>
    );
}

export default Login;
