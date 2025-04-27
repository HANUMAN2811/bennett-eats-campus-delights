
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FoodCard } from "@/components/FoodCard";
import { getOutletById, getOutletItems } from "@/data/foodData";
import { Star, Clock } from "lucide-react";

export default function OutletDetail() {
  const { id } = useParams<{ id: string }>();
  const outlet = getOutletById(id || "");
  const foodItems = getOutletItems(id || "");
  
  if (!outlet) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container py-10 flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Outlet Not Found</h1>
            <p className="mb-6">The outlet you're looking for doesn't exist.</p>
            <a href="/outlets" className="text-bennett-orange hover:underline">
              Browse all outlets
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Outlet Header */}
      <div 
        className="w-full h-48 md:h-64 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${outlet.image})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container h-full flex items-end pb-6 relative z-10">
          <div className="text-white">
            <h1 className="text-3xl font-bold mb-2">{outlet.name}</h1>
            <p className="mb-2">{outlet.description}</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Star className="text-yellow-400 w-5 h-5 mr-1" fill="currentColor" />
                <span>{outlet.rating.toFixed(1)} Rating</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-1" />
                <span>{outlet.deliveryTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Menu Items */}
      <div className="container py-8">
        <h2 className="text-2xl font-bold mb-6">Menu</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {foodItems.map(item => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
