import { FaWhatsapp } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [whatsapp, setWhatsapp] = useState("");
    const [email, setEmail] = useState("");
    const [openDropdown, setOpenDropdown] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const dropdownRef = useRef(null);

    const current = window.location.pathname;

    const menuItems = [
        { name: "Home", path: "/" },
        { name: "Destinations", path: "/destinations" },
        { name: "Travel Package", path: "/travel-package" },
        { name: "Visa", path: "/visa" },
        { name: "Pages", path: "/pages" },
        { name: "Contact", path: "/contact" },
    ];

    useEffect(() => {
        axios.get("http://localhost:5000/api/get_contact_info")
            .then(res => {
                setWhatsapp(res.data.data.whatsapp_number);
                setEmail(res.data.data.email);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpenDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="w-full bg-white relative shadow">
            <div className="container mx-auto flex items-center justify-between py-3 px-2">

                <div className="lg:hidden">
                    <RxHamburgerMenu size={24} onClick={() => setOpenMenu(!openMenu)} />
                </div>

                <ul className="hidden lg:flex font-semibold items-center gap-7 text-[15px]">
                    {menuItems.slice(0, 5).map((item, i) => (
                        <li
                            key={i}
                            onClick={() => window.location.href = item.path}
                            className={`flex items-center cursor-pointer hover:text-blue-500 py-1 rounded
                                ${current === item.path ? " text-blue-500" : ""}`}
                        >
                            {item.name} <IoMdArrowDropdown size={20} />
                        </li>
                    ))}

                    <li
                        onClick={() => window.location.href = "/contact"}
                        className={`cursor-pointer hover:text-blue-500 px-3 py-1 rounded
                            ${current === "/contact" ? " text-blue-500" : ""}`}
                    >
                        Contact
                    </li>
                </ul>

                <div className="relative" ref={dropdownRef}>
                    <div
                        onClick={() => setOpenDropdown(!openDropdown)}
                        className="flex items-center gap-2 bg-gray-100 px-5.5 py-2 cursor-pointer select-none rounded"
                    >
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                            <FaWhatsapp className="text-green-600" size={22} />
                        </div>

                        <div className="flex flex-col leading-tight">
                            <span className="text-sm text-gray-500">WhatsApp</span>
                            <span
                                className="font-semibold hover:text-blue-500 text-[16px]"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(`https://wa.me/91${whatsapp}`, "_blank");
                                }}
                            >
                                +91 {whatsapp || "Loading..."}
                            </span>
                        </div>

                        <IoMdArrowDropdown size={20} />
                    </div>

                    <AnimatePresence>
                        {openDropdown && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                transition={{ duration: 0.25 }}
                                className="absolute right-0 mt-1 w-60 bg-white shadow-md z-50 p-4 rounded"
                            >
                                <div className="space-y-4">

                                    <div
                                        className="flex items-center gap-3 cursor-pointer"
                                        onClick={() => window.location.href = `mailto:${email}`}
                                    >
                                        <div className="w-10 h-8 bg-white rounded-full flex items-center justify-center shadow">
                                            <img
                                                src="/contact-info/mail-icon.svg"
                                                className="w-4 h-4"
                                                alt=""
                                            />
                                        </div>

                                        <p className="text-sm text-gray-600">
                                            Mail Support: <span className="font-semibold">{email}</span>
                                        </p>
                                    </div>

                                    <div
                                        className="flex items-center gap-3 cursor-pointer"
                                        onClick={() => window.open(`https://wa.me/91${whatsapp}`, "_blank")}
                                    >
                                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow">
                                            <img
                                                src="/contact-info/live-chat.svg"
                                                className="w-4 h-4"
                                                alt=""
                                            />
                                        </div>

                                        <p className="text-sm text-gray-600 flex flex-col">
                                            <span>More Inquiry:</span>
                                            <span className="font-semibold">+91 {whatsapp}</span>
                                        </p>
                                    </div>

                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <AnimatePresence>
                {openMenu && (
                    <motion.div
                        initial={{ x: -200, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -200, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="lg:hidden bg-white border-t shadow p-4 space-y-4"
                    >
                        {menuItems.map((item, i) => (
                            <p
                                key={i}
                                onClick={() => window.location.href = item.path}
                                className={`text-gray-700 text-[16px] py-1 border-b cursor-pointer rounded
                                    ${current === item.path ? "bg-blue-500 text-white" : ""}`}
                            >
                                {item.name}
                            </p>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
