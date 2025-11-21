import React, { useState } from "react";
import BreadcrumbHero from "../components/Breadcrumb";
import { ImLocation2 } from "react-icons/im";
import { FiChevronDown } from "react-icons/fi";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";


function Contact() {
    const [open, setOpen] = useState(false);

    const offices = [
        {
            title: "United State",
            phone: "+1 (212) 555-7890",
            address1: "Skyline Plaza, 5th Floor, 123 Main Street",
            address2: "Los Angeles, CA 90001, USA",
            bg: "bg-[#E6F6A9]"
        },
        {
            title: "Dubai Office",
            phone: "+971 4 123 4567",
            address1: "Office No. 1203, 12th Floor, Bay Tower, Al",
            address2: "Abraj Street, Business Bay, Dubai, UAE",
            bg: "bg-[#F0F0F0]"
        },
        {
            title: "United Kingdom",
            phone: "+44 20 7946 1234",
            address1: "3rd Floor, 15 Bedford Street Covent Garden,",
            address2: "London, WC2E 9HE, UK",
            bg: "bg-[#BDEBCE]"
        }
    ];

    const options = ["Maldives", "France", "United States", "Thailand"];

    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        phone: "",
        destination: "",
        message: "",
        agreed_terms: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            full_name: formData.fullname,
            email: formData.email,
            phone: formData.phone,
            destination: formData.destination,
            message: formData.message,
            agreed_terms: formData.agree ? "true" : "false"
        };


        try {
            await axios.post("http://localhost:5000/api/create_contact", payload);

            toast.success("Your message has been sent!");

            setFormData({
                fullname: "",
                email: "",
                phone: "",
                destination: "",
                message: "",
                agree: false
            });
        } catch (error) {
            toast.error("Something went wrong!");
            console.log(error);
        }
    };

    return (
        <div>
            <BreadcrumbHero title="Contact Us" background="/breadcrumb.jpeg" />

            <div className="relative px-4 mt-14 py-16">
                <img className="absolute right-0 bottom-40" src="/contact-info/contact-page-vector1.svg" alt="vector" />

                {/* office address */}
                <div className="container py-[35px] grid md:grid-cols-3 gap-8 mb-20">
                    {offices.map((item, i) => (
                        <div
                            key={i}
                            className={`${item.bg} rounded-xl p-10 text-center shadow-sm group`}
                        >
                            <div
                                className="w-14 h-14 bg-transparent border border-gray-400 rounded-full flex items-center justify-center mx-auto mb-6
                                transition-all duration-500 ease-in-out
                                group-hover:bg-black group-hover:text-white"
                            >
                                <ImLocation2 size={25} />
                            </div>

                            <h2 className="text-2xl font-semibold mb-4">{item.title}</h2>

                            <p className="font-medium mb-4">
                                Contact: <span className="font-semibold">{item.phone}</span>
                            </p>

                            <p className="text-gray-700">{item.address1}</p>
                            <p className="text-gray-700">{item.address2}</p>
                        </div>
                    ))}
                </div>

            </div>

            <img
                className="absolute left-20"
                src="/contact-info/contact-page-vector2.svg"
                alt="vector"
            />

            {/* contact form */}
            <div className="bg-[#F2F2FF] p-10 rounded-3xl max-w-4xl mt-14 mx-auto shadow-sm">
                <h2 className="text-center text-3xl font-bold mb-3">Get in Touch!</h2>
                <p className="text-center text-gray-600 mb-10">
                    We’re excited to hear from you. Whether you have a question or want to discuss a project.
                </p>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* full Name */}
                    <div>
                        <label className="text-sm font-medium">Full Name</label>
                        <input
                            type="text"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleChange}
                            className="w-full mt-2 p-3 rounded-lg border bg-white border-gray-300"
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    {/* email */}
                    <div>
                        <label className="text-sm font-medium">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full mt-2 p-3 rounded-lg border bg-white border-gray-300"
                            placeholder="info@example.com"
                            required
                        />
                    </div>

                    {/* phone */}
                    <div>
                        <label className="text-sm font-medium">Phone Number</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full mt-2 p-3 rounded-lg border bg-white border-gray-300"
                            placeholder="+92 567 *** ***"
                            required
                        />
                    </div>

                    {/* destination */}
                    <div className="w-full mt-2 relative md:col-span-1">
                        <label className="text-sm font-medium">Where are you going?</label>

                        <button
                            onClick={() => setOpen(!open)}
                            className="w-full p-3 mt-2 rounded-lg border border-gray-300 flex justify-between items-center bg-white"
                            type="button"
                        >
                            <span className={formData.destination ? "text-black" : "text-gray-400"}>
                                {formData.destination || "Select destination"}
                            </span>

                            <motion.div
                                animate={{ rotate: open ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <FiChevronDown />
                            </motion.div>
                        </button>

                        <AnimatePresence>
                            {open && (
                                <motion.ul
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute left-0 right-0 bg-white shadow-lg rounded-lg mt-1 z-20"
                                >
                                    {options.map((opt) => (
                                        <li
                                            key={opt}
                                            onClick={() => {
                                                setFormData({ ...formData, destination: opt });
                                                setOpen(false);
                                            }}
                                            className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                                        >
                                            {opt}
                                        </li>
                                    ))}
                                </motion.ul>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* message */}
                    <div className="md:col-span-2">
                        <label className="text-sm font-medium">Brief/Message</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="5"
                            className="w-full mt-2 p-3 rounded-lg border bg-white border-gray-300"
                            placeholder="Write something about inquiry"
                            required
                        />
                    </div>

                    <div className="md:col-span-2 flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="agree"
                            checked={formData.agree}
                            onChange={handleChange}
                            required
                        />
                        <p className="text-sm text-gray-600">
                            I agree with your privacy policy & terms.
                        </p>
                    </div>

                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                        >
                            Submit Now →
                        </button>
                    </div>

                </form>
            </div>

            <div className="cursor-hide w-full h-[500px] overflow-hidden mt-10">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235014.29918736647!2d72.41493042707977!3d23.020158084850195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1763716494846!5m2!1sen!2sin"
                    className="w-full h-full border-0"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>
    );
}

export default Contact;
