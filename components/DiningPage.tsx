"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  Utensils, 
  Mountain, 
  Trees, 
  Waves, 
  Clock, 
  Users, 
  Star,
  Phone,
  Calendar,
  MapPin,
  ChefHat,
  Leaf,
  Globe,
  Heart,
  BookOpen
} from "lucide-react";

interface MenuItem {
  name: string;
  price: string;
  description: string;
}

export function DiningPage() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>("chowki-mandap");
  const [reservationData, setReservationData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    restaurant: "",
    specialRequests: ""
  });

  const restaurants = [
    {
      id: "chowki-mandap",
      name: "Chowki Mandap",
      type: "Traditional Indian",
      description: "Experience authentic Indian flavors in our traditional seating restaurant with low wooden tables and floor cushions",
      image: "https://images.unsplash.com/photo-1572517499173-4e2cb8bef19b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjByZXN0YXVyYW50JTIwZm9vZCUyMHRoYWxpfGVufDF8fHx8MTc1NzQzMjY2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: <Utensils className="w-6 h-6" />,
      specialty: "Regional Thalis",
      timing: "7:00 AM - 11:00 PM",
      rating: 4.8,
      priceRange: "₹₹",
      menu: {
        "Appetizers": [
          { name: "Samosa Chaat", price: "₹180", description: "Crispy samosas with tangy chutneys and yogurt" },
          { name: "Paneer Tikka", price: "₹280", description: "Grilled cottage cheese with aromatic spices" },
          { name: "Aloo Tikki", price: "₹160", description: "Spiced potato patties with mint chutney" }
        ],
        "Main Course": [
          { name: "Rajasthani Thali", price: "₹450", description: "Complete traditional meal with dal, sabzi, roti, and rice" },
          { name: "Butter Chicken", price: "₹380", description: "Creamy tomato-based chicken curry" },
          { name: "Palak Paneer", price: "₹320", description: "Cottage cheese in spiced spinach gravy" },
          { name: "Biryani", price: "₹420", description: "Fragrant basmati rice with spiced meat or vegetables" }
        ],
        "Desserts": [
          { name: "Gulab Jamun", price: "₹140", description: "Sweet dumplings in sugar syrup" },
          { name: "Kulfi", price: "₹120", description: "Traditional Indian ice cream" }
        ]
      }
    },
    {
      id: "hill-view",
      name: "Hill View Restaurant",
      type: "Multi-Cuisine Fine Dining",
      description: "Panoramic mountain views complement our exquisite multi-cuisine menu in this elegant dining space",
      image: "https://images.unsplash.com/photo-1643101570532-88c8ecc07c1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwcmVzdGF1cmFudCUyMGludGVyaW9yfGVufDF8fHx8MTc1NzM5Nzk3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: <Mountain className="w-6 h-6" />,
      specialty: "Continental & Asian",
      timing: "12:00 PM - 11:30 PM",
      rating: 4.9,
      priceRange: "₹₹₹",
      menu: {
        "Starters": [
          { name: "Caesar Salad", price: "₹320", description: "Fresh romaine with parmesan and croutons" },
          { name: "Bruschetta", price: "₹280", description: "Toasted bread with tomato and basil" },
          { name: "Chicken Wings", price: "₹380", description: "Spicy buffalo wings with blue cheese dip" }
        ],
        "Main Course": [
          { name: "Grilled Salmon", price: "₹680", description: "Atlantic salmon with lemon herb butter" },
          { name: "Beef Tenderloin", price: "₹850", description: "Premium cut with red wine reduction" },
          { name: "Mushroom Risotto", price: "₹520", description: "Creamy arborio rice with wild mushrooms" },
          { name: "Thai Green Curry", price: "₹450", description: "Coconut curry with vegetables or chicken" }
        ],
        "Desserts": [
          { name: "Tiramisu", price: "₹280", description: "Classic Italian coffee-flavored dessert" },
          { name: "Chocolate Lava Cake", price: "₹320", description: "Warm chocolate cake with molten center" }
        ]
      }
    },
    {
      id: "woody",
      name: "Woody Restaurant",
      type: "Rustic Forest Dining",
      description: "Dine among nature in our rustic wooden restaurant surrounded by lush forest ambiance",
      image: "https://images.unsplash.com/photo-1589536386711-5300f262657f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250aW5lbnRhbCUyMGN1aXNpbmUlMjBwYXN0YSUyMHN0ZWFrfGVufDF8fHx8MTc1NzQzMjY3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: <Trees className="w-6 h-6" />,
      specialty: "Wood-fired & Grilled",
      timing: "6:00 PM - 12:00 AM",
      rating: 4.7,
      priceRange: "₹₹",
      menu: {
        "Wood-Fired": [
          { name: "Margherita Pizza", price: "₹420", description: "Fresh mozzarella, tomato, and basil" },
          { name: "BBQ Chicken Pizza", price: "₹520", description: "Smoky BBQ chicken with caramelized onions" },
          { name: "Grilled Vegetables", price: "₹340", description: "Seasonal vegetables with herb marinade" }
        ],
        "Grilled Specialties": [
          { name: "Forest Burger", price: "₹480", description: "Juicy beef patty with forest mushrooms" },
          { name: "Grilled Chicken", price: "₹520", description: "Herb-marinated chicken with sides" },
          { name: "Fish & Chips", price: "₹580", description: "Beer-battered fish with crispy fries" },
          { name: "Vegetarian Grill", price: "₹420", description: "Mixed grilled vegetables and paneer" }
        ],
        "Desserts": [
          { name: "Campfire S'mores", price: "₹240", description: "Traditional s'mores with graham crackers" },
          { name: "Apple Pie", price: "₹280", description: "Homestyle apple pie with vanilla ice cream" }
        ]
      }
    }
  ];

  const foodCategories = [
    {
      name: "Local Cuisine",
      description: "Authentic regional flavors and traditional recipes",
      image: "https://images.unsplash.com/photo-1572517499173-4e2cb8bef19b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjByZXN0YXVyYW50JTIwZm9vZCUyMHRoYWxpfGVufDF8fHx8MTc1NzQzMjY2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: <Heart className="w-8 h-8" />,
      specialties: ["Thalis", "Curries", "Biryanis", "Street Food"]
    },
    {
      name: "Continental",
      description: "International flavors from Europe and Americas",
      image: "https://images.unsplash.com/photo-1589536386711-5300f262657f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250aW5lbnRhbCUyMGN1aXNpbmUlMjBwYXN0YSUyMHN0ZWFrfGVufDF8fHx8MTc1NzQzMjY3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: <Globe className="w-8 h-8" />,
      specialties: ["Steaks", "Pasta", "Risotto", "Seafood"]
    },
    {
      name: "Vegan Options",
      description: "Plant-based cuisine that's both healthy and delicious",
      image: "https://images.unsplash.com/photo-1633311151183-c92c4e306e5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdhbiUyMGhlYWx0aHklMjBmb29kJTIwc2FsYWR8ZW58MXx8fHwxNzU3NDMyNjc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: <Leaf className="w-8 h-8" />,
      specialties: ["Salads", "Buddha Bowls", "Plant Proteins", "Raw Foods"]
    }
  ];

  const specialFeatures = [
    {
      name: "Waterfall Cafes",
      description: "Sip your coffee to the soothing sounds of cascading water with ambient lighting creating a magical atmosphere",
      image: "https://images.unsplash.com/photo-1729656607411-127536c561f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcmZhbGwlMjBjYWZlJTIwYW1iaWVudCUyMGxpZ2h0aW5nfGVufDF8fHx8MTc1NzQzMjY4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: <Waves className="w-8 h-8" />,
      features: ["Natural waterfall backdrop", "Ambient lighting", "Premium coffee & tea", "Light snacks"]
    },
    {
      name: "Buffet Counters",
      description: "Extensive buffet spreads featuring cuisines from around the world with live cooking stations",
      image: "https://images.unsplash.com/photo-1752584157962-8821ce8b732b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWZmZXQlMjBmb29kJTIwc3ByZWFkJTIwa2l0Y2hlbnxlbnwxfHx8fDE3NTc0MzI2ODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: <Utensils className="w-8 h-8" />,
      features: ["International cuisine", "Fresh salad bar", "Dessert station", "Live cooking"]
    },
    {
      name: "Live Kitchen",
      description: "Watch our expert chefs prepare your meals in our open kitchen concept restaurants",
      image: "https://images.unsplash.com/photo-1643101570532-88c8ecc07c1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwcmVzdGF1cmFudCUyMGludGVyaW9yfGVufDF8fHx8MTc1NzM5Nzk3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: <ChefHat className="w-8 h-8" />,
      features: ["Open kitchen design", "Chef interactions", "Fresh preparations", "Cooking demonstrations"]
    }
  ];

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reservation submitted:", reservationData);
    // Handle reservation submission
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 pt-16">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-r from-orange-100 to-red-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-200 to-transparent rounded-full translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-red-200 to-transparent rounded-full -translate-x-32 translate-y-32"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-full p-4 shadow-lg">
                <Utensils className="w-12 h-12 text-orange-600" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-light text-gray-800 mb-6">
              Culinary <span className="text-orange-600">Excellence</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              Savor extraordinary flavors across our diverse dining venues, from traditional Indian cuisine to international gourmet experiences
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Food Categories */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-light text-gray-800 mb-6">Cuisine Categories</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our diverse culinary offerings crafted to satisfy every palate and preference
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {foodCategories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="h-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border-0 bg-white">
                  <div className="relative overflow-hidden h-64">
                    <ImageWithFallback
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-6 left-6">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg text-orange-600">
                        {category.icon}
                      </div>
                    </div>
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-2xl font-light mb-2">{category.name}</h3>
                    </div>
                  </div>
                  <CardContent className="p-8">
                    <p className="text-gray-600 mb-6 leading-relaxed">{category.description}</p>
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-800 mb-3">Specialties</h4>
                      <div className="flex flex-wrap gap-2">
                        {category.specialties.map((specialty, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Restaurants */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-light text-gray-800 mb-6">Our Restaurants</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Each dining venue offers a unique ambiance and carefully curated menu
            </p>
          </div>

          <Tabs value={selectedRestaurant} onValueChange={setSelectedRestaurant} className="space-y-8">
            <TabsList className="grid grid-cols-3 w-full max-w-2xl mx-auto h-auto p-1 bg-gray-100">
              {restaurants.map((restaurant) => (
                <TabsTrigger 
                  key={restaurant.id} 
                  value={restaurant.id}
                  className="flex flex-col items-center space-y-2 py-4 data-[state=active]:bg-white data-[state=active]:text-orange-600"
                >
                  {restaurant.icon}
                  <span className="text-sm font-medium">{restaurant.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {restaurants.map((restaurant) => (
              <TabsContent key={restaurant.id} value={restaurant.id} className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                      <ImageWithFallback
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-full h-96 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      <div className="absolute bottom-6 left-6 text-white">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-4 h-4 ${i < Math.floor(restaurant.rating) ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} />
                            ))}
                          </div>
                          <span className="text-sm">{restaurant.rating}</span>
                        </div>
                        <Badge className="bg-white/20 text-white border-white/30">
                          {restaurant.priceRange}
                        </Badge>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-3xl font-light text-gray-800 mb-2">{restaurant.name}</h3>
                      <Badge variant="outline" className="mb-4 text-orange-700 border-orange-200 bg-orange-50">
                        {restaurant.type}
                      </Badge>
                      <p className="text-gray-600 leading-relaxed">{restaurant.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="flex items-center space-x-3">
                        <ChefHat className="w-5 h-5 text-orange-600" />
                        <div>
                          <p className="text-sm text-gray-500">Specialty</p>
                          <p className="font-medium text-gray-800">{restaurant.specialty}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-orange-600" />
                        <div>
                          <p className="text-sm text-gray-500">Timing</p>
                          <p className="font-medium text-gray-800">{restaurant.timing}</p>
                        </div>
                      </div>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 transition-all duration-300 text-white border-0">
                          <BookOpen className="w-4 h-4 mr-2" />
                          View Full Menu
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-light">{restaurant.name} Menu</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-8">
                          {Object.entries(restaurant.menu).map(([category, items]) => (
                            <div key={category} className="space-y-4">
                              <h3 className="text-xl font-medium text-gray-800 border-b border-gray-200 pb-2">
                                {category}
                              </h3>
                              <div className="space-y-4">
                                {items.map((item: MenuItem, idx: number) => (
                                  <div key={idx} className="flex justify-between items-start">
                                    <div className="flex-1">
                                      <div className="flex items-center justify-between mb-1">
                                        <h4 className="font-medium text-gray-800">{item.name}</h4>
                                        <span className="font-medium text-orange-600">{item.price}</span>
                                      </div>
                                      <p className="text-sm text-gray-600">{item.description}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </motion.div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.section>

        {/* Special Features */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-light text-gray-800 mb-6">Special Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Unique dining experiences that set us apart from ordinary restaurants
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {specialFeatures.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border-0 bg-white">
                  <div className="relative overflow-hidden h-56">
                    <ImageWithFallback
                      src={feature.image}
                      alt={feature.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute top-6 left-6">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg text-orange-600">
                        {feature.icon}
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-8">
                    <h3 className="text-xl font-light text-gray-800 mb-4">{feature.name}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                    <div className="space-y-2">
                      {feature.features.map((item, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                          <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Reservation Form */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-3xl p-12">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="flex justify-center mb-6">
                  <div className="bg-white rounded-full p-4 shadow-lg">
                    <Calendar className="w-12 h-12 text-orange-600" />
                  </div>
                </div>
                <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-6">
                  Make a Reservation
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Reserve your table for an unforgettable dining experience
                </p>
              </div>

              <form onSubmit={handleReservationSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={reservationData.name}
                      onChange={(e) => setReservationData({...reservationData, name: e.target.value})}
                      className="bg-white border-gray-200"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={reservationData.email}
                      onChange={(e) => setReservationData({...reservationData, email: e.target.value})}
                      className="bg-white border-gray-200"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={reservationData.phone}
                      onChange={(e) => setReservationData({...reservationData, phone: e.target.value})}
                      className="bg-white border-gray-200"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="restaurant">Restaurant</Label>
                    <Select value={reservationData.restaurant} onValueChange={(value) => setReservationData({...reservationData, restaurant: value})}>
                      <SelectTrigger className="bg-white border-gray-200">
                        <SelectValue placeholder="Select restaurant" />
                      </SelectTrigger>
                      <SelectContent>
                        {restaurants.map((restaurant) => (
                          <SelectItem key={restaurant.id} value={restaurant.id}>
                            {restaurant.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={reservationData.date}
                      onChange={(e) => setReservationData({...reservationData, date: e.target.value})}
                      className="bg-white border-gray-200"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={reservationData.time}
                      onChange={(e) => setReservationData({...reservationData, time: e.target.value})}
                      className="bg-white border-gray-200"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guests">Number of Guests</Label>
                    <Select value={reservationData.guests} onValueChange={(value) => setReservationData({...reservationData, guests: value})}>
                      <SelectTrigger className="bg-white border-gray-200">
                        <SelectValue placeholder="Guests" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1,2,3,4,5,6,7,8,9,10].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requests">Special Requests</Label>
                  <Textarea
                    id="requests"
                    value={reservationData.specialRequests}
                    onChange={(e) => setReservationData({...reservationData, specialRequests: e.target.value})}
                    className="bg-white border-gray-200"
                    rows={4}
                    placeholder="Any dietary restrictions, special occasions, or specific seating preferences..."
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                  <Button 
                    type="submit"
                    size="lg" 
                    className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 transition-all duration-300 text-white border-0 px-8 py-6 text-lg"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Confirm Reservation
                  </Button>
                  <Button 
                    type="button"
                    size="lg" 
                    variant="outline" 
                    className="border-orange-300 text-orange-700 hover:bg-orange-50 px-8 py-6 text-lg"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call: (555) 123-4567
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}