// import { useState } from "react";
// import { FaSuitcaseRolling, FaBed } from "react-icons/fa";
// import { FaPassport } from "react-icons/fa";
// import { MdOutlineExplore } from "react-icons/md";
// import { FiSearch } from "react-icons/fi";
// import axios from "axios";
// import { useEffect } from "react";
// import { FiMapPin, FiCalendar, FiList } from "react-icons/fi";
// import { useRef } from "react";

// export default function SearchTabs() {
//   const [activeTab, setActiveTab] = useState("tours");
//   const [destinations, setDestinations] = useState([]);
//   const [selectedDate, setSelectedDate] = useState("");
//   const [tourTypes, setTourTypes] = useState([]);
//   const [selectedDestination, setSelectedDestination] = useState("");
//   const [selectedTourType, setSelectedTourType] = useState("");


//   const dateRef = useRef();

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/get_all_destination")
//       .then(res => {
//         setDestinations(res.data.destinations);
//       })
//       .catch(err => console.log(err));
//   }, []);

//   const getDayName = (dateString) => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", { weekday: "long" });
//   };

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/get_tour_types")
//       .then(res => {
//         setTourTypes(res.data.data);
//       })
//       .catch(err => console.log(err));
//   }, []);




//   return (
//     <div className="container w-full flex flex-col mt-10">

//       {/* tabs */}
//       <div className="flex flex-wrap gap-3 mb-3 z-50 ml-14 justify-center md:justify-start">

//         <button
//           onClick={() => setActiveTab("tours")}
//           className={`group flex items-center gap-2 px-6 py-2 rounded-full border transition 
//       ${activeTab === "tours"
//               ? "bg-[#1881FE] text-white border-blue-600"
//               : "bg-white border-gray-300 text-black hover:bg-blue-500 hover:text-white"
//             }`}
//         >
//           <FaSuitcaseRolling
//             size={22}
//             className={`transition
//         ${activeTab === "tours"
//                 ? "text-white"
//                 : "text-yellow-600 group-hover:text-white"
//               }`}
//           />
//           <span className={`${activeTab !== "tours" ? "group-hover:text-white" : ""}`}>
//             Tours
//           </span>
//         </button>

//         <button
//           onClick={() => setActiveTab("hotels")}
//           className={`group flex items-center gap-2 px-6 py-2 rounded-full border transition 
//       ${activeTab === "hotels"
//               ? "bg-blue-600 text-white border-blue-600"
//               : "bg-white border-gray-300 text-black hover:bg-blue-500 hover:text-white"
//             }`}
//         >
//           <FaBed
//             size={22}
//             className={`transition 
//         ${activeTab === "hotels"
//                 ? "text-white"
//                 : "text-yellow-600 group-hover:text-white"
//               }`}
//           />
//           <span className={`${activeTab !== "hotels" ? "group-hover:text-white" : ""}`}>
//             Hotels
//           </span>
//         </button>

//         <button
//           onClick={() => setActiveTab("visa")}
//           className={`group flex items-center gap-2 px-6 py-2 rounded-full border transition 
//       ${activeTab === "visa"
//               ? "bg-blue-600 text-white border-blue-600"
//               : "bg-white border-gray-300 text-black hover:bg-blue-500 hover:text-white"
//             }`}
//         >
//           <FaPassport
//             size={22}
//             className={`transition
//         ${activeTab === "visa"
//                 ? "text-white"
//                 : "text-blue-400 group-hover:text-white"
//               }`}
//           />
//           <span className={`${activeTab !== "visa" ? "group-hover:text-white" : ""}`}>
//             Visa
//           </span>
//         </button>

//         <button
//           onClick={() => setActiveTab("experience")}
//           className={`group flex items-center gap-2 px-6 py-2 rounded-full border transition 
//       ${activeTab === "experience"
//               ? "bg-blue-600 text-white border-blue-600"
//               : "bg-white border-gray-300 text-black hover:bg-blue-500 hover:text-white"
//             }`}
//         >
//           <MdOutlineExplore
//             size={22}
//             className={`transition 
//         ${activeTab === "experience"
//                 ? "text-white"
//                 : "text-yellow-600 group-hover:text-white"
//               }`}
//           />
//           <span className={`${activeTab !== "experience" ? "group-hover:text-white" : ""}`}>
//             Experience
//           </span>
//         </button>

//       </div>


//       <div className="bg-white rounded-xl shadow-lg px-6 py-10 flex flex-col relative z-20 -mt-8">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-5">

//           {/* Destination */}
//           <div className="relative border rounded-lg px-5 py-3 h-14 flex items-center gap-3 w-full cursor-pointer">

//             <FiMapPin size={20} className="text-gray-500" />

//             <div className="flex flex-col leading-none pointer-events-none">
//               <p className="text-gray-500 text-sm">Select</p>
//               <p className="font-semibold">
//                 {selectedDestination ? selectedDestination : "Destination"}
//               </p>
//             </div>

//             <select
//               value={selectedDestination}
//               onChange={(e) => setSelectedDestination(e.target.value)}
//               className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//             >
//               <option value="">Destination</option>
//               {destinations.map((d) => (
//                 <option key={d.id} value={d.country_name}>
//                   {d.country_name}
//                 </option>
//               ))}
//             </select>

//           </div>


//           {/* Calendar */}

//           <div
//             className="border rounded-lg px-5 py-2 h-14 flex items-center gap-3 w-full relative cursor-pointer"
//             onClick={() => dateRef.current.showPicker()}
//           >
//             <FiCalendar size={22} className="text-gray-500" />

//             <div className="flex flex-col justify-center leading-tight pointer-events-none w-full">
//               <span className="text-gray-500 text-sm">
//                 {selectedDate ? getDayName(selectedDate) : "Select"}
//               </span>

//               <span className="font-semibold">
//                 {selectedDate ? selectedDate : "Date"}
//               </span>
//             </div>

//             <input
//               ref={dateRef}
//               type="date"
//               value={selectedDate}
//               onChange={(e) => setSelectedDate(e.target.value)}
//               className="absolute inset-0 w-full h-full opacity-0"
//             />
//           </div>





//           {/* Tour Type */}
//           <div className="relative border rounded-lg px-5 py-3 h-14 flex items-center gap-3 w-full cursor-pointer">

//             <FiList size={20} className="text-gray-500 pointer-events-none" />

//             <div className="flex flex-col leading-none pointer-events-none">
//               <p className="text-gray-500 text-sm">Select</p>
//               <p className="font-semibold">
//                 {selectedTourType ? selectedTourType : "Tour Type"}
//               </p>
//             </div>

//             <select
//               value={selectedTourType}
//               onChange={(e) => setSelectedTourType(e.target.value)}
//               className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//             >
//               <option value="">Tour Type</option>

//               {tourTypes.map((t) => (
//                 <option key={t.id} value={t.name}>
//                   {t.name}
//                 </option>
//               ))}
//             </select>

//           </div>



//           {/* Search */}
//           <button className="bg-blue-600 text-white flex items-center justify-center gap-2 rounded-lg text-lg font-semibold h-14">
//             <FiSearch size={20} /> SEARCH
//           </button>

//         </div>

//         <p className="text-gray-600 text-sm">
//           Can’t find what you’re looking for? create your{" "}
//           <span className="text-blue-600 cursor-pointer">Custom Itinerary</span>
//         </p>
//       </div>


//     </div>
//   );
// }

