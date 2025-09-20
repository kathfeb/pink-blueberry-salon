import { combineReducers } from "@reduxjs/toolkit";
import { productsApi } from "../../redux/api/products";
import { CartCounterSlice } from "../../redux/slices/cartCounter";
import bookingReducer from "../../modules/booking/bookingSlice";
import cartReducer from "../../modules/cart/cartSlice";

export const rootReducer = combineReducers({
  // API reducers
  [productsApi.reducerPath]: productsApi.reducer,

  // Feature reducers
  booking: bookingReducer,
  cart: cartReducer,
  cartCounter: CartCounterSlice.reducer,
});
