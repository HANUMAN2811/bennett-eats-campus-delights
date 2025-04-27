
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FoodCard } from "@/components/FoodCard";
import { OutletCard } from "@/components/OutletCard";
import { AiAssistant } from "@/components/AiAssistant";
import { Search } from "lucide-react";
import { outlets, getPopularItems } from "@/data/foodData";
import { Input } from "@/components/ui/input";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const popularItems = getPopularItems();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-bennett-orange to-amber-500 text-white py-16">
        <div className="container flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Campus Food Delivery
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl animate-fade-in" style={{animationDelay: "200ms"}}>
            Order from your favorite campus outlets and get it delivered to your hostel block
          </p>
          <div className="relative w-full max-w-md animate-fade-in" style={{animationDelay: "400ms"}}>
            <Input
              type="text"
              placeholder="Search for food or outlets..."
              className="pl-10 py-6 text-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
      
      {/* Outlets Section */}
      <div className="container py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Campus Outlets</h2>
          <Button 
            variant="link" 
            className="text-bennett-orange"
            onClick={() => window.location.href = "/outlets"}
          >
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {outlets.map(outlet => (
            <OutletCard key={outlet.id} outlet={outlet} />
          ))}
        </div>
      </div>
      
      {/* Popular Items Section */}
      <div className="container py-10">
        <h2 className="text-2xl font-bold mb-6">Popular Items</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {popularItems.map(item => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      </div>
      
      {/* AI Assistant Section */}
      <div className="container py-10">
        <h2 className="text-2xl font-bold mb-6">Ask for Recommendations</h2>
        <AiAssistant />
      </div>
      
      <Footer />
    </div>
  );
}
