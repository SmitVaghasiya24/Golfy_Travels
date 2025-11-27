import BreadcrumbHero from "../../components/Breadcrumb";
import Services from "../../components/Services";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { FaSuitcaseRolling, FaHeadset, FaMedal } from "react-icons/fa";
import { FaTags } from "react-icons/fa6";
import Company from "../../components/Company";
import Review from "../../components/Review";
import Faq from "../../components/Faq";
import AllExperience from '../../components/AllExperience';
import Footer from '../../components/Footer';


const timelineData = [
    {
        year: 1986,
        img: "/pages/journey/86.webp",
        title: "The Birth of Travel Agencies",
        desc: "The first-ever travel agency was founded by Thomas Cook in England. He organized group trips, starting with a railway excursion for 500 people . Thomas Cook expanded his services internationally, arranging trips to Paris and beyond. He introduced the first-ever travel brochure, guiding travelers on destinations & routes. Luxury cruises and organized tours gained popularity, especially among the elite."
    },
    {
        year: 1996,
        img: "/pages/journey/96.webp",
        title: "A New Era of Exploration",
        desc: "The first-ever travel agency was founded by Thomas Cook in England. He organized group trips, starting with a railway excursion for 500 people . Thomas Cook expanded his services internationally, arranging trips to Paris and beyond. He introduced the first-ever travel brochure, guiding travelers on destinations & routes. Luxury cruises and organized tours gained popularity, especially among the elite."
    },
    {
        year: 2006,
        img: "/pages/journey/06.webp",
        title: "We Took Travel Beyond Borders",
        desc: "The first-ever travel agency was founded by Thomas Cook in England. He organized group trips, starting with a railway excursion for 500 people . Thomas Cook expanded his services internationally, arranging trips to Paris and beyond. He introduced the first-ever travel brochure, guiding travelers on destinations & routes. Luxury cruises and organized tours gained popularity, especially among the elite."
    },
    {
        year: 2016,
        img: "/pages/journey/16.webp",
        title: " Embracing Technology to Transform Travel",
        desc: "The first-ever travel agency was founded by Thomas Cook in England. He organized group trips, starting with a railway excursion for 500 people . Thomas Cook expanded his services internationally, arranging trips to Paris and beyond. He introduced the first-ever travel brochure, guiding travelers on destinations & routes. Luxury cruises and organized tours gained popularity, especially among the elite."
    },
    {
        year: 2022,
        img: "/pages/journey/22.webp",
        title: "A New Era of Personalized Journeys",
        desc: "The first-ever travel agency was founded by Thomas Cook in England. He organized group trips, starting with a railway excursion for 500 people . Thomas Cook expanded his services internationally, arranging trips to Paris and beyond. He introduced the first-ever travel brochure, guiding travelers on destinations & routes. Luxury cruises and organized tours gained popularity, especially among the elite."
    },
    {
        year: 2023,
        img: "/pages/journey/23.webp",
        title: "Expanding Our Global Footprin",
        desc: "The first-ever travel agency was founded by Thomas Cook in England. He organized group trips, starting with a railway excursion for 500 people . Thomas Cook expanded his services internationally, arranging trips to Paris and beyond. He introduced the first-ever travel brochure, guiding travelers on destinations & routes. Luxury cruises and organized tours gained popularity, especially among the elite."
    },
    {
        year: 2025,
        img: "/pages/journey/25.webp",
        title: "Pioneering Next-Gen Travel Solutions",
        desc: "The first-ever travel agency was founded by Thomas Cook in England. He organized group trips, starting with a railway excursion for 500 people . Thomas Cook expanded his services internationally, arranging trips to Paris and beyond. He introduced the first-ever travel brochure, guiding travelers on destinations & routes. Luxury cruises and organized tours gained popularity, especially among the elite."
    },
];


const features = [
    {
        icon: <FaSuitcaseRolling size={40} />,
        title: "Expertly Curated Tours.",
        desc: "",
        bg: "bg-[#ECF7B5]"
    },
    {
        icon: <FaTags size={40} />,
        title: "Affordable & Flexible Packages.",
        desc: "",
        bg: "bg-[#F2F2F2]"
    },
    {
        icon: <FaHeadset size={40} />,
        title: "24/7 Customer Support.",
        desc: "",
        bg: "bg-[#E5E4FF]"
    },
    {
        icon: <FaMedal size={40} />,
        title: "Certified & Experienced Guides.",
        desc: "",
        bg: "bg-[#D4F1DB]"
    },
];

