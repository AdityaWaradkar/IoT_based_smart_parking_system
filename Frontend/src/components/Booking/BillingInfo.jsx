import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const BillingInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve values from the previous route
  const { hours = 0, minutes = 0, userName = "Guest" } = location.state || {};

  // Calculate total cost
  const calculateTotalCost = (hrs, mins) => {
    const hourlyRate = 50; // cost in rupees per hour
    const minuteRate = 10; // cost in rupees per minute
    return hrs * hourlyRate + mins * minuteRate;
  };

  const totalCost = calculateTotalCost(hours, minutes);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="max-w-lg w-full bg-white shadow-2xl rounded-lg p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Booking Summary
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Thank you,{" "}
          <span className="text-blue-600 font-semibold">{userName}</span>, for
          choosing our service! Here's your booking summary:
        </p>

        <div className="bg-blue-100 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Parking Duration</h2>
          <p className="text-lg text-gray-700 mt-2">
            {hours} hours {minutes} minutes
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Total Cost</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">₹{totalCost}</p>
        </div>

        <div className="flex justify-between space-x-4">
          <button
            onClick={() =>
              navigate("/user/home/parkingDuration/billing-info/payment", {
                state: { userName, hours, minutes, totalCost }, // Pass data to the payment component
              })
            }
            className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
          >
            Proceed to Payment
          </button>
          <button
            onClick={() => navigate("/user/home/parkingDuration")}
            className="bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg shadow-md transition duration-300 hover:bg-gray-400 focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
          >
            Go Back
          </button>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default BillingInfo;
