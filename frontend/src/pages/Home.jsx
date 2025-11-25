import React from "react";
import SearchBox from "../components/SearchTabs/SearchTabs";
import DiscoutBanners from "../components/DiscoutBanners";
import Destination from "../components/Destination";
import { FaMedal, FaPercent, FaWallet } from "react-icons/fa";
import Company from "../components/Company";
import Ceo from "./Ceo";
import TravelPackage from "../components/TravelPackage";
import Blog from "./Blog";
import Review from "./Review";
import Faq from "../components/Faq";
import AllExperience from "../components/AllExperience";

function Home() {
  return (
    <>
      <div className=" relative w-full h-[400px] md:h-[500px]">
        <video
          src="/bg-video.mp4"
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 flex items-start mt-20 sm:mt-0 sm:items-center">

          <div className="container mx-auto px-4">
            <h1 className="text-white px-4 xl:px-0 text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight">
              All-in-one Travel Booking.
            </h1>

            <p className="text-white px-4 xl:px-0 text-sm sm:text-base md:text-lg font-semibold max-w-xl">
              Highlights convenience and simplicity, best for agencies with online & mobile-friendly services.
            </p>
          </div>
        </div>
      </div>



      <div className="-mt-30 relative z-50">
        <SearchBox />
      </div>

      <DiscoutBanners />

      <Destination />


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

      <Company />
      <TravelPackage />
      <Ceo />


      <Blog />

      <Review />

      <Faq />

      <AllExperience />

    </>
  );
}

export default Home;
