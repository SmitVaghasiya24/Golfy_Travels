import React from "react";
import BillingAddress from "./Address/BillingAddress";
import ShippingAddress from "./Address/ShippingAddress";

function Address() {
  return (
    <div className="space-y-8 w-full p-4 sm:p-6 md:px-6 md:py-0 ">

      <p className="text-[#52526A]">
        The following addresses will be used on the checkout page by default.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#F7F7F7] p-5 w-full">
            <h1 className="text-xl font-semibold mb-2">Billing address</h1>
            <h2 className="cursor-pointer mb-3">
                Add Billing address
            </h2>
            <p className="text-sm text-gray-600">
                You have not set up this type of address yet.
            </p>
        </div>
      <div className="bg-[#F7F7F7] p-5 w-full">
            <h1 className="text-xl font-semibold mb-2">Shipping address</h1>
            <h2 className="cursor-pointer mb-3">
                Add Shipping address
            </h2>
            <p className="text-sm text-gray-600">
                You have not set up this type of address yet.
            </p>
        </div>


      </div>

    </div>
  );
}

export default Address;
