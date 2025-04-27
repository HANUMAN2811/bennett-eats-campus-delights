
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { OutletCard } from "@/components/OutletCard";
import { outlets } from "@/data/foodData";

export default function OutletsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Campus Outlets</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {outlets.map(outlet => (
            <OutletCard key={outlet.id} outlet={outlet} />
          ))}
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
