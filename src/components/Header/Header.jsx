import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any necessary session or token data
    console.log('Logged out');
    // Redirect to the login page after logout
    navigate('/');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToFooter = () => {
    const element = document.getElementById("footer"); // Ensure "footer" is the correct ID
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToCarousel = () => {
    const element = document.getElementById("card-section"); // Ensure "card-section" is the correct ID
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md p-4 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div 
          onClick={scrollToTop} 
          className="text-2xl font-bold text-gray-700 cursor-pointer"
        >
          ParkSense
        </div>
        <nav className="space-x-6 flex items-center">
          <button
            onClick={scrollToCarousel}
            className="hidden md:block text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            Explore
          </button>
          <button
            onClick={scrollToFooter}
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
