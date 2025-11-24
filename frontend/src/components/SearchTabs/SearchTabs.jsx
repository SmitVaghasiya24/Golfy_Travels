import { useState } from "react";
import { FaSuitcaseRolling, FaBed, FaPassport } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import Tour from "./Tour";
import Hotel from "./Hotel";
import Visa from "./Visa"
import Experience from "./Experience"

export default function SearchTabs() {
  const [activeTab, setActiveTab] = useState("tours");

  return (
    <div className="container w-full flex flex-col ">

      <div className="flex px-1 xl:px-0 flex-wrap gap-3 mb-3 z-500 ml-0 md:ml-14 justify-center md:justify-start">
        {[
          { key: "tours", label: "Tours", icon: <FaSuitcaseRolling size={20} /> },
          { key: "hotels", label: "Hotels", icon: <FaBed size={20} /> },
          { key: "visa", label: "Visa", icon: <FaPassport size={20} /> },
          { key: "experience", label: "Experience", icon: <MdOutlineExplore size={20} /> },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`group flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 text-sm md:text-base rounded-full border transition 
        ${activeTab === tab.key
                ? "bg-[#1881FE] text-white border-blue-600"
                : "bg-white border-gray-300 hover:bg-blue-500 hover:text-white"
              }`}
          >
            <span className={`${activeTab !== tab.key ? "group-hover:text-white" : ""}`}>
              {tab.icon}
            </span>
            <span className={`${activeTab !== tab.key ? "group-hover:text-white" : ""}`}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>


      {activeTab === "tours" && <Tour />}
      {activeTab === "hotels" && <Hotel />}
      {activeTab === "visa" && <Visa />}
      {activeTab === "experience" && <Experience />}

    </div>
  );
}
