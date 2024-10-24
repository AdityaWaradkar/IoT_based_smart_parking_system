import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = () => {
  const [adminKey, setAdminKey] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (adminKey && password) {
      try {
        // Login request
        const response = await fetch("http://localhost:5000/api/admin/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ adminKey, password }),
        });

        const data = await response.json();

        if (response.ok) {
          // Success message for login
          toast.success(data.message, {
            position: "top-center",
            autoClose: 1000,
          });

          // Navigate to admin home after login success
          setTimeout(() => {
            navigate("/admin/home");
          }, 1000);
        } else {
          // Error message for login failure
          toast.error(data.message, { position: "top-center" });
        }
      } catch (error) {
        // Error message for network issues
        toast.error("Login failed. Please try again.", {
          position: "top-center",
        });
      }
    } else {
      // Error message for empty fields
      toast.error("Please fill in all fields.", { position: "top-center" });
    }
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow-lg w-80 mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center mb-8">Admin Login</h1>
      <form className="space-y-4" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Admin Key"
          className="w-full p-3 border border-gray-300 rounded-lg"
          value={adminKey}
          onChange={(e) => setAdminKey(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-3 rounded-lg"
        >
          Login
        </button>
      </form>

      <button
        onClick={() => navigate("/")}
        className="mt-4 bg-gray-300 text-black p-3 rounded-lg w-full"
      >
        Go Back
      </button>
      <ToastContainer />
    </div>
  );
};

export default AdminLogin;
