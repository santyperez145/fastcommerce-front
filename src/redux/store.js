import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth.js";
import cartSlice from "./reducers/cartSlice.js";
import productsReducer from "./reducers/products";
import commentsReducer from './reducers/comments';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartSlice,
    products: productsReducer,
    searched_products: productsReducer,
    comments: commentsReducer,
  },
})

export default store;
