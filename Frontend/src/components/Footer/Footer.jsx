import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8" id="footer">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>
        <div className="mb-8 text-center">
          <p className="mb-2">
            If you have any questions, feel free to reach out to us:
          </p>
          <p className="mb-2">
            Email:{' '}
            <a
              href="mailto:support@parksense.com"
              className="text-blue-400 hover:underline"
            >
              support@parksense.com
            </a>
          </p>
          <p className="mb-2">
            Phone: <span className="text-blue-400">+1 (555) 123-4567</span>
          </p>
        </div>

        <h3 className="text-2xl font-bold mb-4 text-center">
          We Value Your Feedback
        </h3>
        <form className="bg-gray-800 p-6 rounded-lg shadow-md mx-auto max-w-lg">
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1">
              Name:
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
              placeholder="Your Name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
              placeholder="Your Email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block mb-1">
              Message:
            </label>
            <textarea
              id="message"
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
              placeholder="Your message..."
              rows="4"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded transition duration-200"
          >
            Send Message
          </button>
        </form>

        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold mb-2">About ParkSense</h2>
          <p className="mt-2">
            ParkSense is an IoT-based smart parking system designed to help
            users find parking spaces efficiently. Our mission is to make
            parking hassle-free and accessible for everyone.
          </p>
          <p className="mt-2 text-sm">
            &copy; {new Date().getFullYear()} ParkSense. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
