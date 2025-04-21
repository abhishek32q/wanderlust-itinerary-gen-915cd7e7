
import React, { useState, useEffect } from 'react';
import { Bus, Train, Plane, Car } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { TransportType } from '../../types';
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
  const { transports, getSuggestedTransport } = useTripPlanning();
  const [selectedTransportType, setSelectedTransportType] = useState<string | null>(null);
  const [suggestedTransport, setSuggestedTransport] = useState<any>(null);
  const [availableTransports, setAvailableTransports] = useState<TransportType[]>([]);
  
  // Get transport suggestion based on trip parameters
  useEffect(() => {
    if (destinationIds.length > 0) {
      try {
        const suggested = getSuggestedTransport(
          destinationIds,
          numberOfDays,
          isPremium
        );
        setSuggestedTransport(suggested);
      } catch (error) {
        console.error("Error getting transport suggestion:", error);
      }
    }
  }, [destinationIds, numberOfDays, isPremium, getSuggestedTransport]);
  
  // Filter available transports based on selected transport type
  useEffect(() => {
    const filtered = transports.filter(t => t.type === transportType);
    setAvailableTransports(filtered.length > 0 ? filtered : []);
    setSelectedTransportType(null); // Reset selected specific transport when type changes
  }, [transportType, transports]);

  const getTransportIcon = (type: string) => {
    switch (type) {
      case 'bus': return <Bus className="h-5 w-5" />;
      case 'train': return <Train className="h-5 w-5" />;
      case 'flight': return <Plane className="h-5 w-5" />;
      case 'car': return <Car className="h-5 w-5" />;
      default: return <Car className="h-5 w-5" />;
    }
  };
  
  return (
    <div className="space-y-4">
      <div>
        <Label>Transportation Type</Label>
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
      
      {/* Transport Type Selection */}
      {availableTransports.length > 0 && (
        <div>
          <Label>Select Specific {transportType.charAt(0).toUpperCase() + transportType.slice(1)} Type</Label>
          <Select value={selectedTransportType || ""} onValueChange={setSelectedTransportType}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder={`Choose ${transportType} type...`} />
            </SelectTrigger>
            <SelectContent>
              {availableTransports.map(transport => (
                <SelectItem key={transport.id} value={transport.id}>
                  {transport.name} - ₹{transport.pricePerPerson.toLocaleString()}/person
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      
      {/* Display Amenities */}
      {selectedTransportType && (
        <div className="bg-gray-50 p-3 rounded-lg mt-2">
          <Label className="text-sm">Amenities</Label>
          <div className="flex flex-wrap gap-1 mt-2">
            {availableTransports
              .find(t => t.id === selectedTransportType)
              ?.amenities.map((amenity, i) => (
                <Badge key={i} variant="outline" className="bg-white">{amenity}</Badge>
              ))}
          </div>
        </div>
      )}
      
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
              This trip may be rushed. Consider adding more days.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default TransportSelector;
