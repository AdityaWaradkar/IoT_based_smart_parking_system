import React, { useEffect, useState } from "react";

const AdminHome = () => {
  const [slots, setSlots] = useState([]); // State to hold slot availability
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const initializeSlots = async () => {
      console.log("Initializing slots..."); // Log initialization start
      try {
        const response = await fetch(
          "http://localhost:5000/api/slots/initialize-slots" // New URL to initialize slots
        );

        // Check response status, but do not throw an error for non-OK responses
        if (!response.ok) {
          console.warn("Failed to initialize slots: ", response.status);
        } else {
          console.log("Slots initialized successfully"); // Log success
        }
      } catch (err) {
        console.error("Error during slots initialization:", err.message); // Log detailed error
        setError(err.message); // Capture error
      } finally {
        await fetchSlots(); // Call to fetch slots after initialization
      }
    };

    const fetchSlots = async () => {
      console.log("Fetching slot availability..."); // Log fetching slots
      try {
        const response = await fetch(
          "http://localhost:5000/api/slots/check-availability" // Adjust URL as needed
        );

        // Check response status, but do not throw an error for non-OK responses
        if (!response.ok) {
          console.warn("Failed to fetch slots: ", response.status);
          setSlots([]); // Set slots to empty if there's an error
          return; // Exit the function early
        }

        const data = await response.json();
        console.log("Fetched slot availability:", data); // Log response data

        // Handle case where data may not have slots
        if (data && data.slots) {
          setSlots(data.slots); // Set the fetched slots data
        } else {
          console.warn("No slots data returned");
          setSlots([]); // Set to empty if slots are null
        }
      } catch (err) {
        console.error("Error fetching slots:", err.message); // Log detailed error
        setError(err.message); // Capture any errors
      } finally {
        setLoading(false); // Update loading state
        console.log("Loading state updated:", false); // Log loading state
      }
    };

    initializeSlots(); // Initialize slots on component mount
  }, []); // Empty dependency array to run only once on mount

  // Display loading message while fetching
  if (loading) {
    return <div>Loading...</div>;
  }

  // Display error message if there's an error
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 p-5">
      <h1 className="text-2xl font-bold mb-5 text-center">Admin Dashboard</h1>

      <div className="flex-grow grid grid-cols-5 gap-4 mb-10">
        {slots.map((slot, index) => (
          <div key={index} className="flex items-center justify-center">
            <div
              className={`h-48 w-48 rounded-full flex items-center justify-center text-white font-bold relative ${
                slot === 0 ? "bg-green-500" : "bg-red-500"
              }`}
            >
              <span className="absolute text-xl font-semibold text-black">
                {index + 1}
              </span>
            </div>
            <span className="ml-4 text-xl font-semibold text-center">
              {slot === 0 ? "Available" : "Occupied"}
            </span>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-5">
        <button className="bg-blue-500 text-white py-4 px-8 rounded-lg text-xl hover:bg-blue-600 transition">
          See User Details
        </button>
      </div>
    </div>
  );
};

export default AdminHome;
