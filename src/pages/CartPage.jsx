import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCartItem, removeFromCart, fetchCartItems } from '../redux/actions/cart.js';
import { api, apiUrl, endpoints } from '../utils/api.js';
import { LS } from '../utils/localStorageUtils.js';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const cartItems = useSelector(state => state.cart.items);
  const user = useSelector(state => state.auth.user);
  let token = LS.get('token');

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  /*const handleQuantityChange = async (productId, newQuantity) => {
    try {
      await dispatch(updateCartItem({ itemId: productId, quantity: newQuantity }));
    } catch (error) {
      console.error('Error al actualizar la cantidad:', error);
    }
  };*/

  const handleRemoveItem = async (productId) => {
    try {
      await dispatch(removeFromCart(productId));
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await api.post(apiUrl + endpoints.payment, { user_id: user._id, cartItems });
      if (response.data.payment_url) {
        window.location.href = response.data.payment_url;
      } else {
        console.error('Error al obtener la URL de pago');
      }
    } catch (error) {
      console.error('Error al procesar el pago:', error);
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        await dispatch(fetchCartItems(user._id));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setLoading(false);
      }
    };

    if (user && token) {
      fetchItems();
    }
  }, [user, token, dispatch]);

  if (loading) {
    return <div className='flex justify-center items-center'>Cargando...</div>;
  }

  return (
    <div className="flex flex-col bg-gray-300 items-center max-w-screen min-h-screen">
      <h1 className="text-4xl font-bold tracking-tigh text-black">Cart Products</h1>
      <div className="mx-auto mt-12 bg-white max-w-7xl md:w-[80vw] md:min-h-[70vh] px-4 sm:px-6 lg:px-8 border-t border-gray-200 py-6">
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li key={item._id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={item.product.cover_photo[0]}
                    alt={item.product.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>{item.product.name}</h3>
                      <p className="ml-4 text-[20px]">Price ${item.product.price}</p>
                    </div>
                    <div className="mt-1 text-sm text-gray-500">
                      <p>Material: {item.product.description.material}</p>
                      <p>Condition: {item.product.description.condition}</p>
                      {/* Agregar más valores de descripción según sea necesario */}
                    </div>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="text-gray-500">
                      <p className="block text-[] font-medium leading-6 text-black">Qty <span>{item.quantity}</span></p>
                    </div>
                    <div className="flex">
                      <button
                        type="button"
                        className="font-medium text-purple-600 hover:text-purple-500"
                        onClick={() => handleRemoveItem(item.product._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-end border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p className='text-[20px]'>Subtotal</p>
            <p className='text-[20px]'>${calculateTotal().toFixed(2)}</p>
          </div>
          <p className="mt-0.5 text-gray-500 flex items-center justify-center text-[20px]">Taxes calculated at checkout.</p>
          <div className="mt-6 flex items-center justify-center">
            <button
              className="flex items-center justify-center rounded-md border border-transparent bg-purple-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-purple-700"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p className='text-[20px]'>
              or 
              <Link to="/">
                <button
                  type="button"
                  className="font-medium text-[20px] text-purple-600 hover:text-purple-500"
                >
                   Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;