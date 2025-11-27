import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

function Review() {
    const reviews = [
        {
            name: "James Bonde", role: "GoFly Traveler", rating: 5, title: "Average Experience",
            text: "The tour was well-organized, and we enjoyed every bit of it. However, I wish we had more free time to explore on our own. Overall, a great experience!"
        },
        {
            name: "Maria Hill", role: "GoFly Traveler", rating: 5, title: "Average Experience",
            text: "The tour was well-organized, and we enjoyed every bit of it. However, I wish we had more free time to explore on our own. Overall, a great experience!"
        },
        {
            name: "Tony Stark", role: "GoFly Traveler", rating: 5, title: "Average Experience",
            text: "The tour was well-organized, and we enjoyed every bit of it. However, I wish we had more free time to explore on our own. Overall, a great experience!"
        },
        {
            name: "Robert Crackry", role: "GoFly Traveler", rating: 5, title: "Average Experience",
            text: "The tour was well-organized, and we enjoyed every bit of it. However, I wish we had more free time to explore on our own. Overall, a great experience!"
        },
        {
            name: "Selina Henary", role: "GoFly Traveler", rating: 5, title: "Average Experience",
            text: "The tour was well-organized, and we enjoyed every bit of it. However, I wish we had more free time to explore on our own. Overall, a great experience!"
        }
    ];

    return (
        <div className="px-2 sm:px-0 py-16 bg-[#f5f7ff]">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-bold">Hear It from Travelers</h2>
                <p className="max-w-2xl mx-auto text-gray-600 mt-2">
                    We go beyond just booking trips—creating unforgettable travel experiences that match your dreams!
                </p>
            </div>

            <div className="container mx-auto px-6">
                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={30}
                    slidesPerView={3}

                    speed={900}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}

                    // loop={true}
                    grabCursor={true}

                    effect="slide"

                    breakpoints={{
                        0: { slidesPerView: 1 },
                        640: { slidesPerView: 1.2 },
                        1024: { slidesPerView: 2 },
                        1280: { slidesPerView: 3 },
                    }}

                    style={{
                        transitionTimingFunction: "ease-in-out",
                    }}
                >

                    {reviews.map((r, index) => {
                        const firstLetter = r.name.charAt(0).toUpperCase();

                        return (
                            <SwiperSlide key={index}>
                                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 h-full">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold">
                                            {firstLetter}
                                        </div>

                                        <div>
                                            <h3 className="font-bold text-lg">{r.name}</h3>
                                            <p className="text-gray-500 text-sm">{r.role}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-1 mb-4">
                                        {[...Array(r.rating)].map((_, i) => (
                                            <span
                                                key={i}
                                                className="text-white bg-[#00B67A] px-1 py-0 text-sm font-medium shadow-sm"
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>

                                    <h4 className="font-semibold mb-2">{r.title}</h4>
                                    <p className="text-gray-600 leading-relaxed">{r.text}</p>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-10">

                    <div className="w-[150px] flex flex-col items-start gap-2 text-center md:text-left">
                        <img
                            src="/tripadvisor-logo.svg"
                            alt="tripadvisor"
                            className="w-full"
                        />

                        <div className="w-full flex justify-between items-center">
                            <p className="font-semibold">Reviews</p>

                            <div className="flex gap-1">
                                {[1, 2, 3, 4].map((i) => (
                                    <span key={i} className="w-3 h-3 rounded-full bg-[#36c26f]"></span>
                                ))}

                                <span className="relative w-3 h-3 rounded-full border-2 border-[#36c26f] overflow-hidden">
                                    <span className="absolute left-0 top-0 w-1 h-full bg-[#36c26f]"></span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="hidden sm:flex flex-col items-center">
                        <div className="w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent border-t-gray-300"></div>
                        <div className="h-14 w-[1.5px] bg-gray-300"></div>
                        <div className="w-0 h-0 border-l-4 border-r-4 border-b-6 border-transparent border-b-gray-300"></div>
                    </div>

                    <div className="flex flex-row md:flex-row items-center gap-3 text-center md:text-left">

                        <div className="text-3xl font-bold">4.5</div>

                        <div>
                            <div className="flex items-center gap-2 justify-start">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="#36c26f">
                                    <path d="M12 .587l3.668 7.57 8.332 1.151-6.064 5.842 1.48 8.287-7.416-3.897-7.416 3.897 1.48-8.287-6.064-5.842 8.332-1.151z" />
                                </svg>
                                <p className="font-semibold">Trustpilot</p>
                            </div>

                            <div className="flex items-center gap-2 mt-1 justify-center md:justify-start">
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div
                                            key={i}
                                            className="bg-[#00B67A] px-1 py-0 text-white text-sm font-medium"
                                        >
                                            ★
                                        </div>
                                    ))}
                                </div>

                                <p className="text-sm text-gray-500">Reviews</p>
                            </div>
                        </div>

                    </div>

                </div>



            </div>
        </div>
    );
}

export default Review;