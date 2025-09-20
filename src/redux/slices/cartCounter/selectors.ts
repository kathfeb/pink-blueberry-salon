import { RootState } from "../../../config/redux/store";
import { cartCounterTypes } from "./type";

export const selectCartCounter = (state: RootState): cartCounterTypes =>
  state.cartCounter;
