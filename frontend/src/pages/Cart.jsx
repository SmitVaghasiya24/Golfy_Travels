import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";


function Cart() {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const userData = JSON.parse(localStorage.getItem("userData"));
    const user_id = userData?.id;

    if (!user_id) return <p className="text-center mt-10">Please login first.</p>;

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
                console.log("Cart Fetch Error:", err);
            } finally {
                setLoading(false);
            }
        };

        if (user_id) {
            fetchCart();
        }
    }, [user_id]);

    const handleRemove = async (cart_id) => {
        try {
            const res = await API.delete(`/api/item/${cart_id}`);


            const data = await res.json();

            if (data.success) {
                setCart((prev) => prev.filter((item) => item.cart_id !== cart_id));
            }
        } catch (err) {
            console.log("Remove Cart Error:", err);
        }
    };

    const subtotal = cart.reduce((acc, item) => acc + Number(item.final_price), 0);
    const flatRate = 30;
    const total = subtotal + flatRate;

    const handleCheckout = () => {
        navigate("/checkout", {
            state: { subtotal, flatRate, total }
        });
    };

    if (loading) return <p className="text-center mt-10">Loading cart...</p>;

    return (
        <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

            <div className="lg:col-span-2 bg-white p-5 rounded-lg shadow-sm border">

                <div className="grid grid-cols-2 border-b pb-3 mb-4">
                    <p className="font-semibold text-gray-700">PRODUCT</p>
                    <p className="font-semibold text-gray-700 text-right">TOTAL</p>
                </div>

                {cart.length === 0 ? (
                    <p className="text-gray-600">No items in cart.</p>
                ) : (
                    cart.map((item) => (
                        <div
                            key={item.cart_id}
                            className="grid grid-cols-2 border-b py-6 gap-4"
                        >
                            <div className="flex gap-4">

                                {item.item_type === "hotel" && item.hotel_images?.length > 0 && (
                                    <img
                                        src={item.hotel_images[0]}
                                        alt="Hotel"
                                        className="w-28 h-24 rounded object-cover"
                                    />
                                )}

                                {item.item_type === "tour" && item.tour_thumb && (
                                    <img
                                        src={item.tour_thumb}
                                        alt="Tour"
                                        className="w-28 h-24 rounded object-cover"
                                    />
                                )}

                                <div>
                                    <h3 className="text-lg font-bold">
                                        {item.item_type === "hotel" ? item.hotel_name : item.tour_title}
                                    </h3>

                                    <p className="text-gray-700 font-semibold">₹{item.final_price}</p>

                                    {item.item_type === "tour" && (
                                        <>
                                            <p className="text-sm text-gray-600">
                                                Adult: ₹{item.final_price} × {item.adults}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Children: ₹0 × {item.children}
                                            </p>
                                            {/* <p className="text-sm mt-1 text-gray-600">
                                                Booking Date: {item.booking_date}
                                            </p> */}
                                        </>
                                    )}

                                    {item.item_type === "hotel" && (
                                        <p className="text-sm text-gray-600">
                                            Nights: {item.quantity}
                                        </p>
                                    )}

                                    <button
                                        onClick={() => handleRemove(item.cart_id)}
                                        className="text-red-600 text-sm mt-2 hover:underline"
                                    >
                                        Remove item
                                    </button>
                                </div>
                            </div>

                            <div className="text-right font-semibold text-gray-800">
                                ₹{item.final_price}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {cart.length > 0 && (
                <div className="bg-white p-6 border rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-4 border-b pb-2">CART TOTALS</h3>

                    <div className="space-y-3 text-gray-700">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between border-b pb-3">
                            <span>Flat rate</span>
                            <span className="font-semibold">₹{flatRate.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between text-lg font-bold pt-2">
                            <span>Estimated total</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>
                    </div>

                    <button
                        onClick={handleCheckout}
                        className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold transition"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            )}

        </div>
    );
}

export default Cart;
