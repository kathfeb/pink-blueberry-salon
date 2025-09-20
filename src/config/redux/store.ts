import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { rootReducer } from "./rootReducer";
import { productsApi } from "../../redux/api/products";

// Persist configuration
const persistConfig = {
  key: "pink-blueberry-root",
  version: 1,
  storage,
  whitelist: ["cart"], // Only persist cart state
  blacklist: ["booking", productsApi.reducerPath], // Don't persist booking or API cache
};

// Infer the root state from the un-persisted rootReducer.
// This preserves typing even after wrapping with redux-persist, which otherwise erases the state type.
export type RootState = ReturnType<typeof rootReducer>;

// Create persisted reducer with proper state typing
const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(productsApi.middleware),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

setupListeners(store.dispatch);
