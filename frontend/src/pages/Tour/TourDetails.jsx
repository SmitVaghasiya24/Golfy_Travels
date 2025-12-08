import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import "swiper/css/navigation";
import Faq from "../../components/Faq";
import ReviewModal from "./ReviewModal";
import "swiper/css/pagination";
import { FiMapPin } from "react-icons/fi";
import { MdArrowOutward } from "react-icons/md";
import Footer from '../../components/Footer'
import EnquiryModal from "./EnquiryModal";
import CheckoutModal from "./CheckoutModal";


const touristPlaceImages = [
    "/destination/dest2.webp",
    "/destination/dest3.webp",
    "/destination/dest4.webp",
    "/destination/dest5.webp",
    "/destination/dest6.webp",
    "/destination/dest7.webp",
    "/destination/dest1.webp",
];


const touristTitles = [
    "Loire Valley",
    "Southern France",
    "Louvre Museum",
    "Effile Tower",
    "Notre-Dame Cathedral",
    "Palace of Versailles",
    "Carcassonne",
];

const itineraryData = [
    {
        day: "Day-01",
        title: "Qatar Tower – The symbol of France",
        description:
            "The Eiffel Tower is the heart of Paris and offers a variety of exciting activities for visitors. As like, climb the Eiffel Tower, take the elevator to the summit, sunset & night view, picnic at champ de mars & bike tour around the Eiffel Tower.",
        transport: "Car, Flight, Boat",
        activities: "Climb the Qatar Tower, Sunset & night view, Bike tour.",
        meals: "Breakfast, Lunch, Snacks",
        accommodation: "Rajonikanto Hotel",
    },
    {
        day: "Day-02",
        title: "Louvre Museum – Home of the Mona Lisa",
        description:
            "Explore the Louvre Museum, home to thousands of world-famous artworks including the Mona Lisa.",
        transport: "Bus, Metro",
        activities: "Guided museum tour, Art discovery session",
        meals: "Breakfast, Snacks",
        accommodation: "City Palace Hotel",
    },
    {
        day: "Day-03",
        title: "City Highlights – Cultural Exploration",
        description:
            "Visit historical landmarks, enjoy a cultural walk, and explore the beauty of the city.",
        transport: "Car",
        activities: "City walk, Market visit",
        meals: "Breakfast, Dinner",
        accommodation: "Grand View Hotel",
    },
    {
        day: "Day-04",
        title: "Adventure Day – Outdoor Activities",
        description:
            "Experience thrilling adventure activities in scenic locations.",
        transport: "Jeep, Boat",
        activities: "Hiking, River crossing",
        meals: "Breakfast, Lunch",
        accommodation: "Adventure Resort",
    },
    {
        day: "Day-05",
        title: "Final Day – Relaxation & Departure",
        description:
            "Relax on your final day, shop for souvenirs, and prepare for departure.",
        transport: "Car",
        activities: "Shopping, Local sightseeing",
        meals: "Breakfast",
        accommodation: "Airport Hotel",
    },
];


