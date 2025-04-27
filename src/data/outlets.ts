
import { Outlet } from '../types/food';

export const outlets: Outlet[] = [
  {
    id: "kathi",
    name: "Kathi Junction",
    image: "https://images.unsplash.com/photo-1625937288614-45f53fd4dc0f?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDZ8fGluZGlhbiUyMHN0cmVldCUyMGZvb2R8ZW58MHx8fHwxNzE4NjA5OTk3fDA&ixlib=rb-4.0.3&w=600",
    rating: 4.5,
    deliveryTime: "15-20 mins",
    description: "Delicious rolls and wraps made with fresh ingredients"
  },
  {
    id: "southern",
    name: "Southern Stories",
    image: "https://images.unsplash.com/photo-1578936579851-g4a29c34fb44?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDF8fHNvdXRoJTIwaW5kaWFuJTIwcmVzdGF1cmFudHxlbnwwfHx8fDE3MTg2MDk5OTd8MA&ixlib=rb-4.0.3&w=600",
    rating: 4.2,
    deliveryTime: "20-25 mins",
    description: "Authentic South Indian meals and snacks"
  },
  {
    id: "maggi",
    name: "Maggi Point",
    image: "https://images.unsplash.com/photo-1600891964599-ee5a7a4467c0?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDF8fGZvb2QlMjBjYXJ0fGVufDB8fHx8MTcxODYwOTk5N3ww&ixlib=rb-4.0.3&w=600",
    rating: 4.0,
    deliveryTime: "10-15 mins",
    description: "Quick and tasty Maggi noodles with various toppings"
  }
];

export const getOutletById = (id: string): Outlet | undefined => {
  return outlets.find(outlet => outlet.id === id);
};
