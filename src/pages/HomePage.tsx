
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Map, Calendar, Users, Star, Clock, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { useDestinations } from '../context/DestinationContext';
import { useAuth } from '../context/AuthContext';
import CrowdChart from '../components/CrowdChart';

const HomePage: React.FC = () => {
  const { destinations, getCurrentCrowdLevel } = useDestinations();
  const { currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  // Get featured destinations (lowest crowd destinations)
  const featuredDestinations = React.useMemo(() => {
    return [...destinations]
      .sort((a, b) => {
        const crowdLevelA = Object.values(a.crowdData).reduce((sum, val) => sum + val, 0) / Object.values(a.crowdData).length;
        const crowdLevelB = Object.values(b.crowdData).reduce((sum, val) => sum + val, 0) / Object.values(b.crowdData).length;
        return crowdLevelA - crowdLevelB;
      })
      .slice(0, 3);
  }, [destinations]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-[url('https://i.postimg.cc/nz9R0NPY/taj-mahal.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Experience <span className="text-amber-400">Crowd-Free</span> Journeys
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl mb-8 text-gray-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              ZenWay Travels helps you discover peaceful destinations with real-time crowd insights and personalized itineraries.
            </motion.p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-white font-medium">
                <Link to="/destinations">
                  Explore Destinations
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              {!currentUser && (
                <Button asChild size="lg" variant="outline" className="bg-white/10 text-white backdrop-blur-sm hover:bg-white/20">
                  <Link to="/signup">
                    <UserPlus className="mr-2 h-5 w-5" />
                    Sign Up
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How ZenWay Helps You Travel Smarter</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Real-time Crowd Data</h3>
                <p className="text-gray-600">Know before you go with live crowd insights and avoid peak tourist times.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Map className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Smart Itineraries</h3>
                <p className="text-gray-600">Personalized travel plans optimized for crowd-free experiences.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Flexible Bookings</h3>
                <p className="text-gray-600">Premium members enjoy extended cancellation windows and priority access.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Peaceful Destinations</h2>
            <Button variant="outline" asChild>
              <Link to="/destinations">View All</Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDestinations.map((destination) => (
              <Card key={destination.id} className="overflow-hidden group">
                <div className="relative h-60 overflow-hidden">
                  <img 
                    src={destination.image} 
                    alt={destination.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-white font-semibold text-xl">{destination.name}</h3>
                      <div className="flex items-center bg-white/20 text-white text-sm rounded-full px-3 py-1 backdrop-blur-sm">
                        <Star className="h-4 w-4 mr-1 fill-amber-400 stroke-amber-400" />
                        {destination.rating}
                      </div>
                    </div>
                    <p className="text-white/80 text-sm">{destination.city}, {destination.state}</p>
                  </div>
                  
                  <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 text-sm font-medium flex items-center">
                    <span className={`
                      inline-block w-2 h-2 rounded-full mr-1
                      ${getCurrentCrowdLevel(destination.crowdData) === 'low' ? 'bg-green-500' : 
                        getCurrentCrowdLevel(destination.crowdData) === 'medium' ? 'bg-yellow-500' : 
                        'bg-red-500'}
                    `}></span>
                    {getCurrentCrowdLevel(destination.crowdData) === 'low' ? 'Low Crowd' : 
                     getCurrentCrowdLevel(destination.crowdData) === 'medium' ? 'Moderate' : 
                     'Busy'}
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-gray-500 text-sm">Best time to visit</p>
                      <p className="font-medium">{destination.bestTimeToVisit}</p>
                    </div>
                    <Button asChild size="sm">
                      <Link to={`/destinations/${destination.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                  
                  {currentUser?.isPremium && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-amber-700 mb-2 flex items-center">
                        <Star className="h-4 w-4 fill-amber-500 stroke-amber-500 mr-1" />
                        Premium Crowd Insights
                      </p>
                      <CrowdChart crowdData={destination.crowdData} />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Features */}
      <section className="py-16 bg-gradient-to-r from-amber-50 to-amber-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Upgrade to Premium</h2>
            <p className="text-lg text-gray-700">Unlock exclusive features for crowd-free travel experiences</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-amber-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-2">1</span>
                  Real-Time Crowd Data
                </h3>
                <p className="text-gray-600">Access live crowd levels and forecasts for all destinations.</p>
              </CardContent>
            </Card>
            
            <Card className="border-amber-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-2">2</span>
                  Extended Cancellation
                </h3>
                <p className="text-gray-600">Cancel bookings up to 24 hours before without any charges.</p>
              </CardContent>
            </Card>
            
            <Card className="border-amber-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-2">3</span>
                  AI Itinerary Planner
                </h3>
                <p className="text-gray-600">Smart travel plans optimize for crowd-free experiences.</p>
              </CardContent>
            </Card>
            
            <Card className="border-amber-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-2">4</span>
                  Hidden Gems
                </h3>
                <p className="text-gray-600">Discover peaceful alternatives to crowded tourist hotspots.</p>
              </CardContent>
            </Card>
            
            <Card className="border-amber-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-2">5</span>
                  Priority Support
                </h3>
                <p className="text-gray-600">Get quick assistance for any travel questions or issues.</p>
              </CardContent>
            </Card>
            
            <Card className="border-amber-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-2">6</span>
                  Exclusive Deals
                </h3>
                <p className="text-gray-600">Access special rates and premium experiences at select locations.</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-10">
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600">
              {currentUser?.isPremium ? 'Manage Premium' : 'Upgrade to Premium'}
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-900 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Crowd-Free Travel?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">Start planning your peaceful journey with ZenWay Travels today.</p>
          <Button size="lg" asChild className="bg-white text-blue-900 hover:bg-gray-100">
            <Link to="/destinations">Start Planning</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
