import { create } from "zustand";
import { Service, Stylist } from "../../data";

export interface BookingState {
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

  // Actions
  setService: (service: Service) => void;
  setStylist: (stylist: Stylist | null) => void;
  setDateTime: (date: string, time: string) => void;
  setCustomerInfo: (info: BookingState["customerInfo"]) => void;
  nextStep: () => void;
  previousStep: () => void;
  resetBooking: () => void;
  goToStep: (step: number) => void;
}

const initialCustomerInfo = {
  name: "",
  email: "",
  phone: "",
  notes: "",
};

export const useBookingStore = create<BookingState>((set) => ({
  currentStep: 1,
  service: null,
  stylist: null,
  date: null,
  time: null,
  customerInfo: initialCustomerInfo,

  setService: (service) => set({ service }),
  setStylist: (stylist) => set({ stylist }),
  setDateTime: (date, time) => set({ date, time }),
  setCustomerInfo: (info) => set({ customerInfo: info }),

  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, 5),
    })),

  previousStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 1),
    })),

  goToStep: (step) => set({ currentStep: step }),

  resetBooking: () =>
    set({
      currentStep: 1,
      service: null,
      stylist: null,
      date: null,
      time: null,
      customerInfo: initialCustomerInfo,
    }),
}));
