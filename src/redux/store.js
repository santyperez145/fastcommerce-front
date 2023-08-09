import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth.js";
import cartSlice from "./reducers/cartSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartSlice,
  },
})

export default store;
