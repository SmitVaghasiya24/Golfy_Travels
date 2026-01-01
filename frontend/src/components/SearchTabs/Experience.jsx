import { FiMapPin, FiCalendar, FiList, FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Link } from "react-router-dom";
import { LuSparkles } from "react-icons/lu";
import API from "../../services/api";


export default function Experience() {
    const [destinations, setDestinations] = useState([]);
    const [selectedDestination, setSelectedDestination] = useState("");

    const [openDest, setOpenDest] = useState(false);
    const [open, setOpen] = useState(false);

    const [experiences, setExperiences] = useState([]);
    const [expSearch, setExpSearch] = useState("");
    const [openExp, setOpenExp] = useState(false);
    const [selectedExp, setSelectedExp] = useState("");


    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);

    useEffect(() => {
        API.get("/api/get_all_destination")
            .then((res) => setDestinations(res.data.destinations));
    }, []);



    useEffect(() => {
        API.get("/api/get_experience")
            .then(res => setExperiences(res.data.data))
            .catch(err => console.log(err));
    }, []);


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

                    {/* dropdown */}
                    <AnimatePresence>
                        {openDest && (
                            <motion.ul
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="scrollbar-thin absolute top-full left-0 right-0 bg-white shadow-md rounded-lg mt-2 z-50 max-h-60 overflow-auto"
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

                {/* experinece */}
                <div
                    className="relative border rounded-lg px-5 py-4 h-16 border-gray-300 flex items-center gap-3 cursor-pointer"
                    onClick={() => setOpenExp(!openExp)}
                >
                    <LuSparkles size={22} className="text-gray-500" />

                    <div className="flex flex-col leading-tight">
                        <p className="text-gray-500 text-sm">Select</p>
                        <p className="font-semibold">
                            {selectedExp || "Experience"}
                        </p>
                    </div>

                    <AnimatePresence>
                        {openExp && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute w-full bg-white shadow-md rounded-lg top-full mt-2 z-50 max-h-60 overflow-auto 
        scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
                            >
                                {/* search input */}
                                <div className="px-3 pb-2 sticky top-0 bg-white">
                                    <div className="relative">
                                        <FiSearch
                                            size={18}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Search experience..."
                                            className="w-full border-b border-gray-300 p-2 pl-10 text-sm focus:outline-none"
                                            value={expSearch}
                                            onChange={(e) => setExpSearch(e.target.value)}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </div>
                                </div>

                                {/* list */}
                                {experiences
                                    .filter((exp) =>
                                        exp.name.toLowerCase().includes(expSearch.toLowerCase())
                                    )
                                    .map((exp) => (
                                        <li
                                            key={exp.id}
                                            onClick={() => {
                                                setSelectedExp(exp.name);
                                                setOpenExp(false);
                                            }}
                                            className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                                        >
                                            {exp.name}
                                        </li>
                                    ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* date calendar */}
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

                {/* search butotn */}
                <button className="bg-[#1881FE] text-white flex items-center justify-center gap-2 rounded-lg text-lg font-semibold h-16">
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
