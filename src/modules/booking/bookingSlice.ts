import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Service, Stylist } from "../../data";

interface BookingState {
  currentStep: number;
  service: Service | null;
  stylist: Stylist | null;
  date: string | null;
  time: string | null;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    notes?: string;
  };
}

const initialState: BookingState = {
  currentStep: 1,
  service: null,
  stylist: null,
  date: null,
  time: null,
  customerInfo: {
    name: "",
    email: "",
    phone: "",
    notes: "",
  },
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setService: (state, action: PayloadAction<Service>) => {
      state.service = action.payload;
    },
    setStylist: (state, action: PayloadAction<Stylist | null>) => {
      state.stylist = action.payload;
    },
    setDateTime: (
      state,
      action: PayloadAction<{ date: string; time: string }>
    ) => {
      state.date = action.payload.date;
      state.time = action.payload.time;
    },
    setCustomerInfo: (
      state,
      action: PayloadAction<BookingState["customerInfo"]>
    ) => {
      state.customerInfo = action.payload;
    },
    nextStep: (state) => {
      if (state.currentStep < 5) {
        state.currentStep += 1;
      }
    },
    previousStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },
    goToStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    resetBooking: () => initialState,
  },
});

export const {
  setService,
  setStylist,
  setDateTime,
  setCustomerInfo,
  nextStep,
  previousStep,
  goToStep,
  resetBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;
