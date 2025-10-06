'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Users, Calendar, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogPortal } from '@/components/ui/dialog';
import { useGetGamesQuery } from '@/redux/apis/gamesApi';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { toast } from 'sonner';
import { Game } from '@/redux/apis/gamesApi';

export default function GamesPage() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const { data: gamesResponse, isLoading, error } = useGetGamesQuery();
  const games = gamesResponse?.data || [];

  const activeGames = games.filter(game => game.isActive);
  const upcomingGames = games.filter(game => game.isUpcoming);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] bg-gray-50 flex items-center justify-center pt-20">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] bg-gray-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Games</h2>
          <p className="text-gray-600">Failed to load games. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Games & Activities
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover exciting games and activities designed for all ages. 
              From thrilling adventures to family-friendly fun, we have something for everyone.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 md:gap-6 max-w-2xl mx-auto">
              <div className="bg-white rounded-lg p-2 md:p-6 shadow-sm">
                <div className="flex items-center justify-center mb-1 md:mb-2">
                  <Users className="h-4 w-4 md:h-8 md:w-8 text-blue-600" />
                </div>
                <div className="text-sm md:text-2xl font-bold text-gray-900">{activeGames.length}</div>
                <div className="text-xs md:text-sm text-gray-600">Active Games</div>
              </div>
              <div className="bg-white rounded-lg p-2 md:p-6 shadow-sm">
                <div className="flex items-center justify-center mb-1 md:mb-2">
                  <Calendar className="h-4 w-4 md:h-8 md:w-8 text-orange-600" />
                </div>
                <div className="text-sm md:text-2xl font-bold text-gray-900">{upcomingGames.length}</div>
                <div className="text-xs md:text-sm text-gray-600">Upcoming Events</div>
              </div>
              <div className="bg-white rounded-lg p-2 md:p-6 shadow-sm">
                <div className="flex items-center justify-center mb-1 md:mb-2">
                  <Star className="h-4 w-4 md:h-8 md:w-8 text-yellow-600" />
                </div>
                <div className="text-sm md:text-2xl font-bold text-gray-900">{games.length}</div>
                <div className="text-xs md:text-sm text-gray-600">Total Activities</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* Games Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {games.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {games.map((game, index) => (
                <motion.div
                  key={game._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    className="h-full hover:shadow-xl transition-all duration-300 group cursor-pointer"
                    onClick={() => setSelectedGame(game)}
                  >
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={game.image.url}
                        alt={game.title}
                        className="w-full h-32 md:h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2">
                        {game.isUpcoming && (
                          <Badge className="bg-orange-500 text-white text-xs">
                            <Calendar className="h-2 w-2 mr-1" />
                            Coming Soon
                          </Badge>
                        )}
                        {game.isActive && !game.isUpcoming && (
                          <Badge className="bg-green-500 text-white text-xs">
                            Available
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CardContent className="p-3">
                      <h3 className="text-sm md:text-base font-semibold line-clamp-2 text-center">
                        {game.title}
                      </h3>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No activities available</h3>
              <p className="text-gray-600">
                Check back soon for exciting games and activities.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready for an Adventure?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Book your stay and experience all these amazing activities and games at our resort.
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              Book Now
            </Button>
          </motion.div>
        </div>
      </section>

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
    </div>
  );
}
