import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function BillingAddress({ onClose, editData }) {

    const [formData, setFormData] = useState({
        firstName: editData?.first_name || "",
        lastName: editData?.last_name || "",
        country: editData?.country || "",
        address: editData?.address || "",
        apartment: editData?.apartment || "",
        city: editData?.city || "",
        state: editData?.state || "",
        zip: editData?.zip || "",
        phone: editData?.phone || "",
        email: editData?.email || ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const user = JSON.parse(localStorage.getItem("userData"));
            const userId = user?.id;

            if (!userId) {
                toast.error("User not logged in!");
                return;
            }

            await axios.post(
                `http://localhost:5000/api/insert_billing_address/${userId}`,
                formData
            );

            toast.success("Billing address saved!");
            onClose();

        } catch (err) {
            console.log(err);
            toast.error("Something went wrong");
        }
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-white p-5 rounded shadow-sm space-y-5"
        >

            <div>
                <label className="text-sm font-medium">
                    First Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="border w-full p-2"
                    required
                />
            </div>

            <div>
                <label className="text-sm font-medium">
                    Last Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="border w-full p-2"
                    required
                />
            </div>

            <div>
                <label className="text-sm font-medium">
                    Country <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="border w-full p-2"
                    required
                />
            </div>

            <div>
                <label className="text-sm font-medium">
                    Address <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="border w-full p-2"
                    required
                />
            </div>

            <div>
                <label className="text-sm font-medium">
                    Apartment
                </label>
                <input
                    type="text"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleChange}
                    className="border w-full p-2"
                />
            </div>

            <div>
                <label className="text-sm font-medium">
                    City <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="border w-full p-2"
                    required
                />
            </div>

            <div>
                <label className="text-sm font-medium">
                    State <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="border w-full p-2"
                    required
                />
            </div>

            <div>
                <label className="text-sm font-medium">
                    Zip Code <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    className="border w-full p-2"
                    required
                />
            </div>

            <div>
                <label className="text-sm font-medium">
                    Phone <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="border w-full p-2"
                    required
                />
            </div>

            <div>
                <label className="text-sm font-medium">
                    Email <span className="text-red-500">*</span>
                </label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border w-full p-2"
                    required
                />
            </div>

            <div className="flex gap-3">
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {editData ? "UPDATE ADDRESS" : "SAVE ADDRESS"}
                </button>

                <button
                    type="button"
                    onClick={onClose}
                    className="bg-gray-300 px-4 py-2 rounded"
                >
                    Cancel
                </button>
            </div>

        </motion.form>
    );
}

export default BillingAddress;
