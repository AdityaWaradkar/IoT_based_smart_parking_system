import React from 'react';

const AdminHome = () => {
  const slots = [0, 1, 0, 1, 0, 0, 1, 0, 0, 1]; // Example: 0 = available, 1 = occupied

  return (
    <div className="flex flex-col h-screen bg-gray-50 p-5">
      <h1 className="text-2xl font-bold mb-5 text-center">Admin Dashboard</h1>

      <div className="flex-grow grid grid-cols-5 gap-4 mb-10">
        {slots.map((slot, index) => (
          <div key={index} className="flex items-center justify-center">
            <div
              className={`h-48 w-48 rounded-full flex items-center justify-center text-white font-bold relative ${
                slot === 0 ? 'bg-green-500' : 'bg-red-500'
              }`}
            >
              <span className="absolute text-xl font-semibold text-black">
                {index + 1}
              </span>
            </div>
            <span className="ml-4 text-xl font-semibold text-center">
              {slot === 0 ? 'Available' : 'Occupied'}
            </span>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-5">
        <button className="bg-blue-500 text-white py-4 px-8 rounded-lg text-xl hover:bg-blue-600 transition">
          See User Details
        </button>
        <button className="bg-blue-500 text-white py-4 px-8 rounded-lg text-xl hover:bg-blue-600 transition">
          Reserve Slot
        </button>
      </div>
    </div>
  );
};

export default AdminHome;
