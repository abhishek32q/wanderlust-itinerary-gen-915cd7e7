
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '../components/Layout';
import { MapPin, Search, Calendar, Star, TrendingUp, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Index = () => {
  const { currentUser } = useAuth();
  const isPremiumUser = !!currentUser?.isPremium;

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1564507592333-c60657eea523')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 py-16 md:py-32 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Discover Peaceful Travel Journeys
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Travel smarter with AI-powered crowd insights and personalized itineraries.
              Explore India's most beautiful destinations without the crowds.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white px-8"
              >
                <Link to="/destinations">Start Exploring</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="bg-white/10 border-white hover:bg-white/20 text-white"
              >
                <Link to="/premium">Premium Features</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Travel Smarter with ZenWay</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Crowd Insights</h3>
              <p className="text-gray-600">
                Know exactly when a destination gets crowded. Our AI predicts the best times 
                to visit each attraction, so you can enjoy a peaceful experience.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Itineraries</h3>
              <p className="text-gray-600">
                Let our AI create the perfect trip plan, optimized for your preferences, 
                time constraints, and real-time crowd data across destinations.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="h-12 w-12 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center mb-4">
                <Star className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Experience</h3>
              <p className="text-gray-600">
                Unlock premium features like crowd forecasting, priority support, flexible cancellation, 
                and personalized travel recommendations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Popular Destinations</h2>
            <Button variant="outline" asChild>
              <Link to="/destinations">View All</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Taj Mahal */}
            <div className="group overflow-hidden rounded-lg shadow hover:shadow-lg transition-all">
              <Link to="/destinations/dest_001" className="block">
                <div className="relative aspect-video">
                  <img 
                    src="https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&auto=format&fit=crop" 
                    alt="Taj Mahal" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-xl font-bold text-white">Taj Mahal</h3>
                    <div className="flex items-center text-white/90">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">Agra, Uttar Pradesh</span>
                    </div>
                  </div>
                  {isPremiumUser && (
                    <div className="absolute top-3 right-3 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Low Crowd
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    One of the seven wonders of the world, this ivory-white marble mausoleum is a symbol of eternal love.
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 text-sm">4.8</span>
                    </div>
                    <span className="text-primary font-semibold">From ₹1,100</span>
                  </div>
                </div>
              </Link>
            </div>
            
            {/* Goa Beaches */}
            <div className="group overflow-hidden rounded-lg shadow hover:shadow-lg transition-all">
              <Link to="/destinations/dest_003" className="block">
                <div className="relative aspect-video">
                  <img 
                    src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop" 
                    alt="Goa Beaches" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-xl font-bold text-white">Goa Beaches</h3>
                    <div className="flex items-center text-white/90">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">Panaji, Goa</span>
                    </div>
                  </div>
                  {isPremiumUser && (
                    <div className="absolute top-3 right-3 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                      Moderate Crowd
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    Famous for its pristine beaches, Goa offers a perfect blend of Indian and Portuguese cultures.
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 text-sm">4.7</span>
                    </div>
                    <span className="text-primary font-semibold">From ₹200</span>
                  </div>
                </div>
              </Link>
            </div>
            
            {/* Kerala Backwaters */}
            <div className="group overflow-hidden rounded-lg shadow hover:shadow-lg transition-all">
              <Link to="/destinations/dest_006" className="block">
                <div className="relative aspect-video">
                  <img 
                    src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&auto=format&fit=crop" 
                    alt="Kerala Backwaters" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-xl font-bold text-white">Kerala Backwaters</h3>
                    <div className="flex items-center text-white/90">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">Alleppey, Kerala</span>
                    </div>
                  </div>
                  {isPremiumUser && (
                    <div className="absolute top-3 right-3 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Low Crowd
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    A network of lagoons, lakes, and canals parallel to the Arabian Sea coast, offering a serene experience.
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 text-sm">4.9</span>
                    </div>
                    <span className="text-primary font-semibold">From ₹1,200</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Features Call-to-Action */}
      <div className="bg-gradient-to-r from-amber-50 to-amber-100 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:max-w-xl">
              <h2 className="text-3xl font-bold text-amber-900 mb-4">Upgrade to Premium</h2>
              <p className="text-amber-800 mb-6">
                Unlock exclusive features like crowd forecasting, AI-powered trip planning, flexible cancellation, 
                and premium support to make your journey truly peaceful.
              </p>
              <Button 
                asChild 
                className="bg-amber-600 hover:bg-amber-700 text-white"
              >
                <Link to="/premium">Learn More</Link>
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-auto">
              <h3 className="text-xl font-bold mb-4 text-center">Premium Benefits</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Star className="h-3 w-3 text-amber-600" />
                  </div>
                  <span>Real-time crowd forecasting</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Star className="h-3 w-3 text-amber-600" />
                  </div>
                  <span>AI itinerary optimization</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Star className="h-3 w-3 text-amber-600" />
                  </div>
                  <span>Extended 24-hour cancellation</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Star className="h-3 w-3 text-amber-600" />
                  </div>
                  <span>Exclusive peaceful destinations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Smart Trip Planning */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Plan Your Perfect Trip</h2>
            <p className="text-gray-600">
              Our AI-powered trip planner creates perfectly optimized itineraries based on your preferences,
              travel dates, and real-time crowd data to ensure you have the most peaceful experience.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <Button 
              asChild 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white px-8"
            >
              <Link to="/trip-planner">Start Planning</Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline"
              size="lg"
            >
              <Link to="/destinations">Browse Destinations</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
