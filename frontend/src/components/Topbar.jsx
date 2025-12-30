import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaUser, FaGlobe } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";

function Topbar() {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { userData, signupData } = useAuth();
    const [query, setQuery] = useState("");
    const [results, setResults] = useState({ hotels: [], tours: [] });
    const [showResults, setShowResults] = useState(false);
    const navigate = useNavigate();

    const handleSearch = async (value) => {
        setQuery(value);

        if (value.length < 2) {
            setShowResults(false);
            return;
        }

        try {
            const [tourRes, hotelRes] = await Promise.all([
                API.get(`/api/tours/filter?title=${value}`),
                API.get(`/api/hotels/filter?hotel_name=${value}`)
            ]);

            setResults({
                hotels: hotelRes.data.hotels || [],
                tours: tourRes.data.tours || [],
            });

            setShowResults(true);

        } catch (err) {
            console.error("Search Error:", err);
        }
    };


    const languages = [
        { code: "EN", label: "English", flag: "/language/eng.png" },
        { code: "NL", label: "Dutch", flag: "/language/dutch.png" },
        { code: "JP", label: "Japanese", flag: "/language/japan.png" },
        { code: "KR", label: "Korean", flag: "/language/koria.png" },
        { code: "CN", label: "Chinese", flag: "/language/china.png" },
    ];

    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <>
            <div className=" relative wrapper bg-white py-4 ">
                <div className="flex justify-between items-center w-full">

                    <div className="flex items-center gap-4 md:gap-10 w-full md:w-auto">
                        <a href="/">
                            <img
                                src="/logo.svg"
                                alt="logo"
                                className="cursor-hide h-10 md:h-12 object-contain"
                            />
                        </a>

                        <div className="hidden sm:block w-full md:w-[42vw] relative">
                            <div className="flex items-center bg-[#F0F0F0] rounded-full px-4 md:px-5 py-2.5 md:py-3 shadow-sm">
                                <FaSearch className="text-gray-500 text-lg" />
                                <input
                                    type="text"
                                    placeholder="Find Your Perfect Tour or Hotel"
                                    value={query}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    className="bg-transparent outline-none w-full ml-2 md:ml-3 text-gray-700 placeholder-gray-400"
                                />
                            </div>

                            {showResults && (
                                <div className="absolute left-0 top-full w-full bg-white shadow-xl rounded-2xl mt-2 p-2 max-h-96 overflow-y-auto z-50 border border-gray-200 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">

                                    {results.hotels.length > 0 && (
                                        <div className="mb-2">
                                            <p className="text-xs font-semibold text-gray-500 px-3 mb-1">Hotels</p>

                                            {results.hotels.map((hotel) => (
                                                <div
                                                    key={hotel.hotel_id}
                                                    onClick={() => {
                                                        navigate(`/pages/hotel/${hotel.slug}`);
                                                        setShowResults(false);
                                                        setQuery("");
                                                    }}
                                                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-100 cursor-pointer transition"
                                                >
                                                    <img
                                                        src={hotel.images?.[0] || "/placeholder.jpg"}
                                                        alt={hotel.hotel_name}
                                                        className="w-12 h-12 rounded-lg object-cover"
                                                    />
                                                    <div className="flex-1">
                                                        <p className="font-medium text-gray-800 leading-tight">
                                                            {hotel.hotel_name}
                                                        </p>
                                                        <p className="text-xs text-gray-500">{hotel.city}, {hotel.country}</p>
                                                    </div>
                                                    <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-1 rounded-full">Hotel</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {results.tours.length > 0 && (
                                        <div className="mt-2">
                                            <p className="text-xs font-semibold text-gray-500 px-3 mb-1">Tours</p>

                                            {results.tours.map((tour) => (
                                                <div
                                                    key={tour.tour_id}
                                                    onClick={() => {
                                                        navigate(`/tour/${tour.slug}`);
                                                        setShowResults(false);
                                                        setQuery("");
                                                    }}
                                                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-100 cursor-pointer transition"
                                                >
                                                    <img
                                                        src={tour.thumbnail || "/placeholder.jpg"}
                                                        alt={tour.title}
                                                        className="w-12 h-12 rounded-lg object-cover"
                                                    />

                                                    <div className="flex-1">
                                                        <p className="font-medium text-gray-800 leading-tight">{tour.title}</p>

                                                        <p className="text-xs text-gray-500">
                                                            {tour.discount_price > 0 ? (
                                                                <>
                                                                    <span className="line-through text-gray-400 mr-1">₹{tour.price}</span>
                                                                    <span className="text-blue-600 font-semibold">₹{tour.discount_price}</span>
                                                                </>
                                                            ) : (
                                                                <span className="text-blue-600 font-semibold">₹{tour.price}</span>
                                                            )}
                                                        </p>
                                                    </div>

                                                    <span className="text-[10px] bg-green-100 text-green-600 px-2 py-1 rounded-full">Tour</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {results.hotels.length === 0 && results.tours.length === 0 && (
                                        <p className="text-center text-gray-500 py-4 text-sm">No results found</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-4 md:gap-6">
                        <a
                            onClick={() => navigate(`/contact`)}
                            className="cursor-hide text-blue-600 cursor-pointer font-medium hover:text-blue-700 hidden sm:block">
                            Need Help?
                        </a>

                        <span className="text-gray-300 hidden sm:block">|</span>

                        <div className="relative" ref={dropdownRef}>
                            <div
                                onClick={() => setOpen(!open)}
                                className="flex items-center gap-1 md:gap-2 cursor-pointer text-gray-700 hover:text-black select-none text-sm md:text-base"
                            >
                                <FaGlobe className="text-lg" />
                                <span className="font-medium cursor-hide hidden sm:block">EN</span>
                                <MdArrowDropDown size={22} className="text-xl leading-none" />
                            </div>

                            <AnimatePresence>
                                {open && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                        transition={{ duration: 0.25, ease: "easeOut" }}
                                        className="absolute left-[-60px] mt-2 w-40 bg-[#FFFFFF] shadow-lg rounded-lg border border-gray-100 z-50"
                                    >
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                data-hide-cursor="true"
                                                className="cursor-hide flex items-center font-semibold gap-3 w-full px-3 py-3 text-gray-700 hover:bg-[#1881FE] hover:text-white text-sm"
                                                onClick={() => setOpen(false)}
                                            >
                                                <img src={lang.flag} alt={lang.label} className="w-5 h-5 rounded-sm" />
                                                {lang.label}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link to={"/my-account"}>
                            <button className="cursor-hide relative overflow-hidden group text-white py-2 px-5 rounded-xl flex items-center bg-black gap-2 text-sm md:text-base">
                                <span className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>

                                <span className="relative flex items-center gap-2 z-10">
                                    <FaUser />
                                    <span className="font-medium hidden md:block">
                                        {userData || signupData ? "My Account" : "Login"}
                                    </span>
                                </span>
                            </button>
                        </Link>

                    </div>
                </div>

                <div className="block sm:hidden mt-4">
                    <div className="flex items-center bg-[#F0F0F0] rounded-full px-4 py-2.5 shadow-sm">
                        <FaSearch className="text-gray-500 text-lg" />
                        <input
                            type="text"
                            placeholder="Find Your Perfect Tour Package"
                            className="bg-transparent outline-none w-full ml-3 text-gray-700 placeholder-gray-400"
                        />
                    </div>
                </div>
            </div>

            <div className="w-full h-px bg-gray-200" />

        </>
    );
}

export default Topbar;
