import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as Anchor } from "react-router-dom";
import { useDispatch } from 'react-redux';
import productsActions from '../../redux/actions/products'

export default function Painting() {

  let dispatch = useDispatch();
  let [selectedBrand, setSelectedBrand] = useState('');
  let [selectedPriceRange, setSelectedPriceRange] = useState('');
  let [selectedColor, setSelectedColor] = useState('');
  let [sortOrder, setSortOrder] = useState('');
  let [sortBy, setSortBy] = useState('');

  function filterByCategoryId(products, categoryId) {
    const filteredProducts = [];
    for (const product of products) {
      if (product.category_id === categoryId) {
        filteredProducts.push(product);
      }
    }
    return filteredProducts;
  }

  let products = useSelector((store) => store.products.products)
  //console.log(products)
  let paintingProducts = filterByCategoryId(products, "64d4fd9fc84ae7805abbeabe")
  const uniqueBrands = [...new Set(paintingProducts?.map((product) => product.brand))]; // Obtener marcas únicas
  const uniqueColors = [...new Set(paintingProducts?.map((product) => product.description[0]?.color))];

  let getProducts = async () => {
    dispatch(productsActions.data_products())
  }

  useEffect(() => {
    getProducts();
    dispatch(productsActions.data_products())
  },[])

  let handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
    // Aquí puedes realizar acciones adicionales al cambiar la marca seleccionada
    //let filteredBrands = [...new Set(products?.Find((product) => product.brand === selectedBrand))]
    //console.log(filteredBrands)
  };

  let handlePriceRangeChange = (event) => {
    setSelectedPriceRange(event.target.value);
  };

  let handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  // Filtrar productos según la marca seleccionada
  let filteredProducts = paintingProducts;
  if (selectedBrand) {
    filteredProducts = filteredProducts.filter((product) => product.brand === selectedBrand);
  }

  // Filtrar productos según el rango de precios seleccionado
  if (selectedPriceRange) {
    const [minPrice, maxPrice] = selectedPriceRange.split('-').map(Number);
    filteredProducts = filteredProducts.filter((product) => product.price >= minPrice && product.price <= maxPrice);
  }

  // Filtrar productos según el color seleccionado
  if (selectedColor) {
    filteredProducts = filteredProducts.filter((product) => product.description[0]?.color === selectedColor);
  }

  let handleSortChange = (event) => {
    const selectedSort = event.target.value;
    if (selectedSort === sortOrder) {
      // Cambiar el orden si se selecciona el mismo campo
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Cambiar el campo de ordenamiento
      setSortOrder('asc'); // Orden ascendente por defecto al cambiar el campo
      setSortBy(selectedSort);
    }
  };

  let sortedProducts = [...filteredProducts];
  if (sortBy === 'name') {
    sortedProducts.sort((a, b) => a.name.localeCompare(b.name) * (sortOrder === 'asc' ? 1 : -1));
  } else if (sortBy === 'price') {
    sortedProducts.sort((a, b) => (a.price - b.price) * (sortOrder === 'asc' ? 1 : -1));
  }

  return (
    <div className="flex flex-col ">
      <div className="flex w-[67.5vw] h-[3vh] me-[5vw] ms-[5vw] mt-3 mb-3 self-end justify-between items-center">
          <div className="my-4 ms-8">
          <label className="block text-gray-700 text-sm font-bold mb-2"></label>
          <select className="appearance-none border border-[#ff5757] rounded w-[15vw] px-3 leading-tight capitalize" value={sortBy} onChange={handleSortChange}>
          <option value="">Order by</option>
            <option value="price">Price</option>
            <option value="name">Name</option>
          </select>
        </div>
        <div className="flex items-center">
            <button onClick="{}">
              <svg className="w-[2vw] bg-gray-300 me-4 px-2 py-3 rounded-s-lg hover:scale-110" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </button>
            <p className="text-sm">Page: 1 of 1</p>
            <button onClick="{}">
              <svg className="w-[2vw] bg-gray-300 ms-4 px-2 py-3 rounded-e-lg hover:scale-110" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
      </div>
    
    <div className="flex items-center justify-center">
      <div className="flex flex-col mt-6 self-start w-[22.5vw] min-h-[36vh] ">
        <p className="font-bold justify-start text-2xl text-[rgb(42,51,66)] ">Painting Products</p>
        
        <div className="my-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
          <select className="appearance-none border border-[#ff5757] rounded w-full py-2 px-3 leading-tight capitalize" value={selectedPriceRange} onChange={handlePriceRangeChange}>
            <option value="">Price range</option>
            <option value="0-25">0 - $25,00</option>
            <option value="25-50">$25,00 - $50,00</option>
            <option value="50-100">$50,00 - $100,00</option>
            <option value="100-200">$100,00 - $200,00</option>
            <option value="200-500">$200,00 - $500,00</option>
            <option value="500-1000">$500,00 - $1000,00</option>
            <option value="1000-above">$1000,00 & Above</option>
          </select>
        </div>
        <div className="my-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Brands</label>
          <select className="appearance-none border border-[#ff5757] rounded w-full py-2 px-3 leading-tight capitalize" value={selectedBrand} onChange={handleBrandChange}>
            <option value="">Select a brand</option>
              {uniqueBrands?.sort((a, b) => a.localeCompare(b)).map((brand, index) => (
              <option className="capitalize" key={index} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
        <div className="my-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Colors</label>
          <select className="appearance-none border border-[#ff5757] rounded w-full py-2 px-3 leading-tight capitalize" value={selectedColor} onChange={handleColorChange}>
            <option value="">Select a color</option>
            {uniqueColors?.sort((a, b) => a.localeCompare(b)).map((color, index) => (
              <option className="capitalize" key={index} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div> 
      </div>
      <div className="flex flex-wrap w-[67.5vw] content-center  items-center justify-between gap-8 m-6 ps-6">
          {sortedProducts?.map((product) => (
          <div key={product._id} className="flex flex-col justify-between bg-white w-[19vw] h-[36vh] rounded-2xl shadow-2xl hover:scale-110">
              <Anchor to={`/products/${product._id}`}>
                  <div className="flex items-center justify-center">
                  <img className="w-[12vw] rounded-t-lg border-b object-contain pt-3" src={product?.cover_photo[0]} alt="logo" />
                  </div>
              </Anchor>
              <div className="flex flex-col p-2">
                  <p className="text-start">{product?.name}</p>
                  <p className="text-start text-2xl font-bold text-[#ff5757]">${product?.price}</p>
              </div>
          </div>
          ))}
      </div>
    </div>
    </div>
  ); 
}