import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiMapPin } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";

function Destination() {
    const [regions, setRegions] = useState([]);
    const [activeRegion, setActiveRegion] = useState(null);

    useEffect(() => {
        const loadRegions = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/get_region");
                const regionData = res.data.data;

                setRegions(regionData);

                if (regionData.length > 0) {
                    setActiveRegion(regionData[0].region_id);
                }
            } catch (error) {
                console.log(error);
            }
        };
        loadRegions();
    }, []);



    const handleRegionClick = (regionId) => {
        setActiveRegion(regionId);
    };

    const activeRegionData = regions.find(
        (r) => r.region_id === activeRegion
    );

    const destinations = activeRegionData?.destinations || [];

    return (
        <div className="px-5 mt-20">

            <motion.div
                initial={{ opacity: 0, y: -40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7 }}
            >
                <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-bold">
                    Featured Destinations
                </h2>

                <div className="w-full mt-7 pb-3 overflow-x-auto">
                    <div className="flex gap-4 justify-center min-w-fit mx-auto">
                        {regions.map((region) => (
                            <motion.button
                                key={region.region_id}
                                onClick={() => handleRegionClick(region.region_id)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-6 py-2 rounded-full border border-gray-200 text-sm whitespace-nowrap 
                               ${activeRegion === region.region_id
                                        ? "bg-[#1881FE] text-white"
                                        : "bg-gray-100 text-gray-700"
                                    }`}
                            >
                                {region.name}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </motion.div>



            <div className="cursor-hide px-4 md:px-10 mt-16">
                <div className="container mx-auto">

                    {destinations.length === 0 && (
                        <p className="text-center text-gray-500 text-lg py-10">
                            Sorry, we could not find destinations for this region.
                        </p>
                    )}

                    {destinations.length > 0 && (
                        <Swiper
                            slidesPerView={4}
                            spaceBetween={20}
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: false,
                            }}
                            speed={1500}
                            pagination={{ clickable: true }}
                            breakpoints={{
                                0: { slidesPerView: 1 },
                                480: { slidesPerView: 1.2 },
                                640: { slidesPerView: 2 },
                                900: { slidesPerView: 3 },
                                1200: { slidesPerView: 4 },
                            }}
                            modules={[Autoplay, Pagination]}
                            className="mySwiper mt-10 pb-10"
                        >
                            {destinations.map((item) => (
                                <SwiperSlide key={item.id} className="!h-[280px]">
                                    <div className="cursor-pointer rounded-xl overflow-hidden group h-full">

                                        <div
                                            className="overflow-hidden rounded-xl transition-all duration-500 
                                       h-[220px] group-hover:h-[155px]"
                                        >
                                            <img
                                                src={item.images[0]}
                                                alt={item.country_name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <div className="mt-2 flex items-center justify-center gap-2 px-2">
                                            <FiMapPin className="text-black text-lg" />
                                            <h3 className="font-bold text-base md:text-lg text-center">
                                                {item.country_name}
                                            </h3>
                                        </div>

                                        <div
                                            className="
                                         text-center text-gray-600 text-sm 
                                         max-h-0 opacity-0 overflow-hidden 
                                         group-hover:max-h-40 group-hover:opacity-100 
                                         transition-all duration-500
                                       "
                                        >
                                            <p>{item.tours} tours | {item.departures} departure</p>
                                            <p>{item.guests_travelled.toLocaleString()} guest travelled.</p>
                                        </div>

                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}

                </div>
            </div>

        </div>
    );
}

export default Destination;
