'use client';

import { motion } from 'framer-motion';
import { Gamepad2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useGetGamesQuery } from '@/redux/apis/gamesApi';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import Link from 'next/link';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogPortal } from '@/components/ui/dialog';
import { Game } from '@/redux/apis/gamesApi';
import { toast } from 'sonner';
import { Calendar } from 'lucide-react';

export function HomeGamesSection() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const { data: gamesResponse, isLoading, error } = useGetGamesQuery();
  
  // Get first 3 active games for preview
  const activeGames = gamesResponse?.data?.filter(game => game.isActive) || [];
  const games = activeGames.slice(0, 3);
  const totalGames = activeGames.length;

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <LoadingSpinner />
          </div>
        </div>
      </section>
    );
  }

  if (error || games.length === 0) {
    return null; // Don't show section if no games or error
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Gamepad2 className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Games & Activities
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            Experience our wide range of indoor games designed for everyone! 
            From thrilling adventures for adults to fun-filled activities for kids, 
            we have something special for men, women, and children of all ages.
          </p>
          <p className="text-base text-gray-500 max-w-2xl mx-auto">
            Enjoy our collection of exciting games including sports tournaments, 
            creative competitions, and family-friendly activities that bring 
            everyone together for unforgettable moments.
          </p>
        </motion.div>

        {/* Games Preview Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
          {games.map((game, index) => (
            <motion.div
              key={game._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card 
                className="h-full hover:shadow-lg transition-all duration-300 group cursor-pointer"
                onClick={() => setSelectedGame(game)}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={game.image.url}
                    alt={game.title}
                    className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-1 right-1">
                    {game.isUpcoming && (
                      <Badge className="bg-orange-500 text-white text-xs px-1 py-0">
                        Coming Soon
                      </Badge>
                    )}
                    {game.isActive && !game.isUpcoming && (
                      <Badge className="bg-green-500 text-white text-xs px-1 py-0">
                        Available
                      </Badge>
                    )}
                  </div>
                </div>
                <CardContent className="p-3">
                  <h3 className="text-sm font-semibold line-clamp-2 text-center">
                    {game.title}
                  </h3>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Show All Games Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Link href="/resort/games">
            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white w-full sm:w-auto px-4 sm:px-8 py-3 text-base sm:text-lg font-semibold rounded-lg shadow-md"
            >
              <Gamepad2 className="h-5 w-5 mr-2" />
              View All {totalGames} Games & Activities
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
          <p className="text-sm text-gray-500 mt-3">
            Discover our complete collection of indoor games for kids, adults, men, and women
          </p>
        </motion.div>
      </div>

      {/* Game Details Dialog */}
      <Dialog open={!!selectedGame} onOpenChange={() => setSelectedGame(null)}>
        <DialogPortal>
          <div className="fixed inset-0 z-[110] bg-black/50" />
        </DialogPortal>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto z-[111]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{selectedGame?.title}</DialogTitle>
            <DialogDescription className="text-base">
              {selectedGame?.description}
            </DialogDescription>
          </DialogHeader>
          
          {selectedGame && (
            <div className="space-y-6">
              {/* Game Image */}
              <div className="relative">
                <img
                  src={selectedGame.image.url}
                  alt={selectedGame.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  {selectedGame.isUpcoming && (
                    <Badge className="bg-orange-500 text-white">
                      <Calendar className="h-3 w-3 mr-1" />
                      Coming Soon
                    </Badge>
                  )}
                  {selectedGame.isActive && !selectedGame.isUpcoming && (
                    <Badge className="bg-green-500 text-white">
                      Available Now
                    </Badge>
                  )}
                  {!selectedGame.isActive && (
                    <Badge variant="destructive">
                      Currently Unavailable
                    </Badge>
                  )}
                </div>
              </div>

              {/* Game Categories */}
              <div>
                <h4 className="text-lg font-semibold mb-2">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedGame.categories.map((category) => (
                    <Badge key={category} variant="outline" className="text-sm">
                      {category === 'adult' ? 'Adult Activities' : 
                       category === 'child' ? 'Kids Activities' : 'Family Activities'}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Game Status */}
              <div>
                <h4 className="text-lg font-semibold mb-2">Status</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${selectedGame.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="text-sm">
                      {selectedGame.isActive ? 'Active - Available for booking' : 'Inactive - Not currently available'}
                    </span>
                  </div>
                  {selectedGame.isUpcoming && (
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                      <span className="text-sm">Upcoming Event - Special timing</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button 
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    toast.success('Booking functionality coming soon!');
                    setSelectedGame(null);
                  }}
                >
                  Book Now
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedGame(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
