import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Payment = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get values passed via navigate
  const { totalCost, userName, hours, minutes } = location.state || {};

  // Check if totalCost is undefined
  if (totalCost === undefined) {
    console.error("Total Cost not provided in location state");
    return <div>Error: Total Cost not available.</div>;
  }

  // Convert totalCost to paise (1 INR = 100 paise)
  const totalCostInPaise = totalCost * 100;

  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => {
          setIsLoaded(true);
          console.log("Razorpay SDK loaded"); // Log for debugging
          resolve(true);
        };
        script.onerror = () => {
          console.error("Failed to load Razorpay SDK"); // Log if failed to load
          resolve(false);
        };
        document.body.appendChild(script);
      });
    };

    loadRazorpayScript();
  }, []);

  const handlePayment = async () => {
    if (!isLoaded) {
      alert("Failed to load Razorpay SDK. Check your internet connection.");
      return;
    }

    try {
      // Fetch the order from the server
      console.log("Sending request to create order...");
      const response = await fetch(
        "http://localhost:5000/api/payment/createOrder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: totalCostInPaise }), // Send amount in paise
        }
      );

      // Log the raw response
      console.log("Response from createOrder:", response);

      // Check for successful response
      if (!response.ok) {
        throw new Error("Failed to create order on the server");
      }

      // Parse the response as JSON
      const orderData = await response.json();
      console.log("Order Data from Razorpay:", orderData.amount);

      if (!orderData.id) {
        throw new Error("Invalid order data received");
      }

      const options = {
        key: "rzp_test_NjMCuCfEfKS9bs", // Your Razorpay test key
        amount: orderData.amount, // Order amount in paise
        currency: "INR",
        name: "ParkSense",
        description: "Parking Payment",
        order_id: orderData.id,
        handler: async function (response) {
          console.log("Payment Response:", response);
          alert("Payment Successful!");

          // Create an object to send to the backend
          const transactionData = {
            userName,
            parkingDuration: `${hours} hours ${minutes} minutes`,
            totalPrice: totalCost,
            paymentId: response.razorpay_payment_id,
          };
          console.log(transactionData);
          try {
            // Make POST request to save transaction data
            const transactionResponse = await fetch(
              "http://localhost:5000/api/parkingTransaction/data",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(transactionData),
              }
            );

            if (!transactionResponse.ok) {
              throw new Error("Failed to save transaction data.");
            }

            toast.success("Transaction data saved successfully!");
            // Navigate to success page
            navigate(
              "/user/home/parkingDuration/billing-info/payment/success",
              {
                state: { userName, hours, minutes, totalCost },
              }
            );
          } catch (error) {
            console.error("Error saving transaction data:", error);
            toast.error("Error saving transaction data: " + error.message);
          }
        },
        prefill: {
          name: "Aditya Waradkar",
          email: "aditya@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Error processing payment: " + error.message);
    }
  };

  const handleBack = () => {
    navigate("/user/home/parkingDuration/billing-info");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Confirm Payment
        </h2>

        <div className="mb-6">
          <p className="text-lg text-gray-600">Total Amount to Pay:</p>
          <h3 className="text-3xl font-bold text-blue-600 mt-2">
            ₹ {totalCost} {/* Display totalCost here */}
          </h3>
        </div>

        <p className="text-gray-500 mb-8">
          You are one step away from completing your payment. Click the button
          below to proceed.
        </p>

        <button
          onClick={handlePayment}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg w-full transition duration-300 ease-in-out mb-4"
        >
          Pay Now
        </button>

        <button
          onClick={handleBack}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-lg w-full transition duration-300 ease-in-out"
        >
          Back
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Payment;
