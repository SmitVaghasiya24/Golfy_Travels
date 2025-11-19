import React, { useState, useEffect, useRef } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTop() {
    const [show, setShow] = useState(false);
    const circleRef = useRef(null);

    const radius = 22.5;
    const stroke = 2;
    const normalizedRadius = radius - stroke / 2;
    const circumference = 2 * Math.PI * normalizedRadius;

    const handleScroll = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        if (circleRef.current) {
            const offset = circumference - (scrollPercent / 100) * circumference;
            circleRef.current.style.strokeDashoffset = offset;
        }
        setShow(scrollTop > 150);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        if (circleRef.current) {
            circleRef.current.style.strokeDasharray = circumference;
            circleRef.current.style.transition = "stroke-dashoffset 0.15s linear";
            circleRef.current.style.strokeLinecap = "round";
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [circumference]);

    return (
        <div
            className={`fixed bottom-8 right-8 w-11 h-11 flex items-center justify-center cursor-pointer transition-opacity duration-300
                ${show ? "opacity-100" : "opacity-0"}
            `}
            onClick={scrollToTop}
        >
            <svg
                height={radius * 2}
                width={radius * 2}
                className="absolute"
                style={{ filter: "blur(0.3px)" }} 
            >
                <circle
                    ref={circleRef}
                    stroke="#1881FE"
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
            </svg>

            <FaArrowUp className="text-[#1881FE] text-lg z-10" />
        </div>
    );
}
