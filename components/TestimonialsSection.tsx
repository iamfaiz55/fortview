"use client"
import { Card, CardContent } from "./ui/card";
import { Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "framer-motion";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "The Johnson Family",
      location: "Mumbai, India",
      image: "https://images.unsplash.com/photo-1752769041956-1af511b2a225?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGZhbWlseSUyMHZhY2F0aW9uJTIwcmVzb3J0fGVufDF8fHx8MTc1NzQzMjAxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 5,
      text: "Our kids had the time of their lives! The water zorbing was absolutely thrilling, and the staff made sure everyone felt safe while having maximum fun. We'll definitely be back!",
      highlight: "Perfect for families with kids of all ages"
    },
    {
      name: "Priya & Arjun",
      location: "Delhi, India", 
      image: "https://images.unsplash.com/photo-1722557636655-31247545d315?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBzbWlsaW5nJTIwdmFjYXRpb258ZW58MXx8fHwxNzU3NDMyMDE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 5,
      text: "Amazing honeymoon destination! The zipline adventure was exhilarating and the romantic dining by the waterfall created memories we'll treasure forever. Exceptional service throughout.",
      highlight: "Romantic & adventurous - perfect combination"
    },
    {
      name: "The Sharma Group",
      location: "Bangalore, India",
      image: "https://images.unsplash.com/photo-1752769041956-1af511b2a225?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGZhbWlseSUyMHZhY2F0aW9uJTIwcmVzb3J0fGVufDF8fHx8MTc1NzQzMjAxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 5,
      text: "Excellent corporate retreat venue! The team building activities were innovative and engaging. Our group bonded like never before. The banquet facilities exceeded our expectations.",
      highlight: "Outstanding for corporate events & team building"
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }} className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Stories from Our Happy Guests
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Discover why thousands of families and couples choose WildVenture Resort for their most memorable adventures
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.08 }}>
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
                <CardContent className="p-5 sm:p-6">
                  {/* Stars */}
                  <div className="flex space-x-1 mb-3 sm:mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-gray-700 mb-5 sm:mb-6 leading-relaxed text-sm sm:text-base">
                    "{testimonial.text}"
                  </blockquote>

                  {/* Highlight Badge */}
                  <div className="mb-6">
                    <span className="inline-block bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-2.5 py-1 rounded-full text-xs sm:text-sm">
                      {testimonial.highlight}
                    </span>
                  </div>

                  {/* Author */}
                  <div className="flex items-center space-x-4">
                    <ImageWithFallback
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-gray-900 text-sm sm:text-base">{testimonial.name}</div>
                      <div className="text-xs sm:text-sm text-gray-500">{testimonial.location}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.5 }} className="text-center mt-10 sm:mt-12">
          <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">Ready to create your own adventure story?</p>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-6 py-2.5 sm:px-8 sm:py-3 rounded-lg font-semibold transition-all duration-200 text-sm sm:text-base">
            Book Your Experience Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}