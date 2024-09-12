import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserSelection from './components/UserSelection';
import UserLogin from './components/UserLogin';
import UserRegister from './components/UserRegister';
import AdminLogin from './components/AdminLogin';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [auth, setAuth] = useState({ user: false, admin: false });

  useEffect(() => {
    // Check user authentication status
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/auth/check-auth', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        setAuth(response.data);
      } catch (error) {
        console.error('Authentication check error:', error);
        setAuth({ user: false, admin: false });
      }
    };

    checkAuth();
  }, []);

  return (
    <Router>
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <Routes>
          <Route path="/" element={<UserSelection />} />
          <Route path="/user/login" element={auth.user ? <Navigate to="/user/dashboard" /> : <UserLogin />} />
          <Route path="/user/register" element={auth.user ? <Navigate to="/user/dashboard" /> : <UserRegister />} />
          <Route path="/admin/login" element={auth.admin ? <Navigate to="/admin/dashboard" /> : <AdminLogin />} />
          {/* Assuming dashboard routes for demonstration */}
          <Route path="/user/dashboard" element={auth.user ? <div>User Dashboard</div> : <Navigate to="/user/login" />} />
          <Route path="/admin/dashboard" element={auth.admin ? <div>Admin Dashboard</div> : <Navigate to="/admin/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
