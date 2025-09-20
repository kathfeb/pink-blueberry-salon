import { combineReducers } from '@reduxjs/toolkit';
import { productsApi } from '../../redux/api/products';
import { CartCounterSlice } from '../../redux/slices/cartCounter';

export const rootReducer = combineReducers({
  // Add reducers here to be combined, the below are examples
  [productsApi.reducerPath]: productsApi.reducer,
  cartCounter: CartCounterSlice.reducer
});
