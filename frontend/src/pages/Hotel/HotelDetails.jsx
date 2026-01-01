import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GrFormCheckmark } from "react-icons/gr";
import ReviewModal from "./ReviewModal";
import Faq from "../../components/Faq";
import Footer from "../../components/Footer";
import EnquiryModal from "../Tour/EnquiryModal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Pagination } from "swiper/modules";

import "swiper/css";
import API from "../../services/api";



function HotelDetails() {
  const { slug } = useParams();
  const [hotel, setHotel] = useState(null);
  const [mainIndex, setMainIndex] = useState(0);
  const [openRoom, setOpenRoom] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [otherHotels, setOtherHotels] = useState([]);
  const navigate = useNavigate();



  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const res = await API.get(`/api/get_hotel/${slug}`);
        const hotelData = res.data?.hotel;

        setHotel(hotelData);

        if (hotelData?.rooms?.length > 0) {
          setOpenRoom(hotelData.rooms[0].room_id);
        }

        const allRes = await API.get("/api/get_hotels");
        const filtered = (allRes.data?.hotels || []).filter(
          (h) => h.slug !== slug
        );

        setOtherHotels(filtered);
      } catch (error) {
        console.error("Hotel fetch error:", error);
      }
    };

    if (slug) {
      fetchHotel();
    }
  }, [slug]);



  const user = JSON.parse(localStorage.getItem("userData"));
  const user_id = user?.id;

  const bookingDate = "2025-12-13";
  const adults = 2;
  const children = 0;
  const nights = 1;

  const handleHotelBook = async (room) => {
    if (!user_id) {
      alert("Please login first");
      return;
    }

    const payload = {
      user_id,
      item_type: "hotel",
      item_id: room.room_id,
      booking_date: bookingDate,
      adults,
      children,
      quantity: nights,
      addons: [],
      base_price: room.price,
      final_price: room.price * nights
    };

    try {
      const res = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        window.location.href = "/pages/cart";
      }
    } catch (err) {
      console.log("Hotel Cart Add Error:", err);
    }
  };



  if (!hotel) return <div className="p-10 text-center">Loading...</div>;

  const images = hotel.image_url;

  const nextImage = () => {
    setMainIndex((mainIndex + 1) % images.length);
  };

  const prevImage = () => {
    setMainIndex((mainIndex - 1 + images.length) % images.length);
  };

  const toggleRoom = (roomId) => {
    setOpenRoom(roomId);
  };


  return (
    <>
      <div className="w-full">

        <div className="bg-green-100  h-96 w-full py-10">
          <div className="container mx-auto">

            <p className="text-sm mb-4 text-gray-600">
              ⭐⭐⭐⭐⭐ 0 Review (based on 0 reviews)
            </p>

            <h1 className="text-5xl font-bold mb-4 mt-2">{hotel.hotel_name}</h1>

            <div className="mt-3 flex items-center gap-3 text-gray-700">
              <span>📍 Grand Prince Hotel Dhaka Bangladesh.</span>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.hotel_name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600"
              >
                View Map
              </a>
            </div>

            <div className="mt-10 p-2 rounded-2xl bg-white grid grid-cols-3 gap-4">

              <div className="col-span-2 relative">
                <img
                  src={images[mainIndex]}
                  className="w-full h-[400px] object-cover rounded-xl"
                  alt="hotel"
                />

                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
                >
                  ◀
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
                >
                  ▶
                </button>
              </div>

              <div className="flex flex-col gap-4">

                <img
                  src={images[0]}
                  className="w-full h-[190px] object-cover rounded-xl"
                  alt=""
                />

                <img
                  src={images[1]}
                  className="w-full h-[190px] object-cover rounded-xl"
                  alt=""
                />

              </div>

            </div>
          </div>
        </div>

      </div>

      <div className="container">
        <div className=" mx-auto mt-80 grid grid-cols-6 gap-10">

          {/* left */}
          <div className="col-span-4">

            <h2 className="text-3xl font-bold mb-4">Hotel Overview</h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              Rosewood Hotels & Resorts is a globally renowned luxury hotel group known for its
              refined hospitality, personalized service, and unique sense of place. Established in
              1979, Rosewood operates ultra-luxury hotels, resorts, and residences in some of the
              world’s most stunning destinations.
            </p>

            <p className="text-gray-700 leading-relaxed">
              Guests enjoy world-class amenities, including Michelin-star dining, holistic wellness,
              curated cultural experiences, and unparalleled hospitality. Whether it's a stay at
              Hotel de Crillon in Paris or Las Ventanas al Paraíso in Mexico, Rosewood delivers
              sophistication, exclusivity, and an unforgettable journey.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6">Highlights Facilities</h2>

            <div className="bg-white border rounded-2xl p-8 grid grid-cols-3 gap-8">

              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  🍽️ Dining & Beverage
                </h3>

                <ul className="space-y-2 text-gray-700">

                  <li className="flex items-center gap-2">
                    <GrFormCheckmark />
                    Bars & Lounges
                  </li>

                  <li className="flex items-center gap-2">
                    <GrFormCheckmark />
                    Buffet Breakfast
                  </li>

                  <li className="flex items-center gap-2">
                    <GrFormCheckmark />
                    In-Room Dining
                  </li>

                  <li className="flex items-center gap-2">
                    <GrFormCheckmark />
                    On-Site Restaurants
                  </li>

                  <li className="flex items-center gap-2">
                    <GrFormCheckmark />
                    Rooftop Dining
                  </li>

                </ul>
              </div>


              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  🧒 Friendly Amenities
                </h3>

                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <GrFormCheckmark /> Babysitting Services
                  </li>

                  <li className="flex items-center gap-2">
                    <GrFormCheckmark /> Children’s Pool
                  </li>

                  <li className="flex items-center gap-2">
                    <GrFormCheckmark /> Family Rooms
                  </li>

                  <li className="flex items-center gap-2">
                    <GrFormCheckmark /> Kids' Club
                  </li>
                </ul>
              </div>


              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  🏨 General Amenities
                </h3>

                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <GrFormCheckmark /> Air Conditioning
                  </li>

                  <li className="flex items-center gap-2">
                    <GrFormCheckmark /> Elevators
                  </li>

                  <li className="flex items-center gap-2">
                    <GrFormCheckmark /> Free Wi-Fi
                  </li>

                  <li className="flex items-center gap-2">
                    <GrFormCheckmark /> Laundry & Dry Cleaning
                  </li>

                  <li className="flex items-center gap-2">
                    <GrFormCheckmark /> Parking Facilities
                  </li>
                </ul>
              </div>


              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  🛏️ Room Amenities
                </h3>

                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <GrFormCheckmark /> Balcony / Terrace
                  </li>

                  <li className="flex items-center gap-2">
                    <GrFormCheckmark /> Bathrobes & Slippers
                  </li>

                  <li className="flex items-center gap-2">
                    <GrFormCheckmark /> Coffee & Tea Maker
                  </li>

                  <li className="flex items-center gap-2">
                    <GrFormCheckmark /> Flat-Screen TV
                  </li>

                  <li className="flex items-center gap-2">
                    <GrFormCheckmark /> Luxury Bedding
                  </li>
                </ul>
              </div>


              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  💆 Wellness Amenities
                </h3>

                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <GrFormCheckmark /> Fitness Center
                  </li>

                  <li className="flex items-center gap-2">
                    <GrFormCheckmark /> Jacuzzi / Hot Tub
                  </li>

                  <li className="flex items-center gap-2">
                    <GrFormCheckmark /> Spa & Sauna
                  </li>

                  <li className="flex items-center gap-2">
                    <GrFormCheckmark /> Swimming Pool
                  </li>

                  <li className="flex items-center gap-2">
                    <GrFormCheckmark /> Yoga & Meditation
                  </li>
                </ul>
              </div>





            </div>

            <div className="container">
              <div className=" mx-auto mt-18 space-y-6">

                {hotel.rooms.map((room) => (
                  <div
                    key={room.room_id}
                    className="border rounded-2xl p-6 bg-white shadow-sm cursor-pointer"
                  >
                    <div
                      className="flex justify-between items-center"
                      onClick={() => toggleRoom(room.room_id)}
                    >
                      <div className="flex items-center gap-3">

                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${openRoom === room.room_id ? "border-blue-600" : "border-gray-400"
                            }`}
                        >
                          {openRoom === room.room_id && (
                            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                          )}
                        </div>

                        <h3 className="text-xl font-semibold">{room.room_subtitle}</h3>
                      </div>

                      <p className="text-lg font-bold text-blue-600">${room.price}</p>
                    </div>

                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${openRoom === room.room_id ? "max-h-[1000px] mt-5 pl-10" : "max-h-0"
                        }`}
                    >
                      <p className="text-gray-700 mb-4">{room.description}</p>

                      <div className="flex gap-4 mb-6">
                        {room.image_url.map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            alt=""
                            className="w-40 h-28 rounded-xl object-cover"
                          />
                        ))}
                      </div>

                      <h4 className="font-semibold mb-2">Additional Services –</h4>
                      <ul className="text-gray-700 flex flex-wrap gap-4">

                        <li className="flex items-center gap-2">
                          <GrFormCheckmark /> Spa & Wellness
                        </li>

                        <li className="flex items-center gap-2">
                          <GrFormCheckmark /> In-room Fitness Kits
                        </li>

                        <li className="flex items-center gap-2">
                          <GrFormCheckmark /> Dry Cleaning & Laundry
                        </li>

                        <li className="flex items-center gap-2">
                          <GrFormCheckmark /> Kid Zones & Childcare
                        </li>

                        <li className="flex items-center gap-2">
                          <GrFormCheckmark /> Welcome Gifts & Treats
                        </li>

                      </ul>


                      <button
                        onClick={() => handleHotelBook(room)}
                        className="mt-6 px-6 py-2 bg-blue-600 cursor-pointer text-white rounded-full"
                      >
                        Book Now
                      </button>

                    </div>
                  </div>
                ))}

              </div>
            </div>

            <div className="cursor-hide w-full h-[400px] overflow-hidden mt-16">
              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  hotel.hotel_name
                )}&output=embed`}
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>


            <h2 className="text-3xl font-bold mt-16 mb-6">Additional Info</h2>

            <div className="space-y-4 text-gray-700">

              <p className="flex items-start gap-3">
                <GrFormCheckmark className="text-blue-600 text-xl mt-1" />
                Free Cancellation – Some tours offer free cancellation up to a certain
                period (e.g., 24–48 hours before departure).
              </p>

              <p className="flex items-start gap-3">
                <GrFormCheckmark className="text-blue-600 text-xl mt-1" />
                Health & Safety Guidelines – COVID-19 regulations, vaccinations, or
                travel restrictions.
              </p>

            </div>


            <h2 className="text-3xl font-bold mt-14 mb-6">Customer Review & Rating</h2>

            <div className="border rounded-2xl p-8 bg-white flex flex-col md:flex-row gap-10">

              <div className="md:w-1/3 text-center md:text-left">
                <h3 className="text-xl font-semibold">Good</h3>

                <div className="flex justify-center md:justify-start gap-1 text-yellow-500 my-3">
                  <span>☆</span>
                  <span>☆</span>
                  <span>☆</span>
                  <span>☆</span>
                  <span>☆</span>
                </div>

                <p className="text-lg font-semibold">0 based on 0 reviews</p>

                <button
                  onClick={() => setShowReviewModal(true)}
                  className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700">
                  Write a Review
                </button>
              </div>

              <div className="md:w-2/3 space-y-4">

                {[
                  "Overall",
                  "Transport",
                  "Food",
                  "Hospitality",
                  "Destination",
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-gray-700 mb-1">
                      <span>{item} 0.0</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full"></div>
                  </div>
                ))}

              </div>

            </div>

            <p className="text-gray-600 mt-4">No reviews yet. Be the first to write one!</p>

            <Faq
              type="home"
              title="Frequently Asked & Question"
            />




          </div>

          {/* right */}
          <div className="col-span-2">

            <div className="bg-[#eef2ff] p-8 rounded-3xl shadow-md w-full">



              <p className="text-gray-700 mt-4 font-semibold">Starting From</p>

              <div className="flex items-end gap-2 mt-2">

                {hotel.discount_price && hotel.discount_price !== "0.00" && (
                  <span className="text-2xl font-bold text-gray-400 line-through">
                    ${hotel.discount_price}
                  </span>
                )}

                <span className="text-4xl font-extrabold text-black">
                  ${hotel.price}
                </span>

                <span className="text-gray-600 mb-1">/per person</span>
              </div>

              <div className="mt-6 space-y-3 text-gray-700">
                <p className="flex items-center gap-2">
                  <span className="text-blue-600 text-xl">✔</span>
                  Money Back Guarantee.
                </p>

                <p className="flex items-center gap-2">
                  <span className="text-blue-600 text-xl">✔</span>
                  Your Safety is Our Top Priority.
                </p>
              </div>

              <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-lg">
                Check Availability ↗
              </button>

              <button
                onClick={() => setShowEnquiryModal(true)}
                className="mt-4 w-full bg-white border hover:bg-gray-50 py-3 rounded-xl font-semibold text-blue-600 text-lg">
                Submit an Enquiry ↗
              </button>

              <p className="text-gray-600 mt-6 flex items-center gap-2 text-sm">
                <span className="text-lg">⚠</span>
                Bonus Activity Included – Limited Time!
              </p>

            </div>
          </div>


        </div>
      </div>

      <div className=" h-px mb-2 bg-gray-200"></div>

      <div className="container">
        <div className=" mx-auto my-20">

          <h2 className="text-3xl font-bold mb-6">Other Hotels You May Like</h2>

          <Swiper
            slidesPerView={3}
            spaceBetween={20}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop={true}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination]}
            className="mySwiper"
          >
            {otherHotels.map((hotel) => {
              const finalPrice =
                hotel.discount_price && hotel.discount_price !== "0.00"
                  ? hotel.discount_price
                  : hotel.price;

              return (
                <SwiperSlide key={hotel.hotel_id}>
                  <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white transition-all p-4 hover:shadow-lg">

                    <div
                      onClick={() => navigate(`/pages/hotel/${hotel.slug}`)}
                      className="h-64 w-full rounded-xl overflow-hidden cursor-pointer"
                    >
                      <img
                        src={hotel.image_url?.[0]}
                        alt={hotel.hotel_name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="mt-4">

                      <div className="flex items-center text-yellow-500 text-sm">
                        <span className="flex gap-1">★ ★ ★ ★ ★</span>
                        <span className="text-gray-600 ml-2">
                          {hotel.review_count} reviews
                        </span>
                      </div>

                      <h3 className="text-2xl font-semibold mt-2">{hotel.hotel_name}</h3>

                      <div className="flex items-center text-gray-700 gap-2 mt-2 text-sm">
                        <span className="text-lg">📍</span>
                        <span>{hotel.country}</span>
                        <span className="mx-1">→</span>
                        <span>{hotel.city}</span>

                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            hotel.hotel_name
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 text-sm ml-3"
                        >
                          View Map ↗
                        </a>
                      </div>

                      <div className="mt-4 bg-gray-100 rounded-xl px-5 py-4 text-gray-700 text-sm">
                        <div className="flex flex-wrap gap-x-6 gap-y-2">
                          <p className="flex items-center gap-2">
                            <span className="text-blue-500">✔</span> Free Wi-Fi
                          </p>
                          <p className="flex items-center gap-2">
                            <span className="text-blue-500">✔</span> Air Conditioning
                          </p>
                          <p className="flex items-center gap-2">
                            <span className="text-blue-500">✔</span> Swimming Pool
                          </p>
                          <p className="flex items-center gap-2">
                            <span className="text-blue-500">✔</span> Laundry Services
                          </p>
                        </div>
                      </div>

                      <p className="flex items-center gap-2 text-blue-600 font-medium mt-3">
                        <span className="text-blue-500">✔</span> Free Cancellation Policy
                      </p>

                      <div className="flex items-center justify-between mt-6">
                        <button
                          onClick={() => navigate(`/pages/hotel/${hotel.slug}`)}
                          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-sm transition"
                        >
                          Book Now ↗
                        </button>

                        <div className="text-right">
                          <p className="text-sm text-gray-600">Starting From</p>
                          <p className="text-2xl font-bold">${finalPrice}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

        </div>
      </div>

      <Footer />


      {
        showReviewModal && (
          <ReviewModal close={() => setShowReviewModal(false)} />
        )
      }


      <EnquiryModal open={showEnquiryModal} onClose={() => setShowEnquiryModal(false)} />


    </>
  );
}

export default HotelDetails;
