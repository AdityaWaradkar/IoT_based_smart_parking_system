import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulate successful login
    if (email && password) {
      toast.success('Login successful!', {
        position: 'top-center',
        autoClose: 1000,
      });
      setTimeout(() => {
        navigate('/user/home'); // Redirect to user home page
      }, 1000);
    } else {
      toast.error('Please fill in all fields.', { position: 'top-center' });
    }
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow-lg w-80 mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center mb-8">User Login</h1>
      <div className="space-y-4">
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
          onClick={handleLogin} // Call handleLogin on button click
          className="w-full bg-blue-500 text-white p-3 rounded-lg"
        >
          Login
        </button>
      </div>

      <p className="mt-4 text-center">
        Don’t have an account?{' '}
        <button onClick={() => navigate('/user/register')} className="text-blue-500 underline">
          Register here
        </button>
      </p>

      <ToastContainer />

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
