"use client"
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useGetAdventureActivitiesQuery } from "@/redux/apis/adventureActivityApi";
import { AdventureActivity } from "@/redux/apis/adventureActivityApi";
import { 
  Gamepad2, 
  Circle, 
  Mountain, 
  Zap, 
  Target, 
  Waves, 
  Droplets, 
  CloudRain,
  Baby,
  PlayCircle,
  Clock,
  Users,
  Star,
  CalendarDays,
  Filter,
  Activity,
  Loader2
} from "lucide-react";

// Helper function to get icon component
const getIconComponent = (iconName: string) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    Gamepad2: <Gamepad2 className="w-6 h-6" />,
    Circle: <Circle className="w-6 h-6" />,
    Mountain: <Mountain className="w-6 h-6" />,
    Zap: <Zap className="w-6 h-6" />,
    Target: <Target className="w-6 h-6" />,
    Waves: <Waves className="w-6 h-6" />,
    Droplets: <Droplets className="w-6 h-6" />,
    CloudRain: <CloudRain className="w-6 h-6" />,
    Baby: <Baby className="w-6 h-6" />,
    PlayCircle: <PlayCircle className="w-6 h-6" />,
    Activity: <Activity className="w-6 h-6" />,
  };
  return iconMap[iconName] || <Activity className="w-6 h-6" />;
};

export function AdventureActivitiesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [ageFilter, setAgeFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [timingFilter, setTimingFilter] = useState("all");

  // Fetch adventure activities from API
  const { data: activitiesResponse, isLoading, error } = useGetAdventureActivitiesQuery({ 
    active: true,
    category: selectedCategory !== "all" ? selectedCategory : undefined,
    ageGroup: ageFilter !== "all" ? ageFilter : undefined,
    difficulty: difficultyFilter !== "all" ? difficultyFilter : undefined,
    timing: timingFilter !== "all" ? timingFilter : undefined,
  });

  // Use API data if available, otherwise fallback
  const activities = activitiesResponse?.data || [];

  const categories = [
    { id: "all", name: "All Activities", icon: <Star className="w-4 h-4" /> },
    { id: "indoor", name: "Indoor Games", icon: <Gamepad2 className="w-4 h-4" /> },
    { id: "outdoor", name: "Outdoor Adventures", icon: <Mountain className="w-4 h-4" /> },
    { id: "water", name: "Water Activities", icon: <Waves className="w-4 h-4" /> },
    { id: "kids", name: "Kids Zone", icon: <Baby className="w-4 h-4" /> }
  ];

  const filteredActivities = activities.filter(activity => {
    if (selectedCategory !== "all" && activity.category !== selectedCategory) return false;
    if (ageFilter !== "all" && activity.ageGroup !== ageFilter) return false;
    if (difficultyFilter !== "all" && activity.difficulty !== difficultyFilter) return false;
    if (timingFilter !== "all" && activity.timing !== timingFilter) return false;
    return true;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-100 text-green-700 border-green-200";
      case "moderate": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "hard": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-32 translate-y-32"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">Adventure Activities</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Discover endless fun with our wide range of activities designed for every age group and adventure level
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Category Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 shadow-md hover:shadow-lg"
              }`}
            >
              {category.icon}
              <span>{category.name}</span>
            </button>
          ))}
        </motion.div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-12"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Filter Activities</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age Group</label>
              <Select value={ageFilter} onValueChange={setAgeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select age group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ages</SelectItem>
                  <SelectItem value="kids">Kids (3-12)</SelectItem>
                  <SelectItem value="teens-adults">Teens & Adults (13+)</SelectItem>
                  <SelectItem value="kids-adults">Kids & Adults (5+)</SelectItem>
                  <SelectItem value="all-ages">Family Friendly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Level</label>
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="hard">Challenging</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Available Timing</label>
              <Select value={timingFilter} onValueChange={setTimingFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timing" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Time</SelectItem>
                  <SelectItem value="all-day">All Day</SelectItem>
                  <SelectItem value="morning-evening">Morning & Evening</SelectItem>
                  <SelectItem value="evening">Evening Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                <div className="w-full h-48 bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">Failed to load activities</p>
            <p className="text-gray-600">Please try again later</p>
          </div>
        )}

        {/* Activities Grid */}
        {!isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            {filteredActivities.map((activity, index) => (
            <motion.div
              key={activity._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.01 }}
              className="group"
            >
              <Card className="h-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border-0 bg-white">
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={activity.image?.url || "/placeholder-activity.jpg"}
                    alt={activity.name}
                    width={400}
                    height={192}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    quality={80}
                  />
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                      {getIconComponent(activity.icon)}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className={getDifficultyColor(activity.difficulty)}>
                      {activity.difficulty}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{activity.name}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{activity.description}</p>
                  
                  {/* Activity Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>Duration</span>
                      </div>
                      <span className="font-medium">{activity.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>Capacity</span>
                      </div>
                      <span className="font-medium">{activity.capacity}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <CalendarDays className="w-4 h-4" />
                        <span>Available</span>
                      </div>
                      <span className="font-medium">{activity.timing.replace('-', ' & ')}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Highlights</h4>
                    <div className="flex flex-wrap gap-2">
                      {activity.highlights.map((highlight, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 transition-all duration-300">
                    Book This Activity
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          </motion.div>
        )}

        {/* No Results */}
        {filteredActivities.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No activities found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters to see more activities</p>
            <Button onClick={() => {
              setSelectedCategory("all");
              setAgeFilter("all");
              setDifficultyFilter("all");
              setTimingFilter("all");
            }}>
              Clear All Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}