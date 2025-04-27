
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface Order {
  id: string;
  date: string;
  status: "Delivered" | "In Progress" | "Preparing";
  totalAmount: number;
  items: { name: string; quantity: number }[];
  deliveryLocation: string;
}

export default function OrdersPage() {
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  
  // Mock order data
  useEffect(() => {
    if (isAuthenticated) {
      // Simulated orders data
      const mockOrders: Order[] = [
        {
          id: "#124578",
          date: "April 27, 2025, 1:30 PM",
          status: "Delivered",
          totalAmount: 270,
          items: [
            { name: "Chicken Kathi Roll", quantity: 1 },
            { name: "Double Cheese Roll", quantity: 1 }
          ],
          deliveryLocation: "C3 Hostel, Room 205"
        },
        {
          id: "#124539",
          date: "April 26, 2025, 7:15 PM",
          status: "Delivered",
          totalAmount: 220,
          items: [
            { name: "Masala Dosa", quantity: 1 },
            { name: "Veg Cheese Maggi", quantity: 2 }
          ],
          deliveryLocation: "C3 Hostel, Room 205"
        }
      ];
      
      setOrders(mockOrders);
    }
  }, [isAuthenticated]);
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container py-10 flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Please Login</h1>
            <p className="mb-6">You need to login to view your orders</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container py-10 flex-grow flex flex-col items-center justify-center">
          <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
          <h1 className="text-2xl font-bold mb-2">No Orders Yet</h1>
          <p className="text-gray-500 mb-6">You haven't placed any orders yet</p>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>
        
        <div className="space-y-6">
          {orders.map(order => (
            <Card key={order.id} className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">Order {order.id}</h3>
                    <Badge className={
                      order.status === "Delivered" ? "bg-green-500" : 
                      order.status === "In Progress" ? "bg-blue-500" : 
                      "bg-yellow-500"
                    }>
                      {order.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
                <div className="font-bold text-lg mt-2 md:mt-0">₹{order.totalAmount}</div>
              </div>
              
              <div className="border-t pt-4">
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Items</h4>
                  <ul className="space-y-1">
                    {order.items.map((item, index) => (
                      <li key={index} className="text-sm flex justify-between">
                        <span>{item.quantity}x {item.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Delivery Location</h4>
                  <p className="text-sm">{order.deliveryLocation}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
