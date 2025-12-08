import React, { useEffect, useState } from "react";
import BreadcrumbHero from "../../components/Breadcrumb";
import { FiMapPin } from "react-icons/fi";
import { MdArrowOutward, MdArrowBack, MdArrowForward } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import Filter from "./Filter";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


function Tour() {
    const [tours, setTours] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortOption, setSortOption] = useState("latest");
    const [openSort, setOpenSort] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [paramsLoaded, setParamsLoaded] = useState(false);




    const [filters, setFilters] = useState({
        region: [],
        destination: [],
        min_price: 0,
        max_price: 2000,
        tour_type: "",
        experience: [],
    });


    useEffect(() => {
        if (!paramsLoaded) return; 

        const fetchTours = async () => {
            let url = `http://localhost:5000/api/tours/filter?page=${page}&limit=6&sort=${sortOption}`;

            if (filters.region.length > 0)
                url += `&region=${filters.region.join(",")}`;

            if (filters.destination.length > 0)
                url += `&destination=${filters.destination.join(",")}`;

            if (filters.min_price !== undefined)
                url += `&min_price=${filters.min_price}`;

            if (filters.max_price !== undefined)
                url += `&max_price=${filters.max_price}`;

            if (filters.tour_type)
                url += `&tour_type=${filters.tour_type}`;

            if (filters.experience.length > 0)
                url += `&experience=${filters.experience.join(",")}`;

            try {
                const res = await fetch(url);
                const data = await res.json();

                if (data.success) {
                    setTours(data.tours);
                    setTotalPages(data.totalPages);
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchTours();
    }, [page, sortOption, filters, paramsLoaded]);



    const sortItems = [
        { value: "latest", label: "Default" },
        { value: "price_high", label: "Price High" },
        { value: "price_low", label: "Price Low" },
        { value: "featured", label: "Featured" }
    ];

    useEffect(() => {
        setPage(1);
    }, [filters, sortOption]);


    const handleClearAll = () => {
        setFilters({
            region: [],
            destination: [],
            min_price: 0,
            max_price: 2000,
            tour_type: "",
            experience: [],
        });
    };


    useEffect(() => {
        const params = new URLSearchParams(location.search);

        const destination = params.get("destination");
        const tour_type = params.get("tour_type");

        if (destination || tour_type) {
            setFilters(prev => ({
                ...prev,
                destination: destination ? [destination] : [],
                tour_type: tour_type || "",
            }));
        }
        setParamsLoaded(true);
    }, [location.search]);



    return (
        <div>
            <BreadcrumbHero title="Tour" background="/breadcrumb.jpeg" />

            <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-6 gap-10 items-start">

                {/* filter */}
                <div className="lg:col-span-2 border border-gray-300 p-6 rounded-2xl">

                    {/* top */}
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold">Filters</h3>

                        <button
                            onClick={handleClearAll}
                            className="text-sm text-[#525270] hover:text-red-500 font-semibold"
                        >
                            Clear All
                        </button>
                    </div>

                    <div className="-mx-6 h-px bg-gray-200"></div>
                    <Filter
                        filters={filters}
                        setFilters={setFilters}
                        maxPrice={2000}
                    />

                </div>


                {/* right */}
                <div className="lg:col-span-4">

                    {/* sort */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white border border-gray-200 rounded-2xl p-4 mb-6 gap-4">

                        <h3 className="text-lg font-semibold">
                            {tours.length}
                            <span className="font-normal text-gray-600"> Unforgettable Journey Await!</span>
                        </h3>

                        <div className="flex items-center sm:justify-end gap-2 w-full sm:w-auto">

                            <span className="text-gray-500 whitespace-nowrap">Sort By:</span>

                            <motion.div className="relative w-full sm:w-auto">
                                <button
                                    onClick={() => setOpenSort(!openSort)}
                                    className="bg-white border border-gray-300 px-4 py-2 rounded-xl text-sm font-medium 
                                    flex items-center justify-between w-full sm:w-40"
                                >
                                    {sortItems.find(i => i.value === sortOption)?.label}
                                    <span className={`transition ${openSort ? "rotate-180" : ""}`}>▼</span>
                                </button>

                                <AnimatePresence>
                                    {openSort && (
                                        <motion.ul
                                            initial={{ opacity: 0, y: -8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            className="absolute mt-2 w-full sm:w-40 bg-white border border-gray-300 rounded-xl shadow-lg z-50 overflow-hidden"
                                        >
                                            {sortItems.map(item => (
                                                <li
                                                    key={item.value}
                                                    onClick={() => {
                                                        setSortOption(item.value);
                                                        setOpenSort(false);
                                                    }}
                                                    className="px-4 py-2 text-sm hover:bg-blue-50 cursor-pointer"
                                                >
                                                    {item.label}
                                                </li>
                                            ))}
                                        </motion.ul>
                                    )}
                                </AnimatePresence>
                            </motion.div>

                        </div>
                    </div>


                    {/* tour */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {tours.map(tour => (
                            <div key={tour.tour_id} className="rounded-3xl p-2 border border-gray-200 bg-white shadow-sm">
                                <div
                                    onClick={() => navigate(`/tour/${tour.slug}`)}

                                    className="relative h-56 w-full overflow-hidden rounded-xl">
                                    <img
                                        src={tour.thumbnail}
                                        alt={tour.title}
                                        className="w-full cursor-pointer h-full object-cover transition-transform duration-500 hover:scale-110"
                                    />
                                    <p className="absolute top-3 right-3 bg-yellow-400 text-black text-sm font-semibold px-3 py-1 rounded-full shadow">
                                        {tour.tour_type_name}
                                    </p>
                                </div>

                                <div className="p-6">
                                    <h3
                                        className="text-xl font-semibold">{tour.title}</h3>

                                    <div className="flex font-semibold items-center gap-2 text-gray-600 text-sm mt-2">
                                        <FiMapPin />
                                        <span>{tour.countries || tour.region_name}</span>
                                        <span className="ml-2">⟷</span>
                                        <span>{tour.days} Days / {tour.nights} Nights</span>
                                    </div>

                                    <div className="flex items-end justify-between mt-5">
                                        <button className="relative overflow-hidden group text-white px-6 py-3 rounded-lg bg-[#2C88FE] text-sm">
                                            <span className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                                            <span className="relative z-10 flex items-center gap-2">Book Now <MdArrowOutward /></span>
                                        </button>

                                        <div className="text-right sm:text-right">
                                            <p className="text-gray-500 text-sm mb-1">per person</p>

                                            {parseFloat(tour.discount_price) > 0 ? (
                                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-1 sm:gap-2">

                                                    <p className="text-gray-400 line-through text-sm order-1 sm:order-1">
                                                        ${tour.price}
                                                    </p>

                                                    <p className="text-xl font-bold order-2 sm:order-2">
                                                        ${tour.discount_price}
                                                    </p>

                                                </div>
                                            ) : (
                                                <p className="text-xl font-bold">${tour.price}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="w-full flex items-center my-5">
                                        <div className="w-0 h-0 border-t-4 border-b-4 border-l-8 border-transparent border-l-gray-300"></div>
                                        <div className="flex-1 h-[1.5px] bg-gray-200"></div>
                                        <div className="w-0 h-0 border-t-4 border-b-4 border-r-8 border-transparent border-r-gray-300"></div>
                                    </div>

                                    <div className="flex justify-between text-sm text-gray-600">
                                        <p className="flex items-center gap-1"><span>🔹</span> Experience</p>
                                        <p className="flex items-center gap-1"><span>➕</span> Inclusion</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center items-center gap-6 mt-10">
                        {page > 1 && (
                            <button
                                onClick={() => setPage(page - 1)}
                                className="flex items-center gap-2 px-5 py-2.5 text-black rounded-full 
                                border border-gray-200 hover:bg-[#1881FE] hover:text-white transition-all"
                            >
                                <MdArrowBack /> Prev
                            </button>
                        )}

                        <div className="flex items-center gap-2">
                            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(num => (
                                <button
                                    key={num}
                                    onClick={() => setPage(num)}
                                    className={`w-10 h-10 flex items-center justify-center rounded-full border text-sm font-bold
                                        ${page === num ? "bg-[#1881FE] text-white" : "hover:bg-[#1881FE] hover:text-white"}`}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>

                        {page < totalPages && (
                            <button
                                onClick={() => setPage(page + 1)}
                                className="flex items-center gap-2 px-5 py-2.5 text-black rounded-full 
                                border border-gray-200 hover:bg-[#1881FE] hover:text-white transition-all"
                            >
                                Next <MdArrowForward />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tour;