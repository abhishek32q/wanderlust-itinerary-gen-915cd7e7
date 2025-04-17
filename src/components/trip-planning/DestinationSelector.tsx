
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { MapPin, X } from 'lucide-react';
import { Destination } from '../../types';

interface DestinationSelectorProps {
  selectedDestinations: Destination[];
  onRemoveDestination?: (id: string) => void;
}

const DestinationSelector: React.FC<DestinationSelectorProps> = ({ 
  selectedDestinations,
  onRemoveDestination
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Trip Destinations</label>
      <div className="flex flex-wrap gap-2">
        {selectedDestinations.map(destination => (
          <Badge key={destination.id} className="px-3 py-1 flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {destination.name}
            {onRemoveDestination && (
              <X 
                className="h-3 w-3 ml-1 cursor-pointer hover:text-red-500" 
                onClick={() => onRemoveDestination(destination.id)}
              />
            )}
          </Badge>
        ))}

        {selectedDestinations.length === 0 && (
          <p className="text-xs text-gray-500">No destinations selected</p>
        )}
      </div>
    </div>
  );
};

export default DestinationSelector;
