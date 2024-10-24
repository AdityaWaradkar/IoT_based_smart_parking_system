import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import CardSection from "../CardSection/CardSection";
import Slider from "../Slider/Slider";
import { toast, ToastContainer } from "react-toastify"; // Import toast for notifications
import "react-toastify/dist/ReactToastify.css";

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
      const availableSlots = data.slots.filter((slot) => slot === 0).length; // Count available slots

      if (availableSlots > 0) {
        // If slots are available, navigate to the parking duration route
        navigate("/user/home/parkingDuration");
      } else {
        // If no slots are available, show a message
        toast.error(data.message || "Slots are full", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Error checking slot availability", {
        position: "top-center",
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
    checkSlotAvailability(); // Check slot availability before navigating
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
      <ToastContainer /> {/* ToastContainer for notifications */}
    </div>
  );
};

export default UserHome;
