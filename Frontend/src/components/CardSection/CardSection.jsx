// src/components/CardSection/CardSection.jsx
import React from 'react';
import Card from './Card';
import card_1_img from '../../assets/UserHomeSection/card_1_img.jpg';
import card_2_img from '../../assets/UserHomeSection/card_2_img.jpg';
import card_3_img from '../../assets/UserHomeSection/card_3_img.png';

const CardSection = ({ onFindMapClick, onCheckHistoryClick, onBookNowClick }) => {
  return (
    <div className="flex flex-col min-h-screen pb-10 bg-gray-50" id="card-section">
      <div className="flex-grow w-full p-5 mt-16 flex flex-col items-center justify-between">
        <div className="flex flex-col md:flex-row justify-center items-center w-full gap-6">
          <Card
            title="Reserve Your Parking Spot"
            content="Quickly reserve a parking spot with a single click. Check availability and book your space now!"
            buttonText="Book Now"
            image={card_1_img}
            onButtonClick={onBookNowClick}
          />

          <Card
            title="View Your Booking History"
            content="See a complete record of your previous parking reservations and manage your bookings easily."
            buttonText="Check History"
            image={card_2_img}
            onButtonClick={onCheckHistoryClick}
          />

          <Card
            title="Find Parking Spots Nearby"
            content="Discover available parking spots close to your location. View them on a map for easy navigation."
            buttonText="Find on Map"
            image={card_3_img}
            onButtonClick={onFindMapClick}
          />
        </div>
      </div>
    </div>
  );
};

export default CardSection;
