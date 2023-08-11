import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth.js";
import cartSlice from "./reducers/cartSlice.js";
import productsReducer from "./reducers/products";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartSlice,
    products: productsReducer
  },
})

export default store;
