
export interface FoodItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  rating: number;
  veg: boolean;
  outletId: string;
  popular?: boolean;
}

export interface Outlet {
  id: string;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  description: string;
}

export interface HostelBlock {
  id: string;
  name: string;
}
