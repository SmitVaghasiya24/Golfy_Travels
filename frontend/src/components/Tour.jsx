import React, { useEffect, useState } from "react";
import { FiMapPin } from "react-icons/fi";
import { MdArrowOutward } from "react-icons/md";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Tour({
  title = "Travel Packages",
  subTitle = "",
  mode = "default",
}) {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);

        const res = await API.get("/api/get_tours");
        setTours(res.data.data);

      } catch (err) {
        console.log("Error fetching tours:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);


  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="py-12 px-2 my-10">
      <h2 className="text-5xl font-bold text-center">{title}</h2>
      {subTitle && (
        <p className="text-center text-gray-600 max-w-xl mx-auto mt-4 mb-10">
          {subTitle}
        </p>
      )}

      <div className="container mx-auto p-5">

        {mode === "one day" && (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={25}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            speed={1500}
            autoplay={{ delay: 2500 }}
            // navigation={true}
            pagination={{ clickable: true }}
            className="mySwiper"
          >
            {tours.map((tour) => (
              <SwiperSlide key={tour.tour_id}>
                <TourCard tour={tour} navigate={navigate} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {mode === "popular" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {tours.slice(0, 6).map((tour) => (
              <div key={tour.tour_id} className="rounded-3xl p-2">
                <TourCard tour={tour} navigate={navigate} />
              </div>
            ))}
          </div>
        )}

        {mode === "last minute" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {tours.slice(3, 6).map((tour) => (
              <div key={tour.tour_id} className="rounded-3xl p-2">
                <TourCard tour={tour} navigate={navigate} />
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Tour;

function TourCard({ tour, navigate }) {
  return (
    <div className="rounded-3xl p-2 border-gray-200 bg-white shadow-sm">
      <div

        onClick={() => { navigate(`/tour/${tour.slug}`); }}

        className="relative h-60 w-full overflow-hidden rounded-xl">
        <img
          src={tour.thumbnail}
          alt={tour.title}
          className="w-full cursor-pointer h-full object-cover transition-transform duration-500 hover:scale-110"
        />

        <p className="absolute top-3 right-3 bg-yellow-400 text-black text-sm font-semibold px-3 py-1 rounded-full shadow">
          {tour.tour_type_name}
        </p>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold">{tour.title}</h3>

        <div className="flex font-semibold items-center gap-2 text-gray-600 text-sm mt-2">
          <FiMapPin />
          <span>{tour.countries}</span>
          <span className="ml-2">⟷</span>
          <span>
            {tour.days} Days / {tour.nights} Nights
          </span>
        </div>

        <div className="flex items-end justify-between mt-5">
          <button
            className="relative overflow-hidden group text-white 
              px-4 py-2 sm:px-6 sm:py-3 
              rounded-lg bg-[#2C88FE] text-sm sm:text-base"
          >
            <span
              className="absolute inset-0 bg-black 
                translate-y-full group-hover:translate-y-0 
                transition-transform duration-300"
            ></span>

            <span className="relative cursor-pointer  z-10 flex items-center gap-2">
              Book Now
              <MdArrowOutward className="text-base sm:text-lg" />
            </span>
          </button>


          <div className="text-right sm:text-right">
            <p className="text-gray-500 text-sm mb-1">per person</p>

            {parseFloat(tour.discount_price) > 0 ? (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-1 sm:gap-2">

                <p className="text-gray-400 line-through text-sm order-1 sm:order-1">
                  ${tour.price}
                </p>

                <p className="text-xl font-bold order-2 sm:order-2">
                  ${tour.discount_price}
                </p>

              </div>
            ) : (
              <p className="text-xl font-bold">${tour.price}</p>
            )}
          </div>

        </div>

        {/* line */}
        <div className="w-full flex items-center my-5">
          <div className="w-0 h-0 border-t-4 border-b-4 border-l-8 border-transparent border-l-gray-300"></div>
          <div className="flex-1 h-[1.5px] bg-gray-200"></div>
          <div className="w-0 h-0 border-t-4 border-b-4 border-r-8 border-transparent border-r-gray-300"></div>
        </div>

        <div className="flex justify-between text-sm text-gray-600">
          <p className="flex items-center gap-1"><span>🔹</span> Experience</p>
          <p className="flex items-center gap-1"><span>➕</span> Inclusion</p>
        </div>
      </div>
    </div >
  );
}