function TourDetails() {
    const { slug } = useParams();
    const [tour, setTour] = useState(null);
    const [openStates, setOpenStates] = useState(
        itineraryData.map((_, i) => i === 0)
    );

    const [showReviewModal, setShowReviewModal] = useState(false);
    const [otherTours, setOtherTours] = useState([]);
    const [showEnquiryModal, setShowEnquiryModal] = useState(false);

    const [showCheckout, setShowCheckout] = useState(false);
    const [selectedTour, setSelectedTour] = useState(null);

    const navigate = useNavigate();

    // FETCH SINGLE TOUR
    useEffect(() => {
        const fetchTour = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/get_tour/${slug}`);
                const data = await res.json();
                if (data.success) setTour(data.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchTour();
    }, [slug]);

    // FETCH OTHER TOURS
    useEffect(() => {
        const fetchOtherTours = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/tours/filter");
                const data = await res.json();

                if (data.success) {
                    const filtered = data.tours.filter(t => t.slug !== slug);
                    setOtherTours(filtered);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchOtherTours();
    }, [slug]);

    // FIXED MODAL OPEN FUNCTION
    const openModal = () => {
        setSelectedTour(tour); // send API tour data into modal
        setShowCheckout(true);
    };

    const toggleDay = (index) => {
        const updated = [...openStates];
        updated[index] = !updated[index];
        setOpenStates(updated);
    };

    const handleExpandAll = () => {
        const allOpen = openStates.every(Boolean);
        setOpenStates(openStates.map(() => !allOpen));
    };

    if (!tour) return <p className="text-center py-20 text-gray-500">Loading...</p>;

    return (
        <>
            <div className="w-full">
                <div
                    className="relative w-full h-[70vh] bg-cover bg-center"
                    style={{ backgroundImage: `url(${tour.thumbnail})` }}
                >
                    <div className="absolute inset-0 bg-black/50"></div>

                    <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-4">

                        <p className="text-lg mb-2">
                            Starting From
                            {parseFloat(tour.discount_price) > 0 ? (
                                <span className="font-semibold ml-2">${tour.discount_price}</span>
                            ) : (
                                <span className="font-semibold ml-2">${tour.price}</span>
                            )}
                            <span className="text-sm font-light"> /per person</span>
                        </p>



                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            {tour.title}
                        </h1>

                        <div className="px-6 py-2 bg-white/20 text-white rounded-full backdrop-blur-md text-sm font-medium">
                            {tour.days} Days | {tour.nights} Nights | {tour.countries ? tour.countries.split(',').length : 1} Destinations
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">

                    <div className="flex flex-wrap items-center gap-6 text-gray-700">

                        <div className="flex items-center gap-2">
                            <span className="text-green-600 text-lg">✔</span>
                            <span>No Booking Fee</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-green-600 text-lg">✔</span>
                            <span>Best Price Ever</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                                <span className="w-3 h-3 rounded-full bg-green-600"></span>
                                <span className="w-3 h-3 rounded-full bg-green-600"></span>
                                <span className="w-3 h-3 rounded-full bg-green-600"></span>
                                <span className="w-3 h-3 rounded-full bg-green-600"></span>
                                <span className="w-3 h-3 rounded-full border border-green-600"></span>
                            </div>

                            <span className="text-gray-700 text-sm">
                                (4.5/5) based on 138 reviews
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">

                        <div className="flex items-center gap-2 text-gray-700">
                            <span className="text-green-600 text-lg">🌿</span>
                            <span>100% Carbon Neutral</span>
                        </div>

                        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 text-gray-700"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M4 12v.01M12 4v.01M20 12v.01M12 20v.01M6.343 6.343l.01.01M17.657 6.343l.01.01M17.657 17.657l.01.01M6.343 17.657l.01.01M12 8a4 4 0 000 8 4 4 0 000-8z" />
                            </svg>
                        </button>
                    </div>

                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-18">

                {/* LEFT SIDE */}
                <div className="lg:col-span-2">

                    <h2 className="text-2xl font-bold mb-3">About Tour Package</h2>

                    <p className="text-gray-600 leading-relaxed mb-8">
                        {tour.description}
                    </p>

                    <div className="p-8 rounded-2xl border border-gray-200">

                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">

                            <div>
                                <p className="text-gray-500 text-sm">Accomodation</p>
                                <p className="font-semibold mt-1">5 Star Hotel</p>
                            </div>

                            <div>
                                <p className="text-gray-500 text-sm">Meals</p>
                                <p className="font-semibold mt-1">Breakfast & Dinner</p>
                            </div>

                            <div>
                                <p className="text-gray-500 text-sm">Transportation</p>
                                <p className="font-semibold mt-1">Taxi, Car</p>
                            </div>

                            <div>
                                <p className="text-gray-500 text-sm">Group Size</p>
                                <p className="font-semibold mt-1">10–20</p>
                            </div>

                            <div>
                                <p className="text-gray-500 text-sm">Language</p>
                                <p className="font-semibold mt-1">English, Spanish</p>
                            </div>

                            <div>
                                <p className="text-gray-500 text-sm">Animal</p>
                                <p className="font-semibold mt-1">Cat, Pet only</p>
                            </div>

                            <div>
                                <p className="text-gray-500 text-sm">Age Range</p>
                                <p className="font-semibold mt-1">18–45 (Year)</p>
                            </div>

                            <div>
                                <p className="text-gray-500 text-sm">Season</p>
                                <p className="font-semibold mt-1">Winter Season</p>
                            </div>

                            <div>
                                <p className="text-gray-500 text-sm">Category</p>
                                <p className="font-semibold mt-1">{tour.tour_type_name}</p>
                            </div>

                        </div>
                    </div>

                    <div className="mt-10">
                        <div className="container mx-auto relative">

                            <p className="font-semibold text-xl sm:text-2xl md:text-3xl text-center lg:text-left">
                                Explore Locations
                            </p>


                            <Swiper
                                modules={[Navigation, Autoplay]}
                                navigation={{
                                    nextEl: ".popular-next",
                                    prevEl: ".popular-prev",
                                }}
                                spaceBetween={10}
                                autoplay={{ delay: 3000 }}
                                speed={1500}
                                loop={true}
                                className="smooth-swiper mt-5"
                                breakpoints={{
                                    0: { slidesPerView: 1 },
                                    480: { slidesPerView: 2 },
                                    640: { slidesPerView: 3 },
                                    1024: { slidesPerView: 5 },
                                }}
                            >

                                {touristPlaceImages.map((img, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="flex flex-col items-center">
                                            <img
                                                src={img}
                                                className="w-60 h-40 rounded-3xl object-cover"
                                            />

                                            <p className="mt-3 font-semibold text-gray-800 text-center">
                                                {touristTitles[index]}
                                            </p>
                                        </div>
                                    </SwiperSlide>
                                ))}

                            </Swiper>

                            <button
                                className="popular-prev absolute -left-4 top-1/2 -translate-y-1/2 
      bg-white/70 backdrop-blur-md w-10 h-10 rounded-full 
      hidden lg:flex items-center justify-center shadow-md z-50"
                            >
                                <LuChevronLeft className="text-gray-700 text-xl" />
                            </button>

                            <button
                                className="popular-next absolute right-4 top-1/2 -translate-y-1/2 
      bg-white/70 backdrop-blur-md w-10 h-10 rounded-full 
      hidden lg:flex items-center justify-center shadow-md z-50"
                            >
                                <LuChevronRight className="text-gray-700 text-xl" />
                            </button>

                        </div>
                    </div>

                    <div className="mt-12">
                        <h2 className="text-2xl font-bold mb-4">Highlights of the Tour</h2>

                        <div className="p-8 rounded-2xl border border-gray-200 bg-white">
                            <ul className="space-y-5 text-gray-700">

                                <li className="flex items-start gap-3">
                                    <span className="text-blue-500 text-xl mt-1">✔</span>
                                    <p>Eiffel Tower – Skip-the-line access & breathtaking views from the summit.</p>
                                </li>

                                <li className="flex items-start gap-3">
                                    <span className="text-blue-500 text-xl mt-1">✔</span>
                                    <p>Louvre Museum – See the Mona Lisa and world-renowned masterpieces.</p>
                                </li>

                                <li className="flex items-start gap-3">
                                    <span className="text-blue-500 text-xl mt-1">✔</span>
                                    <p>Opéra Garnier – Visit the stunning opera house that inspired "The Phantom of the Opera".</p>
                                </li>

                                <li className="flex items-start gap-3">
                                    <span className="text-blue-500 text-xl mt-1">✔</span>
                                    <p>French Café & Bakery Tour – Savor croissants, macarons & espresso at historic cafés.</p>
                                </li>

                                <li className="flex items-start gap-3">
                                    <span className="text-blue-500 text-xl mt-1">✔</span>
                                    <p>Sunset Dinner Cruise on the Seine – Romantic fine dining on the river.</p>
                                </li>

                            </ul>
                        </div>
                    </div>

                    <div className="mt-14">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">Tour Itinerary</h2>

                            <button
                                onClick={handleExpandAll}
                                className="text-blue-600 font-medium hover:underline"
                            >
                                {openStates.every(Boolean) ? "Collapse All -" : "Expand All +"}
                            </button>
                        </div>

                        <p className="text-lg font-semibold flex items-center gap-2 mb-3">
                            <span className="text-blue-600 text-xl">➤</span> Qatar
                            <span className="text-gray-500">(Departure: 8:00 am – 8:30am)</span>
                        </p>

                        {itineraryData.map((item, index) => (
                            <div key={index}>

                                {index === 3 && (
                                    <p className="text-lg font-semibold flex items-center gap-2 mb-3 mt-10">
                                        <span className="text-blue-600 text-xl">➤</span>
                                        South France
                                        <span className="text-gray-500">(Departure: 8:00 am – 8:30am)</span>
                                    </p>
                                )}

                                <div
                                    className="border border-gray-200 rounded-2xl p-6 mb-6 bg-white"
                                >
                                    <div
                                        className="flex justify-between items-center cursor-pointer"
                                        onClick={() => toggleDay(index)}
                                    >
                                        <p className="font-semibold text-lg flex items-center gap-2">
                                            <FaLocationDot className="text-red-500" />
                                            {item.day} &nbsp; {item.title}
                                        </p>

                                        {openStates[index] ? (
                                            <IoIosArrowUp className="text-xl text-gray-600" />
                                        ) : (
                                            <IoIosArrowDown className="text-xl text-gray-600" />
                                        )}
                                    </div>

                                    {openStates[index] && (
                                        <div className="mt-4 border-t pt-4 space-y-4">

                                            <p className="text-gray-700">{item.description}</p>

                                            <div className="space-y-3">

                                                <p className="flex gap-2">
                                                    <span className="text-blue-500">📍 Transport:</span>
                                                    <span>{item.transport}</span>
                                                </p>

                                                <p className="flex gap-2">
                                                    <span className="text-blue-500">📍 Activities:</span>
                                                    <span>{item.activities}</span>
                                                </p>

                                                <p className="flex gap-2">
                                                    <span className="text-blue-500">📍 Meals:</span>
                                                    <span>{item.meals}</span>
                                                </p>

                                                <p className="flex gap-2 justify-between">
                                                    <span>
                                                        <span className="text-blue-500">📍 Accomodation:</span>
                                                        &nbsp; {item.accommodation}
                                                    </span>

                                                    <span className="text-blue-600 cursor-pointer hover:underline">
                                                        View Hotel
                                                    </span>
                                                </p>

                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                    </div>

                    <div className="cursor-hide w-full h-[500px] overflow-hidden mt-10">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235014.29918736647!2d72.41493042707977!3d23.020158084850195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1763716494846!5m2!1sen!2sin"
                            className="w-full h-full border-0"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>

                    <div className="mt-16">

                        <h2 className="text-2xl font-bold mb-6">Package Features List</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

                            <div>
                                <h3 className="text-xl font-semibold mb-4">Include Features</h3>

                                <ul className="space-y-4 text-gray-700">
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-600 text-lg">✔</span>
                                        <p>Accommodation (Hotel, Resort, Villa, Camping, etc.)</p>
                                    </li>

                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-600 text-lg">✔</span>
                                        <p>Meals (Breakfast, Lunch, Dinner – specify type)</p>
                                    </li>

                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-600 text-lg">✔</span>
                                        <p>Guided Tours & Excursions</p>
                                    </li>

                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-600 text-lg">✔</span>
                                        <p>Entry Tickets to Attractions</p>
                                    </li>

                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-600 text-lg">✔</span>
                                        <p>Adventure Activities & Travel Insurance</p>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-4">Exclude Features</h3>

                                <ul className="space-y-4 text-gray-700">
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-500 text-lg">✖</span>
                                        <p>Visa Fees & Processing</p>
                                    </li>

                                    <li className="flex items-start gap-2">
                                        <span className="text-red-500 text-lg">✖</span>
                                        <p>Personal Expenses (Shopping, Souvenirs, Tips, etc.)</p>
                                    </li>

                                    <li className="flex items-start gap-2">
                                        <span className="text-red-500 text-lg">✖</span>
                                        <p>Optional Excursions & Activities</p>
                                    </li>

                                    <li className="flex items-start gap-2">
                                        <span className="text-red-500 text-lg">✖</span>
                                        <p>Meals Not Mentioned in Itinerary</p>
                                    </li>

                                    <li className="flex items-start gap-2">
                                        <span className="text-red-500 text-lg">✖</span>
                                        <p>Travel Insurance (if not included)</p>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-10">
                            <img src="/brochure.webp" className="w-full rounded-2xl" />
                        </div>

                        <div className="mt-14">
                            <h2 className="text-2xl font-bold mb-6">Additional Info</h2>

                            <ul className="space-y-4 text-gray-700">

                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 text-lg">✔</span>
                                    <p>
                                        Free Cancellation – Some tours offer free cancellation up to a certain
                                        period (e.g., 24–48 hours before departure).
                                    </p>
                                </li>

                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 text-lg">✔</span>
                                    <p>
                                        Health & Safety Guidelines – COVID-19 regulations, vaccinations, or travel restrictions.
                                    </p>
                                </li>

                            </ul>
                        </div>


                    </div>

                    <Faq
                        type="home"
                        title="Frequently Asked & Question"
                    />

                    <div className="mt-14">

                        <h2 className="text-2xl font-bold mb-6">Customer Review & Rating</h2>

                        <div className="border border-gray-200 rounded-2xl p-8 flex flex-col md:flex-row gap-10 bg-white">

                            <div className="flex flex-col items-center md:w-1/3 text-center">

                                <h3 className="text-lg font-semibold">Good</h3>

                                <div className="flex gap-1 text-yellow-400 text-xl mt-1">
                                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                                </div>

                                <p className="mt-2 text-gray-600">
                                    <span className="font-bold">0</span> based on 0 reviews
                                </p>

                                <button
                                    onClick={() => setShowReviewModal(true)}
                                    className="mt-5 px-8 py-3 bg-blue-600 text-white rounded-full font-semibold"
                                >
                                    Write a Review
                                </button>

                            </div>

                            <div className="md:w-2/3 space-y-6">

                                {[
                                    "Overall",
                                    "Transport",
                                    "Food",
                                    "Hospitality",
                                    "Destination"
                                ].map((label, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between text-gray-800 mb-1">
                                            <span>{label} 0.0</span>
                                        </div>

                                        <div className="w-full bg-gray-200 h-2 rounded-full">
                                            <div className="h-2 bg-blue-500 rounded-full" style={{ width: "0%" }}></div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>

                        <p className="mt-6 text-gray-600 text-sm">
                            No reviews yet. Be the first to write one!
                        </p>

                    </div>





                </div>

                {/* RIGHT SIDE */}
                <div className="lg:col-span-1">
                    <div className="bg-blue-50 p-6 rounded-3xl shadow-sm">

                        {parseFloat(tour.discount_price) > 0 && (
                            <p className="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold w-fit ml-auto">
                                {Math.round(
                                    ((tour.price - tour.discount_price) / tour.price) * 100
                                )}% Off
                            </p>
                        )}

                        <p className="text-gray-700 mt-5 text-sm font-semibold">Starting From</p>

                        <div className="flex items-end gap-2 mt-2">
                            {parseFloat(tour.discount_price) > 0 && (
                                <p className="line-through text-gray-400 text-xl">
                                    ${tour.price}
                                </p>
                            )}

                            <p className="text-3xl font-bold text-gray-900">
                                $
                                {parseFloat(tour.discount_price) > 0
                                    ? tour.discount_price
                                    : tour.price}
                            </p>

                            <span className="text-gray-600 mb-1 text-sm">/per person</span>
                        </div>

                        <div className="mt-6 space-y-3">
                            <p className="flex items-center gap-2 text-gray-700">
                                <span className="text-blue-600 text-lg">✔</span>
                                Mony Back Guarentee.
                            </p>
                            <p className="flex items-center gap-2 text-gray-700">
                                <span className="text-blue-600 text-lg">✔</span>
                                Your Safety is Our Top Priority.
                            </p>
                        </div>

                        <button
                            onClick={openModal}
                            className="mt-6 w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
                        >
                            Check Availability ↗
                        </button>


                        <button
                            className="mt-3 w-full py-3 bg-white border border-gray-300 text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition"
                            onClick={() => setShowEnquiryModal(true)}
                        >
                            Submit an Enquiry ↗
                        </button>

                        <p className="mt-4 text-gray-600 text-sm flex items-center gap-2">
                            <span className="text-lg">⚠</span>
                            Bonus Activity Included – Limited Time!
                        </p>
                    </div>
                </div>

            </div>

            {otherTours.length > 0 && (
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl font-bold">Relevant Package</h2>
                        <p className="text-gray-600">
                            A curated list of the most popular travel packages based on different destinations.
                        </p>
                    </div>


                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={20}
                        slidesPerView={3}
                        autoplay={{ delay: 2500 }}
                        loop={true}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                    >


                        {otherTours.map((tour) => (
                            <SwiperSlide key={tour.tour_id}>
                                <div className="rounded-3xl p-2 border border-gray-200 bg-white shadow-sm">

                                    <div
                                        onClick={() => navigate(`/tour/${tour.slug}`)}
                                        className="relative h-56 w-full overflow-hidden rounded-xl cursor-pointer"
                                    >
                                        <img
                                            src={tour.thumbnail}
                                            alt={tour.title}
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                        />

                                        <p className="absolute top-3 right-3 bg-yellow-400 text-black text-sm font-semibold px-3 py-1 rounded-full shadow">
                                            {tour.tour_type_name}
                                        </p>
                                    </div>

                                    <div className="p-6">

                                        <h3 className="text-xl font-semibold line-clamp-1">{tour.title}</h3>

                                        <div className="flex font-semibold items-center gap-2 text-gray-600 text-sm mt-2">
                                            <FiMapPin />
                                            <span>{tour.countries || tour.region_name}</span>
                                            <span className="ml-2">⟷</span>
                                            <span>{tour.days} Days / {tour.nights} Nights</span>
                                        </div>

                                        <div className="flex items-end justify-between mt-5">

                                            <button
                                                onClick={() => navigate(`/tour/${tour.slug}`)}
                                                className="relative overflow-hidden group text-white px-6 py-3 rounded-lg bg-[#2C88FE] text-sm"
                                            >
                                                <span className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                                                <span className="relative z-10 flex items-center gap-2">
                                                    Book Now <MdArrowOutward />
                                                </span>
                                            </button>

                                            <div className="text-right">
                                                <p className="text-gray-500 text-sm mb-1">per person</p>

                                                {parseFloat(tour.discount_price) > 0 ? (
                                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-1 sm:gap-2">

                                                        <p className="text-gray-400 line-through text-sm">
                                                            ${tour.price}
                                                        </p>

                                                        <p className="text-xl font-bold">
                                                            ${tour.discount_price}
                                                        </p>

                                                    </div>
                                                ) : (
                                                    <p className="text-xl font-bold">${tour.price}</p>
                                                )}
                                            </div>
                                        </div>

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
                                </div>
                            </SwiperSlide>
                        ))}

                    </Swiper>


                </div>
            )}

            {
                showReviewModal && (
                    <ReviewModal close={() => setShowReviewModal(false)} />
                )
            }

            <EnquiryModal open={showEnquiryModal} onClose={() => setShowEnquiryModal(false)} />

            {showCheckout && (
                <CheckoutModal
                    onClose={() => setShowCheckout(false)}
                    tour={selectedTour}
                />
            )}

            <Footer />

        </>
    );
}

export default TourDetails;
