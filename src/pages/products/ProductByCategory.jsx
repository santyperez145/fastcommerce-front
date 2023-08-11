import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link as Anchor } from "react-router-dom";
import { useDispatch } from 'react-redux';
import productsActions from '../../redux/actions/products'

const ProductByCategory = ({ productsList }) => {/*
  const [currentIndex, setCurrentIndex] = useState(0);

  // Avanza al siguiente slide cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? productsList?.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === productsList?.length - 1 ? 0 : prevIndex + 1));
  };
*/

const [currentIndex, setCurrentIndex] = useState(0);
const [visibleProducts, setVisibleProducts] = useState(0);

// Calcula cuántos productos caben en el ancho especificado (w-[90vw])
const calculateVisibleProducts = () => {
  const productWidth = window.innerWidth * 0.19; // 19vw
  const containerWidth = window.innerWidth * 0.9; // 90vw
  const maxVisibleProducts = Math.floor(containerWidth / productWidth);
  setVisibleProducts(maxVisibleProducts);
};

// Avanza al siguiente slide cada 3 segundos
useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

useEffect(() => {
  // Calcula la cantidad inicial de productos visibles
  calculateVisibleProducts();
  // Actualiza la cantidad de productos visibles si cambia el tamaño de la ventana
  window.addEventListener('resize', calculateVisibleProducts);
  return () => {
    window.removeEventListener('resize', calculateVisibleProducts);
  };
}, 3000);


const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? productsList?.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === productsList?.length - 1 ? 0 : prevIndex + 1));
  };
  /*
const prevSlide = () => {
  setCurrentIndex((prevIndex) =>
    prevIndex - visibleProducts >= 0 ? prevIndex - visibleProducts : 0
  );
};

const nextSlide = () => {
  const maxIndex = productsList.length - visibleProducts;
  setCurrentIndex((prevIndex) =>
    prevIndex + visibleProducts <= maxIndex
      ? prevIndex + visibleProducts
      : maxIndex
  );
};
*/
  return (
    <>
      
      <div className="flex justify-center items-center">
          <div className="flex justify-between items-center w-[90vw] h-[43vh] overflow-hidden z-10">
              {productsList.slice(currentIndex, currentIndex + visibleProducts).map((product, index) => (
                <div key={index} className={`flex flex-col content-between justify-between bg-white w-[19vw] h-[36vh] rounded-2xl shadow-2xl hover:scale-110 transition-opacity duration-1000`}>
                      <Anchor to={`/products/${product._id}`}>
                          <div className="flex items-center justify-center">
                              <img className="w-[13vw] rounded-t-lg border-b object-contain" src={product?.cover_photo[0]} alt="logo" />
                          </div>
                      </Anchor>
                      <div className="flex flex-col p-2">
                          <p className="text-start">{product?.name}</p>
                          <p className="text-start text-2xl font-bold text-[#ff5757]">${product?.price}</p>
                      </div>
                  </div>
              ))}
          </div>
          <div className="absolute flex items-center justify-between w-[98vw] h-[20vh]">
                  <button onClick={prevSlide} className="text-[#ff5757] text-4xl md:text-6xl font-bold p-4 focus:outline-none bg-gray-300 me-4 px-2 py-6 rounded-s-lg hover:scale-105">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hover:scale-105">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                  </button>
                  <button onClick={nextSlide} className="text-[#ff5757] text-4xl md:text-6xl font-bold p-4 focus:outline-none bg-gray-300 ms-4 px-2 py-6 rounded-e-lg hover:scale-105">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hover:scale-105">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                  </button>
              </div>
      </div>
  </>
  );
};

export default ProductByCategory;
