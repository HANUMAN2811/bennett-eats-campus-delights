
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { hostelBlocks } from "@/data/foodData";
import { LoginModal } from "@/components/LoginModal";

export default function CartPage() {
  const { getCartItems, updateQuantity, removeFromCart, clearCart, cartTotal, hostelBlock, setHostelBlock } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  const cartItems = getCartItems();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    
    if (!hostelBlock) {
      alert("Please select a hostel block for delivery");
      return;
    }
    
    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container py-10 flex-grow flex flex-col items-center justify-center">
          <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Your Cart is Empty</h1>
          <p className="text-gray-500 mb-6">Add some delicious food from the campus outlets!</p>
          <Button 
            className="bg-bennett-orange hover:bg-bennett-orange/90"
            onClick={() => navigate("/")}
          >
            Browse Menu
          </Button>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <LoginModal open={showLoginModal} onOpenChange={setShowLoginModal} />
      
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              {cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className="cart-item flex items-center gap-4 py-4 border-b last:border-b-0"
                >
                  <div className="h-20 w-20 rounded-md overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.veg ? "Veg" : "Non-Veg"}</p>
                    <div className="text-bennett-orange font-bold mt-1">₹{item.price}</div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-semibold">₹{item.price * item.quantity}</div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-500 p-0 h-auto mt-1"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      <span className="text-xs">Remove</span>
                    </Button>
                  </div>
                </div>
              ))}
              
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => clearCart()}
              >
                Clear Cart
              </Button>
            </Card>
          </div>
          
          {/* Order Summary */}
          <div>
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span>Item Total</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Delivery Fee</span>
                  <span>₹20</span>
                </div>
                <div className="border-t pt-4 font-bold flex justify-between items-center">
                  <span>Total</span>
                  <span>₹{cartTotal + 20}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Delivery Location
                  </label>
                  <Select 
                    value={hostelBlock} 
                    onValueChange={setHostelBlock}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your hostel block" />
                    </SelectTrigger>
                    <SelectContent>
                      {hostelBlocks.map((block) => (
                        <SelectItem key={block.id} value={block.id}>
                          {block.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  className="w-full bg-bennett-orange hover:bg-bennett-orange/90"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
