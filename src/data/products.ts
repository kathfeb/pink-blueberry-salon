// Mock data for products
export interface Product {
  id: number;
  name: string;
  category: "Hair Care" | "Organic Soap";
  price: number;
  description: string;
  image?: string;
  inStock?: boolean;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Moisture Lock Shampoo",
    category: "Hair Care",
    price: 28,
    description: "Hydrating shampoo with argan oil for silky smooth hair",
    inStock: true,
    featured: true,
  },
  {
    id: 2,
    name: "Silk Repair Conditioner",
    category: "Hair Care",
    price: 32,
    description: "Deep conditioning treatment with silk proteins",
    inStock: true,
    featured: true,
  },
  {
    id: 3,
    name: "Lavender Dreams Soap",
    category: "Organic Soap",
    price: 12,
    description: "Handcrafted organic lavender soap for relaxation",
    inStock: true,
    featured: true,
  },
  {
    id: 4,
    name: "Honey Oat Exfoliating Bar",
    category: "Organic Soap",
    price: 14,
    description: "Natural exfoliating soap with honey and oatmeal",
    inStock: true,
  },
  {
    id: 5,
    name: "Heat Defense Spray",
    category: "Hair Care",
    price: 24,
    description: "Thermal protection spray for heat styling up to 450°F",
    inStock: true,
  },
  {
    id: 6,
    name: "Rose Garden Soap Set",
    category: "Organic Soap",
    price: 35,
    description: "Set of 3 rose-scented organic soaps in a gift box",
    inStock: true,
  },
  {
    id: 7,
    name: "Volumizing Mousse",
    category: "Hair Care",
    price: 22,
    description: "Lightweight mousse for incredible volume and hold",
    inStock: true,
  },
  {
    id: 8,
    name: "Tea Tree Clarifying Soap",
    category: "Organic Soap",
    price: 13,
    description: "Purifying soap with tea tree oil for problem skin",
    inStock: true,
  },
];
