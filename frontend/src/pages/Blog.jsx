import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { FiMapPin } from "react-icons/fi";
import { BsCalendarDate } from "react-icons/bs";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { MdArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Blog() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/all_blogs");
                setBlogs(res.data.blogs);
                setLoading(false);
            } catch (error) {
                console.log("Error fetching blogs:", error);
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return <p className="text-center py-10">Loading...</p>;
    }

    return (
        <div className="px-4 sm:px-5 py-10">
            <div className="container mx-auto">

                <h1 className="text-4xl text-center font-bold mb-6">Travel Inspirations</h1>
                <p className="text-center mx-auto max-w-xl text-md mb-10 text-[#525252]">
                    A curated list of inspiration the most tour & travel based on different destinations.
                </p>

                <div className="relative">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={2}
                        loop={true}
                        grabCursor={true}
                        speed={1000}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        navigation={{
                            nextEl: ".custom-next",
                            prevEl: ".custom-prev",
                        }}
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            640: { slidesPerView: 1 },
                            1024: { slidesPerView: 2 },
                        }}
                    >
                        {blogs.map((blog) => {
                            const formattedDate = new Date(blog.published_date).toLocaleDateString(
                                "en-US",
                                { day: "2-digit", month: "short", year: "numeric" }
                            );

                            return (
                                <SwiperSlide key={blog.blog_id}>
                                    <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden 
                                        flex flex-col md:flex-row h-full">

                                        <div className="w-full md:w-1/2 h-[250px] sm:h-[300px] md:h-[400px] lg:h-[450px] overflow-hidden">
                                            <img
                                                src={blog.thumbnail}
                                                alt={blog.title}
                                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                            />
                                        </div>

                                        <div className="w-full md:w-1/2 p-4 sm:p-6 flex flex-col space-y-6 md:space-y-7 justify-center">

                                            <div className="flex items-center gap-2 font-semibold text-gray-600 text-sm">
                                                <FiMapPin size={16} />
                                                <span>{blog.location}</span>
                                            </div>

                                            <div className="group">
                                                <h2
                                                    onClick={() => navigate(`/pages/travel-inspiration/${blog.slug}`)}
                                                    className="underline-right relative text-xl sm:text-2xl font-semibold leading-tight inline-block">
                                                    {blog.title}

                                                    {/* <span
                                                        className="
                                                            absolute left-0 -bottom-1
                                                            h-0.5 w-0 bg-black
                                                            transition-all duration-300 
                                                            group-hover:w-full
                                                        "
                                                    ></span> */}
                                                </h2>
                                            </div>

                                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                                                <BsCalendarDate size={16} />
                                                <span>{formattedDate}</span>
                                            </div>

                                            {/* line */}
                                            <div className="w-full flex items-center">
                                                <div className="w-0 h-0 border-t-4 border-b-4 border-l-8 border-transparent border-l-gray-300"></div>
                                                <div className="flex-1 h-[1.5px] bg-gray-200"></div>
                                                <div className="w-0 h-0 border-t-4 border-b-4 border-r-8 border-transparent border-r-gray-300"></div>
                                            </div>

                                            <p className="text-gray-600 text-sm leading-relaxed">
                                                {blog.content.slice(0, 120)}...
                                            </p>

                                        </div>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>

                    {/* arrow */}
                    <button className="custom-prev border rounded-full z-50 absolute -left-6 top-1/2 -translate-y-1/2 hidden md:block">
                        <LuChevronLeft className="text-black text-4xl opacity-80 hover:opacity-100 transition" />
                    </button>

                    <button className="custom-next border rounded-full z-50 absolute -right-6 top-1/2 -translate-y-1/2 hidden md:block">
                        <LuChevronRight className="text-black text-4xl opacity-80 hover:opacity-100 transition" />
                    </button>

                </div>

                <div className="flex justify-center mt-16">
                    <button className="relative group overflow-hidden border border-gray-300 rounded-lg px-5 py-3 bg-white font-medium transition-all duration-300">

                        <span className="absolute inset-0 bg-blue-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></span>

                        <span className="relative z-10 flex cursor-pointer font-semibold items-center gap-2 text-black group-hover:text-white transition-colors duration-300">
                            View All Inspiration <MdArrowOutward />
                        </span>

                    </button>
                </div>

            </div>
        </div>
    );
}

export default Blog;
