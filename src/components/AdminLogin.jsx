import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLogin = () => {
  const [adminKey, setAdminKey] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulate successful login
    if (adminKey && password) {
      toast.success('Login successful!', {
        position: 'top-center',
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate('/admin/dashboard'); // Redirect to admin dashboard
      }, 2000);
    } else {
      toast.error('Please fill in all fields.', { position: 'top-center' });
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
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-3 rounded-lg"
        >
          Login
        </button>
      </form>
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
