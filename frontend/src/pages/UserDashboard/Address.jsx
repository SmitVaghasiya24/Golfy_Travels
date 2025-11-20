import React, { useState, useEffect } from "react";
import BillingAddress from "./Address/BillingAddress";
import ShippingAddress from "./Address/ShippingAddress";
import axios from "axios";

function Address() {
  const [showBillingForm, setShowBillingForm] = useState(false);
  const [billingData, setBillingData] = useState(null);

  const [showShippingForm, setShowShippingForm] = useState(false);
  const [shippingData, setShippingData] = useState(null);

  const user = JSON.parse(localStorage.getItem("userData"));
  const userId = user?.id;

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:5000/api/get_billing_address/${userId}`)
      .then((res) => {
        console.log("Billing Response:", res.data);
        if (res.data && res.data.billingAddress) {
          setBillingData(res.data.billingAddress);
        }
      })
      .catch((err) => console.log(err));
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:5000/api/get_shipping_address/${userId}`)
      .then((res) => {
        console.log("Shipping Response:", res.data);
        if (res.data && res.data.shippingAddress) {
          setShippingData(res.data.shippingAddress);
        }
      })
      .catch((err) => console.log(err));
  }, [userId]);

  return (
    <div className="space-y-8 w-full p-4 sm:p-6 md:px-6 md:py-0">
      <p className="text-[#52526A]">
        The following addresses will be used on the checkout page by default.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 *:self-start">

        <div className="bg-[#F7F7F7] p-5 w-full rounded">
          <h1 className="text-xl font-semibold mb-4">Billing address</h1>

          {billingData && !showBillingForm ? (
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Name:</strong> {billingData.first_name} {billingData.last_name}</p>
              <p><strong>Country:</strong> {billingData.country}</p>
              <p><strong>Address:</strong> {billingData.address}</p>
              <p><strong>Apartment:</strong> {billingData.apartment || "N/A"}</p>
              <p><strong>City:</strong> {billingData.city}</p>
              <p><strong>State:</strong> {billingData.state}</p>
              <p><strong>Zip:</strong> {billingData.zip}</p>
              <p><strong>Phone:</strong> {billingData.phone}</p>
              <p><strong>Email:</strong> {billingData.email}</p>

              <button
                onClick={() => setShowBillingForm(true)}
                className="text-blue-600 mt-3"
              >
                Edit Address
              </button>
            </div>
          ) : (
            <>
              {!billingData && !showBillingForm && (
                <>
                  <button
                    onClick={() => setShowBillingForm(true)}
                    className="text-blue-600 mb-3"
                  >
                    Add Billing Address
                  </button>
                  <p className="text-sm text-gray-600">
                    You have not set up this type of address yet.
                  </p>
                </>
              )}

              {showBillingForm && (
                <BillingAddress
                  editData={billingData}
                  type="billing"
                  onClose={() => {
                    setShowBillingForm(false);
                  }}
                />
              )}
            </>
          )}
        </div>

        <div className="bg-[#F7F7F7] p-5 w-full rounded">
          <h1 className="text-xl font-semibold mb-4">Shipping address</h1>

          {shippingData && !showShippingForm ? (
            <div className="space-y-2 text-sm text-gray-700">

              <p><strong>Name:</strong> {shippingData.first_name} {shippingData.last_name}</p>
              <p><strong>Country:</strong> {shippingData.country}</p>
              <p><strong>Address:</strong> {shippingData.street_address}</p>
              <p><strong>Apartment:</strong> {shippingData.apartment || "N/A"}</p>
              <p><strong>City:</strong> {shippingData.city}</p>
              <p><strong>State:</strong> {shippingData.state}</p>
              <p><strong>Zip:</strong> {shippingData.zip_code}</p>

              <button
                onClick={() => setShowShippingForm(true)}
                className="text-blue-600 mt-3"
              >
                Edit Address
              </button>
            </div>
          ) : (
            <>
              {!shippingData && !showShippingForm && (
                <>
                  <button
                    onClick={() => setShowShippingForm(true)}
                    className="text-blue-600 mb-3"
                  >
                    Add Shipping Address
                  </button>
                  <p className="text-sm text-gray-600">
                    You have not set up this type of address yet.
                  </p>
                </>
              )}

              {showShippingForm && (
                <ShippingAddress
                  editData={shippingData}
                  type="shipping"
                  onClose={() => {
                    setShowShippingForm(false);
                  }}
                />
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
}

export default Address;
