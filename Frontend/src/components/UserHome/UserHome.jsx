// src/components/UserHome/UserHome.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import CardSection from '../CardSection/CardSection';
import Slider from '../Slider/Slider';

const sliderData = [
  {
    id: 1,
    icon: '🍕',
    title: 'Pizza',
    desc: 'Delicious pizza',
    bgColor: '#FF5733',
  },
  {
    id: 2,
    icon: '🍔',
    title: 'Burger',
    desc: 'Tasty burger',
    bgColor: '#C70039',
  },
  {
    id: 3,
    icon: '🍣',
    title: 'Sushi',
    desc: 'Fresh sushi',
    bgColor: '#900C3F',
  },
];

const UserHome = () => {
  const navigate = useNavigate(); // Use navigate

  // Handle the "Find on Map" button click
  const handleFindMapClick = () => {
    navigate('/user/home/map'); // Navigate to the map route
  };

  // Handle the "Check History" button click
  const handleCheckHistoryClick = () => {
    navigate('/user/home/history'); // Navigate to the history route
  };

  // Handle the "Book Now" button click
  const handleBookNowClick = () => {
    navigate('/user/home/parkingduration'); // Navigate to the parking duration route
  };

  return (
    <div className="flex flex-col h-screen">
      {/* CardSection for interaction */}
      <div className="flex-grow w-full bg-gray-200 mb-5">
        <CardSection 
          onFindMapClick={handleFindMapClick} 
          onCheckHistoryClick={handleCheckHistoryClick} 
          onBookNowClick={handleBookNowClick} // Pass the book now handler
        />
      </div>
    </div>
  );
};

export default UserHome;
