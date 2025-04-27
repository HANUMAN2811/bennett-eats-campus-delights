import { FoodItem } from '../types/food';

export const foodItems: FoodItem[] = [
  // Kathi Junction Items
  {
    id: "k1",
    name: "Chicken Kathi Roll",
    price: 120,
    description: "Flavorful chicken wrapped in a paratha with fresh veggies and sauces",
    image: "https://images.unsplash.com/photo-1599059177282-f7debc6b517a?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDR8fGNoaWNrZW4lMjByb2xsfGVufDB8fHx8MTcxODYxMDI1MXww&ixlib=rb-4.0.3&w=600",
    rating: 4.7,
    veg: false,
    outletId: "kathi",
    popular: true
  },
  {
    id: "k2",
    name: "Paneer Kathi Roll",
    price: 110,
    description: "Delicious paneer tikka wrapped in a flaky paratha with mint chutney",
    image: "https://images.unsplash.com/photo-1595475207225-428b62bda831?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDN8fHBhbmVlciUyMHdyYXB8ZW58MHx8fHwxNzE4NjEwMjQwfDA&ixlib=rb-4.0.3&w=600",
    rating: 4.5,
    veg: true,
    outletId: "kathi"
  },
  {
    id: "k3",
    name: "Egg Kathi Roll",
    price: 100,
    description: "Fluffy egg paratha wrapped with veggies and special sauce",
    image: "https://images.unsplash.com/photo-1511689660979-10d2b1aada49?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDZ8fGVnZyUyMHJvbGx8ZW58MHx8fHwxNzE4NjEwMjcxfDA&ixlib=rb-4.0.3&w=600",
    rating: 4.3,
    veg: false,
    outletId: "kathi"
  },
  {
    id: "k4",
    name: "Double Cheese Roll",
    price: 140,
    description: "Stuffed with extra cheese, veggies, and our special sauce",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDF8fGNoZWVzZSUyMHJvbGx8ZW58MHx8fHwxNzE4NjEwMjg0fDA&ixlib=rb-4.0.3&w=600",
    rating: 4.8,
    veg: true,
    outletId: "kathi",
    popular: true
  },
  
  // Southern Stories Items
  {
    id: "s1",
    name: "Masala Dosa",
    price: 90,
    description: "Crispy dosa filled with spiced potato masala and served with sambar and chutney",
    image: "https://images.unsplash.com/photo-1694504578363-3a073111a633?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDF8fG1hc2FsYSUyMGRvc2F8ZW58MHx8fHwxNzE4NjEwMzA0fDA&ixlib=rb-4.0.3&w=600",
    rating: 4.6,
    veg: true,
    outletId: "southern",
    popular: true
  },
  {
    id: "s2",
    name: "Idli Sambar",
    price: 70,
    description: "Soft steamed rice cakes served with flavorful sambar and coconut chutney",
    image: "https://images.unsplash.com/photo-1691685883154-2c04a5d189d3?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDJ8fGlkbGl8ZW58MHx8fHwxNzE4NjEwMzIwfDA&ixlib=rb-4.0.3&w=600",
    rating: 4.2,
    veg: true,
    outletId: "southern"
  },
  {
    id: "s3",
    name: "Vada Sambar",
    price: 80,
    description: "Crispy lentil fritters served with tangy sambar and coconut chutney",
    image: "https://images.unsplash.com/photo-1667420137217-a60e1a133471?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDJ8fHZhZGF8ZW58MHx8fHwxNzE4NjEwMzM0fDA&ixlib=rb-4.0.3&w=600",
    rating: 4.3,
    veg: true,
    outletId: "southern"
  },
  {
    id: "s4",
    name: "South Indian Thali",
    price: 150,
    description: "Complete meal with rice, sambar, rasam, curd, vegetables, and dessert",
    image: "https://images.unsplash.com/photo-1606482512676-255bf0fccdce?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDh8fHNvdXRoJTIwaW5kaWFuJTIwdGhhbGl8ZW58MHx8fHwxNzE4NjEwMzUwfDA&ixlib=rb-4.0.3&w=600",
    rating: 4.8,
    veg: true,
    outletId: "southern",
    popular: true
  },
  
  // Maggi Point Items
  {
    id: "m1",
    name: "Classic Maggi",
    price: 50,
    description: "The original 2-minute Maggi noodles seasoned to perfection",
    image: "https://images.unsplash.com/photo-1603245460265-792504405669?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDN8fG5vb2RsZXN8ZW58MHx8fHwxNzE4NjEwMzY4fDA&ixlib=rb-4.0.3&w=600",
    rating: 4.0,
    veg: true,
    outletId: "maggi"
  },
  {
    id: "m2",
    name: "Veg Cheese Maggi",
    price: 70,
    description: "Maggi loaded with veggies and extra cheese for a cheesy delight",
    image: "https://images.unsplash.com/photo-1605854705510-b5372b7a75cc?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDIxfHxub29kbGVzfGVufDB8fHx8MTcxODYxMDM4NHww&ixlib=rb-4.0.3&w=600",
    rating: 4.5,
    veg: true,
    outletId: "maggi",
    popular: true
  },
  {
    id: "m3",
    name: "Masala Maggi",
    price: 60,
    description: "Spicy Maggi with extra masala, herbs, and spices",
    image: "https://images.unsplash.com/photo-1675288763875-a2a9c25deb5a?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDI3fHxub29kbGVzfGVufDB8fHx8MTcxODYxMDM4NHww&ixlib=rb-4.0.3&w=600",
    rating: 4.2,
    veg: true,
    outletId: "maggi"
  },
  {
    id: "m4",
    name: "Butter Maggi",
    price: 65,
    description: "Creamy Maggi cooked with generous amounts of butter for a rich taste",
    image: "https://images.unsplash.com/photo-1634864572865-1cf8ff28db08?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDMwfHxub29kbGVzfGVufDB8fHx8MTcxODYxMDM4NHww&ixlib=rb-4.0.3&w=600",
    rating: 4.4,
    veg: true,
    outletId: "maggi",
    popular: true
  }
];

export const getPopularItems = (): FoodItem[] => {
  return foodItems.filter(item => item.popular);
};

export const getOutletItems = (outletId: string): FoodItem[] => {
  return foodItems.filter(item => item.outletId === outletId);
};

export const getFoodItemById = (id: string): FoodItem | undefined => {
  return foodItems.find(item => item.id === id);
};
