import React, { useState } from "react";
import axios from "axios";

function ShippingAddressForm({ user_id, onSuccess }) {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        country: "",
        streetAddress: "",
        apartment: "",
        city: "",
        state: "",
        zipCode: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                `http://localhost:5000/api/insert_shipping_address/${user_id}`,
                form
            );

            onSuccess(); // refresh parent after save
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="bg-white p-5 w-full max-w-3xl rounded border">
            <h1 className="text-2xl font-semibold mb-6">Shipping address</h1>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* FIRST + LAST NAME */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium mb-1">
                            First name <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="firstName"
                            className="border w-full p-2"
                            value={form.firstName}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">
                            Last name <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="lastName"
                            className="border w-full p-2"
                            value={form.lastName}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* COUNTRY */}
                <div>
                    <label className="block font-medium mb-1">
                        Country / Region <span className="text-red-500">*</span>
                    </label>

                    <select
                        name="country"
                        className="border w-full p-2"
                        value={form.country}
                        onChange={handleChange}
                    >
                        <option value="">Select a country / region…</option>
                        <option value="India">India</option>
                        <option value="USA">United States</option>
                        <option value="UK">United Kingdom</option>
                    </select>
                </div>

                {/* STREET ADDRESS */}
                <div>
                    <label className="block font-medium mb-1">
                        Street address <span className="text-red-500">*</span>
                    </label>

                    <input
                        name="streetAddress"
                        className="border w-full p-2 mb-3"
                        placeholder="House number and street name"
                        value={form.streetAddress}
                        onChange={handleChange}
                    />

                    <input
                        name="apartment"
                        className="border w-full p-2"
                        placeholder="Apartment, suite, unit, etc. (optional)"
                        value={form.apartment}
                        onChange={handleChange}
                    />
                </div>

                {/* CITY */}
                <div>
                    <label className="block font-medium mb-1">
                        Town / City <span className="text-red-500">*</span>
                    </label>

                    <input
                        name="city"
                        className="border w-full p-2"
                        value={form.city}
                        onChange={handleChange}
                    />
                </div>

                {/* STATE */}
                <div>
                    <label className="block font-medium mb-1">
                        State <span className="text-red-500">*</span>
                    </label>

                    <select
                        name="state"
                        className="border w-full p-2"
                        value={form.state}
                        onChange={handleChange}
                    >
                        <option value="">Select an option…</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Delhi">Delhi</option>
                    </select>
                </div>

                {/* ZIP CODE */}
                <div>
                    <label className="block font-medium mb-1">
                        ZIP Code <span className="text-red-500">*</span>
                    </label>

                    <input
                        name="zipCode"
                        className="border w-full p-2"
                        value={form.zipCode}
                        onChange={handleChange}
                    />
                </div>

                {/* BUTTON */}
                <button className="bg-blue-600 text-white px-6 py-2 rounded">
                    SAVE ADDRESS
                </button>
            </form>
        </div>
    );
}

export default ShippingAddressForm;
