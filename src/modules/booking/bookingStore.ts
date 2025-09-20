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

export const useBookingStore = create<BookingState>((set: any) => ({
  currentStep: 1,
  service: null,
  stylist: null,
  date: null,
  time: null,
  customerInfo: initialCustomerInfo,

  setService: (service: Service) => set({ service }),
  setStylist: (stylist: Stylist | null) => set({ stylist }),
  setDateTime: (date: string, time: string) => set({ date, time }),
  setCustomerInfo: (info: BookingState["customerInfo"]) =>
    set({ customerInfo: info }),

  nextStep: () =>
    set((state: BookingState) => ({
      currentStep: Math.min(state.currentStep + 1, 5),
    })),

  previousStep: () =>
    set((state: BookingState) => ({
      currentStep: Math.max(state.currentStep - 1, 1),
    })),

  goToStep: (step: number) => set({ currentStep: step }),

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
