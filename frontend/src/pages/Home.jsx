import React from "react";
import SearchBox from "../components/SearchTabs/SearchTabs";
import DiscoutBanners from "../components/DiscoutBanners";
import Destination from "../components/Destination";
import { FaMedal, FaPercent, FaWallet } from "react-icons/fa";
import Company from "../components/Company";
import Ceo from "./Ceo";
import TravelPackage from "../components/TravelPackage";
import Blog from "./Blog";
import Review from "../components/Review";
import Faq from "../components/Faq";
import AllExperience from "../components/AllExperience";
import Tour from '../components/Tour';
import Footer from '../components/Footer';
import Services from "../components/Services";

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

      <Services />

      <Tour
        mode="popular"
        title="Popular Travel Packages"
        subTitle="A curated list of the most popular travel packages based on different destinations."
      />

      <Ceo />

      <Tour
        mode="last minute"
        title="Last Minute Deals!"
        subTitle="A curated list of the most popular travel packages based on different destinations."
      />

      <TravelPackage />

      <Company />

      <Tour
        mode="one day"
        title="One Day Trips"
        subTitle="A curated list of the most popular travel packages based on different destinations."
      />

      <Blog />

      <Review />

      <Faq
        type="home"
        title="General Questions"
        subtitle="We're committed to offering more than just products—we provide exceptional experiences."
      />

      <AllExperience />

      <Footer />

    </>
  );
}

export default Home;
