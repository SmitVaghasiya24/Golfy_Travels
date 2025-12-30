import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdMyLocation } from "react-icons/md";
import API from "../services/api";


function TravelPackage() {
    const [destinations, setDestinations] = useState([]);
    const [openList, setOpenList] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState("Select Your Location");

    useEffect(() => {
        loadDestinations();
    }, []);

    const loadDestinations = async () => {
        try {
            const res = await API.get("/api/get_all_destination");
            if (res.data.success) {
                setDestinations(res.data.destinations);
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };

    const handleSelect = (item) => {
        setSelectedLocation(item.country_name);
        setOpenList(false);
    };

    return (
        <div className="container mx-auto px-4">
            <div className="relative rounded-2xl w-full mt-20 h-[550px] md:h-[450px]">

                <img
                    src="travel-pac.jpg"
                    alt="background"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/40"></div>

                <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">

                    <h2 className="text-center text-3xl md:text-4xl font-bold text-white">
                        Customize Your Travel Package!
                    </h2>

                    <div className="flex justify-center mt-10 w-full">
                        <div className="relative w-full max-w-3xl">
                            <div
                                onClick={() => setOpenList(!openList)}
                                className="flex items-center justify-between bg-white rounded px-6 py-4 cursor-pointer shadow-lg"
                            >
                                <div className="flex items-center gap-2">
                                    <MdMyLocation />
                                    <span className="text-gray-600 font-medium">{selectedLocation}</span>
                                </div>

                                <span className="text-blue-600 font-semibold">Search Now</span>
                            </div>


                            {openList && (
                                <div className="absolute w-full bg-white mt-2 shadow-lg z-50 p-4 ">

                                    {destinations.map((item) => (

                                        <div
                                            key={item.id}
                                            onClick={() => handleSelect(item)}
                                            className="flex items-center gap-4 p-3 rounded-lg cursor-pointer 
                                            transition-all duration-600 hover:bg-blue-500 hover:text-white"
                                        >

                                            <div>
                                                <h4 className="font-semibold">{item.country_name}</h4>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 mt-10 text-white font-medium">

                        <div className="flex items-center gap-3">
                            <div className="w-5.5 h-5.5 flex items-center justify-center rounded-full bg-white text-black text-sm">
                                <FaCheck />
                            </div>
                            <p>Make Your Favourite Package</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-5.5 h-5.5 flex items-center justify-center rounded-full bg-white text-black text-sm">
                                <FaCheck />
                            </div>
                            <p>Easily Customize Tours</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-5.5 h-5.5 flex items-center justify-center rounded-full bg-white text-black text-sm">
                                <FaCheck />
                            </div>
                            <p>Enjoy Your Trip</p>
                        </div>

                    </div>


                    <div className="flex justify-center mt-10">
                        <button className="bg-white text-gray-900 py-3 px-12 rounded-full shadow font-semibold">
                            Meet Our Local Tour Guider! <span className="text-blue-600">Contact Now ↗</span>
                        </button>
                    </div>

                </div>
            </div>
        </div>

    );
}

export default TravelPackage;
