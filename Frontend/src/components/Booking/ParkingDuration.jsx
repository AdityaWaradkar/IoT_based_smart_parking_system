// src/components/ParkingDuration/ParkingDuration.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ParkingDuration = () => {
  const [duration, setDuration] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setDuration(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const durationValue = parseInt(duration);

    // Validate input: Must be a positive number
    if (isNaN(durationValue) || durationValue <= 0) {
      alert('Please enter a valid positive number for the duration.');
      return;
    }

    // Handle the booking logic here
    console.log(`Booking for ${duration} minutes/hours selected`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-gray-50">
      <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">
        How much time are you going to park your vehicle?
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-sm">
        <input
          type="text"
          placeholder="Enter time (e.g., 1 hour, 30 minutes)"
          value={duration}
          onChange={handleInputChange}
          className="w-full p-4 mb-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg shadow-md transition duration-300 hover:bg-blue-500 focus:outline-none"
        >
          Confirm Booking
        </button>
      </form>
      {/* Back Button for PC Screens */}
      <button
        onClick={() => navigate(-1)} // Go back to the previous page
        className="mt-4 bg-gray-300 text-gray-800 font-medium py-1 px-3 rounded-md transition duration-300 hover:bg-gray-400 focus:outline-none"
      >
        Back
      </button>
    </div>
  );
};

export default ParkingDuration;
