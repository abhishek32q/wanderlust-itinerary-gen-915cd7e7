
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';
import { Destination } from '../../types';

interface DestinationSelectorProps {
  selectedDestinations: Destination[];
}

const DestinationSelector: React.FC<DestinationSelectorProps> = ({ selectedDestinations }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Trip Destinations</label>
      <div className="flex flex-wrap gap-2">
        {selectedDestinations.map(destination => (
          <Badge key={destination.id} className="px-3 py-1">
            <MapPin className="h-3 w-3 mr-1" />
            {destination.name}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default DestinationSelector;
