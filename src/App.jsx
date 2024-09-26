import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer'; // Import the Footer component
import UserSelection from './components/UserSelection/UserSelection';
import UserLogin from './components/UserLoginRegister/UserLogin';
import UserRegister from './components/UserLoginRegister/UserRegister';
import AdminLogin from './components/AdminLogin/AdminLogin';
import UserHome from './components/UserHome/UserHome'; // Import UserHome
import AdminHome from './components/AdminHome/AdminHome';

function App() {
  const location = useLocation();
  const noHeaderPaths = ['/','/user/login', '/user/register', '/admin/login'];
  const noFooterPaths = ['/','/user/login', '/user/register', '/admin/login']; // Paths without footer

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Conditionally render the Header based on the current path */}
      {!noHeaderPaths.includes(location.pathname) && <Header />}
      
      <div className="flex-grow pt-16">
        <Routes>
          <Route path="/" element={<UserSelection />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user/register" element={<UserRegister />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/about" element={<div>About Us Page</div>} />
          <Route path="/sections" element={<div>Sections Page</div>} />

          {/* Using UserHome as a parent component */}
          <Route path="/user/home" element={<UserHome />} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/user/dashboard" element={<UserHome />} />
          <Route path="/admin/dashboard" element={<AdminHome />} />
        </Routes>
      </div>

      {/* Conditionally render the Footer based on the current path */}
      {!noFooterPaths.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default App;
