import React, { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import API from "../../../services/api";

function ShippingAddressForm({ user_id, onSuccess, onClose, editData }) {

    const [formData, setFormData] = useState({
        firstName: editData?.first_name || "",
        lastName: editData?.last_name || "",
        country: editData?.country || "",
        address: editData?.address || "",
        apartment: editData?.apartment || "",
        city: editData?.city || "",
        state: editData?.state || "",
        zip: editData?.zip || ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await API.post(
                `/api/insert_shipping_address/${user_id}`,
                formData
            );

            toast.success("Shipping address saved!");
            onSuccess();

        } catch (err) {
            console.log(err);
            toast.error("Failed to save address");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-5 w-full max-w-3xl rounded shadow-sm"
        >
            <h1 className="text-2xl font-semibold mb-6">
                {editData ? "Edit shipping address" : "Add shipping address"}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium mb-1">
                            First name <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="firstName"
                            className="border w-full p-2"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">
                            Last name <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="lastName"
                            className="border w-full p-2"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block font-medium mb-1">
                        Country / Region <span className="text-red-500">*</span>
                    </label>

                    <select
                        name="country"
                        className="border w-full p-2"
                        value={formData.country}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a country…</option>
                        <option value="India">India</option>
                        <option value="USA">United States</option>
                        <option value="UK">United Kingdom</option>
                    </select>
                </div>

                <div>
                    <label className="block font-medium mb-1">
                        Street address <span className="text-red-500">*</span>
                    </label>

                    <input
                        name="address"
                        className="border w-full p-2 mb-3"
                        placeholder="House number and street name"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="apartment"
                        className="border w-full p-2"
                        placeholder="Apartment, suite, unit (optional)"
                        value={formData.apartment}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">
                        City <span className="text-red-500">*</span>
                    </label>

                    <input
                        name="city"
                        className="border w-full p-2"
                        value={formData.city}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">
                        State <span className="text-red-500">*</span>
                    </label>

                    <select
                        name="state"
                        className="border w-full p-2"
                        value={formData.state}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select state…</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Delhi">Delhi</option>
                    </select>
                </div>

                <div>
                    <label className="block font-medium mb-1">
                        ZIP Code <span className="text-red-500">*</span>
                    </label>

                    <input
                        name="zip"
                        className="border w-full p-2"
                        value={formData.zip}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="flex gap-3">
                    <button
                        className="bg-blue-600 text-white px-6 py-2 rounded"
                        type="submit"
                    >
                        {editData ? "UPDATE ADDRESS" : "SAVE ADDRESS"}
                    </button>

                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-300 px-6 py-2 rounded"
                    >
                        Cancel
                    </button>
                </div>

            </form>
        </motion.div>
    );
}

export default ShippingAddressForm;
