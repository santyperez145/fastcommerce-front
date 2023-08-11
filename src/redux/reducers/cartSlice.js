import { createSlice } from '@reduxjs/toolkit';
import { addToCart, updateCartItem, removeFromCart, fetchCartItems } from '../actions/cart.js';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload;
  },
},
  extraReducers: (builder) => {
    builder
      // Add to Cart

      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        // Actualizar la base de datos aquí si es necesario
      })

      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Otra información de error si es necesario
      })

      // Update Cart

      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false;
        // Actualizar la base de datos aquí si es necesario
      })

      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Otra información de error si es necesario
      })

      //Remove from Cart

      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        // Actualizar la base de datos aquí si es necesario
      })

      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Otra información de error si es necesario
      })

      //Fetch Cart

      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.cart.items;
        // Puedes realizar otras actualizaciones en el estado aquí si es necesario
      })

      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Otra información de error si es necesario
      });
  },
});


export default cartSlice.reducer;
