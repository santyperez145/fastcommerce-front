import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, apiUrl, endpoints } from '../../utils/api.js'; // Importa los endpoints de tu archivo api.js

export const addToCart = createAsyncThunk('cart/addToCart', async ({ productId, quantity }) => {
    try {
      const response = await api.post(apiUrl + endpoints.addToCart, { productId, quantity });
      return response.data;
    } catch (error) {
      throw error;
    }
  });
  
  export const updateCartItem = createAsyncThunk('cart/updateCartItem', async ({ itemId, quantity }) => {
    try {
      const response = await api.put(apiUrl + endpoints.updateCart, { itemId, quantity });
      return response.data;
    } catch (error) {
      throw error;
    }
  });
  
  export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (itemId) => {
    try {
      const response = await api.put(apiUrl + endpoints.removeCart, { itemId });
      return response.data;
    } catch (error) {
      throw error;
    }
  });

export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async (userId) => {
  try {
    const response = await api.get(apiUrl+endpoints.getCart.replace(':user_id', userId));
    return response.data;
  } catch (error) {
    throw error;
  }
});
