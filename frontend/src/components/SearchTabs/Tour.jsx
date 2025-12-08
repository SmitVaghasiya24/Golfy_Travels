import { FiMapPin, FiCalendar, FiList, FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Link, useNavigate } from "react-router-dom";

export default function Tour() {
    const navigate = useNavigate();

    const [destinations, setDestinations] = useState([]);
    const [tourTypes, setTourTypes] = useState([]);
    const [selectedDestination, setSelectedDestination] = useState("");
    const [selectedTourType, setSelectedTourType] = useState("");

    const [openDest, setOpenDest] = useState(false);
    const [open, setOpen] = useState(false);
    const [openTour, setOpenTour] = useState(false);

    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/get_all_destination")
            .then((res) => setDestinations(res.data.destinations));
    }, []);

    useEffect(() => {
        axios.get("http://localhost:5000/api/get_tour_types")
            .then((res) => setTourTypes(res.data.data));
    }, []);


    const handleSearch = () => {
        const query = new URLSearchParams();

        if (selectedDestination) query.append("destination", selectedDestination);
        if (selectedTourType) query.append("tour_type", selectedTourType);

        navigate(`/tour?${query.toString()}`);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg px-6 pt-12 pb-7 flex flex-col relative z-50 -mt-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-5">

                {/* destinaiton */}
                <div
                    className="relative border rounded-lg px-5 py-4 h-16 border-gray-300 flex items-center gap-3 cursor-pointer"
                    onClick={() => setOpenDest(!openDest)}
                >
                    <FiMapPin size={22} className="text-gray-600" />

                    <div className="flex flex-col">
                        <p className="text-gray-500 text-sm">Select</p>
                        <p className="font-semibold">
                            {selectedDestination || "Destination"}
                        </p>
                    </div>

                    <AnimatePresence>
                        {openDest && (
                            <motion.ul
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className=" scrollbar-thin absolute top-full left-0 right-0 bg-white shadow-md rounded-lg mt-2 z-50 max-h-60 overflow-auto"
                            >
                                {destinations.map((d) => (
                                    <li
                                        key={d.id}
                                        onClick={() => {
                                            setSelectedDestination(d.country_name);
                                            setOpenDest(false);
                                        }}
                                        className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                                    >
                                        {d.country_name}
                                    </li>
                                ))}
                            </motion.ul>
                        )}
                    </AnimatePresence>
                </div>

                {/* calendar */}
                <div className="relative">
                    <div
                        className="border border-gray-300 rounded-lg px-5 py-4 h-16 flex items-center gap-3 cursor-pointer"
                        onClick={() => setOpen(!open)}
                    >
                        <FiCalendar size={22} className="text-gray-600" />
                        <div className="flex flex-col">
                            <p className="text-gray-500 text-sm">Select</p>
                            <p className="font-semibold">
                                {range[0].startDate.toDateString()}
                            </p>
                        </div>
                    </div>

                    <AnimatePresence>
                        {open && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute mt-2 z-50 shadow-xl rounded-lg bg-white"
                            >
                                <Calendar
                                    date={range[0].startDate}
                                    onChange={(date) => {
                                        setRange([{ ...range[0], startDate: date, endDate: date }]);
                                    }}
                                    months={1}
                                    direction="vertical"
                                    showMonthAndYearPickers={true}
                                    minDate={new Date()}
                                    color="#2563EB"
                                />

                                <div className="flex justify-between px-4 py-3 border-t bg-gray-50">
                                    <button
                                        className="text-gray-600"
                                        onClick={() => setOpen(false)}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        className="bg-blue-600 text-white px-4 py-1 rounded"
                                        onClick={() => setOpen(false)}
                                    >
                                        Apply
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* tour type */}
                <div
                    className="relative border rounded-lg px-5 py-4 h-16 border-gray-300 flex items-center gap-3 cursor-pointer"
                    onClick={() => setOpenTour(!openTour)}
                >
                    <FiList size={22} className="text-gray-500" />

                    <div className="flex flex-col">
                        <p className="text-gray-500 text-sm">Select</p>
                        <p className="font-semibold">
                            {selectedTourType || "Tour Type"}
                        </p>
                    </div>

                    <AnimatePresence>
                        {openTour && (
                            <motion.ul
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute top-full left-0 right-0 bg-white shadow-md rounded-lg mt-2 z-50 max-h-60 overflow-auto"
                            >
                                {tourTypes.length === 0 && (
                                    <li className="px-4 py-3 text-gray-500">Loading...</li>
                                )}

                                {tourTypes.map((t) => (
                                    <li
                                        key={t.id}
                                        onClick={() => {
                                            setSelectedTourType(t.name);
                                            setOpenTour(false);
                                        }}
                                        className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                                    >
                                        {t.name}
                                    </li>
                                ))}
                            </motion.ul>
                        )}
                    </AnimatePresence>
                </div>

                {/* search button */}
                <button
                    onClick={handleSearch}
                    className="bg-[#1881FE] text-white flex cursor-pointer items-center justify-center gap-2 rounded-lg text-lg font-semibold h-16"
                >
                    <FiSearch size={20} /> SEARCH
                </button>
            </div>

            <p className="text-gray-600 text-sm">
                Can’t find what you're looking for? create your{" "}
                <Link
                    to="/contact"
                    className="text-blue-600 cursor-pointer relative inline-block
                   after:content-[''] after:absolute after:left-0 after:bottom-0
                   after:w-0 after:h-0.5 after:bg-blue-600
                   after:transition-all after:duration-600
                   hover:after:w-full"
                >
                    Custom Itinerary
                </Link>
            </p>
        </div>
    );
}
