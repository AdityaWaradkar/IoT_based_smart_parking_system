import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [carNumber, setCarNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!name || !email || !carNumber || !password) {
      toast.error('Please fill in all fields.', { position: 'top-center' });
      return;
    }

    // Make API request to backend
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, carNumber, password }),
      });

      const data = await response.json();

      if (response.status === 201) {
        // Registration successful
        toast.success(data.message, {
          position: 'top-center',
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate('/user/login'); // Redirect to login
        }, 1000);
      } else {
        // Handle errors from the backend (e.g., user already exists)
        toast.error(data.message, { position: 'top-center' });
      }
    } catch (error) {
      // Handle network/server error
      toast.error('Server error. Please try again later.', { position: 'top-center' });
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
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-3 rounded-lg"
        >
          Register
        </button>
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

      <ToastContainer />
    </div>
  );
};

export default UserRegister;
