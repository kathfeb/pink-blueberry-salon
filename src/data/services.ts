// Mock data for services
export interface Service {
  id: number;
  name: string;
  category: "cuts" | "color" | "treatments" | "styling";
  price: number;
  duration: number; // in minutes
  description: string;
  popular?: boolean;
}

export const services: Service[] = [
  {
    id: 1,
    name: "Signature Cut & Style",
    category: "cuts",
    price: 85,
    duration: 60,
    description: "Precision cut with professional styling and finishing",
    popular: true,
  },
  {
    id: 2,
    name: "Full Color",
    category: "color",
    price: 150,
    duration: 120,
    description: "Complete color transformation with our premium products",
    popular: true,
  },
  {
    id: 3,
    name: "Balayage Highlights",
    category: "color",
    price: 200,
    duration: 180,
    description: "Hand-painted highlights for a natural, sun-kissed look",
    popular: true,
  },
  {
    id: 4,
    name: "Deep Conditioning Treatment",
    category: "treatments",
    price: 45,
    duration: 30,
    description: "Intensive moisture therapy for damaged or dry hair",
  },
  {
    id: 5,
    name: "Blowout & Style",
    category: "styling",
    price: 65,
    duration: 45,
    description: "Professional blowout with your choice of styling",
  },
  {
    id: 6,
    name: "Root Touch-Up",
    category: "color",
    price: 80,
    duration: 90,
    description: "Color refresh for your roots to maintain your look",
  },
];
