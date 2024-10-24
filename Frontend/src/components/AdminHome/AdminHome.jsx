import React, { useEffect, useState } from "react";

const AdminHome = () => {
  const [slots, setSlots] = useState([]); // State to hold slot availability
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors

  // Function to fetch slots
  const fetchSlots = async () => {
    console.log("Fetching slot availability..."); // Log fetching slots
    try {
      const response = await fetch(
        "http://localhost:5000/api/slots/check-availability" // Adjust URL as needed
      );

      if (!response.ok) {
        console.warn("Failed to fetch slots: ", response.status);
        setSlots([]); // Set slots to empty if there's an error
        return; // Exit the function early
      }

      const data = await response.json();
      console.log("Fetched slot availability:", data); // Log response data

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

  useEffect(() => {
    fetchSlots(); // Fetch slots on component mount
  }, []); // Empty dependency array to run only once on mount

  // Function to reserve the first available slot
  const reserveSlot = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/slots/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to reserve slot");
      }

      const result = await response.json();
      console.log("Slot reserved:", result.message);
      fetchSlots(); // Re-fetch slots to update the state
    } catch (err) {
      console.error("Error reserving slot:", err.message);
      setError(err.message); // Set error state
    }
  };

  // Function to unreserve the first occupied slot
  const unreserveSlot = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/slots/unreserve",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Check if the response is okay (status 2xx)
      if (!response.ok) {
        throw new Error("Failed to unreserve slot");
      }

      // No need to process the result since nothing is returned
      console.log("Slot unreserved successfully");
      fetchSlots(); // Re-fetch slots to update the state
    } catch (err) {
      console.error("Error unreserving slot:", err.message);
      setError(err.message); // Set error state
    }
  };

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

      {/* Buttons for reserving and unreserving slots */}
      <div className="flex justify-center gap-5">
        <button
          onClick={reserveSlot}
          className="bg-blue-500 text-white py-4 px-8 rounded-lg text-xl hover:bg-blue-600 transition"
        >
          Reserve Slot
        </button>

        <button
          onClick={unreserveSlot}
          className="bg-red-500 text-white py-4 px-8 rounded-lg text-xl hover:bg-red-600 transition"
        >
          Unreserve Slot
        </button>
      </div>

      <div className="flex justify-center gap-5 mt-5">
        <button className="bg-blue-500 text-white py-4 px-8 rounded-lg text-xl hover:bg-blue-600 transition">
          See User Details
        </button>
      </div>
    </div>
  );
};

export default AdminHome;
