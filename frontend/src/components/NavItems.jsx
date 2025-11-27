import { useEffect, useState } from "react";
import axios from "axios";
import { IoMdArrowDropdown } from "react-icons/io";
import { motion } from 'framer-motion'

export default function NavItems() {
    const [regions, setRegions] = useState([]);

    useEffect(() => {
        const fetchRegions = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/get_region");
                setRegions(res.data.data);
            } catch (err) {
                console.log("Region Fetch Error:", err);
            }
        };
        fetchRegions();
    }, []);

    const current = window.location.pathname;


    return (
        <ul className="hidden lg:flex font-semibold items-center gap-10 text-[15px]">

            {/* home */}
            <li
                onClick={() => (window.location.href = "/")}
                className={`cursor-pointer hover:text-blue-500 
            ${current === "/" ? "text-blue-500" : ""}
        `}
            >
                Home
            </li>

            {/* destinations */}
            <li
                className={`relative group cursor-pointer 
            ${current.startsWith("/destination") || current === "/destinations"
                        ? "text-blue-500"
                        : ""}
        `}
            >
                <div className="flex items-center gap-1 hover:text-blue-500">
                    Destinations <IoMdArrowDropdown size={18} />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="
                absolute -left-55 top-9.5 w-screen
                z-500 pointer-events-none
            "
                >
                    <div
                        className="
                    bg-white shadow-xl rounded-b-2xl pt-8 pb-10
                    opacity-0 invisible group-hover:opacity-100 group-hover:visible
                    transition-all duration-200
                    pointer-events-auto
                "
                    >
                        <div className="max-w-7xl mx-auto px-8">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">

                                {regions.map((region) => (
                                    <div key={region.region_id}>
                                        <h3 className="font-bold text-lg mb-4">{region.name}</h3>

                                        <div className="flex flex-col gap-3">
                                            {region.destinations?.map((country) => (
                                                <p
                                                    key={country.id}
                                                    onClick={() =>
                                                        (window.location.href = `/destination/${country.slug}`)
                                                    }
                                                    className="cursor-pointer text-gray-700 hover:text-blue-600 text-sm"
                                                >
                                                    {country.country_name}
                                                </p>
                                            ))}
                                        </div>

                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </motion.div>
            </li>

            {/* travel package */}
            <li
                onClick={() => (window.location.href = "/travel-package")}
                className={`cursor-pointer hover:text-blue-500 
            ${current === "/travel-package" ? "text-blue-500" : ""}
        `}
            >
                Travel Package
            </li>

            {/* visa */}
            <li
                onClick={() => (window.location.href = "/visa")}
                className={`cursor-pointer hover:text-blue-500 
            ${current === "/visa" ? "text-blue-500" : ""}
        `}
            >
                Visa
            </li>

            {/* pages */}
            <li className="relative group">

                <div
                    className={`flex items-center gap-1 cursor-pointer hover:text-blue-500 
                    ${current.startsWith("/pages") ? "text-blue-500" : ""}`}
                >
                    Pages <IoMdArrowDropdown size={18} />
                </div>

                {/* dropdown */}
                <div
                    className="
                     absolute left-0 top-full mt-3 
                     bg-white shadow-xl rounded-xl p-5
                     opacity-0 invisible group-hover:opacity-100 group-hover:visible
                     transition-all duration-200 z-50
                     w-52
                   "
                >
                    <div className="flex flex-col gap-5">
                        {[
                            { name: "About GoFly", link: "/pages/about" },
                            { name: "Destination", link: "/pages/destination" },
                            { name: "Experience", link: "/pages/experience" },
                            { name: "Hotel", link: "/pages/hotel" },
                            { name: "Travel Inspiration", link: "/pages/travel-inspiration" },
                            { name: "Guider", link: "/pages/guider" },
                            { name: "Shop", link: "/pages/shop" },
                            { name: "FAQ", link: "/pages/faq" },
                            { name: "404", link: "/pages/404" },
                        ].map((item, i) => (
                            <p
                                key={i}
                                onClick={() => (window.location.href = item.link)}
                                className={`cursor-pointer text-sm 
                                    ${current === item.link ? "text-blue-600 font-semibold" : "text-gray-700"} 
                                     hover:text-blue-600`
                                }
                            >
                                {item.name}
                            </p>
                        ))}
                    </div>

                </div>

            </li>

            {/* contact */}
            <li
                onClick={() => (window.location.href = "/contact")}
                className={`cursor-pointer hover:text-blue-500 
            ${current === "/contact" ? "text-blue-500" : ""}
        `}
            >
                Contact
            </li>

        </ul>

    );
}
