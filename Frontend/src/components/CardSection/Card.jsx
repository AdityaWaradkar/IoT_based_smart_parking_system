import React from 'react';

const Card = ({ title, content, buttonText, image, onButtonClick }) => {
  return (
    <div className="bg-white rounded-3xl shadow-2xl p-5 mx-2 mb-4 md:mb-0 md:flex-grow flex flex-col justify-between items-center h-[250px] w-full md:h-[700px] md:w-[300px] transition-transform transform hover:scale-102 duration-300">
      <div className="w-full h-[70%] flex items-center justify-center rounded-t-3xl overflow-hidden">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full rounded-t-3xl"
        />
      </div>
      <div className="p-4 w-full flex flex-col items-center">
        <h2 className="text-xl font-bold mb-2 text-gray-800 text-center">
          {title}
        </h2>
        <p className="text-gray-500 mb-4 text-center">
          {content}
        </p>
        <button
          onClick={onButtonClick}
          className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition duration-300 shadow-md"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Card;
