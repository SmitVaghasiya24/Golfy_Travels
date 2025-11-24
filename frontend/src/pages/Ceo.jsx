import React from 'react'

function Ceo() {
    return (
        <div>
            <div
                className="w-full h-[750px] bg-cover bg-center bg-no-repeat flex items-center justify-center mt-14 px-4"
                style={{
                    backgroundImage: "url('/bg.jpg')",
                    backgroundAttachment: "fixed"
                }}
            >

                <div className="relative z-10 text-center">
                    <h1
                        className="text-white text-2xl md:text-3xl font-semibold italic mb-6"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Make Meet Happiness.
                    </h1>

                    <p className="text-white text-3xl md:text-6xl font-semibold max-w-xl mx-auto">
                        Travel isn’t a luxury, it’s a way of life!
                    </p>

                    <div className="mt-6 space-y-2">
                        <p className="text-white text-lg font-semibold">Mr. Gabriel Haringson</p>
                        <p className="text-white font-semibold text-sm opacity-80">CEO, GoFly</p>
                    </div>

                    <button className="mt-10 bg-[#1881FE] text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition">
                        Grab the Deal Now
                    </button>
                </div>

            </div>

        </div>
    )
}

export default Ceo