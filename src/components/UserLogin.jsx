import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for Toastify

const UserLogin = () => {
  const [carNumber, setCarNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Construct request body
    const loginData = {
      carNumber,
      password,
    };

    try {
      // Send login request to backend
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();

      if (response.ok) {
        // If login is successful, show success popup and redirect
        toast.success('Login successful!', { position: 'top-center', autoClose: 2000 });
        
        // Store authentication token if returned by backend
        localStorage.setItem('authToken', result.token);
        
        setTimeout(() => {
          navigate('/dashboard'); // Redirect to user dashboard
        }, 2000);
      } else {
        // If login fails, show error popup
        toast.error(`Login failed: ${result.error}`, { position: 'top-center' });
      }
    } catch (error) {
      // If there is a network error, show an error popup
      toast.error('Network error! Please try again.', { position: 'top-center' });
    }
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow-lg w-80 mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center mb-8">User Login</h1>
      <form className="space-y-4" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Car Number"
          className="w-full p-3 border border-gray-300 rounded-lg"
          value={carNumber}
          onChange={(e) => setCarNumber(e.target.value)}
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
        <button className="w-full bg-blue-500 text-white p-3 rounded-lg" type="submit">
          Login
        </button>
      </form>

      <p className="mt-4 text-center">
        Don’t have an account?{' '}
        <button
          onClick={() => navigate('/user/register')}
          className="text-blue-500 underline"
        >
          Register here
        </button>
      </p>

      <ToastContainer /> {/* This is where the toasts will appear */}

      <button
        onClick={() => navigate('/')}
        className="mt-4 bg-gray-300 text-black p-3 rounded-lg w-full"
      >
        Go Back
      </button>
    </div>
  );
};

export default UserLogin;
