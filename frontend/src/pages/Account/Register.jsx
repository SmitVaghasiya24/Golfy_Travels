import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Register() {
    const [showPass, setShowPass] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { saveSignupData } = useAuth();
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (!name || !email || !password) {
            alert("All fields required");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/register", {
                name,
                email,
                password,
            });

            if (response.data.success) {
                saveSignupData(response.data);
                alert("Registration successful!");
                navigate("/my-account");
            } else {
                alert(response.data.message);
            }
        } catch (err) {
            console.log(err);
            alert("Registration failed");
        }
    };

    return (
        <div className=" py-10 ">
            <div className="border border-gray-300 p-7 rounded-md max-w-xlg w-full">
                <h2 className="text-3xl font-semibold text-center mb-6">Register</h2>

                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-200 rounded-md px-4 py-3 mb-4 focus:outline-blue-400"
                />

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

                <p className="text-gray-600 text-sm leading-6 mb-5">
                    Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our
                    <span className="text-blue-600 cursor-pointer"> privacy policy.</span>
                </p>

                <button
                    onClick={handleRegister}
                    className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700"
                >
                    REGISTER
                </button>

            </div>
        </div>
    );
}

export default Register;
