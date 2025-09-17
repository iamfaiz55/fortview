"use client"
import { motion } from "framer-motion";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// Import a comprehensive set of static images from the gallery folder
// These are bundled statically for optimal performance
import img1 from "@/gallery/1.jpg";
import img2 from "@/gallery/2.jpg";
import img3 from "@/gallery/3.jpg";
import img4 from "@/gallery/4.jpg";
import img5 from "@/gallery/5.jpg";
import img6 from "@/gallery/6.jpg";
import img7 from "@/gallery/7.jpg";
import img8 from "@/gallery/8.jpg";
import img9 from "@/gallery/9.jpg";
import img10 from "@/gallery/10.jpg";
import img12 from "@/gallery/12.jpg";
import img13 from "@/gallery/13.jpg";
import img14 from "@/gallery/14.jpg";
import img16 from "@/gallery/16.jpg";
import img17 from "@/gallery/17.jpg";
import img18 from "@/gallery/18.jpg";
import img19 from "@/gallery/19.jpg";
import img20 from "@/gallery/20.jpg";
import img21 from "@/gallery/21.jpg";
import img22 from "@/gallery/22.jpg";
import img24 from "@/gallery/24.jpg";
import img26 from "@/gallery/26.jpg";
import img27 from "@/gallery/27.jpg";
import adventure1 from "@/gallery/adventure-1.jpg";
import adventure2 from "@/gallery/adventure-2.jpg";
import adventure4 from "@/gallery/adventure-4.jpg";
import adventure3 from "@/gallery/adnventure-3.jpg";
import antakshiri from "@/gallery/antakshiri.jpg";
import birdZone from "@/gallery/burd-zone.jpg";
import dayWedding from "@/gallery/day-wedding-setup.jpg";
import diamond2 from "@/gallery/diamond-2.jpg";
import diamondWedding from "@/gallery/diamond-hall-wedding.jpg";
import diamondHall from "@/gallery/diamond-hall.jpg";
import foodStall from "@/gallery/food-stall.jpg";
import gateSchoolTrip from "@/gallery/gate-school-trip.jpg";
import hoordaParty from "@/gallery/hoorda-party.jpg";
import nightWedding from "@/gallery/night-wedding.jpg";
import nightWedding2 from "@/gallery/night-wedding-2.jpg";
import outdoorGame1 from "@/gallery/outdoor-game-1.jpg";
import room1 from "@/gallery/room-1.jpg";
import room2 from "@/gallery/room-2.jpg";
import room3 from "@/gallery/room-3.jpg";
import silverLawns from "@/gallery/silver-lawns.jpg";
import softPlay1 from "@/gallery/soft-play-1.jpg";
import turf from "@/gallery/turf.jpg";
import turf2 from "@/gallery/turf-2.jpg";
import woodyRestaurant1 from "@/gallery/woody-restaurant-1.jpg";
import woodyRestaurant2 from "@/gallery/woody-restaurant-2.jpg";
import woodyRestaurantTop from "@/gallery/woody-restaurant-top.jpg";
import wa1 from "@/gallery/WhatsApp Image 2025-09-07 at 15.56.28_a6877abd.jpg";
import wa2 from "@/gallery/WhatsApp Image 2025-09-07 at 15.56.58_1505ba6f.jpg";
import wa3 from "@/gallery/WhatsApp Image 2025-09-07 at 16.00.39_21bbd45f.jpg";
import wa4 from "@/gallery/WhatsApp Image 2025-09-07 at 16.00.43_ae26772f.jpg";
import wa5 from "@/gallery/WhatsApp Image 2025-09-07 at 16.02.49_576b6e16.jpg";
import wa6 from "@/gallery/WhatsApp Image 2025-09-07 at 16.04.21_b95f783a.jpg";
import wa7 from "@/gallery/WhatsApp Image 2025-09-07 at 16.05.36_7a51ad4a.jpg";
import wa8 from "@/gallery/WhatsApp Image 2025-09-07 at 16.05.41_98b10e96.jpg";
import wa9 from "@/gallery/WhatsApp Image 2025-09-07 at 16.07.45_58002af7.jpg";
import wa10 from "@/gallery/WhatsApp Image 2025-09-07 at 16.08.11_28b810c2.jpg";
import wa11 from "@/gallery/WhatsApp Image 2025-09-07 at 16.08.33_a63075bc.jpg";
import wa12 from "@/gallery/WhatsApp Image 2025-09-07 at 16.08.34_88008330.jpg";
import wa13 from "@/gallery/WhatsApp Image 2025-09-07 at 16.08.39_0bc894ad.jpg";
import wa14 from "@/gallery/WhatsApp Image 2025-09-07 at 16.08.54_1841dee3.jpg";
import wa15 from "@/gallery/WhatsApp Image 2025-09-07 at 16.09.17_0fd17a8b.jpg";
import wa16 from "@/gallery/WhatsApp Image 2025-09-07 at 16.10.14_f5371d8f.jpg";
import wa17 from "@/gallery/WhatsApp Image 2025-09-07 at 16.10.19_27ced467.jpg";
import wa18 from "@/gallery/WhatsApp Image 2025-09-07 at 16.10.22_3239c0db.jpg";
import wa19 from "@/gallery/WhatsApp Image 2025-09-07 at 16.10.26_5b5a26d6.jpg";
import wa20 from "@/gallery/WhatsApp Image 2025-09-07 at 16.10.29_04815701.jpg";
import wa21 from "@/gallery/WhatsApp Image 2025-09-07 at 16.10.35_7fd5a8bb.jpg";
import wa22 from "@/gallery/WhatsApp Image 2025-09-07 at 16.11.05_e02e6776.jpg";
import wa23 from "@/gallery/WhatsApp Image 2025-09-07 at 16.11.09_ae72f97f.jpg";
import wa24 from "@/gallery/WhatsApp Image 2025-09-07 at 16.11.16_a0f3758e.jpg";
import wa25 from "@/gallery/WhatsApp Image 2025-09-07 at 16.11.19_6e524013.jpg";
import wa26 from "@/gallery/WhatsApp Image 2025-09-07 at 16.11.44_0b58a171.jpg";
import wa27 from "@/gallery/WhatsApp Image 2025-09-07 at 16.12.44_7889464d.jpg";
import wa28 from "@/gallery/WhatsApp Image 2025-09-07 at 16.13.26_e703f0a6.jpg";
import wa29 from "@/gallery/WhatsApp Image 2025-09-07 at 16.13.29_ec83dca7.jpg";
import wa30 from "@/gallery/WhatsApp Image 2025-09-07 at 16.13.38_c3126178.jpg";
import wa31 from "@/gallery/WhatsApp Image 2025-09-07 at 16.13.40_721786be.jpg";
import wa32 from "@/gallery/WhatsApp Image 2025-09-07 at 16.13.43_7b778048.jpg";
import wa33 from "@/gallery/WhatsApp Image 2025-09-07 at 16.14.05_fbe0d6ee.jpg";
import wa34 from "@/gallery/WhatsApp Image 2025-09-07 at 16.14.19_21f4a0a8.jpg";
import wa35 from "@/gallery/WhatsApp Image 2025-09-07 at 16.14.24_4982c8a5.jpg";
import wa36 from "@/gallery/WhatsApp Image 2025-09-07 at 16.14.41_d59b7bcb.jpg";
import wa37 from "@/gallery/WhatsApp Image 2025-09-07 at 16.14.49_aa503693.jpg";
import wa38 from "@/gallery/WhatsApp Image 2025-09-07 at 16.14.54_e9b59ec3.jpg";
import wa39 from "@/gallery/WhatsApp Image 2025-09-07 at 16.15.03_0e2fcab7.jpg";
import wa40 from "@/gallery/WhatsApp Image 2025-09-07 at 16.15.04_7a87e7a8.jpg";
import wa41 from "@/gallery/WhatsApp Image 2025-09-07 at 18.05.39_dd44ed18.jpg";

