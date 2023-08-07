import { createSlice } from '@reduxjs/toolkit';
import { addToCart, updateCartItem, removeFromCart } from '../actions/cart.js';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Otras acciones

      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        // Actualizar la base de datos aquí si es necesario
      })

      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false;
        // Actualizar la base de datos aquí si es necesario
      })

      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        // Actualizar la base de datos aquí si es necesario
      });
  },
});

export default cartSlice.reducer;
