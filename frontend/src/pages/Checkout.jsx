import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";


function Checkout() {
    const location = useLocation();
    const navigate = useNavigate();

    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    const { subtotal, flatRate, total } = location.state || {};

    const userData = JSON.parse(localStorage.getItem("userData"));
    const user_id = userData?.id;

   useEffect(() => {
    const fetchCart = async () => {
        try {
            const res = await API.get(
                `/api/${user_id}`
            );

            if (res.data?.success) {
                setCart(res.data.cart);
            }
        } catch (err) {
            console.log("Checkout Cart Error:", err);
        } finally {
            setLoading(false);
        }
    };

    if (user_id) {
        fetchCart();
    }
}, [user_id]);


 const handlePlaceOrder = async () => {
    const payload = {
        user_id,
        subtotal,
        tax: 0,
        service_fee: flatRate,
        discount: 0,
        total_amount: total,
        payment_method: "bank",
        payment_status: "pending",
    };

    try {
        const res = await API.post(
            "/api/place-order",
            payload
        );

        if (res.data?.success) {
            alert("Order placed! Order ID: " + res.data.order_id);
            navigate("/order-success/" + res.data.order_id);
        }
    } catch (error) {
        console.log("Place Order Error:", error);
    }
};


    if (loading) return <p className="text-center mt-10">Loading checkout...</p>;

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-3xl font-semibold mb-6">Checkout</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

                <div className="lg:col-span-2 space-y-10">

                    <div>
                        <h3 className="text-lg font-semibold mb-3">Contact information</h3>
                        <input
                            type="email"
                            placeholder="Email address"
                            className="w-full border p-3 rounded mb-2"
                        />
                        <p className="text-sm text-gray-600">We’ll use this email for order updates.</p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-3">Shipping address</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                            <input type="text" placeholder="First name" className="border p-3 rounded" />
                            <input type="text" placeholder="Last name" className="border p-3 rounded" />
                        </div>

                        <input type="text" placeholder="Address" className="w-full border p-3 rounded mb-3" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                            <input type="text" placeholder="City" className="border p-3 rounded" />
                            <input type="text" placeholder="State" className="border p-3 rounded" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <input type="text" placeholder="ZIP Code" className="border p-3 rounded" />
                            <input type="text" placeholder="Phone (optional)" className="border p-3 rounded" />
                        </div>

                        <label className="flex items-center gap-2 mt-3 text-sm">
                            <input type="checkbox" />
                            Use same address for billing
                        </label>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-3">Payment options</h3>

                        <div className="space-y-3">

                            <label className="flex items-start gap-3 border p-3 rounded cursor-pointer">
                                <input type="radio" name="payment" defaultChecked />
                                <div>
                                    <p className="font-medium">Direct bank transfer</p>
                                    <p className="text-sm text-gray-600">
                                        Make your payment directly into our bank account.
                                    </p>
                                </div>
                            </label>

                            <label className="flex items-center gap-3 border p-3 rounded cursor-pointer">
                                <input type="radio" name="payment" />
                                Check payments
                            </label>

                            <label className="flex items-center gap-3 border p-3 rounded cursor-pointer">
                                <input type="radio" name="payment" />
                                Cash on delivery
                            </label>
                        </div>
                    </div>

                    <div className=" flex justify-between mt-2">

                        <button
                            onClick={() => navigate("/pages/cart")}
                            className=" text-gray-800 rounded-md font-medium "
                        >
                            Return to Cart
                        </button>
                        <button
                            onClick={handlePlaceOrder}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold "
                        >
                            Place Order
                        </button>


                    </div>

                </div>

                <div className="bg-white border rounded-lg p-5 shadow-sm">

                    <h3 className="text-lg font-semibold mb-4">Order summary</h3>

                    <div className="space-y-5">

                        {cart.map((item) => (
                            <div key={item.cart_id} className="flex justify-between border-b pb-3">

                                <div className="flex gap-3">
                                    <img
                                        src={item.item_type === "hotel" ? item.hotel_images[0] : item.tour_thumb}
                                        className="w-16 h-16 rounded object-cover"
                                    />
                                    <div>
                                        <p className="font-medium">{item.item_type === "hotel" ? item.hotel_name : item.tour_title}</p>
                                        <p className="text-sm text-gray-600">₹{item.final_price}</p>
                                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                    </div>
                                </div>

                                <div className="font-semibold">
                                    ₹{item.final_price}
                                </div>
                            </div>
                        ))}

                    </div>

                    <div className="mt-6 space-y-2 text-gray-700">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span className="font-semibold">₹{subtotal}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Flat rate</span>
                            <span className="font-semibold">₹{flatRate}</span>
                        </div>

                        <div className="flex justify-between font-bold text-lg border-t pt-3">
                            <span>Total</span>
                            <span>₹{total}</span>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Checkout;
