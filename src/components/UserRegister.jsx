import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for Toastify

const UserRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [carNumber, setCarNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/user/register', { name, email, carNumber, password });
      if (response.data.success) {
        // Show success toast and navigate to login page
        toast.success('Registration successful! Please log in.', { position: 'top-center', autoClose: 2000 });
        setTimeout(() => {
          navigate('/user/login');
        }, 2000);
      } else {
        // Show alert with the registration failure message
        toast.error(`Registration failed: ${response.data.message}`, { position: 'top-center' });
      }
    } catch (error) {
      // Log any errors encountered during registration
      console.error('Registration error:', error);
      toast.error('An error occurred. Please try again later.', { position: 'top-center' });
    }
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow-lg w-80 mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center mb-8">User Register</h1>
      <form className="space-y-4" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="text"
          placeholder="Car Number"
          value={carNumber}
          onChange={(e) => setCarNumber(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />
        <button type="submit" className="w-full bg-green-500 text-white p-3 rounded-lg">Register</button>
      </form>
      <p className="text-center mt-4">
        Already have an account?{' '}
        <Link to="/user/login" className="text-blue-500 underline">
          Login here
        </Link>
      </p>
      <button 
        onClick={() => navigate('/')} 
        className="mt-4 bg-gray-300 text-black p-3 rounded-lg w-full"
      >
        Go Back
      </button>

      <ToastContainer /> {/* This is where the toasts will appear */}
    </div>
  );
};

export default UserRegister;
