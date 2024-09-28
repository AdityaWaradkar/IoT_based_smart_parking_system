import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Check if both fields are filled
    if (email && password) {
      try {
        const response = await fetch("http://localhost:5000/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success(data.message, {
            position: "top-center",
            autoClose: 1000,
          });
          // Redirect after a short delay
          setTimeout(() => {
            navigate("/user/home"); // Redirect to user home page
          }, 1000);
        } else {
          toast.error(data.message, { position: "top-center" });
        }
      } catch (error) {
        toast.error("Login failed. Please try again.", {
          position: "top-center",
        });
      }
    } else {
      toast.error("Please fill in all fields.", { position: "top-center" });
    }
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow-lg w-80 mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center mb-8">User Login</h1>
      <form className="space-y-4" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          type="submit" // Change to submit type
          className="w-full bg-blue-500 text-white p-3 rounded-lg"
        >
          Login
        </button>
      </form>

      <p className="mt-4 text-center">
        Don’t have an account?{" "}
        <button
          onClick={() => navigate("/user/register")}
          className="text-blue-500 underline"
        >
          Register here
        </button>
      </p>

      <ToastContainer />

      <button
        onClick={() => navigate("/")}
        className="mt-4 bg-gray-300 text-black p-3 rounded-lg w-full"
      >
        Go Back
      </button>
    </div>
  );
};

export default UserLogin;
