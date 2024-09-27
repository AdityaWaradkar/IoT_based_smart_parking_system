import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export default function Slider({ data, activeSlide: initialActiveSlide }) {
  const [activeSlide, setActiveSlide] = useState(initialActiveSlide || 0);

  const next = () => 
    setActiveSlide((prev) => (prev < data.length - 1 ? prev + 1 : 0));

  const prev = () => 
    setActiveSlide((prev) => (prev > 0 ? prev - 1 : data.length - 1));

  const getStyles = (index) => {
    const baseStyle = {
      opacity: 0,
      transform: "scale(0.8) translateX(0px) translateZ(0px) rotateY(0deg)",
      zIndex: 7,
      transition: "transform 0.6s ease, opacity 0.6s ease",
    };

    // Center active slide
    if (activeSlide === index) {
      return {
        ...baseStyle,
        opacity: 1,
        transform: "scale(1.25) translateX(0px) translateZ(0px) rotateY(0deg)",
        zIndex: 10,
      };
    }
    // Slide to the left (previous slide)
    else if (activeSlide - 1 === index || (activeSlide === 0 && index === data.length - 1)) {
      return {
        ...baseStyle,
        opacity: 1,
        transform: "scale(1) translateX(-240px) translateZ(-400px) rotateY(35deg)",
        zIndex: 9,
      };
    }
    // Slide to the right (next slide)
    else if (activeSlide + 1 === index || (activeSlide === data.length - 1 && index === 0)) {
      return {
        ...baseStyle,
        opacity: 1,
        transform: "scale(1) translateX(240px) translateZ(-400px) rotateY(-35deg)",
        zIndex: 9,
      };
    }
    // Two steps left
    else if (activeSlide - 2 === index || (activeSlide - 1 === 0 && index === data.length - 1)) {
      return {
        ...baseStyle,
        opacity: 0.6,
        transform: "scale(0.9) translateX(-480px) translateZ(-500px) rotateY(35deg)",
        zIndex: 8,
      };
    }
    // Two steps right
    else if (activeSlide + 2 === index || (activeSlide + 1 === data.length - 1 && index === 0)) {
      return {
        ...baseStyle,
        opacity: 0.6,
        transform: "scale(0.9) translateX(480px) translateZ(-500px) rotateY(-35deg)",
        zIndex: 8,
      };
    }
    // Far slides (invisible or collapsed)
    else {
      return baseStyle;
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Carousel Container, adjusted height and width */}
      <div className="relative w-full md:w-[900px] md:h-[600px] mx-auto perspective-[1000px] transform-style-preserve-3d block md:block">
        {data.map((item, i) => (
          <div
            key={item.id}
            className="absolute top-0 w-full h-full transition-transform duration-500 ease-in-out"
            style={{
              background: item.bgColor,
              boxShadow: `0 5px 20px ${item.bgColor}30`,
              borderRadius: "12px",
              ...getStyles(i),
            }}
          >
            <SliderContent {...item} />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute top-[50%] left-0 right-0 flex justify-between items-center transform -translate-y-1/2 px-8 z-20 block md:flex">
        <button
          className="bg-white rounded-full p-2 hover:bg-gray-200"
          onClick={prev}
          style={{ opacity: 0.7 }}
        >
          <FontAwesomeIcon icon={faChevronLeft} color="#000" />
        </button>
        <button
          className="bg-white rounded-full p-2 hover:bg-gray-200"
          onClick={next}
          style={{ opacity: 0.7 }}
        >
          <FontAwesomeIcon icon={faChevronRight} color="#000" />
        </button>
      </div>
    </div>
  );
}

const SliderContent = ({ icon, title, desc }) => {
  return (
    <div className="flex flex-col items-start text-white p-4 md:p-[30px] font-sans h-full">
      {icon}
      <h2 className="text-6xl font-bold my-4">{title}</h2> {/* Increased title size */}
      <p className="mb-4 text-2xl">{desc}</p> {/* Increased description size */}
      {/* Add Advertising Text */}
      <div className="mt-4 text-6xl font-bold text-yellow-400 text-center">
        Unlock Your Driving Experience!
      </div>
      <p className="mt-1 text-xl text-gray-300 text-center">
        Find the best cars with unbeatable offers today!
      </p>
      <div className="mt-4 text-xl text-green-300 text-center">
        Drive away in style and comfort!
      </div>
    </div>
  );
};
