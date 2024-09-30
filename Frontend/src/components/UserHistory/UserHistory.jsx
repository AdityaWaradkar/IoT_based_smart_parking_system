import React from 'react';

const UserHistory = () => {
  const historyData = [
    {
      id: '12345',
      date: '12-12-2024',
      time: '21:34:00',
      duration: '12:24:56',
      slotNumber: 'A23',
      location: 'Main Campus Parking Lot',
      pricePerTime: '$2 per hour',
    },
    {
      id: '67890',
      date: '12-12-2024',
      time: '21:34:00',
      duration: '12:24:56',
      slotNumber: 'B15',
      location: 'North Campus Parking Lot',
      pricePerTime: '$1.5 per hour',
    },
    {
      id: '24680',
      date: '13-12-2024',
      time: '10:00:00',
      duration: '5:45:00',
      slotNumber: 'C10',
      location: 'South Campus Parking Lot',
      pricePerTime: '$2 per hour',
    },
    {
      id: '13579',
      date: '13-12-2024',
      time: '15:20:00',
      duration: '3:30:00',
      slotNumber: 'D12',
      location: 'East Campus Parking Lot',
      pricePerTime: '$1.8 per hour',
    },
  ];

  return (
    <div className="h-full w-full grid grid-cols-1 md:grid-cols-2 gap-8 p-4 md:p-8">
      {historyData.map((entry) => (
        <div
          key={entry.id}
          className="p-4 border border-gray-300 rounded-lg shadow-lg bg-white flex flex-col justify-between transition-transform transform hover:scale-100 hover:shadow-md"
          style={{
            fontFamily: '"Georgia", serif',
            backgroundColor: '#FAF9F6',
          }}
        >
          <div className="flex justify-between mb-2 text-gray-800">
            <div className="flex flex-col">
              <span className="font-semibold text-lg">Date:</span>
              <span className="text-gray-600">{entry.date}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-lg">Time:</span>
              <span className="text-gray-600">{entry.time}</span>
            </div>
          </div>

          <div className="flex justify-between items-center gap-4 w-full">
            <div className="flex flex-col items-center border border-gray-300 p-2 rounded-lg bg-white shadow-sm w-1/3 h-24">
              <span className="font-semibold text-gray-700">Time Parked</span>
              <span className="text-xl mt-1 text-gray-800">{entry.duration}</span>
            </div>

            <div className="flex flex-col items-center border border-gray-300 p-2 rounded-lg bg-white shadow-sm w-1/3 h-24 overflow-auto max-h-24">
              <span className="font-semibold text-gray-700">Parking Details</span>
              <ul className="list-none text-center mt-1 text-sm text-gray-600">
                <li className="font-medium">Slot Number: <span className="font-normal">{entry.slotNumber}</span></li>
                <li className="font-medium">Location: <span className="font-normal">{entry.location}</span></li>
                <li className="font-medium">Price: <span className="font-normal">{entry.pricePerTime}</span></li>
              </ul>
            </div>

            <div className="flex flex-col items-center border border-gray-300 p-2 rounded-lg bg-white shadow-sm w-1/3 h-24">
              <span className="font-semibold text-gray-700">Parking ID</span>
              <span className="text-lg mt-1 text-gray-800">{entry.id}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserHistory;
