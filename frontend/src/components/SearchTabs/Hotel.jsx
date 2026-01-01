import { FiMapPin, FiCalendar, FiList, FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "react-date-range";
import "react-date-range/dist/theme/default.css";
import { HiOutlineUserGroup } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";

export default function Hotel() {
  const [regions, setRegions] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [search, setSearch] = useState("");

  const [openDest, setOpenDest] = useState(false);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  const [openIn, setOpenIn] = useState(false);
  const [openOut, setOpenOut] = useState(false);

  const [openGuest, setOpenGuest] = useState(false);

  const [rooms, setRooms] = useState([{ adults: 1, children: 0 }]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .API("/api/get_region")
      .then((res) => setRegions(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg px-6 pt-12 pb-7 flex flex-col relative -mt-8 z-50">

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-5">

        {/* destination */}
        <div
          className="relative w-full border rounded-lg px-5 py-4 h-16 border-gray-300 flex items-center gap-3 cursor-pointer"
          onClick={() => setOpenDest(!openDest)}
        >
          <FiMapPin size={22} className="text-gray-600" />

          <div className="flex flex-col leading-tight">
            <p className="text-gray-500 text-sm">Select</p>
            <p className="font-semibold">
              {selectedDestination || "Destination"}
            </p>
          </div>

          <AnimatePresence>
            {openDest && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="scrollbar-thin absolute top-full left-0 right-0 bg-white shadow-md rounded-lg mt-2 z-50 max-h-80 overflow-auto p-2"
              >
                {/* Search Input */}
                <div className="px-3 pb-2 sticky top-0 bg-white">
                  <div className="relative">
                    <FiSearch
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      className="w-full border-b border-gray-300 p-2 pl-10 text-sm focus:outline-none"
                      type="text"
                      placeholder="Search destination..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>

                {regions.map((region) => {
                  const filtered = region.destinations.filter((d) =>
                    d.country_name.toLowerCase().includes(search.toLowerCase())
                  );
                  if (filtered.length === 0) return null;

                  return (
                    <div key={region.region_id} className="mb-3">
                      {filtered.map((dest) => (
                        <div
                          key={dest.id}
                          onClick={() => {
                            setSelectedDestination(dest.country_name);
                            setOpenDest(false);
                            setSearch("");
                          }}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer"
                        >
                          <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                            {dest.country_name.slice(0, 2).toUpperCase()}
                          </div>

                          <div>
                            <p className="font-semibold">
                              {dest.country_name}
                            </p>
                            <p className="text-gray-500 text-sm">
                              {region.name}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* check in */}
        <div className="relative w-full">
          <div
            className="border border-gray-300 rounded-lg px-5 py-4 h-16 flex items-center gap-3 cursor-pointer bg-white hover:border-blue-500 transition"
            onClick={() => {
              setOpenIn(!openIn);
              setOpenOut(false);
            }}
          >
            <FiCalendar size={22} className="text-gray-600" />

            <div className="flex flex-col leading-tight">
              <span className="text-gray-500 text-sm">Check-In</span>
              <span className="font-semibold">
                {checkIn ? checkIn.toDateString() : "Select Date"}
              </span>
            </div>
          </div>

          <AnimatePresence>
            {openIn && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute mt-2 z-50 shadow-xl rounded-lg bg-white w-max"
              >
                <Calendar
                  date={checkIn || new Date()}
                  onChange={(date) => setCheckIn(date)}
                  minDate={new Date()}
                  color="#2563EB"
                />

                <div className="flex justify-between px-4 py-3 border-t bg-gray-50">
                  <button className="text-gray-600" onClick={() => setOpenIn(false)}>
                    Cancel
                  </button>
                  <button
                    className="bg-blue-600 text-white px-4 py-1 rounded"
                    onClick={() => setOpenIn(false)}
                  >
                    Apply
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* checkout */}
        <div className="relative w-full">
          <div
            className="border border-gray-300 rounded-lg px-5 py-4 h-16 flex items-center gap-3 cursor-pointer bg-white hover:border-blue-500 transition"
            onClick={() => {
              setOpenOut(!openOut);
              setOpenIn(false);
            }}
          >
            <FiCalendar size={22} className="text-gray-600" />

            <div className="flex flex-col leading-tight">
              <span className="text-gray-500 text-sm">Check-Out</span>
              <span className="font-semibold">
                {checkOut ? checkOut.toDateString() : "Select Date"}
              </span>
            </div>
          </div>

          <AnimatePresence>
            {openOut && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute mt-2 z-50 shadow-xl rounded-lg bg-white w-max"
              >
                <Calendar
                  date={checkOut || new Date()}
                  onChange={(date) => setCheckOut(date)}
                  minDate={checkIn || new Date()}
                  color="#2563EB"
                />

                <div className="flex justify-between px-4 py-3 border-t bg-gray-50">
                  <button className="text-gray-600" onClick={() => setOpenOut(false)}>
                    Cancel
                  </button>
                  <button
                    className="bg-blue-600 text-white px-4 py-1 rounded"
                    onClick={() => setOpenOut(false)}
                  >
                    Apply
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* guest */}
        <div
          className="relative w-full border rounded-lg px-5 py-4 h-16 border-gray-300 flex items-center gap-3 cursor-pointer"
          onClick={() => setOpenGuest(!openGuest)}
        >

          <HiOutlineUserGroup size={22} className="text-gray-600" />

          <div className="flex flex-col leading-tight">
            <span className="text-gray-500 text-sm">Guests</span>
            <span className="font-semibold">
              {rooms.length} Room,{" "}
              {rooms.reduce(
                (sum, r) => sum + r.adults + r.children,
                0
              )}{" "}
              Guests
            </span>
          </div>

          <AnimatePresence>
            {openGuest && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 bg-white shadow-md rounded-lg mt-2 z-50 w-80 p-4"
              >
                <h3 className="text-lg font-semibold mb-2">Guest & Room</h3>
                <p className="text-gray-500 text-sm mb-4">
                  Start the journey with someone special.
                </p>

                {rooms.map((room, index) => (
                  <div
                    key={index}
                    className="mb-6 border rounded-lg p-3 bg-gray-50"
                  >
                    <p className="text-gray-700 font-medium mb-3">
                      Room-{index + 1}
                    </p>

                    {/* adults */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="font-medium">Adult</p>
                        <p className="text-xs text-gray-500">16 years+</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          className="w-6 h-6 border rounded-full flex items-center justify-center text-blue-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            setRooms((prev) => {
                              const copy = [...prev];
                              if (copy[index].adults > 1)
                                copy[index].adults--;
                              return copy;
                            });
                          }}
                        >
                          −
                        </button>

                        <span>{room.adults}</span>

                        <button
                          className="w-6 h-6 border rounded-full flex items-center justify-center text-blue-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            setRooms((prev) => {
                              const copy = [...prev];
                              copy[index].adults++;
                              return copy;
                            });
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* children */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Children</p>
                        <p className="text-xs text-gray-500">0-16 years</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          className="w-6 h-6 border rounded-full flex items-center justify-center text-blue-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            setRooms((prev) => {
                              const copy = [...prev];
                              if (copy[index].children > 0)
                                copy[index].children--;
                              return copy;
                            });
                          }}
                        >
                          −
                        </button>

                        <span>{room.children}</span>

                        <button
                          className="w-6 h-6 border rounded-full flex items-center justify-center text-blue-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            setRooms((prev) => {
                              const copy = [...prev];
                              copy[index].children++;
                              return copy;
                            });
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  className="w-full bg-blue-600 text-white py-2 rounded-full font-medium mt-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setRooms((prev) => [
                      ...prev,
                      { adults: 1, children: 0 },
                    ]);
                  }}
                >
                  + Add Another Room
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* search button */}
        <button
          onClick={() => navigate(`/pages/hotel`)}
          className="bg-[#1881FE] text-white cursor-pointer flex items-center justify-center gap-2 rounded-lg text-lg font-semibold h-16">
          <FiSearch size={20} /> SEARCH
        </button>
      </div>

      <p className="text-gray-600 text-sm">
        Can’t find what you're looking for? create your{" "}
        <Link
          to="/contact"
          className="text-blue-600 cursor-pointer relative inline-block
                   after:content-[''] after:absolute after:left-0 after:bottom-0
                   after:w-0 after:h-0.5 after:bg-blue-600
                   after:transition-all after:duration-600
                   hover:after:w-full"
        >
          Custom Itinerary
        </Link>
      </p>
    </div>
  );
}
