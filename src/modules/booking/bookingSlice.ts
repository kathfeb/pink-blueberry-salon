import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Service, Stylist } from "../../data";

// Definir tipos para add-ons y descuentos
export interface ServiceAddOn {
  id: string;
  name: string;
  price: number;
  description?: string;
}

export interface SpecialRequest {
  expressService: boolean;
  weekendAppointment: boolean;
  homeService: boolean;
}

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
  // Nuevos campos para la calculadora
  addOns: ServiceAddOn[];
  specialRequests: SpecialRequest;
  discountCode: string | null;
  calculatedTotal: number;
  breakdown: {
    servicePrice: number;
    addOnsTotal: number;
    specialRequestsTotal: number;
    discountAmount: number;
    subtotal: number;
    tax: number;
    total: number;
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
  addOns: [],
  specialRequests: {
    expressService: false,
    weekendAppointment: false,
    homeService: false,
  },
  discountCode: null,
  calculatedTotal: 0,
  breakdown: {
    servicePrice: 0,
    addOnsTotal: 0,
    specialRequestsTotal: 0,
    discountAmount: 0,
    subtotal: 0,
    tax: 0,
    total: 0,
  },
};

// Función para calcular el precio total
const calculatePriceBreakdown = (state: BookingState) => {
  if (!state.service) {
    return initialState.breakdown;
  }

  const servicePrice = state.service.price;
  let addOnsTotal = 0;
  let specialRequestsTotal = 0;
  let discountAmount = 0;

  // Calcular add-ons
  state.addOns.forEach((addon) => {
    addOnsTotal += addon.price;
  });

  // Calcular solicitudes especiales
  if (state.specialRequests.expressService) {
    // Servicio express añade 30% al precio del servicio
    specialRequestsTotal += servicePrice * 0.3;
  }
  if (state.specialRequests.weekendAppointment) {
    // Cita de fin de semana añade $20
    specialRequestsTotal += 20;
  }
  if (state.specialRequests.homeService) {
    // Servicio a domicilio añade $50
    specialRequestsTotal += 50;
  }

  // Calcular subtotal antes de descuentos
  const subtotal = servicePrice + addOnsTotal + specialRequestsTotal;

  // Aplicar códigos de descuento
  const discountCodes: {
    [key: string]: { type: "percentage" | "fixed"; value: number };
  } = {
    FIRST10: { type: "percentage", value: 0.1 },
    SUMMER20: { type: "percentage", value: 0.2 },
    WELCOME15: { type: "percentage", value: 0.15 },
    SAVE25: { type: "fixed", value: 25 },
    LOYAL50: { type: "fixed", value: 50 },
  };

  if (state.discountCode && discountCodes[state.discountCode]) {
    const discount = discountCodes[state.discountCode];
    if (discount.type === "percentage") {
      discountAmount = subtotal * discount.value;
    } else {
      discountAmount = Math.min(discount.value, subtotal); // No permitir descuento mayor al subtotal
    }
  }

  // Calcular impuestos (8%)
  const taxableAmount = subtotal - discountAmount;
  const tax = taxableAmount * 0.08;

  // Total final
  const total = taxableAmount + tax;

  return {
    servicePrice,
    addOnsTotal,
    specialRequestsTotal,
    discountAmount,
    subtotal,
    tax,
    total,
  };
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setService: (state, action: PayloadAction<Service>) => {
      state.service = action.payload;
      state.breakdown = calculatePriceBreakdown(state);
      state.calculatedTotal = state.breakdown.total;
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
    // Nuevas acciones para la calculadora
    addServiceAddOn: (state, action: PayloadAction<ServiceAddOn>) => {
      state.addOns.push(action.payload);
      state.breakdown = calculatePriceBreakdown(state);
      state.calculatedTotal = state.breakdown.total;
    },
    removeServiceAddOn: (state, action: PayloadAction<string>) => {
      state.addOns = state.addOns.filter(
        (addon) => addon.id !== action.payload
      );
      state.breakdown = calculatePriceBreakdown(state);
      state.calculatedTotal = state.breakdown.total;
    },
    toggleSpecialRequest: (
      state,
      action: PayloadAction<keyof SpecialRequest>
    ) => {
      state.specialRequests[action.payload] =
        !state.specialRequests[action.payload];
      state.breakdown = calculatePriceBreakdown(state);
      state.calculatedTotal = state.breakdown.total;
    },
    applyDiscountCode: (state, action: PayloadAction<string>) => {
      state.discountCode = action.payload;
      state.breakdown = calculatePriceBreakdown(state);
      state.calculatedTotal = state.breakdown.total;
    },
    removeDiscountCode: (state) => {
      state.discountCode = null;
      state.breakdown = calculatePriceBreakdown(state);
      state.calculatedTotal = state.breakdown.total;
    },
    updatePriceCalculation: (state) => {
      state.breakdown = calculatePriceBreakdown(state);
      state.calculatedTotal = state.breakdown.total;
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
  addServiceAddOn,
  removeServiceAddOn,
  toggleSpecialRequest,
  applyDiscountCode,
  removeDiscountCode,
  updatePriceCalculation,
  nextStep,
  previousStep,
  goToStep,
  resetBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;
