import React from "react";
import SearchBox from "../components/SearchTabs/SearchTabs";
function Home() {
  return (
    <>
      <div className="relative w-full h-[500px]">

        <video
          src="/bg-video.mp4"
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        />

        <div className=" wrapper justify-center absolute inset-0 flex flex-col px-4">
          <h1 className="text-white text-6xl font-bold mb-6">
            All-in-one Travel Booking.
          </h1>
          <p className="text-white text-lg font-semibold">
            Highlights convenience and simplicity, best for agencies with online & mobile-friendly services.
          </p>
        </div>

      </div>

      <div className= "-mt-30 relative z-50">
        <SearchBox />
      </div>
    </>
  );
}

export default Home;
