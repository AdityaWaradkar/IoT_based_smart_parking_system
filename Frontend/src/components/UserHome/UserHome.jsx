import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import CardSection from "../CardSection/CardSection";

const UserHome = () => {
  const navigate = useNavigate(); // Use navigate

  // Function to check slot availability
  const checkSlotAvailability = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/slots/check-availability"
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const availableSlotIndex = data.slots.findIndex((slot) => slot === 0); // Get the index of the first available slot

      if (availableSlotIndex !== -1) {
        // If slots are available, navigate to parking duration
        navigate("/user/home/parkingDuration");
      } else {
        // If no slots are available, you can handle this however you like
        console.log("No slots available");
      }
    } catch (error) {
      console.error("Error checking slot availability", error);
    }
  };

  // Handle the "Find on Map" button click
  const handleFindMapClick = () => {
    navigate("/user/home/map"); // Navigate to the map route
  };

  // Handle the "Check History" button click
  const handleCheckHistoryClick = () => {
    navigate("/user/home/history"); // Navigate to the history route
  };

  // Handle the "Book Now" button click
  const handleBookNowClick = () => {
    checkSlotAvailability(); // Check slot availability
  };

  return (
    <div className="flex flex-col h-screen">
      {/* CardSection for interaction */}
      <div className="flex-grow w-full bg-gray-200 mb-5">
        <CardSection
          onFindMapClick={handleFindMapClick}
          onCheckHistoryClick={handleCheckHistoryClick}
          onBookNowClick={handleBookNowClick} // Pass the book now handler
        />
      </div>
    </div>
  );
};

export default UserHome;
