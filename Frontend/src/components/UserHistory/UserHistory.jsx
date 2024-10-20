import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserHistory = () => {
  const [historyData, setHistoryData] = useState([]); // State to hold transaction data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchHistoryData = async () => {
      setLoading(true); // Set loading to true when fetching starts
      setError(null); // Reset error state

      try {
        const response = await fetch(
          "http://localhost:5000/api/parkingHistory/history",
          {
            method: "GET", // Specify the HTTP method
            headers: {
              "Content-Type": "application/json", // Set content type to JSON
            },
          }
        ); // Adjust the URL based on your server
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json(); // Parse JSON response
        setHistoryData(data); // Set the fetched data to state
      } catch (err) {
        setError("Failed to fetch transaction history"); // Handle errors
        toast.error(err.message, { position: "top-center" }); // Notify error
      } finally {
        setLoading(false); // Set loading to false once the request is complete
      }
    };

    fetchHistoryData(); // Call the fetch function
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="p-4">
      <ToastContainer />

      {loading && <div className="text-center text-gray-500">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}

      <div className="h-full w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {historyData.map((entry) => (
          <div
            key={entry._id} // Use MongoDB's unique ID
            className="p-6 border border-gray-300 rounded-lg shadow-lg bg-white flex flex-col justify-between"
            style={{
              fontFamily: '"Georgia", serif',
            }}
          >
            <div className="flex flex-col mb-4 text-gray-800">
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-lg">Username:</span>
                <span className="text-gray-600">{entry.userName}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-lg">Parking ID:</span>
                <span className="text-gray-600">{entry._id}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-lg">Parking Duration:</span>
                <span className="text-gray-600">{entry.parkingDuration}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-lg">Price:</span>
                <span className="text-gray-600">{entry.totalPrice}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-lg">Date:</span>
                <span className="text-gray-600">
                  {new Date(entry.paymentDateTime).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-lg">Time of Booking:</span>
                <span className="text-gray-600">
                  {new Date(entry.paymentDateTime).toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserHistory;
