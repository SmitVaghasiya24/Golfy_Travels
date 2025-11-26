import React from "react";
import { FiMail, FiPhoneCall, FiMessageCircle } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import axios from "axios";
import { useState, useEffect } from "react";

function Footer() {
    const [whatsapp, setWhatsapp] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        const fetchContactInfo = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/get_contact_info");
                setWhatsapp(res.data.data.whatsapp_number);
                setEmail(res.data.data.email);
            } catch (err) {
                console.log("Error fetching contact info:", err);
            }
        };

        fetchContactInfo();
    }, []);

    return (
        <footer className="bg-[#0c0c0c] text-white pt-16 pb-10">

            <div className="w-full">
                <div
                    className="wrapper mx-auto px-5 sm:px-0 
                      grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 
                      gap-10 pb-8 border-b border-gray-700"
                >
                    <div className="flex items-center gap-4">
                        <FiMessageCircle size={36} className="text-blue-400" />
                        <div>
                            <p className="text-lg font-semibold">To More Inquiry</p>
                            <p className="text-gray-400 text-sm">Don’t hesitate Call to GoFly.</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <FaWhatsapp size={36} className="text-green-500" />
                        <div>
                            <p className="text-lg font-semibold">WhatsApp</p>
                            <p className="text-gray-400 text-sm">
                                {whatsapp ? `+91 ${whatsapp}` : "Loading..."}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <FiMail size={36} className="text-blue-300" />
                        <div>
                            <p className="text-lg font-semibold">Mail Us</p>
                            <p className="text-gray-400 text-sm">{email || "Loading..."}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <FiPhoneCall size={36} className="text-blue-400" />
                        <div>
                            <p className="text-lg font-semibold">Call Us</p>
                            <p className="text-gray-400 text-sm">
                                {whatsapp ? `+91 ${whatsapp}` : "Loading..."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="wrapper mx-auto mt-5 px-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 
               gap-16 pt-10">

                <div className="space-y-5">
                    <h2 className="text-3xl font-semibold">GoFly Travel.co</h2>

                    <p className="text-gray-400 text-sm leading-relaxed">
                        Skyline Plaza, 5th Floor, 123 Main Street<br />
                        Los Angeles, CA 90001, USA
                    </p>

                    <div className="flex gap-5 pt-2">
                        <FaFacebookF className="hover:text-blue-500 cursor-pointer transition" size={20} />
                        <FaTwitter className="hover:text-blue-400 cursor-pointer transition" size={20} />
                        <FaYoutube className="hover:text-red-500 cursor-pointer transition" size={20} />
                        <FaLinkedinIn className="hover:text-blue-600 cursor-pointer transition" size={20} />
                    </div>

                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                        className="w-40 pt-2 cursor-pointer"
                    />
                </div>

                <div>
                    <h3 className="font-semibold text-xl mb-5">Top Destinations</h3>
                    <ul className="text-gray-400 text-sm space-y-3">
                        <li className="hover:text-white transition cursor-pointer">Maldives Tour</li>
                        <li className="hover:text-white transition cursor-pointer">Bali, Indonesia Tour</li>
                        <li className="hover:text-white transition cursor-pointer">Thailand Tour</li>
                        <li className="hover:text-white transition cursor-pointer">Hawaii, USA Tour</li>
                        <li className="hover:text-white transition cursor-pointer">Switzerland Tour</li>
                        <li className="hover:text-white transition cursor-pointer">New Zealand Tour</li>
                        <li className="hover:text-white transition cursor-pointer">Paris, France Tour</li>
                        <li className="hover:text-white transition cursor-pointer">Rome, Italy Tour</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-xl mb-5">Popular Searches</h3>
                    <ul className="text-gray-400 text-sm space-y-3">
                        <li className="hover:text-white cursor-pointer transition">Adventure</li>
                        <li className="hover:text-white cursor-pointer transition">Holiday Packages</li>
                        <li className="hover:text-white cursor-pointer transition">Flights & Hotels</li>
                        <li className="hover:text-white cursor-pointer transition">Honeymoon Trip</li>
                        <li className="hover:text-white cursor-pointer transition">Desert Safari</li>
                        <li className="hover:text-white cursor-pointer transition">Summer Vacation</li>
                        <li className="hover:text-white cursor-pointer transition">Wildlife Safari</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-xl mb-5">Resources</h3>
                    <ul className="text-gray-400 text-sm space-y-3">
                        <li className="hover:text-white transition cursor-pointer">About GoFly</li>
                        <li className="hover:text-white transition cursor-pointer">Visa Processing</li>
                        <li className="hover:text-white transition cursor-pointer">Traveler Reviews</li>
                        <li className="hover:text-white transition cursor-pointer">Customize Tour</li>
                        <li className="hover:text-white transition cursor-pointer">Terms & Condition</li>
                        <li className="hover:text-white transition cursor-pointer">Sitemap</li>
                    </ul>
                </div>

            </div>

            <div className="container mx-auto px-4">
                <div className=" border-t border-gray-700 mt-16 pt-6 text-gray-500 text-sm flex flex-col md:flex-row items-center md:items-between justify-between gap-4 "
                >
                    <p className="text-center md:text-left">
                        © 2025 GoFly. All Rights Reserved.
                    </p>

                    <div className="flex justify-center md:justify-end gap-6 opacity-90">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Mastercard-logo.png/90px-Mastercard-logo.png"
                            className="h-6"
                        />
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                            className="h-6"
                        />
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                            className="h-6"
                        />
                    </div>

                </div>
            </div>

        </footer>

    );
}

export default Footer;
