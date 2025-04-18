
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Lock } from 'lucide-react';
import { useDestinations } from '../../context/DestinationContext';
import { useAuth } from '../../context/AuthContext';
import CrowdChart from '../CrowdChart';

const FeaturedDestinations: React.FC = () => {
  const { destinations, getCurrentCrowdLevel } = useDestinations();
  const { currentUser } = useAuth();
  const isPremiumUser = !!currentUser?.isPremium;

  // Get featured destinations (lowest crowd destinations)
  const featuredDestinations = useMemo(() => {
    return [...destinations]
      .sort((a, b) => {
        const crowdLevelA = Object.values(a.crowdData).reduce((sum, val) => sum + val, 0) / Object.values(a.crowdData).length;
        const crowdLevelB = Object.values(b.crowdData).reduce((sum, val) => sum + val, 0) / Object.values(b.crowdData).length;
        return crowdLevelA - crowdLevelB;
      })
      .slice(0, 3);
  }, [destinations]);

  return (
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
                
                {isPremiumUser && (
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
                )}
              </div>
              
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-4">
                  {isPremiumUser ? (
                    <div>
                      <p className="text-gray-500 text-sm">Best time to visit</p>
                      <p className="font-medium">{destination.bestTimeToVisit}</p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <Lock className="h-4 w-4 text-gray-400" />
                      <p className="text-gray-400 text-sm">Premium feature</p>
                    </div>
                  )}
                  <Button asChild size="sm">
                    <Link to={`/destinations/${destination.id}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
                
                {isPremiumUser && (
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
  );
};

export default FeaturedDestinations;
