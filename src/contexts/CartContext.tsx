
import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { FoodItem, getFoodItemById } from "@/data/foodData";

interface CartItem {
  id: string;
  foodItemId: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  cartCount: number;
  addToCart: (foodItemId: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  getCartItems: () => (FoodItem & { quantity: number })[];
  clearCart: () => void;
  cartTotal: number;
  hostelBlock: string;
  setHostelBlock: (block: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hostelBlock, setHostelBlock] = useState<string>("");
  const { toast } = useToast();

  // Load cart from localStorage when component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedHostelBlock = localStorage.getItem("hostelBlock");
    
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
    
    if (savedHostelBlock) {
      setHostelBlock(savedHostelBlock);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  // Save hostelBlock to localStorage whenever it changes
  useEffect(() => {
    if (hostelBlock) {
      localStorage.setItem("hostelBlock", hostelBlock);
    }
  }, [hostelBlock]);

  const addToCart = (foodItemId: string) => {
    // Check if item already exists in cart
    const existingItem = items.find(item => item.foodItemId === foodItemId);
    
    if (existingItem) {
      // Update quantity if item exists
      updateQuantity(existingItem.id, existingItem.quantity + 1);
    } else {
      // Add new item if it doesn't exist
      const foodItem = getFoodItemById(foodItemId);
      if (foodItem) {
        const newItem: CartItem = {
          id: `cart-${Date.now()}`,
          foodItemId,
          quantity: 1
        };
        
        setItems(prevItems => [...prevItems, newItem]);
        
        toast({
          title: "Added to cart",
          description: `${foodItem.name} added to your cart.`,
        });
      }
    }
  };

  const removeFromCart = (cartItemId: string) => {
    const itemToRemove = items.find(item => item.id === cartItemId);
    if (itemToRemove) {
      const foodItem = getFoodItemById(itemToRemove.foodItemId);
      
      setItems(prevItems => prevItems.filter(item => item.id !== cartItemId));
      
      if (foodItem) {
        toast({
          title: "Removed from cart",
          description: `${foodItem.name} removed from your cart.`,
        });
      }
    }
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(cartItemId);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const getCartItems = () => {
    return items.map(item => {
      const foodItem = getFoodItemById(item.foodItemId);
      if (!foodItem) {
        throw new Error(`Food item with id ${item.foodItemId} not found`);
      }
      return {
        ...foodItem,
        quantity: item.quantity
      };
    });
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "Cart cleared",
      description: "All items removed from your cart.",
    });
  };

  // Calculate total price of items in cart
  const cartTotal = getCartItems().reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  );

  // Calculate total number of items in cart
  const cartCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      items, 
      cartCount,
      addToCart,
      removeFromCart,
      updateQuantity,
      getCartItems,
      clearCart,
      cartTotal,
      hostelBlock,
      setHostelBlock
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
