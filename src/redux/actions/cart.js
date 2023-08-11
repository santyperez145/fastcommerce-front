import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, apiUrl, endpoints } from '../../utils/api.js'; // Importa los endpoints de tu archivo api.js
import { LS } from '../../utils/localStorageUtils.js';

export const addToCart = createAsyncThunk('cart/addToCart', async ({ productId, quantity }) => {
    try {
      let token = LS.get('token')
      const response = await api.post(apiUrl + endpoints.addToCart, { productId, quantity }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  });
  
  export const updateCartItem = createAsyncThunk('cart/updateCartItem', async ({ itemId, quantity }) => {
    try {
      let token = LS.get('token')
      const response = await api.put(apiUrl + endpoints.updateCart, { itemId, quantity }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  });
  
  export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (itemId) => {
    try {
      let token = LS.get('token')
      const response = await api.put(apiUrl + endpoints.removeCart.replace(':product_id', itemId ), { itemId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  });

export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async (userId) => {
  try {
    let token = LS.get('token')
    const response = await api.get(apiUrl+endpoints.getCart.replace(':user_id', userId), {
        headers: { Authorization: `Bearer ${token}` },
      });
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const setCart = (cartItems) => {
  return {
    type: 'cart/setCart',
    payload: cartItems,
  };
};

export const fetchProductDetails = createAsyncThunk(
  'cart/fetchProductDetails',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.get(apiUrl + `cart/cartdetails/${productId}`);
      return response.data.response; // Esto debería ser un objeto con los detalles del producto
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchAllProductDetails = createAsyncThunk(
  'cart/fetchAllProductDetails',
  async (cartItems, { dispatch }) => {
    try {
      const updatedItems = await Promise.all(
        cartItems.map(async (item) => {
          const product = await dispatch(fetchProductDetails(item.product._id));
          return {
            ...item,
            product,
          };
        })
      );

      return updatedItems;
    } catch (error) {
      throw error;
    }
  }
);