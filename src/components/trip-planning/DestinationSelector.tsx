
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
      <div className="flex flex-wrap gap-3">
        {selectedDestinations.map(destination => (
          <div 
            key={destination.id} 
            className="flex items-center bg-gray-50 border rounded-lg overflow-hidden pr-2"
          >
            <img 
              src={destination.image} 
              alt={destination.name}
              className="h-10 w-12 object-cover"
            />
            <span className="px-2 font-medium text-sm">{destination.name}</span>
            {onRemoveDestination && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveDestination(destination.id);
                }}
                className="ml-1 p-1 rounded-full hover:bg-gray-200"
              >
                <X className="h-4 w-4 text-gray-500 hover:text-red-500" />
              </button>
            )}
          </div>
        ))}

        {selectedDestinations.length === 0 && (
          <p className="text-xs text-gray-500">No destinations selected</p>
        )}
      </div>
    </div>
  );
};

export default DestinationSelector;
