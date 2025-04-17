
import React, { useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Car, Bus, Train, Plane, Clock } from 'lucide-react';
import { useTripPlanning } from '../../context/trip-planning/TripPlanningContext';

interface TransportSelectorProps {
  transportType: 'bus' | 'train' | 'flight' | 'car';
  setTransportType: (type: 'bus' | 'train' | 'flight' | 'car') => void;
  destinationIds: string[];
  numberOfDays: number;
  isPremium?: boolean;
}

const TransportSelector: React.FC<TransportSelectorProps> = ({
  transportType,
  setTransportType,
  destinationIds,
  numberOfDays,
  isPremium
}) => {
  const { getSuggestedTransport } = useTripPlanning();
  const [suggestedTransport, setSuggestedTransport] = useState<any>(null);
  
  useEffect(() => {
    if (destinationIds.length > 0) {
      const suggested = getSuggestedTransport(
        destinationIds,
        numberOfDays,
        isPremium
      );
      setSuggestedTransport(suggested);
    }
  }, [destinationIds, numberOfDays, isPremium, getSuggestedTransport]);

  const getTransportIcon = (type: string) => {
    switch (type) {
      case 'bus': return <Bus className="h-6 w-6 mb-1" />;
      case 'train': return <Train className="h-6 w-6 mb-1" />;
      case 'flight': return <Plane className="h-6 w-6 mb-1" />;
      case 'car': return <Car className="h-6 w-6 mb-1" />;
      default: return <Car className="h-6 w-6 mb-1" />;
    }
  };

  return (
    <>
      <Separator />
      <div>
        <Label>Transportation</Label>
        <div className="grid grid-cols-4 gap-2 mt-2">
          <Button
            variant={transportType === 'bus' ? 'default' : 'outline'}
            onClick={() => setTransportType('bus')}
            className="flex flex-col h-auto py-3"
          >
            <Bus className="h-6 w-6 mb-1" />
            <span>Bus</span>
            <span className="text-xs text-gray-500">Affordable</span>
          </Button>
          
          <Button
            variant={transportType === 'train' ? 'default' : 'outline'}
            onClick={() => setTransportType('train')}
            className="flex flex-col h-auto py-3"
          >
            <Train className="h-6 w-6 mb-1" />
            <span>Train</span>
            <span className="text-xs text-gray-500">Comfortable</span>
          </Button>
          
          <Button
            variant={transportType === 'flight' ? 'default' : 'outline'}
            onClick={() => setTransportType('flight')}
            className="flex flex-col h-auto py-3"
            disabled={!isPremium}
          >
            <Plane className="h-6 w-6 mb-1" />
            <span>Flight</span>
            {!isPremium && (
              <span className="text-xs text-amber-500">Premium</span>
            )}
          </Button>
          
          <Button
            variant={transportType === 'car' ? 'default' : 'outline'}
            onClick={() => setTransportType('car')}
            className="flex flex-col h-auto py-3"
          >
            <Car className="h-6 w-6 mb-1" />
            <span>Car</span>
            <span className="text-xs text-gray-500">Private</span>
          </Button>
        </div>
      </div>
      
      {/* Recommended Transport */}
      {suggestedTransport && (
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm flex items-center gap-1 text-gray-600 mb-2">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
            Recommended Transport:
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getTransportIcon(suggestedTransport.recommendedType)}
              <span className="font-medium capitalize">{suggestedTransport.recommendedType}</span>
            </div>
            
            <p className="text-sm text-gray-600">{suggestedTransport.reasoning}</p>
          </div>
          
          {!suggestedTransport.isRealistic && (
            <p className="text-sm text-red-500 mt-2">
              <Clock className="h-4 w-4 inline mr-1" />
              This trip may be rushed. Consider adding more days.
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default TransportSelector;
