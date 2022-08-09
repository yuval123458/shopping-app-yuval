import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./users-slice";
import productsSlice from "./products-slice";
import cartSlice from "./cart-slice";
import orderSlice from "./order-slice";

const store = configureStore({
  reducer: {
    users: usersSlice,
    products: productsSlice,
    cart: cartSlice,
    order: orderSlice,
  },
});

export default store;
