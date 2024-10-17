import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const BillingInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Retrieve values from the previous route
  const { hours, minutes, userId } = location.state || {};
  
  // Calculate total cost (example: 50 rupees per hour and 10 rupees per minute)
  const hourlyRate = 50; // cost in rupees per hour
  const minuteRate = 10; // cost in rupees per minute
  const totalCost = (hours * hourlyRate) + (minutes * minuteRate);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-white p-6">
      <h1 className="text-5xl font-bold mb-8 text-gray-800 text-center">Booking Summary</h1>
      <p className="text-xl mb-6 text-gray-700 text-center">
        Thank you for choosing our service! Here are the details of your booking:
      </p>
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">User ID: {userId}</h2>
        <p className="text-xl text-gray-600 mb-2">Parking Duration: {hours} hours {minutes} minutes</p>
        <p className="text-2xl font-bold text-blue-600">Total Cost: ₹{totalCost}</p>
      </div>
      <div className="mt-8 flex space-x-6">
        <button
          onClick={() => navigate('/payment')}
          className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 hover:bg-blue-500 focus:outline-none text-lg"
        >
          Proceed to Payment
        </button>
        <button
          onClick={() => navigate(-1)} // Navigate back to Parking Duration page
          className="bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg shadow-md transition duration-300 hover:bg-gray-400 focus:outline-none text-lg"
        >
          Go Back
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BillingInfo;
