import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

import "swiper/css";
import "swiper/css/navigation";
import { motion } from "framer-motion";
import { MdArrowOutward } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import Faq from "../components/Faq";
import Footer from "../components/Footer";
import Tour from '../components/Tour'


function DestinationDetails() {
    const { slug } = useParams();
    const [destination, setDestination] = useState(null);
    const [openVideo, setOpenVideo] = useState(false);


    const staticImages = [
        "/destination/dest1.webp",
        "/destination/dest2.webp",
        "/destination/dest3.webp",
        "/destination/dest4.webp"
    ];


    const touristPlaceImages = [
        "/destination/dest2.webp",
        "/destination/dest3.webp",
        "/destination/dest4.webp",
        "/destination/dest5.webp",
        "/destination/dest6.webp",
        "/destination/dest7.webp",
        "/destination/dest1.webp",
    ];

    const touristTitles = [
        "Loire Valley",
        "Southern France",
        "Louvre Museum",
        "Effile Tower",
        "Notre-Dame Cathedral",
        "Palace of Versailles",
        "Carcassonne",
    ];



    useEffect(() => {
        const fetchDestination = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/get_destination/${slug}`
                );

                setDestination(res.data.destination);
            } catch (err) {
                console.log("Error fetching destination:", err);
            }
        };

        fetchDestination();
    }, [slug]);

    if (!destination) {
        return <p className="p-5">Loading...</p>;
    }

    return (
        <div className="">

            <div className="relative w-full">

                <Swiper
                    modules={[Navigation, Autoplay]}
                    navigation={{
                        nextEl: ".custom-next",
                        prevEl: ".custom-prev",
                    }}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    speed={1200}
                    loop={true}
                    className="smooth-swiper"
                    spaceBetween={10}
                    slidesPerView={3}

                    breakpoints={{
                        0: { slidesPerView: 1 },
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                >
                    <SwiperSlide>
                        <img
                            src={destination.images[0]}
                            alt={destination.country_name}
                            className="w-full object-cover"
                        />
                    </SwiperSlide>

                    {staticImages.map((img, i) => (
                        <SwiperSlide key={i}>
                            <img
                                src={img}
                                alt="Destination"
                                className="w-full object-cover"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

                <button
                    className="custom-prev absolute top-1/2 -translate-y-1/2 left-4 
        bg-white/40 backdrop-blur-md 
        w-10 h-10 flex items-center justify-center 
        rounded-full shadow-md cursor-pointer z-50 md:flex"
                >
                    <LuChevronLeft className="text-black text-2xl" />
                </button>

                <button
                    className="custom-next absolute top-1/2 -translate-y-1/2 right-4 
        bg-white/40 backdrop-blur-md 
        w-10 h-10 flex items-center justify-center 
        rounded-full shadow-md cursor-pointer z-50 md:flex"
                >
                    <LuChevronRight className="text-black text-2xl" />
                </button>

            </div>

            <div className="mt-16 px-2">

                <motion.h1
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="text-5xl font-bold text-center mb-8"
                >
                    {destination.country_name}
                </motion.h1>


                <div className="flex flex-wrap justify-center gap-3 mb-6">

                    <span className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 text-sm">
                        Capital – Paris
                    </span>

                    <span className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 text-sm">
                        Currency – Euro €
                    </span>

                    <span className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 text-sm">
                        Language – française
                    </span>

                </div>

                <p className="text-gray-600 leading-relaxed text-base text-center max-w-6xl mx-auto px-1">
                    Paris, known as the “City of Light” (La Ville Lumière), is the capital of France
                    and one of the most romantic and iconic cities in the world. Known for its timeless
                    architecture, world-class museums, charming streets, rich history, and exquisite
                    cuisine, Paris is a must-visit destination for travelers from around the globe.
                    Globally recognized as a fashion capital, Paris is the birthplace of haute couture
                    and luxury brands like Chanel, Louis Vuitton, and Dior.
                </p>

                <div className="flex justify-center">
                    <button className="relative overflow-hidden flex rounded-full px-6 mt-10 py-4
                    bg-white text-[#1881FE] font-medium justify-center text-center items-center gap-2 group">

                        <span className="absolute inset-0 bg-[#1881FE] translate-y-full 
                        group-hover:translate-y-0 transition-transform duration-300"></span>

                        <span className="relative z-10 flex items-center gap-2 
                       group-hover:text-white transition-colors duration-300">
                            Best Time To Visit <MdArrowOutward />
                        </span>

                    </button>
                </div>





            </div>

            <div className="mt-10">
                <div className="container mx-auto relative">

                    <p className="font-semibold text-xl sm:text-2xl md:text-3xl text-center lg:text-left">
                        Popular Tourist Palace
                    </p>


                    <Swiper
                        modules={[Navigation, Autoplay]}
                        navigation={{
                            nextEl: ".popular-next",
                            prevEl: ".popular-prev",
                        }}
                        spaceBetween={10}
                        autoplay={{ delay: 3000 }}
                        speed={1500}
                        loop={true}
                        className="smooth-swiper mt-5"
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            480: { slidesPerView: 2 },
                            640: { slidesPerView: 3 },
                            1024: { slidesPerView: 5 },
                        }}
                    >

                        {touristPlaceImages.map((img, index) => (
                            <SwiperSlide key={index}>
                                <div className="flex flex-col items-center">
                                    <img
                                        src={img}
                                        className="w-60 h-40 rounded-3xl object-cover"
                                    />

                                    <p className="mt-3 font-semibold text-gray-800 text-center">
                                        {touristTitles[index]}
                                    </p>
                                </div>
                            </SwiperSlide>
                        ))}

                    </Swiper>

                    <button
                        className="popular-prev absolute -left-4 top-1/2 -translate-y-1/2 
      bg-white/70 backdrop-blur-md w-10 h-10 rounded-full 
      hidden lg:flex items-center justify-center shadow-md z-50"
                    >
                        <LuChevronLeft className="text-gray-700 text-xl" />
                    </button>

                    <button
                        className="popular-next absolute right-4 top-1/2 -translate-y-1/2 
      bg-white/70 backdrop-blur-md w-10 h-10 rounded-full 
      hidden lg:flex items-center justify-center shadow-md z-50"
                    >
                        <LuChevronRight className="text-gray-700 text-xl" />
                    </button>

                </div>
            </div>

            <div className="w-full bg-[#F5F6FF] my-25 py-16 px-4">

                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Why Choose Only Us?
                    </h2>
                    <p className="text-gray-600 mt-3 text-base md:text-lg">
                        Because we don’t just plan your trip — we craft unforgettable experiences.
                    </p>
                </div>

                <div className="container mx-auto pt-16">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">

                        {/* card 1 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
                            <div className="flex justify-center mb-4">
                                <img src="/destination/icon1.svg" className="w-16 h-16" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">Local Expertise</h3>
                            <p className="text-gray-600 text-sm">
                                From secret spots in Montmartre to skip-the-line Eiffel Tower access — we curate every journey with insider knowledge.
                            </p>
                        </div>

                        {/* card 2 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
                            <div className="flex justify-center mb-4">
                                <img src="/destination/icon2.svg" className="w-16 h-16" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">Transparent Pricing</h3>
                            <p className="text-gray-600 text-sm">
                                From secret spots in Montmartre to skip-the-line Eiffel Tower access — we curate every journey with insider knowledge.
                            </p>
                        </div>

                        {/* card 3 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
                            <div className="flex justify-center mb-4">
                                <img src="/destination/icon3.svg" className="w-16 h-16" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">24/7 Support</h3>
                            <p className="text-gray-600 text-sm">
                                From secret spots in Montmartre to skip-the-line Eiffel Tower access — we curate every journey with insider knowledge.
                            </p>
                        </div>

                    </div>

                </div>


                <div className="flex flex-wrap justify-center gap-5 mt-16">

                    <span className="px-6 py-3 bg-white rounded-full cursor-pointer hover:bg-blue-500 hover:text-white shadow-sm text-gray-700 font-medium">
                        Personalized Itineraries
                    </span>

                    <span className="px-6 py-3 bg-white rounded-full cursor-pointer hover:bg-blue-500 hover:text-white  shadow-sm text-gray-700 font-medium">
                        Trusted Guides & Partners
                    </span>

                    <span className="px-6 py-3 bg-white rounded-full cursor-pointer hover:bg-blue-500 hover:text-white  shadow-sm text-gray-700 font-medium">
                        Curated Experiences
                    </span>

                </div>

            </div>

            <div className="mt-20 mb-30 w-full">

                <motion.h2
                    initial={{ y: -40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="text-4xl font-bold text-center mb-8"
                >
                    Recent Customer Experience
                </motion.h2>


                <div className="mt-10 px-4 mx-auto relative">

                    <Swiper
                        modules={[Navigation, Autoplay]}
                        autoplay={{ delay: 2500, disableOnInteraction: false }}
                        speed={1200}
                        loop={true}
                        spaceBetween={20}
                        slidesPerView={1}
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            480: { slidesPerView: 1 },
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 4 },
                            1280: { slidesPerView: 5 },
                        }}
                        className="smooth-swiper"
                    >

                        {[
                            "/destination/cus1.webp",
                            "/destination/cus2.webp",
                            "/destination/cus3.webp",
                            "/destination/cus4.webp",
                            "/destination/cus5.mp4",
                            "/destination/cus6.webp",
                        ].map((file, index) => (
                            <SwiperSlide key={index}>
                                <div className="flex items-center justify-center h-[420px]">

                                    {file.endsWith(".mp4") ? (
                                        <video
                                            src={file}
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            className={`rounded-3xl object-cover
                                                ${index % 2 === 0 ? "h-[400px]" : "h-[280px] md:h-[340px]"}
                                            `}
                                        />
                                    ) : (
                                        <img
                                            src={file}
                                            className={`rounded-3xl object-cover
                                                ${index % 2 === 0 ? "h-[400px]" : "h-[280px] md:h-[340px]"}
                                            `}
                                        />
                                    )}

                                </div>
                            </SwiperSlide>

                        ))}


                    </Swiper>

                </div>


            </div>

            <div className="container mx-auto mt-10 px-4">

                <h1 className="text-3xl md:text-4xl font-bold mb-8">
                    Best Time to Visit
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* card 1 */}
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">

                        <div className="flex flex-col md:flex-row gap-6 md:gap-16 items-stretch">

                            <img
                                src="/destination/visit1.webp"
                                alt="Spring Season"
                                className="w-full md:w-[190px] h-48 md:h-56 rounded-xl object-cover"
                            />

                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <h2 className="text-2xl font-semibold">
                                        Spring (March–May)
                                    </h2>

                                    <p className="text-gray-600 text-sm mt-3">
                                        Weather: 12–20°C / 53–68°F
                                    </p>

                                    <h3 className="mt-7 font-semibold">Highlights:</h3>

                                    <ul className="mt-4 space-y-4 text-gray-600 text-sm">

                                        <li className="flex items-start gap-2">
                                            <span>
                                                <div className="w-4.5 h-4.5 flex items-center justify-center rounded-full bg-blue-500 text-white text-sm">
                                                    <FaCheck size={10} />
                                                </div>
                                            </span>
                                            Cherry blossoms, café culture.
                                        </li>

                                        <li className="flex items-start gap-2">
                                            <span>
                                                <div className="w-4.5 h-4.5 flex items-center justify-center rounded-full bg-blue-500 text-white text-sm">
                                                    <FaCheck size={10} />
                                                </div>
                                            </span>
                                            Moderate crowds.
                                        </li>

                                        <li className="flex items-start gap-2">
                                            <span>
                                                <div className="w-4.5 h-4.5 flex items-center justify-center rounded-full bg-blue-500 text-white text-sm">
                                                    <FaCheck size={10} />
                                                </div>
                                            </span>
                                            Ideal for outdoor walks & photo spots.
                                        </li>

                                    </ul>
                                </div>
                            </div>

                        </div>

                        <div className="bg-[#F2F2FF] font-semibold text-blue-700 mt-10 p-3 rounded-full text-center text-sm w-full">
                            Perfect For: First-time travelers, couples, light packers
                        </div>
                    </div>

                    {/* card 2 */}
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">

                        <div className="flex flex-col md:flex-row gap-6 md:gap-16 items-stretch">

                            <img
                                src="/destination/visit2.webp"
                                alt="Summer Season"
                                className="w-full md:w-[190px] h-48 md:h-56 rounded-xl object-cover"
                            />

                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <h2 className="text-2xl font-semibold">
                                        Summer (June–August)
                                    </h2>

                                    <p className="text-gray-600 text-sm mt-3">
                                        Weather: 20–30°C / 68–86°F
                                    </p>

                                    <h3 className="mt-7 font-semibold">Highlights:</h3>

                                    <ul className="mt-4 space-y-4 text-gray-600 text-sm">

                                        <li className="flex items-start gap-2">
                                            <span>
                                                <div className="w-4.5 h-4.5 flex items-center justify-center rounded-full bg-blue-500 text-white text-sm">
                                                    <FaCheck size={10} />
                                                </div>
                                            </span>
                                            Long daylight hours.
                                        </li>

                                        <li className="flex items-start gap-2">
                                            <span>
                                                <div className="w-4.5 h-4.5 flex items-center justify-center rounded-full bg-blue-500 text-white text-sm">
                                                    <FaCheck size={10} />
                                                </div>
                                            </span>
                                            Open-air cinema, festivals.
                                        </li>

                                        <li className="flex items-start gap-2">
                                            <span>
                                                <div className="w-4.5 h-4.5 flex items-center justify-center rounded-full bg-blue-500 text-white text-sm">
                                                    <FaCheck size={10} />
                                                </div>
                                            </span>
                                            High tourist volume & prices
                                        </li>

                                    </ul>
                                </div>
                            </div>

                        </div>

                        <div className="bg-[#F2F2FF] font-semibold text-blue-700 mt-10 p-3 rounded-full text-center text-sm w-full">
                            Perfect For: Festival lovers, families, nightlife explorers
                        </div>

                    </div>

                    {/* card 3 */}
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">

                        <div className="flex flex-col md:flex-row gap-6 md:gap-16 items-stretch">

                            <img
                                src="/destination/visit3.webp"
                                alt="Autumn Season"
                                className="w-full md:w-[190px] h-48 md:h-56 rounded-xl object-cover"
                            />

                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <h2 className="text-2xl font-semibold">
                                        Autumn (Sep to Nov)
                                    </h2>

                                    <p className="text-gray-600 text-sm mt-3">
                                        Weather: 0–18°C / 50–64°F
                                    </p>

                                    <h3 className="mt-7 font-semibold">Highlights:</h3>

                                    <ul className="mt-4 space-y-4 text-gray-600 text-sm">

                                        <li className="flex items-start gap-2">
                                            <span>
                                                <div className="w-4.5 h-4.5 flex items-center justify-center rounded-full bg-blue-500 text-white text-sm">
                                                    <FaCheck size={10} />
                                                </div>
                                            </span>
                                            Golden parks, wine season.
                                        </li>

                                        <li className="flex items-start gap-2">
                                            <span>
                                                <div className="w-4.5 h-4.5 flex items-center justify-center rounded-full bg-blue-500 text-white text-sm">
                                                    <FaCheck size={10} />
                                                </div>
                                            </span>
                                            Fewer tourists, great photos.
                                        </li>

                                        <li className="flex items-start gap-2">
                                            <span>
                                                <div className="w-4.5 h-4.5 flex items-center justify-center rounded-full bg-blue-500 text-white text-sm">
                                                    <FaCheck size={10} />
                                                </div>
                                            </span>
                                            Fashion Week buzz.
                                        </li>

                                    </ul>
                                </div>
                            </div>

                        </div>

                        <div className="bg-[#F2F2FF] font-semibold text-blue-700 mt-10 p-3 rounded-full text-center text-sm w-full">
                            Photographers, solo travelers, wine lovers
                        </div>

                    </div>

                    {/* card 4 */}
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">

                        <div className="flex flex-col md:flex-row gap-6 md:gap-16 items-stretch">

                            <img
                                src="/destination/visit4.webp"
                                alt="Winter Season"
                                className="w-full md:w-[190px] h-48 md:h-56 rounded-xl object-cover"
                            />

                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <h2 className="text-2xl font-semibold">
                                        Winter (Dec to Feb)
                                    </h2>

                                    <p className="text-gray-600 text-sm mt-3">
                                        Weather: 3–8°C / 37–46°F
                                    </p>

                                    <h3 className="mt-7 font-semibold">Highlights:</h3>

                                    <ul className="mt-4 space-y-4 text-gray-600 text-sm">

                                        <li className="flex items-start gap-2">
                                            <span>
                                                <div className="w-4.5 h-4.5 flex items-center justify-center rounded-full bg-blue-500 text-white text-sm">
                                                    <FaCheck size={10} />
                                                </div>
                                            </span>
                                            Christmas markets, cozy cafés.
                                        </li>

                                        <li className="flex items-start gap-2">
                                            <span>
                                                <div className="w-4.5 h-4.5 flex items-center justify-center rounded-full bg-blue-500 text-white text-sm">
                                                    <FaCheck size={10} />
                                                </div>
                                            </span>
                                            Fewer crowds, better deals.
                                        </li>

                                        <li className="flex items-start gap-2">
                                            <span>
                                                <div className="w-4.5 h-4.5 flex items-center justify-center rounded-full bg-blue-500 text-white text-sm">
                                                    <FaCheck size={10} />
                                                </div>
                                            </span>
                                            Occasional snow = pure magic.
                                        </li>

                                    </ul>
                                </div>
                            </div>

                        </div>

                        <div className="bg-[#F2F2FF] font-semibold text-blue-700 mt-10 p-3 rounded-full text-center text-sm w-full">
                            Budget travelers, romantics, festive moods
                        </div>

                    </div>

                </div>
            </div>

            <div className="relative mt-25 mb-10 w-full">

                <div className="container mx-auto">
                    <img
                        src="/destination/bg-video.webp"
                        alt="video thumbnail"
                        className=" w-full h-[220px] sm:h-[280px] md:h-[340px] lg:h-[500px] object-cover rounded-2xl"
                    />

                </div>


                <button
                    onClick={() => setOpenVideo(true)}
                    className="
                      absolute inset-0 m-auto
                      w-12 h-12 md:w-20 md:h-20
                      flex items-center justify-center
                      bg-blue-600 bg-opacity-80
                      text-white rounded-full
                       backdrop-blur-sm
                     hover:bg-blue-700 transition
                    "
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-8 h-8 md:w-10 md:h-10"
                    >
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </button>

            </div>

            {openVideo && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-9999">

                    <button
                        onClick={() => setOpenVideo(false)}
                        className="absolute top-5 right-5 text-white text-3xl"
                    >
                        ×
                    </button>

                    <div className="w-full max-w-5xl">
                        <iframe
                            className="w-full h-[220px] sm:h-[350px] md:h-[480px] rounded-2xl"
                            src="https://www.youtube.com/embed/u31qwQUeGuM?autoplay=1"
                            title="YouTube video player"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        ></iframe>
                    </div>

                </div>
            )}

            <Faq
                type="destination"
                title="Questions & Answer"
                subtitle="We’re committed to offering more than just products—we provide exceptional experiences."
            />

            <Tour
                mode="last minute"
                title="3 Tours Available in Paris"
                subTitle="A curated list of the most popular travel packages based on different destinations."
            />

            <Footer />

        </div>
    );
}

export default DestinationDetails;
