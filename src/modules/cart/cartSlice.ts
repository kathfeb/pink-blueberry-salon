import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../data";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface ShippingOption {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  shippingOption: ShippingOption | null;
  promoCode: string | null;
  breakdown: {
    subtotal: number;
    shippingCost: number;
    discountAmount: number;
    tax: number;
    total: number;
  };
}

const shippingOptions: ShippingOption[] = [
  {
    id: "standard",
    name: "Standard Shipping",
    price: 8,
    description: "5-7 business days",
  },
  {
    id: "express",
    name: "Express Shipping",
    price: 15,
    description: "2-3 business days",
  },
  {
    id: "overnight",
    name: "Overnight Shipping",
    price: 25,
    description: "Next business day",
  },
];

const initialState: CartState = {
  items: [],
  isOpen: false,
  shippingOption: shippingOptions[0], // Default to standard shipping
  promoCode: null,
  breakdown: {
    subtotal: 0,
    shippingCost: 8,
    discountAmount: 0,
    tax: 0,
    total: 0,
  },
};

// Function to calculate cart totals
const calculateCartBreakdown = (state: CartState) => {
  // Calculate subtotal
  const subtotal = state.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  // Free shipping over $50
  let shippingCost = state.shippingOption?.price || 0;
  if (subtotal >= 50) {
    shippingCost = 0;
  }

  // Apply promo codes
  let discountAmount = 0;
  const promoCodes: {
    [key: string]: {
      type: "percentage" | "fixed";
      value: number;
      minOrder?: number;
    };
  } = {
    SAVE10: { type: "percentage", value: 0.1, minOrder: 30 },
    WELCOME20: { type: "percentage", value: 0.2, minOrder: 50 },
    SHIP5: { type: "fixed", value: 5 },
    BEAUTY15: { type: "fixed", value: 15, minOrder: 40 },
  };

  if (state.promoCode && promoCodes[state.promoCode]) {
    const promo = promoCodes[state.promoCode];

    // Check minimum order requirement
    if (!promo.minOrder || subtotal >= promo.minOrder) {
      if (promo.type === "percentage") {
        discountAmount = subtotal * promo.value;
      } else {
        discountAmount = Math.min(promo.value, subtotal);
      }
    }
  }

  // Calculate tax (8% on subtotal after discount)
  const taxableAmount = subtotal - discountAmount;
  const tax = taxableAmount * 0.08;

  // Total
  const total = taxableAmount + shippingCost + tax;

  return {
    subtotal,
    shippingCost,
    discountAmount,
    tax,
    total,
  };
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }

      state.breakdown = calculateCartBreakdown(state);
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload
      );
      state.breakdown = calculateCartBreakdown(state);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ productId: number; quantity: number }>
    ) => {
      const item = state.items.find(
        (item) => item.product.id === action.payload.productId
      );

      if (item && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity;
      }
      state.breakdown = calculateCartBreakdown(state);
    },

    setShippingOption: (state, action: PayloadAction<string>) => {
      const option = shippingOptions.find((opt) => opt.id === action.payload);
      if (option) {
        state.shippingOption = option;
        state.breakdown = calculateCartBreakdown(state);
      }
    },

    applyPromoCode: (state, action: PayloadAction<string>) => {
      state.promoCode = action.payload.toUpperCase();
      state.breakdown = calculateCartBreakdown(state);
    },

    removePromoCode: (state) => {
      state.promoCode = null;
      state.breakdown = calculateCartBreakdown(state);
    },

    clearCart: (state) => {
      state.items = [];
      state.promoCode = null;
      state.breakdown = calculateCartBreakdown(state);
    },

    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },

    openCart: (state) => {
      state.isOpen = true;
    },

    closeCart: (state) => {
      state.isOpen = false;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  setShippingOption,
  applyPromoCode,
  removePromoCode,
  clearCart,
  toggleCart,
  openCart,
  closeCart,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartItemCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotal = (state: { cart: CartState }) =>
  state.cart.breakdown.total;
export const selectCartBreakdown = (state: { cart: CartState }) =>
  state.cart.breakdown;
export const selectIsCartOpen = (state: { cart: CartState }) =>
  state.cart.isOpen;
export const selectShippingOptions = () => shippingOptions;

export default cartSlice.reducer;
