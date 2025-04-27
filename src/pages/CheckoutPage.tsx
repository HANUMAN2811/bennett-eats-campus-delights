
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { hostelBlocks } from "@/data/foodData";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

export default function CheckoutPage() {
  const { getCartItems, cartTotal, clearCart, hostelBlock } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const cartItems = getCartItems();
  const selectedHostel = hostelBlocks.find(block => block.id === hostelBlock);
  
  useEffect(() => {
    // Redirect to cart if it's empty or user is not logged in
    if (cartItems.length === 0 || !isAuthenticated) {
      navigate("/cart");
    }
    
    // Pre-fill name if user is authenticated
    if (user && user.name) {
      setName(user.name);
    }
  }, [cartItems.length, isAuthenticated, navigate, user]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!hostelBlock || !name || !phone || !roomNumber) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill all required fields",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Order placed successfully!",
      description: "Your food will be delivered soon.",
    });
    
    clearCart();
    navigate("/order-success");
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Delivery Information */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Delivery Information</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input 
                      id="phone" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)}
                      type="tel"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hostel">Hostel Block *</Label>
                    <Input 
                      id="hostel" 
                      value={selectedHostel?.name || "Please select from cart page"}
                      readOnly
                      className="bg-gray-50"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="room">Room Number *</Label>
                    <Input 
                      id="room" 
                      value={roomNumber} 
                      onChange={(e) => setRoomNumber(e.target.value)}
                      placeholder="e.g., 203"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Delivery Instructions (Optional)</Label>
                  <Textarea 
                    id="notes" 
                    value={notes} 
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any special instructions for delivery?"
                    className="resize-none"
                    rows={3}
                  />
                </div>
                
                <div className="pt-4">
                  <Button 
                    type="submit"
                    className="w-full bg-bennett-orange hover:bg-bennett-orange/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "Place Order"}
                  </Button>
                </div>
              </form>
            </Card>
          </div>
          
          {/* Order Summary */}
          <div>
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{item.quantity}x</span>
                      <span>{item.name}</span>
                    </div>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span>Item Total</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Delivery Fee</span>
                  <span>₹20</span>
                </div>
                <div className="pt-2 border-t font-bold text-lg flex justify-between items-center">
                  <span>Total</span>
                  <span>₹{cartTotal + 20}</span>
                </div>
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
