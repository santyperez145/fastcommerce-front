import React, { useState, useEffect } from 'react';
import { api, apiUrl, endpoints } from '../utils/api';
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await api.get(apiUrl + `products/${id}`);
      setProduct(response.data.response);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:w-48"
              src={product.cover_photo}
              alt={product.name}
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {product.category}
            </div>
            <h1 className="block mt-1 text-lg leading-tight font-medium text-black">
              {product.name}
            </h1>
            <p className="mt-2 text-gray-500">{product.description.resum}</p>
            <p className="mt-4 font-bold text-gray-700">${product.price}</p>
            
            {/* Renderiza propiedades específicas del objeto product */}
            <p>Material: {product.description.material}</p>
            <p>Condición: {product.description.condition}</p>
            <p>Dimensiones: {product.description.dimensions}</p>
            <p>Color: {product.description.color}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
