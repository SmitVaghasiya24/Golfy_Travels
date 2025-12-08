import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";

function EnquiryModal({ open, onClose }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        people: "",
        date: "",
        details: "",
    });

    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validate = () => {
        let newErrors = {};
        if (!form.name.trim()) newErrors.name = "Please fill out this field.";
        if (!form.email.trim()) newErrors.email = "Please fill out this field.";
        if (!form.people.trim()) newErrors.people = "Please fill out this field.";
        if (!form.date.trim()) newErrors.date = "Please fill out this field.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) return;

        setSubmitted(true);

        setTimeout(() => {
            onClose();
            setSubmitted(false);
            setForm({
                name: "",
                email: "",
                people: "",
                date: "",
                details: "",
            });
        }, 2000);
    };

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    <motion.div
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-10 left-1/2 -translate-x-1/2 w-[90%] max-w-3xl bg-white rounded-2xl shadow-xl p-8 z-50"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">We’d Love to Hear From You!</h2>
                            <button onClick={onClose}>
                                <IoMdClose className="text-2xl text-gray-500 hover:bg-red-500 w-6 h-6 rounded-full hover:text-white" />
                            </button>
                        </div>

                        {!submitted ? (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="font-semibold text-gray-600">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="Your Name"
                                            className="mt-1 w-full p-3 bg-gray-100 rounded-lg outline-none"
                                        />
                                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <label className="font-semibold text-gray-600">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="Email Address"
                                            className="mt-1 w-full p-3 bg-gray-100 rounded-lg outline-none"
                                        />
                                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                                    </div>

                                    <div>
                                        <label className="font-semibold text-gray-600">Number of People*</label>
                                        <input
                                            type="number"
                                            name="people"
                                            value={form.people}
                                            onChange={handleChange}
                                            placeholder="Number of people"
                                            className="mt-1 w-full p-3 bg-gray-100 rounded-lg outline-none"
                                        />
                                        {errors.people && <p className="text-red-500 text-sm">{errors.people}</p>}
                                    </div>

                                    <div>
                                        <label className="font-semibold text-gray-600">Travel Date</label>
                                        <input
                                            type="date"
                                            name="date"
                                            value={form.date}
                                            onChange={handleChange}
                                            className="mt-1 w-full p-3 bg-gray-100 rounded-lg outline-none"
                                        />
                                        {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <label className="font-semibold text-gray-600">Tour Details</label>
                                    <textarea
                                        name="details"
                                        value={form.details}
                                        onChange={handleChange}
                                        placeholder="Write about tour info"
                                        className="mt-2 w-full bg-gray-100 p-4 rounded-xl h-36 outline-none"
                                    ></textarea>
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    className="mt-6 bg-black text-white px-6 py-3 rounded-xl font-semibold"
                                >
                                    Submit For Enquiry ↗
                                </button>
                            </>
                        ) : (
                            <div className="text-center py-10">
                                <h3 className="text-2xl font-semibold text-green-600">Thank You!</h3>
                                <p className="text-gray-600 mt-2">Your enquiry has been submitted.</p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export default EnquiryModal;
