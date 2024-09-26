import React from 'react';

const UserHome = () => {
  return (
    <div className="flex flex-col h-screen pb-10" id='card-section'>
      {/* Parent div that takes height from header to bottom */}
      <div className="flex-grow w-full p-5 mt-16 flex flex-col items-center justify-between ">
        <div className="flex flex-col md:flex-row justify-center items-center w-full h-full">
          {/* Card 1 */}
          <div className="card-container bg-white p-5 mx-2 mb-4 md:mb-0 md:flex-grow flex items-center justify-center rounded-lg shadow-lg h-[250px] w-full md:h-[700px] md:w-[300px]">
            <div className="card p-4">
              <h2 className="text-xl font-bold">Card 1 Title</h2>
              <p className="text-gray-500">Card 1 content</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card-container bg-white p-5 mx-2 mb-4 md:mb-0 md:flex-grow flex items-center justify-center rounded-lg shadow-lg h-[250px] w-full md:h-[700px] md:w-[300px]">
            <div className="card p-4">
              <h2 className="text-xl font-bold">Card 2 Title</h2>
              <p className="text-gray-500">Card 2 content</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="card-container bg-white p-5 mx-2 mb-4 md:mb-0 md:flex-grow flex items-center justify-center rounded-lg shadow-lg h-[250px] w-full md:h-[700px] md:w-[300px] ">
            <div className="card p-4">
              <h2 className="text-xl font-bold">Card 3 Title</h2>
              <p className="text-gray-500">Card 3 content</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
