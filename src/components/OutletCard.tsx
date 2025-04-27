
import { Card, CardContent } from "@/components/ui/card";
import { Star, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Outlet } from "@/data/foodData";

interface OutletCardProps {
  outlet: Outlet;
}

export function OutletCard({ outlet }: OutletCardProps) {
  return (
    <Link to={`/outlet/${outlet.id}`}>
      <Card className="outlet-card h-full overflow-hidden">
        <div className="aspect-video overflow-hidden">
          <img 
            src={outlet.image} 
            alt={outlet.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2">{outlet.name}</h3>
          <p className="text-sm text-gray-500 mb-3 line-clamp-2">{outlet.description}</p>
          <div className="flex justify-between items-center">
            <div className="flex items-center text-sm">
              <Star className="text-yellow-500 w-4 h-4 mr-1" fill="currentColor" />
              <span>{outlet.rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="w-4 h-4 mr-1" />
              <span>{outlet.deliveryTime}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
