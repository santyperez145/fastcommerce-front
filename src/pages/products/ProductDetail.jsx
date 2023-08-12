import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as Anchor, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import productsActions from '../../redux/actions/products'
import { addToCart } from '../../redux/actions/cart'
import Swal from 'sweetalert2';

let findProductById = (products, id) => {
  return products.find(product => product._id === id);
}

let ProductDetails = () => {
  let dispatch = useDispatch();
  let { id } = useParams();


  let products = useSelector((store) => store.products.products);
  console.log(products);

  let product = findProductById(products, id);
  console.log(product)

  let getProducts = async () => {
    dispatch(productsActions.data_products())
  }

  useEffect(() => {
    getProducts();
    dispatch(productsActions.data_products())
  }, [])

  let [selectCF, setSelectCF] = useState(0);

  let handleCF = (index) => {
    setSelectCF(index)
  }

  let handlePrev = () => {
    // Cambiar a la imagen anterior
    setSelectCF((prevSelect) => (prevSelect - 1 + product.cover_photo.length) % product.cover_photo.length);
  };

  let handleNext = () => {
    // Cambiar a la siguiente imagen
    setSelectCF((prevSelect) => (prevSelect + 1) % product.cover_photo.length);
  };

  let [unitsSelected, setUnitsSelected] = useState(0);

  // Función para manejar el incremento o decremento del valor
  let handleIncrement = () => {
    setUnitsSelected(unitsSelected + 1);
  };

  let handleDecrement = () => {
    // Asegurarse de no ir por debajo de 0
    if (unitsSelected > 0) {
      setUnitsSelected(unitsSelected - 1);
    }
  }

  const handleAddToCart = () => {
    if (unitsSelected > 0) {
      const cartItems = [
        {
          product: id,
          quantity: unitsSelected,
        }
      ];
  
      const dataToSend = {
        user_id: '64cc0dd443c96bdaf31e5034', // Reemplaza esto con el ID de usuario correcto
        items: cartItems,
      };
      
      dispatch(addToCart(dataToSend))
        .then(() => {
          console.log('Products added to cart successfully');
           // Mostrar una alerta de éxito
        Swal.fire({
        icon: 'success',
        title: 'Product added',
        text: 'The product has been added to your cart.',
      });
        })
        .catch(error => {
          console.error('Error adding products to cart:', error);
         // Mostrar una alerta de error
        Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while adding the product to your cart.',
        }); 
      });
    }
  };
  
  

  return (
    <div className="flex items-center justify-center min-h-[84vh] p-10">
      <div className="flex justify-between w-[80vw] h-[76vh] bg-white border rounded-xl">
        <div className="flex flex-col w-[40vw] h-[76vh] content-center justify-center px-6">
          <div className="flex justify-between items-center">
            <button onClick={handlePrev}>
              <svg className="w-[3vw] bg-gray-200 me-4 px-2 py-6 rounded-s-lg hover:scale-105" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </button>
            <img className="flex w-[26vw] object-contain mb-4 " src={product?.cover_photo[selectCF]} alt="" />
            <button onClick={handleNext}>
              <svg className="w-[3vw] bg-gray-200 ms-4 px-2 py-6 rounded-e-lg hover:scale-105" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
          <div className="flex justify-center mt-4">
            {product?.cover_photo.map((photo, index) => (
              <button onClick={() => handleCF(index)}>
                <img className={`w-[5vw] object-contain px-2 ${index === selectCF ? 'border-b-4 border-[#ff5757]' : ''}`} src={photo} alt={`Photo ${index}`}/>
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col w-[40vw] px-6 py-6">
          <div className="flex flex-col w-[40vw] border-b pb-2">
            <p className="text-bold uppercase">{product?.brand}</p>
            <p className="text-xl">{product?.name}</p>
          </div>
          <div className="flex justify-around">
            <div className="flex flex-col w-[20vw] min-h-[66vh] content-start border-e py-6 pe-2">
              <p className="flex text-md text-bold items-center py-3">Sells: FastCommerce<spin><img className="w-[3vw]" src="/src/assets/images/logo.png" alt="logo-corp" /></spin></p>
              <p className="text-lg text-justify font-semibold">Descriptions:</p>
              <p className="text-justify pe-4">{product?.description[0].resum}</p>
            </div>
            <div className="flex flex-col w-[20vw] h-[60vh] justify-between items-center py-6 ps-2">
              <div className="flex w-[16vw] justify-start items-center">
                
              </div>
              <div className="flex justify-start items-center self-start ps-2">
                <p className="pe-4 font-semibold self-end">Price:</p>
                <p className="text-4xl font-semibold text-[#ff5757]">${product?.price},00</p>
              </div>
              <div className="flex w-[16vw] justify-start items-center mt-2">
                <button>
                  <svg  className="w-[2vw]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                </button>
                <p className="  ps-2">Home Delivery </p>
              </div>
              <div className="flex w-[16vw] justify-start items-center">
                <button>
                  <svg className="w-[2vw]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                  </svg>
                </button>
                <p className="  ps-2">Write a Review </p>
              </div>
              <div className="flex w-[16vw] justify-start items-center">
                <button>
                  <svg className="w-[2vw]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                  </svg>
                </button>
                <p className="  ps-2">Product Details </p>
              </div>
              <div className="flex flex-col pt-9">
                <div className="flex flex-col w-[16vw] justify-between items-center px-2 pb-4">
                  <div className="flex">
                    <button className="pe-6" onClick={handleDecrement}>
                      <svg onClick={() => algo} className="w-[2.5vw] bg-gray-200 px-2 py-2 rounded-lg hover:scale-110" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
                      </svg>
                    </button>
                    <p className="flex self-center">{unitsSelected}</p>
                    <button className="ps-6" disabled={unitsSelected === product?.stock} onClick={handleIncrement}>
                      <svg onClick={() => algo} className="w-[2.5vw] bg-gray-200 px-2 py-2 rounded-lg hover:scale-110" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </button>
                  </div>
                  <p className="mt-2">Max: <spin className="font-bold">{product?.stock}</spin> units</p>
                </div>
                <button className="w-[16vw] h-[5vh] rounded-3xl bg-[#ff5757] hover:bg-[#9c3535] mb-2 " onClick={handleAddToCart}>
                  Add to Cart
                </button>
                <button className="w-[16vw] h-[5vh] rounded-3xl bg-green-400 hover:bg-green-500 mt-2">
                  Buy now
                </button>
                <div className="flex mt-2 pt-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                  </svg>
                  <p className=" font-semibold me-2">Available Stock: </p>
                  {product?.stock < 100 
                    ?
                    <p className="text-red-600 font-semibold">{product?.stock} </p>
                    :
                    <p className="text-green-600 font-semibold">{product?.stock} </p>
                  } 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;