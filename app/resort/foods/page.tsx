"use client";

import { useGetFoodsQuery } from "@/redux/apis/foodApi";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { Utensils, Tag, Search, X, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";

const categoryOptions = [
  "All Categories",
  "Main Course",
  "Appetizers", 
  "Desserts",
  "Beverages",
  "Snacks",
  "Salads",
  "Soups",
  "Rice & Dal",
  "Bread",
  "Vegetarian",
  "Non-Vegetarian",
  "Vegan",
];

export default function FoodsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedFood, setSelectedFood] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const { data: foodsResponse, isLoading, error } = useGetFoodsQuery({ active: true });
  const foods = foodsResponse?.data || [];

  // Filter foods based on search term and category
  const filteredFoods = useMemo(() => {
    return foods.filter(food => {
      const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (food.description && food.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === "All Categories" || food.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [foods, searchTerm, selectedCategory]);

  const handleFoodClick = (food: any) => {
    setSelectedFood(food);
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Food Menu</h1>
          <p className="text-gray-600">Unable to load food menu at this time. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white py-20 sm:py-24 overflow-hidden">
  {/* Background decorative elements */}
  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20"></div>
  <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-emerald-300/10 blur-3xl"></div>
  <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-teal-300/10 blur-3xl"></div>
  
  <div className="container mx-auto px-4 text-center relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-6"
    >
      <Utensils className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 text-yellow-300 drop-shadow-lg" />
    </motion.div>
    <motion.h1 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tagesschrift-regular"
    >
      Food Menu
    </motion.h1>
    <motion.p 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="text-lg sm:text-xl md:text-2xl text-emerald-100 max-w-4xl mx-auto leading-relaxed"
    >
      Discover our delicious culinary offerings crafted with fresh ingredients and authentic flavors
    </motion.p>

    {/* Satvik meal note */}
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mt-6 text-base sm:text-lg md:text-xl text-yellow-200 font-medium italic"
    >
      Satvik meal Can Be Arranged With Prior Notice
    </motion.p>
  </div>
</div>


      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search food items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="sm:w-64">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Food Items Grid */}
        {filteredFoods.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {filteredFoods.map((food) => (
              <Card 
                key={food._id} 
                className="group hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
                onClick={() => handleFoodClick(food)}
              >
                <div className="relative">
                  <ImageWithFallback
                    src={food.image?.url || "/placeholder-food.jpg"}
                    alt={food.name}
                    width={400}
                    height={300}
                    className="w-full h-32 sm:h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-emerald-500 text-white text-xs">
                      <Tag className="w-3 h-3 mr-1" />
                      {food.category}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-2 px-3 pt-3">
                  <CardTitle className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
                    {food.name}
                  </CardTitle>
                  {food.description && (
                    <p className="text-gray-600 text-xs line-clamp-2">{food.description}</p>
                  )}
                </CardHeader>
              </Card>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <Utensils className="w-16 h-16 mx-auto mb-6 text-gray-300" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No Food Items Found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              {searchTerm || selectedCategory !== "All Categories" 
                ? "Try adjusting your search or filter criteria."
                : "Our food menu is being updated. Please check back soon!"
              }
            </p>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-emerald-700 text-white py-16 sm:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 tagesschrift-regular">Experience Our Cuisine</h2>
          <p className="text-lg sm:text-xl text-emerald-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            From traditional favorites to modern culinary creations, our kitchen offers something for every palate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/resort/food-stalls"
              className="bg-white text-emerald-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              View Food Stalls
            </a>
            <a
              href="/resort/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-emerald-700 transition-colors shadow-lg"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>

      {/* Food Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-[min(95vw,48rem)] max-h-[90vh] overflow-y-auto p-0 z-[9999]">
          <div className="relative">
            {/* Close button */}
            <button
              onClick={() => setIsDialogOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white transition-colors shadow-lg"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {selectedFood && (
              <div className="space-y-0">
                {/* Food Image */}
                <div className="relative h-64 sm:h-80">
                  <ImageWithFallback
                    src={selectedFood.image?.url || "/placeholder-food.jpg"}
                    alt={selectedFood.name}
                    width={800}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-emerald-500 text-white text-sm px-3 py-1">
                      <Tag className="w-4 h-4 mr-2" />
                      {selectedFood.category}
                    </Badge>
                  </div>
                </div>

                {/* Food Details */}
                <div className="p-6">
                  <DialogHeader>
                    <DialogTitle className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                      {selectedFood.name}
                    </DialogTitle>
                  </DialogHeader>

                  <div className="space-y-4">
                    {/* Description */}
                    {selectedFood.description && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                        <p className="text-gray-600 leading-relaxed">{selectedFood.description}</p>
                      </div>
                    )}

                    {/* Food Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-100 rounded-lg">
                          <Utensils className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Category</p>
                          <p className="font-semibold text-gray-900">{selectedFood.category}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Calendar className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Added</p>
                          <p className="font-semibold text-gray-900">
                            {new Date(selectedFood.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-6">
                      <button
                        onClick={() => setIsDialogOpen(false)}
                        className="flex-1 bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                      >
                        Close
                      </button>
                      <button
                        onClick={() => {
                          // Add to cart or order functionality
                          console.log('Add to order:', selectedFood.name);
                        }}
                        className="flex-1 border-2 border-emerald-600 text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-600 hover:text-white transition-colors"
                      >
                        Add to Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
