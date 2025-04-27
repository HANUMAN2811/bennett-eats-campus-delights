
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send } from "lucide-react";
import { foodItems } from "@/data/foodData";
import { FoodCard } from "./FoodCard";

export function AiAssistant() {
  const [query, setQuery] = useState("");
  const [conversation, setConversation] = useState<{type: "user" | "ai", message: string}[]>([
    {type: "ai", message: "Hi! I'm your Bennett Eats food assistant. Ask me for recommendations or search for specific foods!"}
  ]);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Simple AI to recommend food based on user input
  const getRecommendations = (userQuery: string) => {
    setIsLoading(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      const query = userQuery.toLowerCase();
      let response = "";
      let recommendedItemIds: string[] = [];
      
      // Check for common queries
      if (query.includes("spicy") || query.includes("hot")) {
        response = "Here are some spicy options you might enjoy:";
        recommendedItemIds = ["k1", "m3"];
      }
      else if (query.includes("veg") || query.includes("vegetarian")) {
        response = "Check out these delicious vegetarian options:";
        recommendedItemIds = ["k2", "s1", "s2", "m2"];
      }
      else if (query.includes("cheese") || query.includes("cheesy")) {
        response = "For cheese lovers, I recommend these items:";
        recommendedItemIds = ["k4", "m2"];
      }
      else if (query.includes("breakfast")) {
        response = "Perfect breakfast options on campus:";
        recommendedItemIds = ["s1", "s2", "s3"];
      }
      else if (query.includes("south") || query.includes("southern")) {
        response = "You'll love these South Indian dishes:";
        recommendedItemIds = ["s1", "s2", "s3", "s4"];
      }
      else if (query.includes("quick") || query.includes("fast")) {
        response = "Need something quick? Try these:";
        recommendedItemIds = ["m1", "m2", "m3", "m4"];
      }
      else if (query.includes("popular") || query.includes("best")) {
        response = "Our most popular items right now:";
        recommendedItemIds = ["k1", "k4", "s1", "s4", "m2"];
      }
      else if (query.includes("budget") || query.includes("cheap")) {
        response = "Budget-friendly options:";
        recommendedItemIds = ["m1", "s2", "s3"];
      }
      else {
        response = "Here are some recommendations you might enjoy:";
        // Random selection of 3 food items for general queries
        const shuffled = [...foodItems].sort(() => 0.5 - Math.random());
        recommendedItemIds = shuffled.slice(0, 3).map(item => item.id);
      }
      
      setConversation(prev => [
        ...prev, 
        { type: "user", message: userQuery },
        { type: "ai", message: response }
      ]);
      
      setRecommendations(recommendedItemIds);
      setIsLoading(false);
      setQuery("");
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      getRecommendations(query);
    }
  };

  return (
    <Card className="ai-assistant w-full mx-auto max-w-2xl mt-8">
      <CardHeader className="bg-bennett-orange text-white flex flex-row items-center gap-2 py-3">
        <MessageCircle className="w-5 h-5" />
        <h3 className="font-medium">Food Recommendations</h3>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto mb-4">
          {conversation.map((msg, index) => (
            <div 
              key={index} 
              className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div 
                className={`px-3 py-2 rounded-lg max-w-[80%] ${
                  msg.type === "user" 
                    ? "bg-bennett-orange text-white rounded-br-none" 
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.message}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg rounded-bl-none max-w-[80%]">
                <div className="flex gap-1">
                  <span className="animate-bounce">•</span>
                  <span className="animate-bounce delay-100">•</span>
                  <span className="animate-bounce delay-200">•</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {recommendations.length > 0 && !isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            {recommendations.map(id => {
              const item = foodItems.find(item => item.id === id);
              return item && <FoodCard key={id} item={item} />;
            })}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask for recommendations..."
            disabled={isLoading}
          />
          <Button 
            type="submit"
            disabled={!query.trim() || isLoading}
            className="bg-bennett-orange hover:bg-bennett-orange/90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
