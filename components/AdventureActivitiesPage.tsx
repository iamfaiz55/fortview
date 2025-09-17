"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ImageWithFallback } from "./figma/ImageWithFallback";
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
  Filter
} from "lucide-react";

export function AdventureActivitiesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [ageFilter, setAgeFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [timingFilter, setTimingFilter] = useState("all");

  const activities = [
    // Indoor Games
    {
      id: 1,
      name: "Pool/Billiards",
      category: "indoor",
      description: "Classic 8-ball and 9-ball pool games in our professionally maintained billiards room",
      image: "https://images.unsplash.com/photo-1694887916265-067cc5eb0a6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaWxsaWFyZHMlMjBwb29sJTIwdGFibGUlMjBpbmRvb3J8ZW58MXx8fHwxNzU3NDMyMjcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: <Gamepad2 className="w-6 h-6" />,
      ageGroup: "teens-adults",
      difficulty: "easy",
      timing: "all-day",
      duration: "30-60 mins",
      capacity: "2-4 players",
      highlights: ["Professional tables", "All equipment included", "Tournament style"]
    },
    {
      id: 2,
      name: "Table Tennis",
      category: "indoor",
      description: "Fast-paced ping pong matches with high-quality tables and professional equipment",
      image: "https://images.unsplash.com/photo-1705087917495-8530cbaa858e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWJsZSUyMHRlbm5pcyUyMHBpbmclMjBwb25nJTIwaW5kb29yfGVufDF8fHx8MTc1NzQzMjI3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: <Circle className="w-6 h-6" />,
      ageGroup: "all-ages",
      difficulty: "easy",
      timing: "all-day",
      duration: "20-45 mins",
      capacity: "2-4 players",
      highlights: ["Olympic standard tables", "Coaching available", "Family friendly"]
    },

    // Outdoor Games
    {
      id: 3,
      name: "Mountain Trekking",
      category: "outdoor",
      description: "Guided nature treks through scenic mountain trails with breathtaking valley views",
      image: "https://images.unsplash.com/photo-1615472767332-e5615c7e617a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHRyZWtraW5nJTIwaGlraW5nJTIwYWR2ZW50dXJlfGVufDF8fHx8MTc1NzQzMjI3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: <Mountain className="w-6 h-6" />,
      ageGroup: "teens-adults",
      difficulty: "moderate",
      timing: "morning-evening",
      duration: "2-4 hours",
      capacity: "6-15 people",
      highlights: ["Expert guides", "Safety equipment", "Stunning views"]
    },
    {
      id: 4,
      name: "Zipline Adventure",
      category: "outdoor",
      description: "Soar through the canopy on our thrilling zipline course with multiple platforms",
      image: "https://images.unsplash.com/photo-1550310349-1ddd397b3ff1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6aXBsaW5lJTIwYWR2ZW50dXJlJTIwZm9yZXN0fGVufDF8fHx8MTc1NzM2NTE1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: <Zap className="w-6 h-6" />,
      ageGroup: "teens-adults",
      difficulty: "moderate",
      timing: "morning-evening",
      duration: "45-90 mins",
      capacity: "1-8 people",
      highlights: ["500m course", "Safety certified", "Photo service"]
    },
    {
      id: 5,
      name: "Obstacle Course",
      category: "outdoor",
      description: "Challenge yourself on our multi-level obstacle course with rope climbs and balance beams",
      image: "https://images.unsplash.com/photo-1734445559604-ae06dec16520?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvYnN0YWNsZSUyMGNvdXJzZSUyMG91dGRvb3IlMjBhZHZlbnR1cmV8ZW58MXx8fHwxNzU3NDMyMjczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: <Target className="w-6 h-6" />,
      ageGroup: "kids-adults",
      difficulty: "moderate",
      timing: "morning-evening",
      duration: "30-60 mins",
      capacity: "4-12 people",
      highlights: ["Team building", "Different difficulty levels", "Timing challenges"]
    },

    // Water Activities
    {
      id: 6,
      name: "Swimming Pool",
      category: "water",
      description: "Olympic-sized swimming pool with separate kids area, perfect for relaxation and fitness",
      image: "https://images.unsplash.com/photo-1560850006-5837212e620b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2ltbWluZyUyMHBvb2wlMjByZXNvcnR8ZW58MXx8fHwxNzU3NDMyMjc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: <Waves className="w-6 h-6" />,
      ageGroup: "all-ages",
      difficulty: "easy",
      timing: "all-day",
      duration: "Unlimited",
      capacity: "50+ people",
      highlights: ["Heated pool", "Lifeguard on duty", "Pool bar"]
    },
    {
      id: 7,
      name: "Water Zorbing",
      category: "water",
      description: "Roll and bounce inside giant transparent water balls for an unforgettable experience",
      image: "https://images.unsplash.com/photo-1681161497001-e7fa23711e49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZHZlbnR1cmUlMjByZXNvcnQlMjB3YXRlciUyMGFjdGl2aXRpZXMlMjB6aXBsaW5lfGVufDF8fHx8MTc1NzQzMjAxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: <Droplets className="w-6 h-6" />,
      ageGroup: "kids-adults",
      difficulty: "easy",
      timing: "morning-evening",
      duration: "15-30 mins",
      capacity: "1-2 people",
      highlights: ["Unique experience", "Safe water landing", "Photo opportunities"]
    },
    {
      id: 8,
      name: "Rain Dance",
      category: "water",
      description: "Dance under artificial rain with music and lights for a refreshing party experience",
      image: "https://images.unsplash.com/photo-1560850006-5837212e620b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2ltbWluZyUyMHBvb2wlMjByZXNvcnR8ZW58MXx8fHwxNzU3NDMyMjc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: <CloudRain className="w-6 h-6" />,
      ageGroup: "all-ages",
      difficulty: "easy",
      timing: "evening",
      duration: "45-90 mins",
      capacity: "20-50 people",
      highlights: ["Live DJ", "Light effects", "Group activity"]
    },

    // Kids Zones
    {
      id: 9,
      name: "Soft Play Area",
      category: "kids",
      description: "Safe indoor play area with soft foam structures, perfect for toddlers and young children",
      image: "https://images.unsplash.com/photo-1716558833641-0a2ac4bc6849?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwcGxheWdyb3VuZCUyMHNvZnQlMjBwbGF5fGVufDF8fHx8MTc1NzQzMjI3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: <Baby className="w-6 h-6" />,
      ageGroup: "kids",
      difficulty: "easy",
      timing: "all-day",
      duration: "Unlimited",
      capacity: "15-20 kids",
      highlights: ["Age-appropriate", "Parent supervision area", "Safety certified"]
    },
    {
      id: 10,
      name: "Swing & Slides",
      category: "kids",
      description: "Colorful outdoor playground with swings, slides, and climbing frames for active play",
      image: "https://images.unsplash.com/photo-1746010531584-b3a67fc697c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHN3aW5nJTIwc2xpZGUlMjBwbGF5Z3JvdW5kfGVufDF8fHx8MTc1NzQzMjI3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: <PlayCircle className="w-6 h-6" />,
      ageGroup: "kids",
      difficulty: "easy",
      timing: "all-day",
      duration: "Unlimited",
      capacity: "20-30 kids",
      highlights: ["Multiple age groups", "Shaded areas", "Safety surfacing"]
    }
  ];

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

        {/* Activities Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {filteredActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.01 }}
              className="group"
            >
              <Card className="h-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border-0 bg-white">
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={activity.image}
                    alt={activity.name}
                    width={400}
                    height={192}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    quality={80}
                  />
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                      {activity.icon}
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