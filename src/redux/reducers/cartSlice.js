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
      })

      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.cart.items;
        // Puedes realizar otras actualizaciones en el estado aquí si es necesario
      });
  },
});


export default cartSlice.reducer;
