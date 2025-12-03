import React, { useEffect, useState } from "react";
import axios from "axios";
import BreadcrumbHero from "../components/Breadcrumb";
import { FaRegCheckCircle } from "react-icons/fa";
import { FiZap, FiLock, FiHeadphones } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Faq from "../components/Faq";
import Footer from "../components/Footer";


function Visa() {
    const [visaCountries, setVisaCountries] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadVisaCountries = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/get_visa_country");
                setVisaCountries(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        loadVisaCountries();
    }, []);

    return (
        <div>
            <BreadcrumbHero title="Visa Package" background="/breadcrumb.jpeg" />

            {/* country */}
            <div className="w-full bg-[#F2F2FF] py-16">
                <div className="max-w-7xl mx-auto px-4">

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-8">
                        {visaCountries.map((item) => (
                            <div
                                key={item.visa_id}
                                className="flex flex-col items-center text-center group cursor-pointer"
                            >

                                <div className="w-72 h-72 rounded-full overflow-hidden shadow-lg">
                                    <img
                                        src={item.thumbnail}
                                        alt={item.country}
                                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                                    />
                                </div>

                                <div
                                    className="bg-white rounded-2xl px-5 py-2 -mt-12 w-70 relative transition-all duration-300 group-hover:bg-blue-600"
                                >
                                    <h3
                                        onClick={() => navigate(`/visa/${item.slug}`)
                                        }
                                        className="underline-right inline-block font-bold text-xl transition-all duration-300 group-hover:text-white cursor-pointer"
                                    >
                                        {item.country}
                                    </h3>

                                    <p className="text-gray-600 mt-1 text-sm transition-all duration-300 group-hover:text-white">
                                        Processing Time -
                                        <span className="text-blue-600 font-semibold transition-all duration-300 group-hover:text-white">
                                            {" "}({item.min_days} - {item.max_days}){" "}
                                            {item.notes === "Month" ? "Months" : "Days"}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            {/* agency */}
            <div className="w-full pt-16 lg:pt-16 bg-white">
                <div className="flex justify-center">
                    <span className="bg-white border font-semibold border-gray-200 px-3 py-2 rounded-full text-sm ">
                        100% Trusted Agency!
                    </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-center mt-6">
                    Why Choose Our Visa Agency?
                </h2>

                <div className="w-full  px-4 pb-10 pt-4">
                    <div className="container">

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">

                            {/* card 1 */}
                            <div className="bg-[#E6F6A9] transition-all rounded-3xl p-4 group">
                                <FaRegCheckCircle
                                    className="text-5xl my-7 icon-anim"
                                />

                                <h3 className="font-bold text-xl mb-3">
                                    High Visa Approval Rate & it’s 99%.
                                </h3>

                                <p className="text-gray-600">
                                    Fast & Hassle-Free Visa Processing – 99% Approval Rate.
                                </p>
                            </div>

                            {/* card 2 */}
                            <div className="bg-[#F0F0F0] transition-all rounded-3xl p-4 group">
                                <FiZap className="text-5xl my-7 icon-anim" />
                                <h3 className="font-bold text-xl mb-3">
                                    Fast & Reliable Visa Processing.
                                </h3>
                                <p className="text-gray-600">
                                    Get your visa processed and approved within just 48 hours.
                                </p>
                            </div>

                            {/* card 3 */}
                            <div className="bg-[#E2E2FF] transition-all rounded-3xl p-4 group">
                                <FiLock className="text-5xl my-7 icon-anim" />

                                <h3 className="font-bold text-xl mb-3">
                                    100% Secure & Confidential.
                                </h3>

                                <p className="text-gray-600">
                                    We ensure data privacy and strict confidentiality in all applications.
                                </p>
                            </div>

                            {/* card 4 */}
                            <div className="bg-[#BDEBCE] transition-all rounded-3xl p-4 group">
                                <FiHeadphones className="text-5xl my-7 icon-anim" />

                                <h3 className="font-bold text-xl mb-3">
                                    24/7 Customer Support.
                                </h3>

                                <p className="text-gray-600">
                                    Dedicated visa experts available via phone, WhatsApp, and email.
                                </p>
                            </div>

                        </div>

                    </div>
                </div>

            </div>

            {/* assistance */}
            <div className="container">
                <div className="bg-[#F7F8FF] rounded-3xl my-16 overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">

                        <div className="pt-16 pb-8 pl-6 lg:pl-16 pr-6 lg:pr-0">
                            <p className="text-blue-700 font-semibold mb-2">Need Visa Assistance?</p>

                            <h2 className="text-4xl lg:text-4xl font-semibold leading-tight mb-6">
                                To Get Visa Assistance,Join Schedule a Meeting.
                            </h2>

                            <button className="bg-[#1A2C7A] text-white py-3 px-7 rounded-xl text-lg font-medium hover:bg-[#162568] transition-all">
                                Schedule a Consultation ↗
                            </button>
                        </div>

                        <div className="flex justify-center">
                            <img
                                src="/pages/visa.webp"
                                alt="Visa Assistance"
                                loading="lazy"
                                className="w-full h-full object-contain"
                            />
                        </div>

                    </div>
                </div>
            </div>

            {/* working process */}
            <div className="w-full bg-[#0D0D0D] text-white py-20">
                <div className="container px-4">

                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold">Working Process</h2>
                        <p className="text-gray-400 mt-3">
                            A curated list of the most popular travel packages based on<br />
                            different destinations.
                        </p>
                    </div>

                    <div className="relative items-center justify-center mb-20 hidden lg:flex">
                        <div className="absolute w-full h-px bg-gray-700"></div>

                        <div className="flex justify-between z-10 w-full max-w-4xl px-4">

                            <div className="flex flex-col items-center -ml-18">
                                <div className="w-12 h-12 rounded-full border bg-black hover:bg-[#1B2073] border-gray-600 flex items-center justify-center text-lg">
                                    01
                                </div>
                            </div>

                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 rounded-full bg-black hover:bg-[#1B2073] border border-gray-600 flex items-center justify-center text-lg">
                                    02
                                </div>
                            </div>

                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 rounded-full border bg-black hover:bg-[#1B2073] border-gray-600 flex items-center justify-center text-lg">
                                    03
                                </div>
                            </div>

                            <div className="flex flex-col items-center -mr-18">
                                <div className="w-12 h-12 rounded-full hover:bg-[#1B2073] bg-black border border-gray-600 flex items-center justify-center text-lg">
                                    04
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">

                        <div>
                            <div className="lg:hidden mb-4 flex justify-center">
                                <div className="w-12 h-12 rounded-full bg-black border border-gray-600 flex items-center justify-center text-lg">
                                    01
                                </div>
                            </div>

                            <h3 className="text-xl font-bold mb-3">Apply Online</h3>
                            <p className="text-gray-400 leading-relaxed">
                                The first step is to assess the client's needs based on the type of visa
                                <span className="text-white font-semibold"> (Tourist, Business, Student, etc.)</span>.
                            </p>
                        </div>

                        <div>
                            <div className="lg:hidden mb-4 flex justify-center">
                                <div className="w-12 h-12 rounded-full bg-black border border-gray-600 flex items-center justify-center text-lg">
                                    02
                                </div>
                            </div>

                            <h3 className="text-xl font-bold mb-3">Get an Appointment</h3>
                            <p className="text-gray-400 leading-relaxed">
                                The first step is to assess the client's needs based on the type of visa
                                <span className="text-white font-semibold"> (Tourist, Business, Student, etc.)</span>.
                            </p>
                        </div>

                        <div>
                            <div className="lg:hidden mb-4 flex justify-center">
                                <div className="w-12 h-12 rounded-full bg-black border border-gray-600 flex items-center justify-center text-lg">
                                    03
                                </div>
                            </div>

                            <h3 className="text-xl font-bold mb-3">Submit Documents</h3>
                            <p className="text-gray-400 leading-relaxed">
                                The first step is to assess the client's needs based on the type of visa
                                <span className="text-white font-semibold"> (Tourist, Business, Student, etc.)</span>.
                            </p>
                        </div>

                        <div>
                            <div className="lg:hidden mb-4 flex justify-center">
                                <div className="w-12 h-12 rounded-full bg-black border border-gray-600 flex items-center justify-center text-lg">
                                    04
                                </div>
                            </div>

                            <h3 className="text-xl font-bold mb-3">Receive Visa</h3>
                            <p className="text-gray-400 leading-relaxed">
                                The first step is to assess the client's needs based on the type of visa
                                <span className="text-white font-semibold"> (Tourist, Business, Student, etc.)</span>.
                            </p>
                        </div>

                    </div>

                    <div className="flex flex-col items-center gap-5 mt-16 md:flex-row md:justify-center md:gap-10">

                        {/* email */}
                        <div className="flex items-center gap-3">

                            <div className="w-10 h-10 rounded-full bg-[#1B2073] flex items-center justify-center">
                                <MdEmail className="text-white text-xl" />
                            </div>

                            <div className="flex flex-col text-center md:text-left">
                                <span className="font-semibold">E-Message</span>

                                <a
                                    href="https://mail.google.com/mail/?view=cm&fs=1&to=info@example.com&su=Visa Inquiry&body=Hi, I want more details about the visa process."
                                    target="_blank"
                                    className="text-gray-400 hover:text-white transition"
                                >
                                    info@example.com
                                </a>
                            </div>

                        </div>

                        <span className="font-bold">OR</span>

                        {/* button */}
                        <button
                            onClick={() => navigate('/contact')}
                            className="
                             relative overflow-hidden group
                             px-6 py-2 rounded-full font-semibold cursor-pointer
                             bg-[#1B2073] text-white
                            "
                        >
                            <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                                Apply Online ↗
                            </span>

                            <span
                                className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full"
                            ></span>
                        </button>

                    </div>
                </div>
            </div>

            <Faq
                type="home"
                title="General Questions"
                subtitle="We're committed to offering more than just products—we provide exceptional experiences."
            />

            <Footer />

        </div>
    );
}

export default Visa;
