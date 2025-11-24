import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";

function DiscoutBanners() {
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        const loadBanners = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/get_all_discount");
                if (res.data.success) {
                    setBanners(res.data.data);
                }
            } catch (err) {
                console.log("Error fetching banners:", err);
            }
        };

        loadBanners();
    }, []);


    return (
        <div className="px-10 mt-20 mb-14">
            <div className="container  lg:pr-35">

                <motion.div
                    initial={{ opacity: 0, y: -40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                    className="mb-10"
                >
                    <h2 className="text-center text-5xl mb-5 font-bold">
                        Discounts & Offers
                    </h2>

                    <p className="text-center max-w-xl mx-auto text-gray-700 mt-2">
                        A curated list of the most popular travel packages based on different destinations.
                    </p>
                </motion.div>


                <Swiper
                    slidesPerView={3}
                    spaceBetween={20}
                    speed={1200}
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        640: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    modules={[Pagination, Autoplay]}
                    className="mySwiper mt-14 pb-14 relative"
                >
                    {banners.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className="rounded-2xl overflow-hidden shadow-lg">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full aspect-video object-cover"
                                />
                            </div>
                        </SwiperSlide>
                    ))}

                </Swiper>



            </div>
        </div>

    );
}

export default DiscoutBanners;
