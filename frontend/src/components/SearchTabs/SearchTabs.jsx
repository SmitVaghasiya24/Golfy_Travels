import { useState } from "react";
import { FaSuitcaseRolling, FaBed, FaPassport } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import Tour from "./Tour";

export default function SearchTabs() {
  const [activeTab, setActiveTab] = useState("tours");

  return (
    <div className="container w-full flex flex-col ">

      <div className="flex flex-wrap gap-3 mb-3 z-500 ml-14 justify-center md:justify-start">
        {[
          { key: "tours", label: "Tours", icon: <FaSuitcaseRolling size={22} /> },
          { key: "hotels", label: "Hotels", icon: <FaBed size={22} /> },
          { key: "visa", label: "Visa", icon: <FaPassport size={22} /> },
          { key: "experience", label: "Experience", icon: <MdOutlineExplore size={22} /> },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`group flex items-center gap-2 px-6 py-3 rounded-full border transition 
              ${activeTab === tab.key
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white border-gray-300 text-black hover:bg-blue-500 hover:text-white"
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

    </div>
  );
}
