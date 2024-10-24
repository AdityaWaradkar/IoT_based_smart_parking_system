import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const ParkingDuration = () => {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateInputs = () => {
    const newErrors = {};
    const hoursValue = parseInt(hours);
    const minutesValue = parseInt(minutes);

    console.log("Validating Inputs:", {
      hours,
      minutes,
      hoursValue,
      minutesValue,
    });

    if (isNaN(hoursValue) || hoursValue < 0) {
      newErrors.hours = "Enter a valid non-negative number for hours.";
    }

    if (isNaN(minutesValue) || minutesValue < 0 || minutesValue >= 60) {
      newErrors.minutes = "Enter a valid number between 0 and 59 for minutes.";
    }

    setErrors(newErrors);
    console.log("Validation Errors:", newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateInputs()) {
      const hoursValue = parseInt(hours);
      const minutesValue = parseInt(minutes);
      const userName = localStorage.getItem("userName"); // Retrieve user ID from local storage

      if (!userName) {
        toast.error("User Name is missing.", { position: "top-center" });
        return;
      }

      try {
        // Proceed to book the parking duration directly
        const response = await fetch(
          "http://localhost:5000/api/parking/parkingDuration",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userName,
              hours: hoursValue,
              minutes: minutesValue,
              // You can pass the slot number as needed
            }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          toast.success(data.message, {
            position: "top-center",
            autoClose: 1000,
          });
          // Reset form fields
          setHours("");
          setMinutes("");
          navigate("/user/home/parkingDuration/billing-info", {
            state: { hours: hoursValue, minutes: minutesValue, userName },
          });
        } else {
          toast.error(data.message, { position: "top-center" });
        }
      } catch (error) {
        toast.error("Error processing your request. Please try again.", {
          position: "top-center",
        });
      }
    } else {
      toast.error("Please correct the input fields.", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-white p-6">
      <h1 className="text-5xl font-bold mb-8 text-gray-800 text-center">
        Set Parking Duration
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="flex items-center space-x-6 bg-gray-100 py-6 px-10 rounded-lg shadow-lg">
          <div className="flex flex-col items-center">
            <label htmlFor="hours" className="text-gray-500 text-lg mb-2">
              Hours
            </label>
            <input
              type="number"
              id="hours"
              placeholder="00"
              value={hours}
              onChange={(e) => {
                console.log("Hours input changed:", e.target.value);
                setHours(e.target.value);
              }}
              className={`w-24 text-center text-4xl font-semibold bg-white border-b-4 ${
                errors.hours ? "border-red-500" : "border-gray-300"
              } focus:border-blue-500 text-gray-700 outline-none transition duration-300`}
              min="0"
              required
            />
            {errors.hours && (
              <p className="text-red-500 text-sm mt-1">{errors.hours}</p>
            )}
          </div>
          <span className="text-gray-600 text-4xl font-bold">:</span>
          <div className="flex flex-col items-center">
            <label htmlFor="minutes" className="text-gray-500 text-lg mb-2">
              Minutes
            </label>
            <input
              type="number"
              id="minutes"
              placeholder="00"
              value={minutes}
              onChange={(e) => {
                console.log("Minutes input changed:", e.target.value);
                setMinutes(e.target.value);
              }}
              className={`w-24 text-center text-4xl font-semibold bg-white border-b-4 ${
                errors.minutes ? "border-red-500" : "border-gray-300"
              } focus:border-blue-500 text-gray-700 outline-none transition duration-300`}
              min="0"
              max="59"
              required
            />
            {errors.minutes && (
              <p className="text-red-500 text-sm mt-1">{errors.minutes}</p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="mt-8 w-full bg-blue-600 text-white font-bold py-3 rounded-lg shadow-md transition duration-300 hover:bg-blue-500 focus:outline-none text-lg"
        >
          Confirm Booking
        </button>
      </form>
      <button
        onClick={() => {
          console.log("Going back to the previous page");
          navigate("/user/home");
        }}
        className="mt-6 bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition duration-300 hover:bg-gray-400 focus:outline-none text-lg"
      >
        Go Back
      </button>
      <ToastContainer />
    </div>
  );
};

export default ParkingDuration;
