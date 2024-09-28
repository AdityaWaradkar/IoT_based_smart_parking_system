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

  return (
    <div className="flex flex-col">
      {/* CardSection for interaction */}
      <div className="h-screen w-full bg-gray mb-20">
        <CardSection onFindMapClick={handleFindMapClick} />
      </div>

      {/* Slider Section (hidden by default) */}
      <div
        className="md:h-screen md:w-full md:flex md:items-center md:justify-center hidden"
        id="slider"
      >
        <Slider data={sliderData} activeSlide={0} />
      </div>
    </div>
  );
};

export default UserHome;
