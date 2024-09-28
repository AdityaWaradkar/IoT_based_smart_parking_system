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
    }
  }, [position, map]);

  return null;
};

function Map() {
  const navigate = useNavigate();
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Get user's current location
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        setLoading(false); // Set loading to false after position is obtained
      },
      (error) => {
        console.error('Error getting location: ', error);
        // Fallback position or error handling
        setPosition([0, 0]); // Set a default position if geolocation fails
        setLoading(false);
      }
    );
  }, []);

  const handleBackClick = () => {
    navigate('/user/home');
  };

  return (
    <div className="h-screen w-full relative">
      <button
        onClick={handleBackClick}
        className="absolute top-4 right-4 text-5xl font-bold text-gray-700 bg-white rounded-full border-2 border-gray-700 shadow-md p-2 focus:outline-none hover:bg-gray-300 z-10"
      >
        &times; {/* Cross symbol */}
      </button>

      <div className="h-full w-full p-4">
        <div className="h-full rounded-lg shadow-lg overflow-hidden">
          {loading ? ( // Show loading state
            <div className="flex justify-center items-center h-full">
              <p className="text-lg">Loading map...</p>
            </div>
          ) : (
            <MapContainer center={position} zoom={14} className="h-full">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {position && (
                <>
                  <Marker position={position} icon={icon}>
                    <Popup>You are here!</Popup>
                  </Marker>
                  <SetView position={position} />
                </>
              )}
            </MapContainer>
          )}
        </div>
      </div>
    </div>
  );
}

export default Map;
