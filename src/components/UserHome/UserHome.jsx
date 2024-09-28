import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import CardSection from '../CardSection/CardSection';
import Slider from '../Slider/Slider';
import Map from '../Map/Map';


const sliderData = [
  { id: 1, icon: '🍕', title: 'Pizza', desc: 'Delicious pizza', bgColor: '#FF5733' },
  { id: 2, icon: '🍔', title: 'Burger', desc: 'Tasty burger', bgColor: '#C70039' },
  { id: 3, icon: '🍣', title: 'Sushi', desc: 'Fresh sushi', bgColor: '#900C3F' },
  { id: 4, icon: '🍜', title: 'Ramen', desc: 'Hot ramen', bgColor: '#581845' },
  { id: 5, icon: '🍨', title: 'Ice Cream', desc: 'Sweet ice cream', bgColor: '#FFC300' },
  { id: 6, icon: '🍩', title: 'Donut', desc: 'Yummy donut', bgColor: '#FF5733' },
  { id: 7, icon: '🍹', title: 'Cocktail', desc: 'Refreshing cocktail', bgColor: '#C70039' },
  { id: 8, icon: '🥗', title: 'Salad', desc: 'Healthy salad', bgColor: '#900C3F' },
  { id: 9, icon: '🍱', title: 'Bento', desc: 'Tasty bento', bgColor: '#581845' },
  { id: 10, icon: '🍝', title: 'Pasta', desc: 'Italian pasta', bgColor: '#FFC300' },
];

const UserHome = () => {
  const navigate = useNavigate(); // Use navigate

  // Handle the "Find on Map" button click
  const handleFindMapClick = () => {
    navigate('/user/home/map'); // Navigate to the map route
  };

  return (
    <div className="flex flex-col">
      {/* Conditional rendering to show either CardSection or Map */}
      <div className="h-screen w-full bg-gray mb-20">
        {/* Render CardSection or Map based on the route */}
        <CardSection onFindMapClick={handleFindMapClick} />
      </div>

      {/* Parking Carousel Section */}
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
