import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productsApi } from "../../redux/api/products";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      // Add middleware here to be used, the below is an example
      productsApi.middleware
    ),
});

// Persist cart to localStorage on state changes
if (typeof window !== "undefined") {
  let prev = store.getState().cart.items;
  store.subscribe(() => {
    const { items } = store.getState().cart;
    if (items !== prev) {
      try {
        localStorage.setItem("cart", JSON.stringify({ items }));
      } catch {
        // ignore write errors
      }
      prev = items;
    }
  });
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
setupListeners(store.dispatch);
