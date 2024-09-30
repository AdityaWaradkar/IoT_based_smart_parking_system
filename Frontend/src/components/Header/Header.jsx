import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any necessary session or token data (if applicable)
    console.log('Logged out');
    navigate('/'); // Redirect to the login page after logout
  };

  const scrollToElement = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md p-4 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-4xl font-bold text-gray-700 cursor-pointer"
        >
          <span className='text-red-800'>Park</span><span className='text-teal-700'>Sense </span>
        </div>
        <nav className="space-x-6 flex items-center">
          <button
            onClick={() => scrollToElement('card-section')}
            className="hidden md:block text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            Explore
          </button>
          <button
            onClick={() => scrollToElement('footer')}
            className="hidden md:block text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            Contact Us
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white font-bold py-2 px-4 rounded-full hover:bg-red-500 transition duration-200 focus:outline-none"
          >
            Log Out
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
