import React, { useState } from "react";
import BreadcrumbHero from "../components/Breadcrumb";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Myaccount() {
    const [showPass1, setShowPass1] = useState(false);
    const [showPass2, setShowPass2] = useState(false);

    return (
        <div>
            <BreadcrumbHero title="My Account" background="/breadcrumb.jpeg" />

            <div className="wrapper py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 justify-center">

                    {/* login */}
                    <div className="border border-gray-300 rounded-md p-8 w-[450px] mx-auto">
                        <h2 className="text-3xl font-semibold text-center mb-6">Sign In</h2>

                        <input
                            type="text"
                            placeholder="User name or Email *"
                            className="w-full border border-gray-200 rounded-md px-4 py-3 mb-4 focus:outline-blue-400"
                        />

                        <div className="relative mb-4">
                            <input
                                type={showPass1 ? "text" : "password"}
                                placeholder="Password"
                                className="w-full border border-gray-200 rounded-md px-4 py-3 pr-12 focus:outline-blue-400"
                            />
                            <span
                                className="absolute right-4 top-3.5 cursor-pointer text-gray-600"
                                onClick={() => setShowPass1(!showPass1)}
                            >
                                {showPass1 ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>

                        <div className="flex items-center gap-3 mb-4">
                            <button className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700">
                                LOG IN
                            </button>

                            <label className="flex items-center gap-2 text-gray-700">
                                <input type="checkbox" />
                                Remember me
                            </label>
                        </div>

                        <a className="text-blue-600 hover:underline cursor-pointer">
                            Lost your password?
                        </a>
                    </div>

                    {/* register */}
                    <div className="border border-gray-300 rounded-md p-8 w-[450px] mx-auto">
                        <h2 className="text-3xl font-semibold text-center mb-6">Register</h2>

                        <input
                            type="email"
                            placeholder="Email address"
                            className="w-full border border-gray-200 rounded-md px-4 py-3 mb-4 focus:outline-blue-400"
                        />

                        <div className="relative mb-4">
                            <input
                                type={showPass2 ? "text" : "password"}
                                placeholder="Password"
                                className="w-full border border-gray-200 rounded-md px-4 py-3 pr-12 focus:outline-blue-400"
                            />
                            <span
                                className="absolute right-4 top-3.5 cursor-pointer text-gray-600"
                                onClick={() => setShowPass2(!showPass2)}
                            >
                                {showPass2 ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>

                        <p className="text-gray-600 text-sm leading-6 mb-5">
                            Your personal data will be used to support your experience
                            throughout this website, to manage access to your account,
                            and for other purposes described in our{" "}
                            <span className="text-blue-600 cursor-pointer">privacy policy.</span>
                        </p>

                        <button className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700">
                            REGISTER
                        </button>
                    </div>

                </div>
            </div>



        </div>
    );
}

export default Myaccount;
