"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  Sparkles, 
  Heart, 
  Leaf, 
  Waves, 
  Sun, 
  Moon,
  Clock,
  Users,
  Star,
  Phone,
  Calendar,
  CheckCircle,
  Quote
} from "lucide-react";

export function WellnessPage() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const services = [
    {
      id: 1,
      name: "Massage Therapies",
      description: "Rejuvenate your body and mind with our expert therapeutic massage treatments",
      image: "https://images.unsplash.com/photo-1559185590-765cdc663325?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjBtYXNzYWdlJTIwdGhlcmFweSUyMHdlbGxuZXNzfGVufDF8fHx8MTc1NzQwODM2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: <Heart className="w-6 h-6" />,
      treatments: ["Swedish Massage", "Deep Tissue", "Hot Stone", "Aromatherapy"],
      duration: "60-90 minutes",
      benefits: ["Stress relief", "Muscle relaxation", "Better circulation"]
    },
    {
      id: 2,
      name: "Yoga Decks",
      description: "Find your inner balance on our scenic outdoor yoga platforms surrounded by nature",
      image: "https://images.unsplash.com/photo-1692182549439-2a78c119dc40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwZGVjayUyMG1lZGl0YXRpb24lMjBwZWFjZWZ1bHxlbnwxfHx8fDE3NTc0MzI0OTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: <Sun className="w-6 h-6" />,
      treatments: ["Sunrise Yoga", "Hatha Yoga", "Vinyasa Flow", "Restorative Yoga"],
      duration: "45-75 minutes",
      benefits: ["Flexibility", "Mental clarity", "Stress reduction"]
    },
    {
      id: 3,
      name: "Meditation Rooms",
      description: "Discover tranquility in our purpose-built meditation spaces designed for inner peace",
      image: "https://images.unsplash.com/photo-1627257365018-07f00041b023?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwcm9vbSUyMHplbiUyMHBlYWNlZnVsfGVufDF8fHx8MTc1NzQzMjQ5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: <Moon className="w-6 h-6" />,
      treatments: ["Guided Meditation", "Mindfulness", "Breathwork", "Sound Healing"],
      duration: "30-60 minutes",
      benefits: ["Mental peace", "Emotional balance", "Improved focus"]
    }
  ];

  const packages = [
    {
      id: 1,
      name: "Detox Renewal",
      description: "Complete body and mind cleansing program to refresh and revitalize your system",
      duration: "3 Days",
      price: "$599",
      image: "https://images.unsplash.com/photo-1626030871150-79ea2c2f6a37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjB3YXRlciUyMGdyZWVuZXJ5JTIwbmF0dXJlfGVufDF8fHx8MTc1NzQzMjQ5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      includes: [
        "Daily juice therapy",
        "Lymphatic drainage massage",
        "Yoga and meditation sessions",
        "Nutritionist consultation",
        "Detox body wraps"
      ],
      color: "from-green-400 to-emerald-600"
    },
    {
      id: 2,
      name: "Pure Relaxation",
      description: "Ultimate stress relief package designed to melt away tension and restore inner calm",
      duration: "2 Days",
      price: "$449",
      image: "https://images.unsplash.com/photo-1559185590-765cdc663325?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjBtYXNzYWdlJTIwdGhlcmFweSUyMHdlbGxuZXNzfGVufDF8fHx8MTc1NzQwODM2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      includes: [
        "Hot stone massage",
        "Aromatherapy facial",
        "Private meditation session",
        "Therapeutic body treatment",
        "Herbal tea ceremonies"
      ],
      color: "from-blue-400 to-cyan-600"
    },
    {
      id: 3,
      name: "Fitness Wellness",
      description: "Comprehensive health and fitness program to boost energy and build sustainable habits",
      duration: "5 Days",
      price: "$799",
      image: "https://images.unsplash.com/photo-1692182549439-2a78c119dc40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwZGVjayUyMG1lZGl0YXRpb24lMjBwZWFjZWZ1bHxlbnwxfHx8fDE3NTc0MzI0OTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      includes: [
        "Personal fitness assessment",
        "Daily yoga and pilates",
        "Customized workout plan",
        "Sports massage therapy",
        "Nutrition meal planning"
      ],
      color: "from-purple-400 to-indigo-600"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Executive",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "The detox package completely transformed how I feel. The massage therapies were incredible and the meditation sessions helped me find inner peace I hadn't felt in years."
    },
    {
      name: "Michael Rodriguez",
      role: "Entrepreneur",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "As someone dealing with chronic stress, the relaxation package was exactly what I needed. The yoga deck sessions at sunrise were absolutely magical."
    },
    {
      name: "Emily Watson",
      role: "Teacher",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "The fitness wellness program helped me establish healthy habits that I've maintained long after my stay. The personalized approach made all the difference."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-white to-mint-50 pt-16">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-r from-sage-100 to-mint-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-green-200 to-transparent rounded-full translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-200 to-transparent rounded-full -translate-x-32 translate-y-32"></div>
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
                <Sparkles className="w-12 h-12 text-green-600" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-light text-gray-800 mb-6">
              Spa & <span className="text-green-600">Wellness</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              Discover serenity and rejuvenation in our tranquil sanctuary designed to restore your body, mind, and spirit
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Services Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-light text-gray-800 mb-6">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience our carefully curated wellness treatments designed to harmonize your physical and mental well-being
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="h-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm">
                  <div className="relative overflow-hidden">
                    <ImageWithFallback
                      src={service.image}
                      alt={service.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-6 left-6">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                        {service.icon}
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-light text-gray-800 mb-4">{service.name}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2 text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>Duration</span>
                        </div>
                        <span className="text-gray-700">{service.duration}</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-800 mb-3">Treatments Available</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.treatments.map((treatment, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                            {treatment}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-800 mb-3">Benefits</h4>
                      <div className="space-y-2">
                        {service.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-300 text-white border-0">
                      Book Treatment
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Wellness Packages */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-light text-gray-800 mb-6">Wellness Packages</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive wellness experiences tailored to your specific needs and goals
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="group relative"
              >
                <Card className="h-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border-0 bg-white">
                  <div className="relative overflow-hidden h-48">
                    <ImageWithFallback
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${pkg.color} opacity-80`}></div>
                    <div className="absolute top-6 right-6">
                      <Badge className="bg-white text-gray-800 border-0">
                        {pkg.duration}
                      </Badge>
                    </div>
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-2xl font-light mb-1">{pkg.name}</h3>
                      <p className="text-3xl font-light">{pkg.price}</p>
                    </div>
                  </div>
                  <CardContent className="p-8">
                    <p className="text-gray-600 mb-6 leading-relaxed">{pkg.description}</p>
                    
                    <div className="mb-8">
                      <h4 className="text-lg font-medium text-gray-800 mb-4">Package Includes</h4>
                      <div className="space-y-3">
                        {pkg.includes.map((item, idx) => (
                          <div key={idx} className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button 
                      className={`w-full bg-gradient-to-r ${pkg.color} hover:opacity-90 transition-all duration-300 text-white border-0`}
                      onClick={() => setSelectedPackage(pkg.name)}
                    >
                      Select Package
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-light text-gray-800 mb-6">Guest Stories</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from our guests about their transformative wellness experiences
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-green-400 mb-4" />
                    <p className="text-gray-600 mb-6 leading-relaxed italic">"{testimonial.text}"</p>
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={testimonial.image} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-800">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl p-12 text-center"
        >
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="bg-white rounded-full p-4 shadow-lg">
                <Leaf className="w-12 h-12 text-green-600" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-6">
              Begin Your Wellness Journey
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Let our expert therapists guide you toward complete relaxation and rejuvenation. Book your personalized wellness experience today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-300 text-white border-0 px-8 py-6 text-lg"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Your Session
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-green-300 text-green-700 hover:bg-green-50 px-8 py-6 text-lg"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call: (555) 123-4567
              </Button>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}