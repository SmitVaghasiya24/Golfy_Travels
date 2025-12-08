import React, { useState } from "react";

function ReviewModal({ close }) {

    const categories = ["Overall", "Transport", "Food", "Hospitality", "Destination"];

    const [ratings, setRatings] = useState({
        Overall: 0,
        Transport: 0,
        Food: 0,
        Hospitality: 0,
        Destination: 0
    });

    const [feedback, setFeedback] = useState("");
    const [name, setName] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleStarClick = (category, score) => {
        setRatings(prev => ({ ...prev, [category]: score }));
    };

    const handleSubmit = () => {
        setRatings({
            Overall: 0,
            Transport: 0,
            Food: 0,
            Hospitality: 0,
            Destination: 0
        });
        setFeedback("");
        setName("");

        setSubmitted(true);

        setTimeout(() => {
            setSubmitted(false);
            close();
        }, 2000);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-9999 px-4">
            <div className="bg-white rounded-2xl p-8 w-full max-w-3xl relative">

                <button
                    onClick={close}
                    className="absolute top-4 right-4 bg-gray-100 hover:bg-red-500 hover:text-white w-8 h-8 rounded-full text-gray-700"
                >
                    X
                </button>

                {submitted ? (
                    <div className="text-center py-20 text-xl font-semibold text-green-600">
                        Thank you for your review! 🎉
                    </div>
                ) : (

                    <>
                        <h2 className="text-3xl font-bold mb-8">Give Your Review</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">

                            {categories.map((cat) => (
                                <div key={cat}>
                                    <p className="font-semibold mb-1">{cat}</p>
                                    <div className="flex text-xl gap-1 cursor-pointer">
                                        {[1, 2, 3, 4, 5].map(num => (
                                            <span
                                                key={num}
                                                onClick={() => handleStarClick(cat, num)}
                                                className={`${ratings[cat] >= num ? "text-yellow-400" : "text-gray-400"
                                                    }`}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}

                        </div>

                        <label className="font-semibold">Your Feedback</label>
                        <textarea
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="Write your tour feedback"
                            className="w-full mt-2 p-4 h-32 bg-gray-100 rounded-xl outline-none"
                        ></textarea>

                        <label className="font-semibold mt-6 block">Your Name</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your Name"
                            className="w-full mt-2 p-3 bg-gray-100 rounded-xl outline-none"
                        />

                        <button
                            onClick={handleSubmit}
                            className="mt-6 px-8 py-3 bg-black text-white rounded-xl font-semibold"
                        >
                            Submit Rating
                        </button>

                    </>
                )}
            </div>
        </div>
    );
}

export default ReviewModal;
