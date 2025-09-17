"use client"
import { Button } from "./ui/button";
import { Calendar, Phone, MapPin, Clock, Users, Star, Sparkles, Zap, Crown, Gift, Shield } from "lucide-react";
import { motion } from "framer-motion";

export function CTASection() {
  return (
    <section className="py-24 sm:py-32 bg-gradient-to-br from-slate-900 via-emerald-900 to-blue-900 relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-transparent rounded-full -translate-x-40 -translate-y-40 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-400/20 to-transparent rounded-full translate-x-48 translate-y-48 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-teal-400/15 to-transparent rounded-full -translate-x-32 -translate-y-32"></div>
        {/* Floating particles */}
        <div className="absolute top-20 right-20 w-2 h-2 bg-white/60 rounded-full animate-ping"></div>
        <div className="absolute top-40 left-32 w-1 h-1 bg-emerald-300 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 right-40 w-1.5 h-1.5 bg-blue-300 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-20 w-1 h-1 bg-teal-300 rounded-full animate-ping" style={{animationDelay: '3s'}}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, amount: 0.3 }} 
          transition={{ duration: 0.8 }} 
          className="text-center text-white mb-16 sm:mb-20"
        >
          {/* Premium badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 mb-8"
          >
            <Crown className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium">Premium Resort Experience</span>
          </motion.div>

          <div className="flex items-center justify-center gap-2 mb-6">
            <Star className="w-8 h-8 text-yellow-400 fill-current" />
            <Star className="w-8 h-8 text-yellow-400 fill-current" />
            <Star className="w-8 h-8 text-yellow-400 fill-current" />
            <Star className="w-8 h-8 text-yellow-400 fill-current" />
            <Star className="w-8 h-8 text-yellow-400 fill-current" />
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 sm:mb-8 leading-tight">
            Ready for Your Next 
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent"> Adventure?</span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl opacity-90 max-w-4xl mx-auto leading-relaxed">
            Join thousands of happy families who have made unforgettable memories at WildVenture Resort. 
            <span className="text-yellow-300 font-semibold"> Book now and save up to 25%</span> on your stay!
          </p>
        </motion.div>

        {/* Enhanced Main CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, amount: 0.25 }} 
          transition={{ duration: 0.6 }} 
          className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center mb-16 sm:mb-20"
        >
          <motion.div 
            whileHover={{ scale: 1.05, y: -2 }} 
            whileTap={{ scale: 0.98 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl blur-lg opacity-75"></div>
            <Button 
              size="lg" 
              className="relative bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white text-lg sm:text-xl px-8 py-6 sm:px-12 sm:py-8 h-auto shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 rounded-2xl font-semibold"
            >
              <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 mr-3" />
              Book Your Stay Now
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Calendar className="w-6 h-6 sm:w-7 sm:h-7 ml-3" />
              </motion.div>
            </Button>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05, y: -2 }} 
            whileTap={{ scale: 0.98 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl blur-lg opacity-50"></div>
            <Button 
              size="lg" 
              variant="outline" 
              className="relative border-2 border-white/80 text-white hover:bg-white hover:text-emerald-600 text-lg sm:text-xl px-8 py-6 sm:px-12 sm:py-8 h-auto shadow-2xl hover:shadow-white/25 transition-all duration-300 rounded-2xl font-semibold backdrop-blur-sm"
            >
              <Phone className="w-6 h-6 sm:w-7 sm:h-7 mr-3" />
              Call for Best Rates
            </Button>
          </motion.div>
        </motion.div>

        {/* Enhanced Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-16 sm:mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, amount: 0.2 }} 
            transition={{ duration: 0.6, delay: 0.1 }} 
            whileHover={{ y: -5 }}
            className="text-center text-white group"
          >
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm border border-white/20">
              <Clock className="w-8 h-8 sm:w-10 sm:h-10" />
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <h3 className="font-bold mb-3 text-lg">24/7 Support</h3>
            <p className="opacity-90 text-sm sm:text-base leading-relaxed">Round-the-clock assistance for all your needs</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, amount: 0.2 }} 
            transition={{ duration: 0.6, delay: 0.2 }} 
            whileHover={{ y: -5 }}
            className="text-center text-white group"
          >
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm border border-white/20">
              <Users className="w-8 h-8 sm:w-10 sm:h-10" />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <h3 className="font-bold mb-3 text-lg">Group Discounts</h3>
            <p className="opacity-90 text-sm sm:text-base leading-relaxed">Special rates for families and corporate groups</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, amount: 0.2 }} 
            transition={{ duration: 0.6, delay: 0.3 }} 
            whileHover={{ y: -5 }}
            className="text-center text-white group"
          >
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm border border-white/20">
              <Crown className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-400" />
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <h3 className="font-bold mb-3 text-lg">5-Star Experience</h3>
            <p className="opacity-90 text-sm sm:text-base leading-relaxed">Rated #1 adventure resort in the region</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, amount: 0.2 }} 
            transition={{ duration: 0.6, delay: 0.4 }} 
            whileHover={{ y: -5 }}
            className="text-center text-white group"
          >
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm border border-white/20">
              <MapPin className="w-8 h-8 sm:w-10 sm:h-10" />
              <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <h3 className="font-bold mb-3 text-lg">Prime Location</h3>
            <p className="opacity-90 text-sm sm:text-base leading-relaxed">Easy access with stunning natural surroundings</p>
          </motion.div>
        </div>

        {/* Enhanced Contact Info */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, amount: 0.3 }} 
          transition={{ duration: 0.8 }}
          className="relative bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-8 sm:p-12 text-white text-center border border-white/20 overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/20 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center gap-2 mb-6"
            >
              <Gift className="w-6 h-6 text-yellow-400" />
              <span className="text-lg font-medium">Special Offer</span>
              <Gift className="w-6 h-6 text-yellow-400" />
            </motion.div>
            
            <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Get in Touch Today</h3>
            
            <div className="grid md:grid-cols-3 gap-8 sm:gap-10 text-center">
              <motion.div 
                whileHover={{ y: -3 }}
                className="group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-8 h-8 text-emerald-300" />
                </div>
                <div className="font-semibold text-lg mb-2">Call Us</div>
                <div className="opacity-90 text-lg">+91 9545 301 888</div>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -3 }}
                className="group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-8 h-8 text-blue-300" />
                </div>
                <div className="font-semibold text-lg mb-2">Visit Us</div>
                <div className="opacity-90 text-lg">Mountain View Resort Complex</div>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -3 }}
                className="group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400/20 to-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-8 h-8 text-purple-300" />
                </div>
                <div className="font-semibold text-lg mb-2">Open Daily</div>
                <div className="opacity-90 text-lg">6:00 AM - 10:00 PM</div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}