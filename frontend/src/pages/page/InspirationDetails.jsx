import React, { useEffect, useState } from "react";
import BreadcrumbHero from "../../components/Breadcrumb";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import InspirationRight from "./InspirationRight";
import { GiTempleGate, GiGreekTemple, GiWaveSurfer, GiPalmTree, GiMountainCave, GiIsland, GiBoatFishing } from "react-icons/gi"
import { FaFacebookF, FaTimes, FaLinkedinIn, FaInstagram } from "react-icons/fa";

function InspirationDetails() {
    const navigate = useNavigate();
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);

    const [message, setMessage] = useState("");
    const [statusMessage, setStatusMessage] = useState("");

    const user = JSON.parse(localStorage.getItem("userData"));

    const submitComment = async () => {
        if (!user) {
            setStatusMessage("Please login to comment.");
            hideMessage();
            return;
        }

        if (!message.trim()) {
            setStatusMessage("Please write a comment.");
            hideMessage();
            return;
        }

        try {
            await axios.post("http://localhost:5000/api/add_comment", {
                blog_id: blog?.blog_id,
                name: user.name,
                email: user.email,
                message,
            });

            setMessage("");
            setStatusMessage("Comment posted successfully!");

            hideMessage();
        } catch (error) {
            console.log(error);
            setStatusMessage("Something went wrong. Try again.");
            hideMessage();
        }
    };

    const hideMessage = () => {
        setTimeout(() => setStatusMessage(""), 5000);
    };


    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/get_blog/${slug}`);
                setBlog(res.data.blog);
            } catch (err) {
                console.log(err);
            }
        };

        fetchBlog();
    }, [slug]);

    return (
        <div>
            <BreadcrumbHero
                title={blog ? blog.title : "Loading..."}
                background="/breadcrumb.jpeg"
            />

            <section className="container ">

                <div className="grid mx-auto px-4 py-12 grid-cols-1 lg:grid-cols-3 gap-20">

                    {/* left  */}
                    <div className="lg:col-span-2">

                        <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold mb-6 leading-snug">
                            Outstanding Beaches to Visit This Summer Season.
                        </h1>

                        <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8 max-w-4xl">
                            Summer is here, and it’s time to soak up the sun on some of the world’s most stunning beaches! Whether you’re looking to relax on golden sands, dive into crystal-clear waters, or try exciting water sports, these 10 beaches offer something for every type of traveler. From remote island paradises to iconic coastal destinations.
                        </p>

                        <div className="w-full my-8 overflow-hidden">
                            <img
                                src="/pages/inspiration/inspiration-details1.webp"
                                alt=""
                                loading="lazy"
                                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                            />
                        </div>

                        <div className="flex items-start gap-6 mt-10 md:mt-14">
                            <div className="flex flex-col items-center text-black mt-2">
                                <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-12 border-transparent border-b-black"></div>
                                <div className="w-px h-16 bg-black"></div>
                                <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-12 border-transparent border-t-black"></div>
                            </div>

                            <div className="relative">
                                <span className=" absolute -left-2 -top-6 text-[80px] sm:text-[100px] md:text-[130px] lg:text-[150px]  text-gray-200 select-none leading-none">
                                    &ldquo;
                                </span>


                                <p className="text-xl sm:text-3xl font-semibold leading-snug relative z-10">
                                    Travel is the only thing you buy that makes you richer, to travel is to live.
                                </p>

                                <p className="mt-4 text-lg sm:text-xl font-semibold relative z-10">Dr. Samuel Nathan</p>
                                <p className="mt-4 text-base sm:text-lg text-gray-700 relative z-10">Premium Traveler</p>
                            </div>
                        </div>

                        <div className="mt-10">

                            <div>
                                <h2 className="text-2xl sm:text-3xl font-semibold mb-6">
                                    Here are the top 10 beaches you must visit this summer–
                                </h2>

                                <h1 className="text-xl sm:text-2xl font-bold mt-6 mb-4">1. Maldives</h1>

                                <p className="text-gray-700 leading-relaxed mb-8">
                                    The Maldives is a dream destination known for its pristine white sandy beaches
                                    and crystal-clear turquoise waters. With over water bungalows offering panoramic
                                    ocean views and access to some of the best scuba diving and snorkeling spots,
                                    the Maldives is perfect for those seeking a luxurious escape. Its secluded
                                    islands and vibrant coral reefs make it ideal for both relaxation and adventure.
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                                    <div className="overflow-hidden">
                                        <img
                                            src="/pages/inspiration/inspiration-details2.webp"
                                            alt="Maldives Beach 1"
                                            loading="lazy"
                                            className="w-full h-[220px] sm:h-[280px] md:h-80 object-cover 
                                                transition-transform duration-500 hover:scale-105"
                                        />
                                    </div>

                                    <div className="overflow-hidden">
                                        <img
                                            src="/pages/inspiration/inspiration-details3.webp"
                                            alt="Maldives Beach 2"
                                            loading="lazy"
                                            className="w-full h-[220px] sm:h-[280px] md:h-80 object-cover 
                                                transition-transform duration-500 hover:scale-105"
                                        />
                                    </div>
                                </div>
                            </div>


                            <div className="mt-14">
                                <h1 className="text-xl sm:text-2xl font-bold mb-4">2. Maui, Hawaii</h1>

                                <p className="text-gray-700 leading-relaxed mb-8">
                                    With a perfect blend of adventure and relaxation, Maui offers something for everyone.
                                    Famous for its volcanic landscapes, stunning beaches like Wailea and Kaanapali,
                                    and world-class surfing, Maui is a must-visit. Explore tropical rainforests,
                                    take a scenic drive on the Road to Hana, or enjoy whale watching in winter.
                                </p>

                                <div className="overflow-hidden mb-8">
                                    <img
                                        src="/pages/inspiration/inspiration-details4.webp"
                                        alt="Maui Beach"
                                        className="w-full h-full object-cover 
                                            transition-transform duration-500 hover:scale-105"
                                    />
                                </div>

                                <h2 className="text-lg sm:text-xl font-semibold mb-4">Activities in Maldives:</h2>

                                <div className="flex flex-wrap gap-4">
                                    <button className="px-4 py-2 bg-[#F0F0F0] rounded-full text-sm hover:bg-gray-200 transition">
                                        Surfing
                                    </button>

                                    <button className="px-4 py-2 bg-[#F0F0F0] rounded-full text-sm hover:bg-gray-200 transition">
                                        Hiking & Trekking
                                    </button>

                                    <button className="px-4 py-2 bg-[#F0F0F0] rounded-full text-sm hover:bg-gray-200 transition">
                                        Whale Watching
                                    </button>

                                    <button className="px-4 py-2 bg-[#F0F0F0] rounded-full text-sm hover:bg-gray-200 transition">
                                        Beachfront Dining
                                    </button>
                                </div>
                            </div>

                            <div className="mt-14">
                                <h1 className="text-xl sm:text-2xl font-bold mb-4">3. Phuket, Thailand</h1>

                                <p className="text-gray-700 leading-relaxed mb-8">
                                    Known for its bustling beaches, Phuket is one of Thailand’s most popular beach destinations.
                                    From the lively Patong Beach to quieter spots like Kata and Karon, there’s something for everyone.
                                    Explore the island’s vibrant nightlife, indulge in Thai street food, and take boat trips to
                                    nearby islands like Phi Phi.
                                </p>

                                <div className="overflow-hidden mb-8">
                                    <img
                                        src="/pages/inspiration/inspiration-details5.webp"
                                        alt="Phuket Beach"
                                        className="w-full h-full object-cover 
                                                transition-transform duration-500 hover:scale-105"
                                    />
                                </div>

                                <h2 className="text-lg sm:text-xl font-semibold mb-4">
                                    Activities in Phuket, Thailand:
                                </h2>

                                <div className="flex flex-wrap gap-4">
                                    <button className="px-4 py-2 bg-[#F0F0F0] rounded-full text-sm hover:bg-gray-200 transition">
                                        Surfing
                                    </button>

                                    <button className="px-4 py-2 bg-[#F0F0F0] rounded-full text-sm hover:bg-gray-200 transition">
                                        Hiking & Trekking
                                    </button>

                                    <button className="px-4 py-2 bg-[#F0F0F0] rounded-full text-sm hover:bg-gray-200 transition">
                                        Whale Watching
                                    </button>

                                    <button className="px-4 py-2 bg-[#F0F0F0] rounded-full text-sm hover:bg-gray-200 transition">
                                        Beachfront Dining
                                    </button>
                                </div>
                            </div>

                        </div>

                        <div className="mt-16">
                            <h2 className="text-2xl sm:text-3xl font-semibold mb-6">
                                Also 07 Beaches Must Visit–
                            </h2>

                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">

                                {[
                                    { name: "Bali, Indonesia", icon: <GiTempleGate size={42} className="text-blue-600" /> },
                                    { name: "Santorini, Greece", icon: <GiGreekTemple size={42} className="text-blue-600" /> },
                                    { name: "Amalfi Coast, Italy", icon: <GiWaveSurfer size={42} className="text-blue-600" /> },
                                    { name: "Bondi Beach, Australia", icon: <GiPalmTree size={42} className="text-blue-600" /> },
                                    { name: "Bora Bora, French", icon: <GiMountainCave size={42} className="text-blue-600" /> },
                                    { name: "Koh Phi Phi, Thailand", icon: <GiIsland size={42} className="text-blue-600" /> },
                                    { name: "The Seychelles", icon: <GiBoatFishing size={42} className="text-blue-600" /> },
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className={`
                                            p-4 sm:p-6 rounded-2xl border border-gray-200 
                                             transition cursor-pointer
                                            ${i % 2 === 0 ? "bg-[#F8F8F8]" : "bg-white"}
                                        `}
                                    >
                                        <div className="mb-4">
                                            {item.icon}
                                        </div>

                                        <p className="font-semibold text-lg leading-snug">{item.name}</p>
                                    </div>
                                ))}

                            </div>
                        </div>

                        {/* tag and share */}
                        <div className="mt-14 bg-[#FAFAFA] border border-gray-200 rounded-2xl sm:rounded-full p-3 px-8 flex flex-col         sm:flex-row items-center justify-between gap-6">

                            {/* tag */}
                            <div className="flex items-center gap-3">
                                <span className="font-semibold text-lg">Tag:</span>
                                <span className="px-4 py-1 bg-[#F0F0F0] hover:bg-blue-500 hover:text-white rounded-full text-sm">
                                    {blog?.tag_name}
                                </span>

                            </div>

                            {/* Share */}
                            <div className="flex items-center gap-4">
                                <span className="font-semibold text-lg">Share:</span>

                                <button
                                    className="w-9 h-9 rounded-full bg-[#F0F0F0] flex items-center justify-center 
                                         text-gray-700 transition-all hover:bg-blue-500 hover:text-white"
                                >
                                    <FaFacebookF size={14} />
                                </button>

                                <button
                                    className="w-9 h-9 rounded-full bg-[#F0F0F0] flex items-center justify-center 
                                          text-gray-700 transition-all hover:bg-blue-500 hover:text-white"
                                >
                                    <FaTimes size={16} />
                                </button>

                                <button
                                    className="w-9 h-9 rounded-full bg-[#F0F0F0] flex items-center justify-center 
                                          text-gray-700 transition-all hover:bg-blue-500 hover:text-white"
                                >
                                    <FaLinkedinIn size={14} />
                                </button>

                                <button
                                    className="w-9 h-9 rounded-full bg-[#F0F0F0] flex items-center justify-center 
                                          text-gray-700 transition-all hover:bg-blue-500 hover:text-white"
                                >
                                    <FaInstagram size={14} />
                                </button>

                            </div>

                        </div>

                        {/* comment */}
                        <div className="bg-[#D6EDD7] p-6 sm:p-10 rounded-3xl mt-10">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Leave A Comment:</h2>

                            <p className="text-gray-700 mb-6">
                                Logged in as <span className="font-semibold">{user?.name}</span>.{" "}
                                <span
                                    onClick={() => navigate("/my-account")}
                                    className="text-blue-600 cursor-pointer">Edit your profile.</span>{" "}
                                <span className="text-blue-600 cursor-pointer">Log out?</span>{" "}
                                <span>Required fields are marked *</span>
                            </p>

                            <label className="font-semibold text-lg">Message*</label>

                            <textarea
                                placeholder="Your Message"
                                className="mt-2 w-full p-4 rounded-xl bg-white border text-gray-700 h-40 outline-none 
                                    focus:ring-2 focus:ring-blue-400"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            ></textarea>
                            {statusMessage && (
                                <p
                                    className={`text-sm mt-2 ${statusMessage.includes("wrong") || statusMessage.includes("Please")
                                        ? "text-red-600"
                                        : "text-green-600"
                                        }`}
                                >
                                    {statusMessage}
                                </p>
                            )}

                            <button
                                onClick={submitComment}
                                className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold 
                                  hover:bg-blue-700 transition flex items-center gap-2"
                            >
                                Post Comment ↗
                            </button>
                        </div>

                    </div>

                    {/* right */}
                    <div>
                        <InspirationRight />
                    </div>

                </div>

            </section>


        </div>
    );
}

export default InspirationDetails;
