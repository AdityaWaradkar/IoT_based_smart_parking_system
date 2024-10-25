import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for Toastify
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
        // Show basic toast notification if no slots are available
        toast(
          "No slots available, please try again after some time. Thank you",
          {
            position: "top-center", // Directly passing the position string
          }
        );
      }
    } catch (error) {
      console.error("Error checking slot availability", error);
      toast("Failed to check slot availability. Please try again.", {
        position: "top-center", // Directly passing the position string
      });
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
      {/* ToastContainer for notifications */}
      <ToastContainer />

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
