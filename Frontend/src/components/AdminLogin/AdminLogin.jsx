import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLogin = () => {
  const [adminKey, setAdminKey] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (adminKey && password) {
      toast.success('Login successful!', {
        position: 'top-center',
        autoClose: 1000,
      });
      setTimeout(() => {
        navigate('/admin/home');
      }, 1000);
    } else {
      toast.error('Please fill in all fields.', { position: 'top-center' });
    }
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow-lg w-80 mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center mb-8">Admin Login</h1>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Admin Key"
          value={adminKey}
          onChange={(e) => setAdminKey(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-green-500 text-white p-3 rounded-lg"
        >
          Login
        </button>
      </div>
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

export default AdminLogin;
