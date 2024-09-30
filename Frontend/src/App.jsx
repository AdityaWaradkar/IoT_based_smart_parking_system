import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import UserSelection from './components/UserSelection/UserSelection';
import UserLogin from './components/UserLoginRegister/UserLogin';
import UserRegister from './components/UserLoginRegister/UserRegister';
import AdminLogin from './components/AdminLogin/AdminLogin';
import UserHome from './components/UserHome/UserHome';
import AdminHome from './components/AdminHome/AdminHome';
import Map from './components/Map/Map';
import UserHistory from './components/UserHistory/UserHistory';
import ParkingDuration from './components/Booking/ParkingDuration';

function App() {
  const location = useLocation();
  const noHeaderPaths = ['/', '/user/login', '/user/register', '/admin/login'];
  const noFooterPaths = ['/', '/user/login', '/user/register', '/admin/login'];

  // Determine if the current route is UserSelection
  const isUserSelection = location.pathname === '/';

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Conditional rendering of Header */}
      {!noHeaderPaths.includes(location.pathname) && <Header />}

      <div className={`flex-grow ${!isUserSelection ? 'pt-16' : ''}`}>
        <Routes>
          <Route path="/" element={<UserSelection />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user/register" element={<UserRegister />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/about" element={<div>About Us Page</div>} />
          <Route path="/sections" element={<div>Sections Page</div>} />
          <Route path="/user/home" element={<UserHome />} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/dashboard" element={<AdminHome />} />
          <Route path="/user/home/map" element={<Map />} />
          <Route path="/user/home/history" element={<UserHistory />} />
          <Route path="/user/home/parkingduration" element={<ParkingDuration />} />
        </Routes>
      </div>

      {/* Conditional rendering of Footer */}
      {!noFooterPaths.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default App;
