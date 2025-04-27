
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Star } from "lucide-react";
import { FoodItem } from "@/data/foodData";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { LoginModal } from "@/components/LoginModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface FoodCardProps {
  item: FoodItem;
}

export function FoodCard({ item }: FoodCardProps) {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showItemDetail, setShowItemDetail] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    
    addToCart(item.id);
  };

  return (
    <>
      <Card 
        className="food-card overflow-hidden cursor-pointer"
        onClick={() => setShowItemDetail(true)}
      >
        <div className="aspect-square overflow-hidden relative">
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
          <div className="absolute top-2 right-2">
            <Badge className={item.veg ? "bg-green-500" : "bg-red-500"}>
              {item.veg ? "Veg" : "Non-Veg"}
            </Badge>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-base line-clamp-1">{item.name}</h3>
            <div className="flex items-center bg-green-100 px-1.5 py-0.5 rounded text-sm">
              <Star className="text-yellow-500 w-3 h-3 mr-0.5" fill="currentColor" />
              <span className="text-green-800 font-medium">{item.rating.toFixed(1)}</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 line-clamp-2 mb-3 h-10">{item.description}</p>
          <div className="flex justify-between items-center">
            <span className="font-bold">₹{item.price}</span>
            <Button 
              size="sm" 
              className="bg-bennett-orange hover:bg-bennett-orange/90"
              onClick={handleAddToCart}
            >
              <Plus className="h-4 w-4 mr-1" /> Add
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Food Item Detail Dialog */}
      <Dialog open={showItemDetail} onOpenChange={setShowItemDetail}>
        <DialogContent className="sm:max-w-[500px] animate-scale-in">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span>{item.name}</span>
              <Badge className={item.veg ? "bg-green-500" : "bg-red-500"}>
                {item.veg ? "Vegetarian" : "Non-Vegetarian"}
              </Badge>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="aspect-video overflow-hidden rounded-md">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-green-100 px-2 py-1 rounded">
                <Star className="text-yellow-500 w-4 h-4 mr-1" fill="currentColor" />
                <span className="text-green-800 font-medium">{item.rating.toFixed(1)} Rating</span>
              </div>
              <span className="font-bold text-lg">₹{item.price}</span>
            </div>
            <p className="text-gray-700">{item.description}</p>
            <Button 
              className="w-full bg-bennett-orange hover:bg-bennett-orange/90"
              onClick={() => {
                if (!isAuthenticated) {
                  setShowLoginModal(true);
                  setShowItemDetail(false);
                  return;
                }
                
                addToCart(item.id);
                setShowItemDetail(false);
              }}
            >
              <Plus className="h-4 w-4 mr-1" /> Add to Cart
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Login Modal */}
      <LoginModal open={showLoginModal} onOpenChange={setShowLoginModal} />
    </>
  );
}
