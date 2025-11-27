import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import { FaFlagCheckered, FaGlobeAmericas } from "react-icons/fa";
import { MdEmojiEmotions } from "react-icons/md";
import { FaRedoAlt } from "react-icons/fa";


const useCounter = (end, isInView, duration = 1500) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;

        let current = 0;
        const increment = end / (duration / 30);

        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            setCount(Math.floor(current));
        }, 30);

        return () => clearInterval(timer);
    }, [isInView]);

    return count;
};

function Experience() {
    const stats = [
        { icon: <FaFlagCheckered />, value: 26, label: "Tour Completed" },
        { icon: <FaGlobeAmericas />, value: 12, label: "Travel Experience" },
        { icon: <MdEmojiEmotions />, value: 20, label: "Happy Traveler" },
        { icon: <FaRedoAlt />, value: 98, label: "Retention Rate", percent: true },
    ];

    const refs = useRef(stats.map(() => React.createRef()));

    const inViews = refs.current.map((ref) =>
        useInView(ref, { once: true, margin: "-50px" })
    );

    const counters = inViews.map((visible, index) =>
        useCounter(stats[index].value, visible)
    );

    return (
        <div className="bg-[#f5f5f5] py-12">
            <div className="container mx-auto px-6">

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
                    {stats.map((item, index) => (
                        <div
                            key={index}
                            ref={refs.current[index]}
                            className=" flex  flex-col items-center text-center lg:flex-row lg:items-center lg:text-left gap-4 relative"
                        >
                            <div className="text-4xl text-blue-600">{item.icon}</div>

                            <div>
                                <h3 className="text-3xl font-bold">
                                    {counters[index]}
                                    {item.percent ? "%" : "+"}
                                </h3>
                                <p className="text-black font-semibold">{item.label}</p>
                            </div>

                            {/* line */}
                            {index !== stats.length - 1 && (
                                <div className="hidden lg:block absolute -right-5 top-1/2 -translate-y-1/2">
                                    <div className="flex flex-col items-center">
                                        <div className="w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent border-t-gray-300"></div>
                                        <div className="h-16 w-[1.5px] bg-gray-300"></div>
                                        <div className="w-0 h-0 border-l-4 border-r-4 border-b-6 border-transparent border-b-gray-300"></div>
                                    </div>
                                </div>
                            )}
                        </div>

                    ))}
                </div>

            </div>
        </div>
    );
}

export default Experience;
