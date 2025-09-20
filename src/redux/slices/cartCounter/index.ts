import { createSlice } from "@reduxjs/toolkit";
import { cartCounterTypes } from "./type";

const initialState: cartCounterTypes = {
  count: 0,
};

export const CartCounterSlice = createSlice({
  name: "cartCounter",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
  },
});

export const { increment, decrement } = CartCounterSlice.actions;
export default CartCounterSlice.reducer;
