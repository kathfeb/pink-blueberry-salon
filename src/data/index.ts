// Time slots for booking
export interface TimeSlot {
  time: string;
  available: boolean;
}

export const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startHour = 9; // 9 AM
  const endHour = 17; // 5 PM

  for (let hour = startHour; hour < endHour; hour++) {
    // On the hour
    slots.push({
      time: `${hour}:00`,
      available: Math.random() > 0.3, // 70% availability
    });

    // Half hour
    slots.push({
      time: `${hour}:30`,
      available: Math.random() > 0.3,
    });
  }

  return slots;
};

// Export all data from a central location
export { services } from "./services";
export { stylists } from "./stylists";
export { products } from "./products";
export type { Service } from "./services";
export type { Stylist } from "./stylists";
export type { Product } from "./products";
