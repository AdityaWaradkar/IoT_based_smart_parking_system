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
import Map from './components/Map/Map'

function App() {
  const location = useLocation();
  const noHeaderPaths = ['/', '/user/login', '/user/register', '/admin/login'];
  const noFooterPaths = ['/', '/user/login', '/user/register', '/admin/login'];



  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {!noHeaderPaths.includes(location.pathname) && <Header />}
      <div className="flex-grow pt-16">
        <Routes>
          <Route path="/" element={<UserSelection />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user/register" element={<UserRegister />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/about" element={<div>About Us Page</div>} />
          <Route path="/sections" element={<div>Sections Page</div>} />
          <Route path="/user/home" element={<UserHome/>} /> {/* Pass sliderData */}
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/dashboard" element={<AdminHome />} />
          <Route path="/user/home/map" element={<Map />} />

        </Routes>
      </div>
      {!noFooterPaths.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default App;
