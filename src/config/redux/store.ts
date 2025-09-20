import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { setupListeners } from '@reduxjs/toolkit/query';
import { productsApi } from '../../redux/api/products';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      // Add middleware here to be used, the below is an example
      productsApi.middleware
    )
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
setupListeners(store.dispatch);
