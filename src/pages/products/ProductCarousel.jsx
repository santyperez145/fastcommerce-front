import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductCarousel = ({ products }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Cambia la cantidad de productos mostrados en un slide
    slidesToScroll: 1,
    autoplay: true, // Auto-reproducir el carousel
    autoplaySpeed: 3000, // Intervalo de cambio de slide
  };

  return (
    <div className="w-full">
      <Slider {...settings}>
        {products?.map((product) => (
          <div key={product._id} className="mx-4">
            {/* Aquí tu código para mostrar la tarjeta de producto */}
            <div className="flex flex-col justify-between bg-white w-[19vw] h-[36vh] rounded-sm shadow-2xl hover:shadow-lg hover:scale-110">
              {/* ... tu contenido de tarjeta ... */}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductCarousel;
