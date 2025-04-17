
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Lock } from 'lucide-react';
import { Destination } from '../types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { formatPrice, ensureValidImageUrl } from '../utils/helpers';
import { useDestinations } from '../context/DestinationContext';
import { useAuth } from '../context/AuthContext';

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  const { getCurrentCrowdLevel } = useDestinations();
  const { currentUser } = useAuth();
  const isPremium = currentUser?.isPremium;
  const [imageError, setImageError] = useState(false);
  
  const getStartingPrice = () => {
    if (!destination.price) return 'Free Entry';
    
    if (typeof destination.price === 'object' && destination.price.adult !== undefined) {
      return `From ${formatPrice(destination.price.adult)}`;
    }
    
    if (typeof destination.price === 'number') {
      return `From ${formatPrice(destination.price)}`;
    }
    
    return 'Free Entry';
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const imageUrl = imageError 
    ? '/placeholder.svg' 
    : ensureValidImageUrl(destination.image);

  return (
    <Link to={`/destinations/${destination.id}`} className="block hover:shadow-lg transition-shadow">
      <Card className="h-full border rounded-lg overflow-hidden">
        <div className="relative aspect-video">
          <img
            src={imageUrl}
            alt={destination.name}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={handleImageError}
          />
          {isPremium && (
            <Badge 
              className={`absolute top-3 right-3 ${
                getCurrentCrowdLevel(destination.crowdData) === 'low' ? 'bg-green-500' : 
                getCurrentCrowdLevel(destination.crowdData) === 'medium' ? 'bg-yellow-500' : 
                'bg-red-500'
              }`}
            >
              {getCurrentCrowdLevel(destination.crowdData) === 'low' ? 'Low Crowd' : 
              getCurrentCrowdLevel(destination.crowdData) === 'medium' ? 'Moderate' : 
              'High Crowd'}
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-semibold text-lg leading-tight">{destination.name}</h3>
            <div className="flex items-center shrink-0">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="ml-1 text-sm">{destination.rating}</span>
            </div>
          </div>
          
          <div className="flex items-center mt-1 text-muted-foreground text-sm">
            <MapPin className="w-3 h-3 mr-1" />
            <span className="truncate">{destination.city}, {destination.state}</span>
          </div>
          
          <p className="mt-2 text-sm line-clamp-2 text-muted-foreground">
            {destination.description}
          </p>
          
          <div className="mt-3 flex items-center justify-between">
            {!isPremium && (
              <div className="flex items-center text-xs text-muted-foreground">
                <Lock className="w-3 h-3 mr-1" />
                <span>Premium insights available</span>
              </div>
            )}
            <div className="text-right ml-auto">
              <p className="font-semibold text-primary">
                {getStartingPrice()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default DestinationCard;
