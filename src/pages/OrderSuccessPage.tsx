
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function OrderSuccessPage() {
  const navigate = useNavigate();
  
  // Generate a random order number
  const orderNumber = Math.floor(100000 + Math.random() * 900000);
  
  // Generate random delivery time (20-40 minutes)
  const deliveryTime = Math.floor(20 + Math.random() * 20);
  
  // Redirect to home if directly accessing this page
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate("/");
    }, 30000);  // 30 seconds automatic redirect
    
    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container py-10 flex-grow flex flex-col items-center justify-center">
        <div className="text-center max-w-md animate-scale-in">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-20 w-20 text-green-500" />
          </div>
          
          <h1 className="text-3xl font-bold mb-2">Order Placed Successfully!</h1>
          <p className="text-lg mb-6">Thank you for your order.</p>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <div className="text-sm text-gray-500 mb-2">Order Number</div>
            <div className="font-bold text-xl mb-4">#{orderNumber}</div>
            <div className="text-sm text-gray-500 mb-2">Estimated Delivery Time</div>
            <div className="font-bold text-xl">{deliveryTime} minutes</div>
          </div>
          
          <p className="mb-8 text-gray-600">
            Your order is being prepared and will be delivered to your hostel room shortly.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-bennett-orange hover:bg-bennett-orange/90"
              onClick={() => navigate("/")}
            >
              Back to Home
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate("/orders")}
            >
              View My Orders
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