const allImages = [
  adventure1, adventure2, adventure3, adventure4,
  turf, turf2,
  outdoorGame1,
  softPlay1,
  silverLawns,
  room1, room2, room3,
  woodyRestaurantTop, woodyRestaurant1, woodyRestaurant2,
  gateSchoolTrip,
  diamondHall, diamondWedding, diamond2,
  dayWedding,
  nightWedding, nightWedding2,
  hoordaParty,
  foodStall,
  birdZone,
  antakshiri,
  img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img12, img13, img14, img16, img17, img18, img19, img20, img21, img22, img24, img26, img27,
  wa1, wa2, wa3, wa4, wa5, wa6, wa7, wa8, wa9, wa10, wa11, wa12, wa13, wa14, wa15, wa16, wa17, wa18, wa19, wa20, wa21, wa22, wa23, wa24, wa25, wa26, wa27, wa28, wa29, wa30, wa31, wa32, wa33, wa34, wa35, wa36, wa37, wa38, wa39, wa40, wa41,
];

export function GalleryPage() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35 } }
  };

  // Organize images by category
  const imageCategories = {
    "Adventure & Activities": [adventure1, adventure2, adventure3, adventure4, outdoorGame1],
    "Resort Grounds": [turf, turf2, silverLawns],
    "Accommodations": [room1, room2, room3],
    "Dining": [woodyRestaurantTop, woodyRestaurant1, woodyRestaurant2, foodStall],
    "Events & Celebrations": [gateSchoolTrip, diamondHall, diamondWedding, diamond2, dayWedding, nightWedding, nightWedding2, hoordaParty, antakshiri],
    "Family & Kids": [softPlay1, birdZone],
    "General Resort Views": [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img12, img13, img14, img16, img17, img18, img19, img20, img21, img22, img24, img26, img27],
    "Recent Photos": [wa1, wa2, wa3, wa4, wa5, wa6, wa7, wa8, wa9, wa10, wa11, wa12, wa13, wa14, wa15, wa16, wa17, wa18, wa19, wa20, wa21, wa22, wa23, wa24, wa25, wa26, wa27, wa28, wa29, wa30, wa31, wa32, wa33, wa34, wa35, wa36, wa37, wa38, wa39, wa40, wa41]
  };

  return (
    <section className="pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">Complete Photo Gallery</h1>
          <p className="text-gray-600 mt-3 max-w-3xl mx-auto text-lg">
            Explore our resort through a comprehensive collection of images showcasing our venues, accommodations, dining experiences, activities, and events. Each photo tells a story of luxury, comfort, and unforgettable memories.
          </p>
        </motion.div>

        {/* Categorized Gallery Sections */}
        {Object.entries(imageCategories).map(([category, images], categoryIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            className="mb-16"
          >
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{category}</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"></div>
            </div>

            {/* Masonry-like responsive grid for each category */}
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="columns-2 md:columns-3 lg:columns-4 gap-4 [column-fill:_balance]
                         [&>div:not(:first-child)]:mt-4"
            >
              {images.map((img, index) => (
                <motion.div 
                  key={index} 
                  variants={item} 
                  className="break-inside-avoid overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                >
                  <ImageWithFallback
                    src={img}
                    alt={`${category} image ${index + 1}`}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ))}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16 p-8 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Ready to Experience Our Resort?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Book your stay today and create your own memories in these beautiful spaces. Our team is ready to help you plan the perfect getaway.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300">
              Book Your Stay Now
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default GalleryPage;


