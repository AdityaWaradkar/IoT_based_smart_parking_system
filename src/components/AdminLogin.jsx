import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for Toastify

const AdminLogin = () => {
  const [adminKey, setAdminKey] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/admin/login', { adminKey, password });
      if (response.data.success) {
        // Show success notification and redirect to admin dashboard
        toast.success('Login successful!', { position: 'top-center', autoClose: 2000 });
        navigate('/admin/dashboard');
      } else {
        // Show error notification
        toast.error(`Login failed: ${response.data.message}`, { position: 'top-center' });
      }
    } catch (error) {
      // Show network error notification
      toast.error('Network error! Please try again.', { position: 'top-center' });
    }
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow-lg w-80 mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center mb-8">Admin Login</h1>
      <form className="space-y-4" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Admin Key"
          value={adminKey}
          onChange={(e) => setAdminKey(e.target.value)}
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
        <button type="submit" className="w-full bg-green-500 text-white p-3 rounded-lg">Login</button>
      </form>
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

export default AdminLogin;
