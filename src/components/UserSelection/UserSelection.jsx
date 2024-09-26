import { Link } from 'react-router-dom';
import adminProfileAvatar from '../../assets/UserSelectionAvatar/adminProfileAvatar.png';
import userProfileAvatar from '../../assets/UserSelectionAvatar/userProfileAvatar.png';

const UserSelection = () => {
  return (
    <div className="h-screen w-screen flex flex-col lg:flex-row overflow-hidden"> 
      {/* Admin Section */}
      <div className="flex-1 flex flex-col justify-center items-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600">
        <div className="flex flex-col items-center space-y-10">
          <div className="w-48 h-48 bg-blue-400 rounded-full flex justify-center items-center shadow-lg">
            <img 
              src={adminProfileAvatar} 
              alt="Admin Avatar" 
              className="rounded-full w-full h-full object-cover" 
            />
          </div>
          <Link to="/admin/login" className="bg-green-500 hover:bg-green-400 text-white py-4 px-8 text-lg rounded-full text-center w-52 shadow-lg transition duration-200">
            Admin Login
          </Link>
        </div>
      </div>

      {/* User Section */}
      <div className="flex-1 flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600">
        <div className="flex flex-col items-center space-y-10">
          <div className="w-48 h-48 bg-gray-400 rounded-full flex justify-center items-center shadow-lg">
            <img 
              src={userProfileAvatar}
              alt="User Avatar" 
              className="rounded-full w-full h-full object-cover" 
            />
          </div>
          <Link to="/user/login" className="bg-blue-500 hover:bg-blue-400 text-white py-4 px-8 text-lg rounded-full text-center w-52 shadow-lg transition duration-200">
            User Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserSelection;
