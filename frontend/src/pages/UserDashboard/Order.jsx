import React from 'react'

function Order() {
  return (
    <div className="w-full">

      {/* Top Border */}
      <div className="h-[3px] w-full bg-blue-400"></div>

      {/* Main Box */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#F6F5F8] p-4 md:p-5 gap-4 md:gap-0 rounded-md">

        {/* Left Side */}
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 bg-gray-100 border border-blue-400 border-t-4"></div>
          <p className="text-gray-700 text-sm md:text-base">
            No order has been made yet.
          </p>
        </div>

        {/* Right Button */}
        <button className="bg-[#DCD7E2] px-4 py-2 rounded text-sm md:text-base hover:bg-[#c7c2cc] transition">
          Browse products
        </button>

      </div>

    </div>
  )
}

export default Order
