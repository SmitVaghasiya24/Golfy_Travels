import { FaMedal, FaPercent, FaWallet } from "react-icons/fa";

function Services() {
    return (
        <div className="mt-20">
            <div className="container mx-auto px-4 md:px-10">

                <div className="bg-[#F2F2FF] rounded-3xl py-12 md:py-10 px-6 md:px-12">

                    <h2 className="text-center text-3xl md:text-4xl font-bold">
                        We’re Providing Best Service Ever!
                    </h2>

                    <div className="w-32 sm:w-40 md:w-52 lg:w-[75%] mt-4 mx-auto flex items-center">
                        <div className="w-0 h-0 border-t-4 border-b-4 border-l-8 border-transparent border-l-gray-300"></div>
                        <div className="flex-1 h-[1.5px] bg-gray-200"></div>
                        <div className="w-0 h-0 border-t-4 border-b-4 border-r-8 border-transparent border-r-gray-300"></div>
                    </div>


                    <div className="w-full mt-6 mb-10"></div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-full bg-[#FFB52B] flex items-center justify-center">
                                <FaMedal className="text-xl text-black" />
                            </div>

                            <div>
                                <h3 className="text-lg md:text-xl font-bold">Local Guidance</h3>
                                <p className="text-gray-600 mt-1">
                                    Travel agencies have experienced professionals guidance.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-full bg-[#64B5F6] flex items-center justify-center">
                                <FaPercent className="text-xl text-black" />
                            </div>

                            <div>
                                <h3 className="text-lg md:text-xl font-bold">Deals & Discounts</h3>
                                <p className="text-gray-600 mt-1">
                                    Agencies have special discounts on flights, hotels, & packages.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className=" p-3 rounded-full bg-[#FFB52B] flex items-center justify-center">
                                <FaWallet className="text-xl text-black" />
                            </div>

                            <div>
                                <h3 className="text-lg md:text-xl font-bold">Saves Money</h3>
                                <p className="text-gray-600 mt-1">
                                    Avoids hidden fees & tourist traps, multi-destination & budget-friendly options.
                                </p>
                            </div>
                        </div>

                    </div>

                    <div className="flex justify-center mt-12">
                        <button className="bg-[#1881FE] text-white py-3 px-10 rounded-full text-lg font-semibold ">
                            Flat 30% Discounts All Packages
                            <span className="ml-3">Check Offer ↗</span>
                        </button>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Services