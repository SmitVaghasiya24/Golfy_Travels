import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { FiMapPin } from "react-icons/fi";
import { BsCalendarDate } from "react-icons/bs";

function Blog() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

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
        <div className="py-10">
            <div className="container mx-auto">
                <h1 className="text-3xl text-center font-bold mb-6">Travel Inspirations</h1>
                <p className="text-center mx-auto max-w-xl text-md mb-10 text-[#525252]">
                    A curated list of inspiration based on amazing destinations.
                </p>

                <div className="relative">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={2}
                        loop={true}
                        grabCursor={true}
                        speed={4000}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        navigation={{
                            nextEl: ".custom-next",
                            prevEl: ".custom-prev",
                        }}
                        breakpoints={{
                            0: { slidesPerView: 1.1 },
                            640: { slidesPerView: 1.3 },
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
                                    <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden flex flex-col lg:flex-row h-full">

                                        {/* LEFT IMAGE */}
                                        <div className="w-full lg:w-1/2 h-[260px] lg:h-[400px]">
                                            <img
                                                src={blog.thumbnail}
                                                alt={blog.title}
                                                className="w-full border-none rounded-2xl h-full object-cover"
                                            />
                                        </div>

                                        {/* RIGHT CONTENT */}
                                        <div className="w-full lg:w-1/2 p-6 flex flex-col space-y-7 justify-center">

                                            {/* Location */}
                                            <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
                                                <FiMapPin size={16} />
                                                <span>{blog.location}</span>
                                            </div>

                                            {/* Title */}
                                            <h2 className="text-2xl font-semibold mb-3 leading-tight">
                                                {blog.title}
                                            </h2>

                                            {/* Date */}
                                            <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                                                <BsCalendarDate size={16} />
                                                <span>
                                                    {new Date(blog.published_date).toLocaleDateString("en-US", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric"
                                                    })}
                                                </span>
                                            </div>

                                            {/* Description */}
                                            <p className="text-gray-600 text-sm leading-relaxed">
                                                {blog.content.slice(0, 140)}...
                                            </p>

                                        </div>

                                    </div>
                                </SwiperSlide>

                            );
                        })}
                    </Swiper>

                    {/* Custom Arrows */}
                    <button className="custom-prev absolute -left-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow">
                        <span className="text-xl">❮</span>
                    </button>

                    <button className="custom-next absolute -right-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow">
                        <span className="text-xl">❯</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Blog;
