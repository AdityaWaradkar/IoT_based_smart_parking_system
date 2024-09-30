import { Link } from 'react-router-dom';
import adminProfileAvatar from '../../assets/UserSelectionAvatar/adminProfileAvatar.png';
import userProfileAvatar from '../../assets/UserSelectionAvatar/userProfileAvatar.png';
import Banner from '../../assets/UserSelectionAvatar/UserSelectionPageBanner.jpg';

const UserSelection = () => {
  return (
    <div className="h-screen w-screen flex overflow-hidden">
      {/* Left Section: Banner Image (hidden on mobile) */}
      <div className="hidden md:flex flex-1"> {/* Show on medium devices and up */}
        <img
          src={Banner}
          alt="Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Divider: Thin strip of maroon and darker cyan side by side (hidden on mobile) */}
      <div className="hidden md:flex" style={{ width: '40px' }}> {/* Show on medium devices and up */}
        <div className="flex-1" style={{ backgroundColor: '#800000' }}></div> {/* Maroon Strip */}
        <div className="flex-1" style={{ backgroundColor: '#007B7F' }}></div> {/* Darker Cyan Strip */}
      </div>

      {/* Right Section: Admin and User Sections */}
      <div
        className="flex-1 flex flex-col justify-center gap-10 items-center"
        style={{
          backgroundColor: '#F0F0F0', // Lighter gray color
        }}
      >
        {/* Admin Section */}
        <div className="flex flex-col justify-center items-center space-y-5 mb-10">
          <div className="w-48 h-48 bg-cyan-400 rounded-full flex justify-center items-center shadow-lg">
            <img
              src={adminProfileAvatar}
              alt="Admin Avatar"
              className="rounded-full w-full h-full object-cover"
            />
          </div>
          <Link
            to="/admin/login"
            className="bg-green-600 hover:bg-green-500 text-white py-4 px-8 text-lg rounded-full text-center w-52 shadow-lg transition duration-200"
          >
            Admin Login
          </Link>
        </div>

        {/* User Section */}
        <div className="flex flex-col justify-center items-center space-y-5">
          <div className="w-48 h-48 bg-cyan-400 rounded-full flex justify-center items-center shadow-lg">
            <img
              src={userProfileAvatar}
              alt="User Avatar"
              className="rounded-full w-full h-full object-cover"
            />
          </div>
          <Link
            to="/user/login"
            className="bg-blue-600 hover:bg-blue-500 text-white py-4 px-8 text-lg rounded-full text-center w-52 shadow-lg transition duration-200"
          >
            User Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserSelection;
