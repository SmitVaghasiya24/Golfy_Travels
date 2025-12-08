import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

export default function CheckoutModal({ onClose, tour }) {
    const [selectedService, setSelectedService] = useState(false);
    const [serviceQty, setServiceQty] = useState(0);

    const [bookingDate, setBookingDate] = useState("");
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);

    const user = JSON.parse(localStorage.getItem("userData"));
    const user_id = user?.id;

    // FINAL PRICE CALCULATION
    const tourPrice =
        Number(tour.discount_price) > 0 ? Number(tour.discount_price) : Number(tour.price);

    const addonsTotal = selectedService ? serviceQty * 49 : 0;

    const final_price = tourPrice * adults + addonsTotal;

    // MAIN FUNCTION - ADD TO CART
    const handleBookNow = async () => {
        if (!user_id) {
            alert("Please login to continue");
            return;
        }

        if (!bookingDate) {
            alert("Please select a booking date");
            return;
        }

        const payload = {
            user_id,
            item_type: "tour",
            item_id: tour.tour_id,
            booking_date: bookingDate,
            adults,
            children,
            quantity: 1,
            addons: selectedService
                ? [{ name: "Souvenir Photos", qty: serviceQty, price: 49 }]
                : [],
            base_price: tour.price,
            final_price,
        };

        try {
            const res = await fetch("http://localhost:5000/api/cart/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (data.success) {
                onClose();
                window.location.href = "/pages/cart";
            }
        } catch (error) {
            console.log("Cart Add Error:", error);
        }
    };

    if (!tour) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 bg-black/40 flex items-start justify-center z-50">

                {/* BACKDROP */}
                <motion.div
                    className="absolute inset-0 bg-black/40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                />

                {/* MODAL BOX */}
                <motion.div
                    initial={{ y: -80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -80, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="bg-white rounded-xl w-full max-w-3xl mt-10 p-8 relative z-50"
                >
                    {/* CLOSE BUTTON */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-300"
                    >
                        <IoClose size={18} />
                    </button>

                    {/* TITLE */}
                    <h2 className="text-3xl font-bold text-center">Dates & Availability</h2>

                    {/* DATE + TRAVELERS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
                        
                        {/* DATE PICKER */}
                        <div className="border rounded-xl p-4">
                            <p className="text-sm text-gray-500 mb-1">Select Date</p>
                            <input
                                type="date"
                                value={bookingDate}
                                onChange={(e) => setBookingDate(e.target.value)}
                                className="border p-2 rounded w-full cursor-pointer"
                            />
                        </div>

                        {/* TRAVELERS SELECT */}
                        <div className="border rounded-xl p-4">
                            <p className="text-sm text-gray-500 mb-1">Travelers</p>

                            <div className="flex justify-between items-center">
                                <span>Adults</span>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => adults > 1 && setAdults(adults - 1)}
                                        className="w-7 h-7 border rounded-full flex items-center justify-center"
                                    >
                                        –
                                    </button>
                                    <span>{adults}</span>
                                    <button
                                        onClick={() => setAdults(adults + 1)}
                                        className="w-7 h-7 border rounded-full flex items-center justify-center"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mt-3">
                                <span>Children</span>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => children > 0 && setChildren(children - 1)}
                                        className="w-7 h-7 border rounded-full flex items-center justify-center"
                                    >
                                        –
                                    </button>
                                    <span>{children}</span>
                                    <button
                                        onClick={() => setChildren(children + 1)}
                                        className="w-7 h-7 border rounded-full flex items-center justify-center"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* TOUR DETAILS */}
                    <div className="mt-8 border rounded-xl p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-lg font-semibold">{tour.title}</p>

                                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                                    {tour.description?.slice(0, 120)}...
                                </p>
                            </div>

                            <div className="text-right">
                                {Number(tour.discount_price) > 0 && (
                                    <p className="line-through text-gray-400 text-sm">
                                        ₹{tour.price}
                                    </p>
                                )}

                                <p className="text-xl font-bold">
                                    ₹{tourPrice}
                                </p>

                                <p className="text-sm">
                                    × {adults} Adult{adults > 1 ? "s" : ""}
                                </p>
                            </div>
                        </div>

                        {/* ADDON SERVICES */}
                        <div className="mt-6">
                            <p className="font-semibold">Additional Services -</p>

                            <div className="flex justify-between mt-4">
                                <div className="flex items-start gap-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedService}
                                        onChange={() => setSelectedService(!selectedService)}
                                        className="w-4 h-4 mt-1"
                                    />

                                    <div>
                                        <p className="font-medium">Souvenir Photographs</p>
                                        <p className="text-sm text-gray-600">
                                            Professional keepsake photo packages.
                                        </p>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="font-semibold">₹49</p>
                                    <p className="text-xs text-gray-500">Per Hour</p>

                                    <div className="flex items-center gap-3 mt-2">
                                        <button
                                            onClick={() => serviceQty > 0 && setServiceQty(serviceQty - 1)}
                                            className="w-7 h-7 border rounded-full text-lg flex items-center justify-center"
                                        >
                                            –
                                        </button>

                                        <span className="font-semibold">{serviceQty}</span>

                                        <button
                                            onClick={() => setServiceQty(serviceQty + 1)}
                                            className="w-7 h-7 border rounded-full text-lg flex items-center justify-center"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* BOOK NOW BUTTON */}
                        <div className="mt-8 flex justify-start">
                            <button
                                onClick={handleBookNow}
                                className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                            >
                                Book Now ↗
                            </button>
                        </div>
                    </div>

                </motion.div>
            </div>
        </AnimatePresence>
    );
}
