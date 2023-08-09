import React, { useState, useEffect } from 'react';
import { api, apiUrl, endpoints } from '../utils/api';

const ProductDetails = ({ match }) => {

  const [product, setProduct] = useState({}); // Cambiado a un objeto único en lugar de una lista

  useEffect(() => {
    const id = match.params.id; // Obtener el ID del parámetro de la URL
    fetchProduct(id);
  }, [match.params.id]); // Agregar match.params.id a la dependencia para que se actualice cuando cambie

  const fetchProduct = async (id) => {
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
              src={product.cover_photo} // Aquí debes usar la URL de la imagen del producto
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
