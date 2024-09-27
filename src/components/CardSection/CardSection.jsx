import React from 'react';
import Card from './Card';
import card_1_img from '../../assets/UserHomeSection/card_1_img.jpg';
import card_2_img from '../../assets/UserHomeSection/card_2_img.jpg';
import card_3_img from '../../assets/UserHomeSection/card_3_img.png';

const UserHome = () => {
  return (
    <div className="flex flex-col h-screen pb-10 bg-gray-50" id="card-section">
      {/* Parent div that takes height from header to bottom */}
      <div className="flex-grow w-full p-5 mt-16 flex flex-col items-center justify-between">
        <div className="flex flex-col md:flex-row justify-center items-center w-full h-full gap-6"> {/* Increased gap here */}
          
          {/* Card 1 */}
          <Card
            title="Reserve Your Parking Spot"
            content="Quickly reserve a parking spot with a single click. Check availability and book your space now!"
            buttonText="Book Now"
            image={card_1_img}  // Using the imported image for Card 1
          />

          {/* Card 2 */}
          <Card
            title="View Your Booking History"
            content="See a complete record of your previous parking reservations and manage your bookings easily."
            buttonText="Check History"
            image={card_2_img}  // Using the imported image for Card 2
          />

          {/* Card 3 */}
          <Card
            title="Find Parking Spots Nearby"
            content="Discover available parking spots close to your location. View them on a map for easy navigation."
            buttonText="Find on Map"
            image={card_3_img}  // Using the imported image for Card 3
          />

        </div>
      </div>
    </div>
  );
};

export default UserHome;
