import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';
import './MapComponent.css'; // Import the Leaflet CSS

// Custom marker icon
const icon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Component to set the map view
const SetView = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      // Calculate the bounds for 100x100m (0.0009 degrees ~ 100m)
      const bounds = [
        [position[0] + 0.00045, position[1] - 0.00045], // Bottom left corner
        [position[0] - 0.00045, position[1] + 0.00045], // Top right corner
      ];
      map.fitBounds(bounds); // Fit the map to these bounds
      map.setView(position, map.getZoom()); // Center the map on the current position
    }
  }, [position, map]);

  return null;
};

function Map() {
  const navigate = useNavigate(); // Initialize navigate
  const [position, setPosition] = useState(null); // Default position

  useEffect(() => {
    // Get user's current location
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
      },
      (error) => {
        console.error("Error getting location: ", error);
        // Handle the error here, e.g., set a default position or show a message
      }
    );
  }, []);

  // Function to handle navigation back to UserHome
  const handleBackClick = () => {
    navigate('/user/home'); // Navigate to UserHome
  };

  return (
    <div className="h-screen w-full relative">
      {/* Cross Button */}
      <button
        onClick={handleBackClick}
        className="absolute top-4 right-4 text-5xl font-bold text-gray-700 bg-white rounded-full border-2 border-gray-700 shadow-md p-2 focus:outline-none hover:bg-gray-300 z-10"
      >
        &times; {/* Cross symbol */}
      </button>

      {/* Map Container with padding */}
      <div className="h-full w-full p-4">
        <div className="h-full rounded-lg shadow-lg overflow-hidden">
          <MapContainer center={position || [0, 0]} zoom={14} className="h-full" whenCreated={(map) => {
            // Set the initial view when the map is created
            if (position) {
              map.setView(position, 14); // Center the map on the user's current location
            }
          }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {position && (
              <>
                <Marker position={position} icon={icon}>
                  <Popup>You are here!</Popup>
                </Marker>
                <SetView position={position} /> {/* Set the map view */}
              </>
            )}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default Map;
