import React from 'react';

const ProductDetails = ({ product }) => {
  return (
    <div className="container mx-auto mt-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:w-48"
              src={product.image} // Aquí debes usar la URL de la imagen del producto
              alt={product.name} // Agrega el nombre del producto como alt para accesibilidad
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {product.category}
            </div>
            <h1 className="block mt-1 text-lg leading-tight font-medium text-black">
              {product.name}
            </h1>
            <p className="mt-2 text-gray-500">{product.description}</p>
            <p className="mt-4 font-bold text-gray-700">${product.price}</p>
            {/* Agrega aquí cualquier otra información que desees mostrar */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
