import React, { useState, useEffect } from 'react';

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Avanza al siguiente slide cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images?.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images?.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="flex justify-center items-center z-100">
      <div className="flex justify-center items-center w-[80vw] h-[30vh] overflow-hidden z-10">
        {images?.map((image, index) => (
          <div key={index} className={`absolute justify-center items-center w-[80vw] h-[30vh] object-cover ${index === currentIndex ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
            style={{background: `linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,1)), url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: -1}}/>
        ))}
        <div className="absolute flex items-center justify-between w-[100vw] h-[20vh]">
          <button onClick={prevSlide} className="text-orange-500 text-4xl md:text-6xl font-bold p-4 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>

          </button>
          <button onClick={nextSlide} className="text-orange-500 text-4xl md:text-6xl font-bold p-4 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>

          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
