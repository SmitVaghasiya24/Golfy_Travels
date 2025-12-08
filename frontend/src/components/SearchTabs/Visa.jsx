import { FiMapPin, FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import "react-date-range/dist/theme/default.css";
import { MdOutlineAssignmentInd } from "react-icons/md";
import { FaGlobeAmericas } from "react-icons/fa";
import { AiOutlineGlobal } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

export default function Hotel() {

    const [visaCountries, setVisaCountries] = useState([]);
    const [selectedVisaCountry, setSelectedVisaCountry] = useState("");
    const [visaSearch, setVisaSearch] = useState("");
    const [openVisa, setOpenVisa] = useState(false);

    const [visaTypesUnique, setVisaTypesUnique] = useState([]);
    const [selectedType, setSelectedType] = useState("");
    const [openType, setOpenType] = useState(false);
    const [citizenSearch, setCitizenSearch] = useState("");

    const [openCitizen, setOpenCitizen] = useState(false);
    const [selectedCitizen, setSelectedCitizen] = useState("");

    const [openLocation, setOpenLocation] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState("");
    const [locationSearch, setLocationSearch] = useState("");

    const navigate = useNavigate();


    useEffect(() => {
        axios
            .get("http://localhost:5000/api/get_visa_country")
            .then((res) => setVisaCountries(res.data.data))
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        axios.get("http://localhost:5000/api/get_all_visa_types")
            .then((res) => {
                const all = res.data.data;

                const unique = [...new Set(all.map(item => item.type_name))];

                setVisaTypesUnique(unique);
            })
            .catch((err) => console.log(err));
    }, []);


    return (
        <div className="bg-white rounded-xl shadow-lg px-6 pt-12 pb-7 flex flex-col relative -mt-8 z-50">

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-5">

                { /* visa country */}
                <div
                    className="relative w-full border rounded-lg px-5 py-4 h-16 border-gray-300 flex items-center gap-3 cursor-pointer"
                    onClick={() => setOpenVisa(!openVisa)}
                >
                    <FiMapPin size={22} className="text-gray-600" />

                    <div className="flex flex-col leading-tight">
                        <p className="text-gray-500 text-sm">Select Destination</p>
                        <p className="font-semibold">
                            {selectedVisaCountry || "Country"}
                        </p>
                    </div>

                    <AnimatePresence>
                        {openVisa && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute top-full left-0 right-0 bg-white shadow-md rounded-lg mt-2 z-50 max-h-80 overflow-auto p-2"
                            >
                                {/* Search bar */}
                                <div className="px-3 pb-2 sticky top-0 bg-white">
                                    <div className="relative">
                                        <FiSearch
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                            size={18}
                                        />

                                        <input
                                            type="text"
                                            className="w-full border-b border-gray-300 p-2 pl-10 rounded-none text-sm focus:outline-none"
                                            placeholder="Search country..."
                                            value={visaSearch}
                                            onChange={(e) => setVisaSearch(e.target.value)}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </div>
                                </div>

                                {/* visa country */}
                                {visaCountries
                                    .filter((item) =>
                                        item.country.toLowerCase().includes(visaSearch.toLowerCase())
                                    )
                                    .map((item) => (
                                        <div
                                            key={item.visa_id}
                                            onClick={() => {
                                                setSelectedVisaCountry(item.country);
                                                setOpenVisa(false);
                                                setVisaSearch("");
                                            }}
                                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer"
                                        >
                                            <img
                                                src={item.thumbnail}
                                                alt={item.country}
                                                className="w-7 h-7 rounded-full object-cover"
                                            />

                                            <div>
                                                <p className="font-semibold">{item.country}</p>
                                            </div>
                                        </div>
                                    ))}

                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>


                {/* visa category */}
                <div className="relative w-full border rounded-lg px-5 py-4 h-16 
                flex items-center gap-3 cursor-pointer border-gray-300"
                    onClick={() => setOpenType(!openType)}
                >
                    <MdOutlineAssignmentInd size={22} className="text-gray-600" />

                    <div className="flex flex-col leading-tight">
                        <p className="text-gray-500 text-sm">Visa Type</p>
                        <p className="font-semibold">
                            {selectedType || "Select Type"}
                        </p>
                    </div>

                    <AnimatePresence>
                        {openType && (
                            <motion.ul
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute w-full bg-white shadow-md rounded-lg top-full mt-2 z-50 max-h-80 overflow-auto"
                            >

                                {visaTypesUnique.map((type, idx) => (
                                    <li
                                        key={idx}
                                        onClick={() => {
                                            setSelectedType(type);
                                            setOpenType(false);
                                        }}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                        {type}
                                    </li>
                                ))}
                            </motion.ul>
                        )}
                    </AnimatePresence>
                </div>


                {/* Citizenship */}
                <div className="relative w-full">
                    <div
                        className="border border-gray-300 rounded-lg px-5 py-4 h-16 flex items-center gap-3 cursor-pointer bg-white hover:border-blue-500 transition"
                        onClick={() => setOpenCitizen(!openCitizen)}
                    >
                        <FaGlobeAmericas size={22} className="text-gray-600" />

                        <div className="flex flex-col leading-tight">
                            <span className="text-gray-500 text-sm">Select</span>
                            <span className="font-semibold">
                                {selectedCitizen || "Citizenship"}
                            </span>
                        </div>
                    </div>

                    <AnimatePresence>
                        {openCitizen && (
                            <motion.ul
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute w-full bg-white shadow-md rounded-lg top-full mt-2 z-50 max-h-60 overflow-auto 
                                scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
                            >

                                {/* search bar */}
                                <div className="px-3 py-2 sticky top-0 bg-white ">
                                    <div className="relative">
                                        <FiSearch
                                            size={16}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            value={citizenSearch}
                                            onChange={(e) => setCitizenSearch(e.target.value)}
                                            className="w-full border-b border-gray-300 p-2 pl-10 rounded-none text-sm focus:outline-none"
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </div>
                                </div>

                                {[
                                    "American",
                                    "Australian",
                                    "Brazilian",
                                    "Canadian",
                                    "Chinese",
                                    "Indian",
                                    "Japanese",
                                    "Pakistani",
                                    "Russian"
                                ]
                                    .filter((item) =>
                                        item.toLowerCase().includes(citizenSearch.toLowerCase())
                                    )
                                    .map((citizen, idx) => (
                                        <li
                                            key={idx}
                                            onClick={() => {
                                                setSelectedCitizen(citizen);
                                                setOpenCitizen(false);
                                                setCitizenSearch("");
                                            }}
                                            className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                                        >
                                            {citizen}
                                        </li>
                                    ))}
                            </motion.ul>
                        )}
                    </AnimatePresence>
                </div>



                {/* current location */}
                <div
                    className="relative w-full border rounded-lg px-5 py-4 h-16 border-gray-300 flex items-center gap-3 cursor-pointer"
                    onClick={() => setOpenLocation(!openLocation)}
                >
                    <AiOutlineGlobal size={22} className="text-gray-600" />

                    <div className="flex flex-col leading-tight">
                        <span className="text-gray-500 text-sm">Select</span>
                        <span className="font-semibold">
                            {selectedLocation || "Current Location"}
                        </span>
                    </div>

                    <AnimatePresence>
                        {openLocation && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute top-full left-0 right-0 bg-white shadow-md rounded-lg mt-2 z-50 max-h-60 overflow-auto 
        scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
                            >
                                {/* search bar */}
                                <div className="px-3 pb-2 sticky top-0 bg-white">
                                    <div className="relative">
                                        <FiSearch
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                            size={18}
                                        />
                                        <input
                                            type="text"
                                            className="w-full border-b border-gray-300 p-2 pl-10 text-sm focus:outline-none"
                                            placeholder="Search location..."
                                            value={locationSearch}
                                            onChange={(e) => setLocationSearch(e.target.value)}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </div>
                                </div>

                                {[
                                    "Australia",
                                    "Bangladesh",
                                    "Brazil",
                                    "Canada",
                                    "India",
                                    "Japan",
                                    "United Kingdom",
                                    "United States",
                                ]
                                    .filter((item) =>
                                        item.toLowerCase().includes(locationSearch.toLowerCase())
                                    )
                                    .map((country, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => {
                                                setSelectedLocation(country);
                                                setOpenLocation(false);
                                                setLocationSearch("");
                                            }}
                                            className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                                        >
                                            {country}
                                        </div>
                                    ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>


                {/* search button */}
                <button
                    onClick={() => navigate(`/visa`)}
                    className="bg-[#1881FE] text-white cursor-pointer flex items-center justify-center gap-2 rounded-lg text-lg font-semibold h-16">
                    <FiSearch size={20} /> SEARCH
                </button>
            </div>

            <p className="text-gray-600 text-sm">
                Can’t find what you're looking for? create your{" "}
                <Link
                    to="/contact"
                    className="text-blue-600 cursor-pointer relative inline-block
                   after:content-[''] after:absolute after:left-0 after:bottom-0
                   after:w-0 after:h-[2px] after:bg-blue-600
                   after:transition-all after:duration-600
                   hover:after:w-full"
                >
                    Custom Itinerary
                </Link>
            </p>
        </div>
    );
}
