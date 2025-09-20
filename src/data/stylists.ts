// Mock data for stylists
export interface Stylist {
  id: number;
  name: string;
  title: string;
  specialties: string[];
  bio: string;
  rating: number;
  image?: string;
  available?: boolean;
}

export const stylists: Stylist[] = [
  {
    id: 1,
    name: "Sarah Mitchell",
    title: "Senior Stylist",
    specialties: ["Color Specialist", "Balayage Expert"],
    bio: "With over 10 years of experience, Sarah specializes in creating stunning color transformations and natural-looking highlights.",
    rating: 4.9,
    available: true,
  },
  {
    id: 2,
    name: "James Chen",
    title: "Style Director",
    specialties: ["Precision Cuts", "Men's Styling"],
    bio: "James brings an artistic eye and technical precision to every cut. Known for creating styles that grow out beautifully.",
    rating: 4.8,
    available: true,
  },
  {
    id: 3,
    name: "Maria Garcia",
    title: "Color Specialist",
    specialties: ["Color Correction", "Creative Color"],
    bio: "Maria is our color correction expert and loves creating bold, vibrant looks. She's your go-to for dramatic transformations.",
    rating: 5.0,
    available: true,
  },
  {
    id: 4,
    name: "Alex Thompson",
    title: "Junior Stylist",
    specialties: ["Cuts", "Styling"],
    bio: "Fresh from advanced training, Alex brings enthusiasm and the latest techniques to every appointment.",
    rating: 4.7,
    available: true,
  },
  {
    id: 5,
    name: "Naomi Brooks",
    title: "Bridal Specialist",
    specialties: ["Updos", "Bridal Hair", "Extensions"],
    bio: "Naomi crafts elegant updos and timeless bridal looks, focusing on longevity and comfort for your special day.",
    rating: 4.9,
    available: true,
  },
  {
    id: 6,
    name: "Diego Rivera",
    title: "Texture & Curls Pro",
    specialties: ["Curly Cuts", "Texturizing", "Treatments"],
    bio: "Diego specializes in enhancing natural curl patterns with shape, definition, and healthy haircare routines.",
    rating: 4.8,
    available: true,
  },
];
