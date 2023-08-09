import React, { useState, useEffect } from 'react';
import { Link as Anchor } from "react-router-dom"; 
import { api, apiUrl, endpoints } from '../utils/api';

export default function Card() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get(apiUrl + 'products');
      setProducts(response.data.response);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

    return (
        <div className="flex items-center justify-center ">
            <div className="w-[70vw] ">
                <div className="border-4 mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 ">
                    <div className="flex justify-center items-center bg-white p-6">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 drop-shadow-2xl">
                            {products?.map((product) => (
                            <a key={product._id} href={product.href} className="group">
                                <Anchor to={`/product/:${product._id}`} >
                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 ">
                                        <img src={product.cover_photo} alt={product.imageAlt} className="h-full w-full object-cover object-center group-hover:opacity-75"/>
                                    </div>
                                </Anchor>
                                <div className="flex items-center justify-between">
                                    <div className="content-between">
                                        <h3 className="flex self-start mt-4 text-sm text-gray-700">{product.name}</h3>
                                        <p className="flex self-start mt-1 text-[2vw] font-normal text-orange-600">{product.price}</p>
                                    </div>
                                </div>
                            </a>))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
}