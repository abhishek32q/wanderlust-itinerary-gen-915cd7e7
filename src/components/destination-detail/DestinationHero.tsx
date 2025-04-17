
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';
import { ensureValidImageUrl } from '../../utils/helpers';

interface DestinationHeroProps {
  destination: any;
}

const DestinationHero: React.FC<DestinationHeroProps> = ({ destination }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const imageUrl = imageError || !destination?.image
    ? '/placeholder.svg'
    : ensureValidImageUrl(destination.image);

  return (
    <div className="relative h-[300px] md:h-[400px] mb-8 rounded-lg overflow-hidden shadow-md">
      <img 
        src={imageUrl} 
        alt={destination.name}
        className="w-full h-full object-cover"
        loading="eager"
        onError={handleImageError}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 p-6 text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-md">
          {destination.name}
        </h1>
        <div className="flex items-center text-sm drop-shadow-md">
          <MapPin className="h-4 w-4 mr-1 inline" />
          <span>{destination.city}, {destination.state}</span>
        </div>
      </div>
      <div className="absolute top-4 right-4">
        <Badge variant="outline" className="bg-white/80 text-primary">
          {destination.state}
        </Badge>
      </div>
    </div>
  );
};

export default DestinationHero;
