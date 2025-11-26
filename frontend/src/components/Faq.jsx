import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";

function Faq({ type = "home", title, subtitle }) {
    const [faqs, setFaqs] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/faq");

                let data = res.data.FAQs;

                if (type === "destination") {
                    data = data.slice(2, 6);
                }

                setFaqs(data);
            } catch (error) {
                console.log("Error fetching FAQs:", error);
            }
        };

        fetchFaqs();
    }, [type]);

    const toggleFAQ = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: "easeOut",
            },
        },
    };

    return (
        <div className="py-16 max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-2">{title}</h2>
            <p className="text-gray-600 text-center max-w-xl mx-auto mb-10">
                {subtitle}
            </p>

            {faqs.length > 0 && (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-4"
                >
                    {faqs.map((faq, index) => {
                        const isActive = activeIndex === index;

                        return (
                            <motion.div
                                key={faq.id}
                                variants={itemVariants}
                                onClick={() => toggleFAQ(index)}
                                className={`
                                    rounded-xl cursor-pointer p-5 transition-all duration-300
                                    ${isActive
                                        ? "bg-white border border-blue-500 shadow-sm"
                                        : "bg-[#F0F0F0] border border-transparent"}
                                `}
                            >
                                <div className="flex justify-between items-center">
                                    <h3 className="font-semibold text-lg">{faq.question}</h3>

                                    <FiChevronDown
                                        className={`
                                            text-xl transition-transform duration-300
                                            ${isActive ? "rotate-180 text-blue-500" : "rotate-0"}
                                        `}
                                    />
                                </div>

                                <div
                                    className={`
                                        overflow-hidden transition-all duration-500
                                        ${isActive ? "max-h-[500px] mt-3" : "max-h-0 mt-0"}
                                    `}
                                >
                                    <p className="text-gray-600 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            )}
        </div>
    );
}

export default Faq;
