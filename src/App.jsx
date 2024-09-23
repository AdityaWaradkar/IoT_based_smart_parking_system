import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserSelection from './components/UserSelection';
import UserLogin from './components/UserLogin';
import UserRegister from './components/UserRegister';
import AdminLogin from './components/AdminLogin';

function App() {
  return (
    <Router>
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <Routes>
          <Route path="/" element={<UserSelection />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user/register" element={<UserRegister />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          {/* Dashboard routes for demonstration */}
          <Route path="/user/dashboard" element={<div>User Dashboard</div>} />
          <Route path="/admin/dashboard" element={<div>Admin Dashboard</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