function AboutGolfy() {
    const [activeYear, setActiveYear] = useState(timelineData[0]);
    const [dotIndex, setDotIndex] = useState(0);
    const [openVideo, setOpenVideo] = useState(false);


    return (

        <div>
            <BreadcrumbHero title="About GoFly" background="/breadcrumb.jpeg" />

            <div className="container mx-auto overflow-x-hidden">
                <div className="px-4 pt-20 pb-10 grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-20 items-stretch">

                    {/* left */}
                    <div>
                        <h2 className="text-4xl font-bold mb-6">Why We’re Best Agency</h2>

                        <h3 className="text-2xl font-semibold mb-14 leading-snug">
                            Welcome to GoFly Travel Agency – Your Gateway to Unforgettable Journeys!
                        </h3>

                        <p className="text-gray-700 font-semibold leading-relaxed mb-8">
                            GoFly Travel Agency is a trusted name in the travel industry, offering seamless
                            travel planning, personalized itineraries, and unforgettable adventures. With
                            years of experience and a network of global partners, we ensure a hassle-free
                            and memorable journey for every traveler.
                        </p>

                        <p className="text-gray-700 font-semibold leading-relaxed mb-18">
                            We believe that travel is more than just moving from one place to another—
                            it’s about discovering new cultures, creating unforgettable experiences,
                            and making lifelong memories.
                        </p>

                        <div className="flex items-center gap-8">
                            <img src="/pages/signature.png" alt="signature" className="w-24" />
                            <div>
                                <h4 className="font-bold text-lg">Robert Harringson</h4>
                                <p className="text-gray-600 text-sm">Founder at GoFly</p>
                            </div>
                        </div>
                    </div>

                    {/* right */}
                    <div className="relative w-full flex justify-center overflow-hidden">
                        <img
                            src="/pages/about-img.webp"
                            className="w-full object-cover rounded-2xl hidden md:block"
                            alt=""
                        />
                    </div>

                </div>
            </div>


            <Services />

            <div className=" bg-[#F0F0F0]">
                <div className="mt-16 p-10">

                    <div className="container rounded-3xl ">

                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-bold">Behind The Journey</h1>
                            <p className="text-gray-600 max-w-xl mx-auto mt-4">
                                With years of experience in the travel industry, we specialize in crafting personalized journeys.
                            </p>
                        </div>

                        <Swiper
                            slidesPerView={6}
                            spaceBetween={30}
                            autoplay={{ delay: 2000 }}
                            speed={1500}
                            loop={true}
                            modules={[Autoplay]}
                            className="smooth-swiper mt-10"
                            onSlideChange={(swiper) => {
                                setDotIndex(swiper.realIndex);
                            }}
                            breakpoints={{
                                0: { slidesPerView: 1 },
                                480: { slidesPerView: 2 },
                                640: { slidesPerView: 3 },
                                1024: { slidesPerView: 6 },
                            }}
                        >
                            {timelineData.map((item) => (
                                <SwiperSlide key={item.year}>
                                    <div
                                        className="cursor-pointer text-center"
                                        onClick={() => setActiveYear(item)}
                                    >
                                        <img
                                            src={item.img}
                                            alt={item.year}
                                            className={`w-44 h-44 mx-auto rounded-full border transition-all 
                                            ${activeYear.year === item.year
                                                    ? "border-blue-600 "
                                                    : "border-gray-300"
                                                }
                                            `}
                                        />
                                        <p className="mt-3 text-lg font-semibold">{item.year}</p>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* line & dot*/}
                        <div className="relative w-full mt-10 hidden md:block">

                            {/* line */}
                            <div className="absolute top-1/2 left-0 w-full h-[3px] bg-blue-300 -translate-y-1/2"></div>

                            {/* left arrow */}
                            <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2
                                w-0 h-0 border-t-[5px] border-b-[5px] border-r-10
                                border-t-transparent border-b-transparent border-r-blue-300">
                            </div>

                            {/* right arrow */}
                            <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2
                                w-0 h-0 border-t-[5px] border-b-[5px] border-l-10
                                border-t-transparent border-b-transparent border-l-blue-300">
                            </div>

                            {/* dots */}
                            <div
                                className=" relative z-10 grid grid-cols-6 px-0 "
                            >
                                {timelineData.slice(0, 6).map((_, i) => {
                                    const real = (i + dotIndex) % timelineData.length;
                                    const year = timelineData[real].year;

                                    return (
                                        <div key={i} className="flex justify-center">
                                            <div
                                                className={`w-4 h-4 rounded-full transition-all duration-300
                                                    ${activeYear.year === year ? "bg-blue-600" : "bg-blue-300"}
                                                 `}
                                            ></div>
                                        </div>
                                    );
                                })}
                            </div>

                        </div>

                        <div className="mt-10 text-center max-w-3xl mx-auto">
                            <h2 className="text-3xl font-bold">
                                {activeYear.year} – {activeYear.title}
                            </h2>
                            <p className="mt-4 font-semibold text-gray-600">{activeYear.desc}</p>
                        </div>

                    </div>

                </div>
            </div>

            <section className="container">
                <div className="my-20">
                    <div className="text-center mb-14">
                        <h2 className="text-4xl font-semibold mb-4">
                            Why Travel with Us?
                        </h2>
                        <p className="text-gray-600 max-w-lg mx-auto">
                            We specialize in crafting personalized journeys that suit every traveler’s dream.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 lg:px-0">
                        {features.map((item, index) => (
                            <div
                                key={index}
                                className={`${item.bg} rounded-3xl p-8 min-h-[200px] flex flex-col justify-between group transition-all duration-300`}
                            >
                                <div className="text-black mb-4 transform transition-all icon-anim">
                                    {item.icon}
                                </div>

                                <h3 className="text-xl font-semibold text-black">{item.title}</h3>
                            </div>


                        ))}
                    </div>

                </div>
            </section>

            <Company />

            <div className="relative my-25 w-full">

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
                       live-btn
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

            <Review />

            <Faq
                type="home"
                title="Questions & Answer"
                subtitle="We're committed to offering more than just products—we provide exceptional experiences."
            />

            <AllExperience />

            <Footer />


        </div>
    );
}

export default AboutGolfy;
