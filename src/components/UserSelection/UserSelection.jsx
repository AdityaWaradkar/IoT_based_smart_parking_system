import { Link } from 'react-router-dom';
import adminProfileAvatar from '../../assets/UserSelectionAvatar/adminProfileAvatar.png';
import userProfileAvatar from '../../assets/UserSelectionAvatar/userProfileAvatar.png';
import Banner from '../../assets/../assets/UserSelectionAvatar/'

const UserSelection = () => {
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      {/* Image Section */}
      <div className="flex-1 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 relative">
        <img
          src="your-image-path-here.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Admin and User Section */}
      <div className="flex-1 flex flex-col justify-evenly items-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 p-8 space-y-8">
        {/* Admin Section */}
        <div className="flex flex-col items-center space-y-6">
          <div className="w-36 h-36 bg-blue-400 rounded-full flex justify-center items-center shadow-lg">
            <img
              src={adminProfileAvatar}
              alt="Admin Avatar"
              className="rounded-full w-full h-full object-cover"
            />
          </div>
          <Link
            to="/admin/login"
            className="bg-green-500 hover:bg-green-400 text-white py-3 px-6 text-lg rounded-full text-center w-40 shadow-lg transition duration-200"
          >
            Admin Login
          </Link>
        </div>

        {/* User Section */}
        <div className="flex flex-col items-center space-y-6">
          <div className="w-36 h-36 bg-gray-400 rounded-full flex justify-center items-center shadow-lg">
            <img
              src={userProfileAvatar}
              alt="User Avatar"
              className="rounded-full w-full h-full object-cover"
            />
          </div>
          <Link
            to="/user/login"
            className="bg-blue-500 hover:bg-blue-400 text-white py-3 px-6 text-lg rounded-full text-center w-40 shadow-lg transition duration-200"
          >
            User Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserSelection;
