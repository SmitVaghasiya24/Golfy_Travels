import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaPinterestP, FaInstagram } from "react-icons/fa";
import BreadcrumbHero from "../../components/Breadcrumb";
import { GiMountains } from "react-icons/gi";
import { IoLibrary } from "react-icons/io5";
import { GiElephant } from "react-icons/gi";
import { FaUserTie } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Footer from "../../components/Footer";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";


function GuideDetails() {
    const { slug } = useParams();
    const [guide, setGuide] = useState(null);
    const [allGuides, setAllGuides] = useState([]);


    useEffect(() => {
        const fetchGuide = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/get_all_guide");
                setAllGuides(res.data.data);

                const single = res.data.data.find((g) => g.slug === slug);
                setGuide(single);

            } catch (err) {
                console.log(err);
            }
        };

        fetchGuide();
    }, [slug]);

    const otherGuides = allGuides.filter((g) => g.slug !== slug);

    if (!guide) {
        return (
            <div className="flex flex-col items-center justify-center h-64 gap-4">

                <div className="flex gap-3">
                    <span className="w-3 h-3 bg-blue-500 rounded-full animate-[float_0.9s_ease-in-out_infinite]"></span>
                    <span className="w-3 h-3 bg-blue-500 rounded-full animate-[float_0.9s_ease-in-out_infinite_0.15s]"></span>
                    <span className="w-3 h-3 bg-blue-500 rounded-full animate-[float_0.9s_ease-in-out_infinite_0.3s]"></span>
                </div>

                <p className="text-gray-500 text-base">Loading...</p>

                <style>
                    {`
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-7px);
                    }
                }
                `}
                </style>

            </div>
        );
    }

    return (
        <>
            <BreadcrumbHero title={guide ? guide.name : "Guider Title"} background="/breadcrumb.jpeg" />

            <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10">

                <div className="lg:sticky lg:top-24 h-fit">
                    <div className="relative">
                        <img
                            src={guide.profile_img}
                            loading="lazy"
                            className="w-full rounded-3xl shadow-lg"
                            alt={guide.name}
                        />

                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-2xl px-6 py-3 shadow-md flex gap-6">
                            <FaFacebookF size={18} className="cursor-pointer text-gray-600 hover:text-blue-500" />
                            <FaPinterestP size={18} className="cursor-pointer text-gray-600 hover:text-red-500" />
                            <FaInstagram size={18} className="cursor-pointer text-gray-600 hover:text-pink-500" />
                            <FaLinkedinIn size={18} className="cursor-pointer text-gray-600 hover:text-blue-600" />
                        </div>
                    </div>
                </div>

                <div>
                    <h1 className="text-4xl font-bold">{guide.name}</h1>
                    <p className="text-gray-600 mt-1 text-lg">{guide.title}</p>

                    <p className="mt-6 text-gray-700 leading-relaxed">
                        With<strong> {guide.experience_years} years</strong> of experience, I am a passionate travel guide dedicated to creating unforgettable journeys. Specializing in Adventure/Cultural/Historical/Wildlife tours, I have explored the hidden gems and iconic landmarks of Egypt. Fluent in English, Spanish. I ensure smooth communication and a rich storytelling experience for travelers.
                    </p>

                    <p className="text-gray-700 leading-relaxed mt-4">
                        My goal is to provide personalized, insightful, and safe travel experiences. Whether it’s navigating bustling city streets, trekking through breathtaking landscapes, or discovering local traditions, I strive to make every trip seamless and memorable. Join me on an adventure where every moment turns into a lasting memory!
                    </p>

                    <div className="mt-10">
                        <h2 className="text-2xl font-semibold">My Experties-</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">

                            <div className="p-6 bg-gray-100 rounded-2xl shadow-sm 
                                flex flex-col gap-3 
                                hover:shadow-md hover:bg-gray-200 transition-all duration-300">
                                <GiMountains size={36} className="text-blue-600" />
                                <p className="font-semibold max-w-16 text-gray-800">Adventure Tours</p>
                            </div>

                            <div className="p-6 bg-gray-100 rounded-2xl shadow-sm 
                                flex flex-col gap-3
                                hover:shadow-md hover:bg-gray-200 transition-all duration-300">
                                <IoLibrary size={36} className="text-blue-600" />
                                <p className="font-semibold text-gray-800">Cultural & Historical</p>
                            </div>

                            <div className="p-6 bg-gray-100 rounded-2xl shadow-sm 
                                flex flex-col gap-3
                                hover:shadow-md hover:bg-gray-200 transition-all duration-300">
                                <GiElephant size={36} className="text-blue-600" />
                                <p className="font-semibold text-gray-800 w-20">
                                    Safari & Wildlife
                                </p>
                            </div>

                        </div>

                    </div>

                    <div className="mt-8 flex items-center gap-2 text-gray-700">
                        <FaUserTie className="text-xl " />
                        <span className="">Guide Operator:</span>
                        <span className="font-semibold">{guide.language_1}, {guide.language_2}, {guide.language_3}</span>
                    </div>


                    <div className="mt-10">
                        <h2 className="text-2xl font-semibold">Contact Info</h2>

                        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">

                            <div className="p-5 bg-gray-100 rounded-xl flex items-center gap-4">
                                <FaWhatsapp className="text-green-600 text-2xl" />
                                <span className="font-semibold">WhatsApp:</span>
                                {guide.whatsapp}
                            </div>

                            <div className="p-5 bg-gray-100 rounded-xl flex items-center gap-4">
                                <MdEmail className="text-blue-600 text-2xl" />
                                <span className="font-semibold">Email:</span>
                                {guide.email}
                            </div>

                        </div>

                    </div>
                </div>

            </div>

            <div className="bg-[#F2F2FF]">
                <div className="max-w-7xl py-12 mx-auto px-4 mt-20">
                    <h2 className="text-3xl font-bold mb-2 text-center">
                        GoFly More Experties
                    </h2>

                    <p className="text-center text-gray-500 mb-10">
                        We’ve 200+ friendly tour experties in worldwide.
                    </p>

                    <Swiper
                        slidesPerView={4}
                        spaceBetween={25}
                        autoplay={{
                            delay: 2200,
                            disableOnInteraction: false,
                        }}
                        loop="true"
                        speed={1400}
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 4 },
                        }}
                        modules={[Autoplay, Pagination]}
                        className="pb-10"
                    >
                        {otherGuides.map((g) => (
                            <SwiperSlide key={g.id}>
                                <div
                                    onClick={() => (window.location.href = `/pages/guider/${g.slug}`)}
                                    className="cursor-pointer overflow-hidden transition-all"
                                >
                                    <div className="relative group">
                                        <img
                                            src={g.profile_img}
                                            className="h-80 rounded-2xl w-full object-cover"
                                            alt={g.name}
                                        />

                                        <div
                                            className="absolute inset-0 flex items-end bottom-5 justify-center gap-4 
                                                opacity-0 group-hover:opacity-100 transition-all duration-300"
                                        >
                                            <a
                                                href="#"
                                                onClick={(e) => e.stopPropagation()}
                                                className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center"
                                            >
                                                <FaFacebookF className="text-gray-600 hover:text-blue-500" />
                                            </a>

                                            <a
                                                href="#"
                                                onClick={(e) => e.stopPropagation()}
                                                className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center"
                                            >
                                                <FaLinkedinIn className="text-gray-600 hover:text-blue-700" />
                                            </a>
                                        </div>
                                    </div>

                                    <div className=" text-center p-4">
                                        <h3 className="font-bold text-xl">{g.name}</h3>
                                        <p className="text-gray-600">{g.title}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default GuideDetails;
