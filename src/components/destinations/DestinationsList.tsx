
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Clock, MapPin, Lock } from 'lucide-react';
import { Destination } from '../../types';
import { useAuth } from '../../context/AuthContext';

interface DestinationsListProps {
  destinations: Destination[];
  title: string;
  showViewAll?: boolean;
  getCurrentCrowdLevel: (crowdData: Record<string, number>) => 'low' | 'medium' | 'high';
  onPlanTrip?: (destination: Destination) => void;
}

const DestinationsList: React.FC<DestinationsListProps> = ({ 
  destinations, 
  title, 
  showViewAll = false,
  getCurrentCrowdLevel,
  onPlanTrip
}) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const isPremium = !!currentUser?.isPremium;

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        {showViewAll && (
          <Button variant="outline" onClick={() => navigate('/destinations')}>View All</Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map(destination => (
          <Card key={destination.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <Link to={`/destinations/${destination.id}`} className="block">
              <div className="relative h-48">
                <img 
                  src={destination.image} 
                  alt={destination.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 w-full">
                  <div className="flex justify-between items-center">
                    <h3 className="text-white text-xl font-semibold">{destination.name}</h3>
                    <span className="bg-white/20 text-white rounded-full px-2 py-1 text-sm flex items-center backdrop-blur-sm">
                      <Star className="h-3 w-3 mr-1 fill-yellow-400 stroke-yellow-400" />
                      {destination.rating}
                    </span>
                  </div>
                  <div className="flex items-center text-white/80 text-sm mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    {destination.city}, {destination.state}
                  </div>
                </div>

                {isPremium && (
                  <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-0.5 text-xs font-medium flex items-center">
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
            </Link>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                {isPremium ? (
                  <div>
                    <p className="text-xs text-gray-500">Best time to visit</p>
                    <p className="text-sm font-medium">{destination.bestTimeToVisit}</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <Lock className="h-3 w-3 text-gray-400" />
                    <p className="text-xs text-gray-400">Premium feature</p>
                  </div>
                )}

                {isPremium && (
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1 text-blue-500" />
                    <span className="text-xs text-blue-500 font-medium">
                      {destination.openingHours || 'Open 24/7'}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button asChild variant="default" size="sm" className="flex-1">
                  <Link to={`/destinations/${destination.id}`}>View Details</Link>
                </Button>
                
                {onPlanTrip && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => onPlanTrip(destination)}
                  >
                    Plan Trip
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DestinationsList;
