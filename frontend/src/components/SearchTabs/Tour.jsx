import { FiMapPin, FiCalendar, FiList, FiSearch } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function Tour() {

    const [destinations, setDestinations] = useState([]);
    const [tourTypes, setTourTypes] = useState([]);
    const [selectedDestination, setSelectedDestination] = useState("");
    const [selectedTourType, setSelectedTourType] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const dateRef = useRef();

    useEffect(() => {
        axios.get("http://localhost:5000/api/get_all_destination")
            .then(res => setDestinations(res.data.destinations));
    }, []);

    useEffect(() => {
        axios.get("http://localhost:5000/api/get_tour_types")
            .then(res => setTourTypes(res.data.data));
    }, []);

    const getDayName = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString("en-US", { weekday: "long" });
    };

    return (
        <div className=" bg-white rounded-xl shadow-lg px-6 py-14 flex flex-col 
                    relative z-50 -mt-8 ">

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-5">

                {/* Destination */}
                <div className="relative border rounded-lg px-5 py-4 h-20 flex items-center gap-3 cursor-pointer">
                    <FiMapPin size={22} className="text-gray-500 pointer-events-none" />

                    <div className="flex flex-col pointer-events-none">
                        <p className="text-gray-500 text-sm">Select</p>
                        <p className="font-semibold">{selectedDestination || "Destination"}</p>
                    </div>

                    <select
                        value={selectedDestination}
                        onChange={(e) => setSelectedDestination(e.target.value)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    >
                        <option value="">Destination</option>
                        {destinations.map((d) => (
                            <option key={d.id} value={d.country_name}>{d.country_name}</option>
                        ))}
                    </select>
                </div>

                {/* Date */}
                <div
                    className="relative border rounded-lg px-5 py-4 h-20 flex items-center gap-3 cursor-pointer"
                    onClick={() => dateRef.current.showPicker()}
                >
                    <FiCalendar size={22} className="text-gray-500 pointer-events-none" />

                    <div className="flex flex-col pointer-events-none">
                        <p className="text-gray-500 text-sm">
                            {selectedDate ? getDayName(selectedDate) : "Select"}
                        </p>
                        <p className="font-semibold">{selectedDate || "Date"}</p>
                    </div>

                    <input
                        ref={dateRef}
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="absolute inset-0 w-full h-full opacity-0"
                    />
                </div>

                {/* Tour Type */}
                <div className="relative border rounded-lg px-5 py-4 h-20 flex items-center gap-3 cursor-pointer">
                    <FiList size={22} className="text-gray-500 pointer-events-none" />

                    <div className="flex flex-col pointer-events-none">
                        <p className="text-gray-500 text-sm">Select</p>
                        <p className="font-semibold">{selectedTourType || "Tour Type"}</p>
                    </div>

                    <select
                        value={selectedTourType}
                        onChange={(e) => setSelectedTourType(e.target.value)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    >
                        <option value="">Tour Type</option>
                        {tourTypes.map((t) => (
                            <option key={t.id} value={t.name}>{t.name}</option>
                        ))}
                    </select>
                </div>

                {/* Search */}
                <button className="bg-blue-600 text-white flex items-center justify-center gap-2 rounded-lg text-lg font-semibold h-20">
                    <FiSearch size={20} /> SEARCH
                </button>

            </div>

            <p className="text-gray-600 text-sm">
                Can’t find what you're looking for? create your{" "}
                <span className="text-blue-600 cursor-pointer">Custom Itinerary</span>
            </p>
        </div>
    );
}
