import React, { useEffect, useState } from "react";
import BreadcrumbHero from "../../components/Breadcrumb";
import Filter from "./Filter";
import { useNavigate } from "react-router-dom";

function Hotel() {
    const [hotels, setHotels] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [openSort, setOpenSort] = useState(false);
    const [sortOption, setSortOption] = useState("default");
    const [filters, setFilters] = useState({});
    const [clearSignal, setClearSignal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetchHotels(page, sortOption);
    }, [page, sortOption, filters]);


    const fetchHotels = async (pageNum = 1, sort = sortOption) => {
        try {
            let url = `http://localhost:5000/api/hotels/filter?page=${pageNum}&limit=6`;

            if (filters.category) {
                url += `&category=${encodeURIComponent(filters.category)}`;
            }
            if (filters.tag) {
                url += `&tag_name=${encodeURIComponent(filters.tag)}`;
            }

            if (filters.min_price !== undefined) {
                url += `&min_price=${filters.min_price}`;
            }

            if (filters.max_price !== undefined) {
                url += `&max_price=${filters.max_price}`;
            }


            if (filters.amenities) {
                url += `&amenities=${encodeURIComponent(filters.amenities)}`;
            }


            if (sort !== "default") {
                url += `&sort=${sort}`;
            }

            const res = await fetch(url);
            const data = await res.json();

            if (data.success) {
                setHotels(data.hotels);
                setTotalPages(data.totalPages || 1);
            }

        } catch (err) {
            console.log("Hotel fetch error:", err);
        }
    };


    const handleFilterChange = (newFilter) => {
        setFilters(prev => ({ ...prev, ...newFilter }));
        setPage(1);
    };

    const handleClearAll = () => {
        setFilters({});
        setSortOption("default");
        setPage(1);

        setClearSignal(prev => prev + 1);
    };


    const sortItems = [
        { label: "Default", value: "default" },
        { label: "Low to High", value: "price_low" },
        { label: "High to Low", value: "price_high" },
        { label: "Newest", value: "latest" }
    ];

    return (
        <div>
            <BreadcrumbHero title="Hotel" background="/breadcrumb.jpeg" />

            <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-6 gap-10 items-start">

                <div className="lg:col-span-2 border border-gray-300 p-6 rounded-2xl">
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
                    <Filter onFilterChange={handleFilterChange} clearSignal={clearSignal} />

                </div>


                <div className="lg:col-span-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white border border-gray-200 rounded-2xl p-4 mb-6 gap-4">

                        <h3 className="text-lg font-semibold">
                            {hotels.length}
                            <span className="font-normal text-gray-600"> Unforgettable Journeys Await!</span>
                        </h3>

                        <div className="flex items-center sm:justify-end gap-2 w-full sm:w-auto">

                            <span className="text-gray-500 whitespace-nowrap">Sort By:</span>

                            <div className="relative w-full sm:w-auto">
                                <button
                                    onClick={() => setOpenSort(!openSort)}
                                    className="bg-white border border-gray-300 px-4 py-2 rounded-xl text-sm font-medium 
                flex items-center justify-between w-full sm:w-40"
                                >
                                    {sortItems.find(i => i.value === sortOption)?.label}
                                    <span className={`transition ${openSort ? "rotate-180" : ""}`}>▼</span>
                                </button>

                                {openSort && (
                                    <ul
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
                                    </ul>
                                )}
                            </div>

                        </div>
                    </div>


                    <div className="grid md:grid-cols-2 gap-10">

                        {hotels.map((hotel) => {
                            const finalPrice =
                                parseFloat(hotel.discount_price) > 0
                                    ? hotel.discount_price
                                    : hotel.price;

                            return (
                                <div
                                    key={hotel.hotel_id}
                                    className="border border-gray-200 rounded-2xl overflow-hidden bg-white transition-all p-4"
                                >
                                    <div
                                        onClick={() => navigate(`/pages/hotel/${hotel.slug}`)}
                                        className="h-64 w-full rounded-xl overflow-hidden">
                                        <img
                                            src={hotel.images?.[0]}
                                            alt={hotel.hotel_name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="mt-4">

                                        <div className="flex items-center text-yellow-500 text-sm">
                                            <span className="flex gap-1">★ ★ ★ ★ ★</span>
                                            <span className="text-gray-600 ml-2">
                                                {hotel.review_count} reviews
                                            </span>
                                        </div>

                                        <h3 className="text-2xl font-semibold mt-2">
                                            {hotel.hotel_name}
                                        </h3>

                                        <div className="flex items-center text-gray-700 gap-2 mt-2 text-sm">
                                            <span className="text-lg">📍</span>
                                            <span>{hotel.country}</span>
                                            <span className="mx-1">→</span>
                                            <span>{hotel.city}</span>
                                            <a href="#" className="text-blue-600 text-sm ml-3">View Map ↗</a>
                                        </div>

                                        <div className="mt-4 bg-gray-100 rounded-xl px-5 py-4 text-gray-700 text-sm">
                                            <div className="flex flex-wrap gap-x-6 gap-y-2">
                                                <p className="flex items-center gap-2">
                                                    <span className="text-blue-500">✔</span> Free Wi-Fi
                                                </p>
                                                <p className="flex items-center gap-2">
                                                    <span className="text-blue-500">✔</span> Air Conditioning
                                                </p>
                                                <p className="flex items-center gap-2">
                                                    <span className="text-blue-500">✔</span> Swimming Pool
                                                </p>
                                                <p className="flex items-center gap-2">
                                                    <span className="text-blue-500">✔</span> Laundry Services
                                                </p>
                                            </div>
                                        </div>

                                        <p className="flex items-center gap-2 text-blue-600 font-medium mt-3">
                                            <span className="text-blue-500">✔</span> Free Cancellation Policy
                                        </p>

                                        <div className="flex items-center justify-between mt-6">
                                            <button
                                                onClick={() => window.location.href = `/hotel/${hotel.slug}`}
                                                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-sm transition"
                                            >
                                                Book Now ↗
                                            </button>

                                            <div className="text-right">
                                                <p className="text-sm text-gray-600">Starting From</p>
                                                <p className="text-2xl font-bold">${finalPrice}</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            );
                        })}

                    </div>

                    <div className="flex justify-center items-center gap-3 mt-10">

                        {page > 1 && (
                            <button
                                onClick={() => setPage(page - 1)}
                                className="px-4 py-2 rounded-full border hover:bg-gray-100"
                            >
                                Prev
                            </button>
                        )}

                        <div className="flex gap-2">
                            {[...Array(totalPages)].map((_, i) => {
                                const pageNum = i + 1;
                                const isActive = page === pageNum;

                                return (
                                    <button
                                        key={i}
                                        onClick={() => setPage(pageNum)}
                                        className={`px-4 py-2 rounded-full border transition 
                        ${isActive ? "bg-blue-600 text-white border-blue-600" : "hover:bg-gray-100"}
                    `}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                        </div>

                        {page < totalPages && (
                            <button
                                onClick={() => setPage(page + 1)}
                                className="px-4 py-2 rounded-full border hover:bg-gray-100"
                            >
                                Next
                            </button>
                        )}

                    </div>


                </div>
            </div>
        </div>
    );
}

export default Hotel;
