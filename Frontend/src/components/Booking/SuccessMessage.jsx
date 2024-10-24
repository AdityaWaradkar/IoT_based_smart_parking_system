import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SuccessMessage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve data passed from Payment
  const {
    userName,
    hours,
    minutes,
    totalCost,
    bookedSlot, // New addition
    paymentId, // New addition if needed
  } = location.state || {};

  const handleBackToHome = () => {
    navigate("/user/home"); // Adjust the path as per your routing structure
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-lg p-12 w-full max-w-xl text-center">
        <h2 className="text-4xl font-bold text-green-600 mb-6">
          Payment Successful!
        </h2>
        <p className="text-2xl text-gray-600 mb-8">
          Thank you, <span className="font-bold">{userName}</span>, for your
          payment. Your transaction has been completed successfully.
        </p>
        <p className="text-lg text-gray-600 mb-4">
          Parking Duration: {hours} hours {minutes} minutes
        </p>
        <p className="text-lg text-gray-600 mb-4">Total Cost: ₹{totalCost}</p>
        <p className="text-lg text-gray-600 mb-4">
          Booked Slot: {bookedSlot} {/* Display booked slot information */}
        </p>
        {/* Uncomment the next line if you want to display the payment ID */}
        {/* <p className="text-lg text-gray-600 mb-4">Payment ID: {paymentId}</p> */}
        <button
          onClick={handleBackToHome}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-4 px-8 rounded-lg w-full transition duration-300 ease-in-out text-lg"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default SuccessMessage;
