
import React, { useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Car, Bus, Train, Plane, Clock, Info, Award } from 'lucide-react';
import { useTripPlanning } from '../../context/trip-planning/TripPlanningContext';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from '@/components/ui/badge';

interface TransportSelectorProps {
  transportType: 'bus' | 'train' | 'flight' | 'car';
  setTransportType: (type: 'bus' | 'train' | 'flight' | 'car') => void;
  destinationIds: string[];
  numberOfDays: number;
  isPremium?: boolean;
}

interface TransportOption {
  type: 'bus' | 'train' | 'flight' | 'car';
  label: string;
  description: string;
  icon: React.ReactNode;
  amenities: string[];
  premium?: boolean;
}

const TransportSelector: React.FC<TransportSelectorProps> = ({
  transportType,
  setTransportType,
  destinationIds,
  numberOfDays,
  isPremium
}) => {
  const { getSuggestedTransport, getTransportAmenities } = useTripPlanning();
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

  const transportOptions: TransportOption[] = [
    {
      type: 'bus',
      label: 'Bus',
      description: 'Affordable',
      icon: <Bus className="h-6 w-6 mb-1" />,
      amenities: getTransportAmenities('bus', numberOfDays > 1)
    },
    {
      type: 'train',
      label: 'Train',
      description: 'Comfortable',
      icon: <Train className="h-6 w-6 mb-1" />,
      amenities: getTransportAmenities('train', numberOfDays > 1)
    },
    {
      type: 'flight',
      label: 'Flight',
      description: 'Fast',
      icon: <Plane className="h-6 w-6 mb-1" />,
      amenities: getTransportAmenities('flight', numberOfDays > 1),
      premium: true
    },
    {
      type: 'car',
      label: 'Car',
      description: 'Flexible',
      icon: <Car className="h-6 w-6 mb-1" />,
      amenities: getTransportAmenities('car', numberOfDays > 1)
    }
  ];

  return (
    <>
      <Separator className="my-4" />
      <div>
        <div className="flex justify-between items-center mb-3">
          <Label className="text-base font-medium">Transportation Type</Label>
          {suggestedTransport && (
            <span className="text-sm text-primary flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              Travel Time: ~{Math.round(suggestedTransport.totalTravelTimeHours)} hrs
            </span>
          )}
        </div>
        
        <div className="grid grid-cols-4 gap-2 mt-2">
          {transportOptions.map((option) => (
            <TooltipProvider key={option.type}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="relative">
                    <Button
                      variant={transportType === option.type ? 'default' : 'outline'}
                      onClick={() => !option.premium || isPremium ? setTransportType(option.type) : null}
                      className="flex flex-col h-auto py-3 w-full"
                      disabled={option.premium && !isPremium}
                    >
                      {option.icon}
                      <span>{option.label}</span>
                      <span className={`text-xs ${option.premium && !isPremium ? 'text-amber-500' : 'text-gray-500'}`}>
                        {option.premium && !isPremium ? 'Premium' : option.description}
                      </span>
                    </Button>
                    {option.premium && (
                      <span className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3">
                        <Award className="h-4 w-4 text-amber-500" />
                      </span>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent className="w-64 p-3">
                  <p className="font-medium mb-2">{option.label} Transportation</p>
                  <ul className="text-sm space-y-1">
                    {option.amenities.map((amenity, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{amenity}</span>
                      </li>
                    ))}
                    {option.premium && !isPremium && (
                      <li className="text-amber-600 mt-2 pt-1 border-t border-amber-200">
                        Upgrade to Premium to unlock this option
                      </li>
                    )}
                  </ul>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
      
      {/* Recommended Transport */}
      {suggestedTransport && (
        <Card className="mt-3">
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Recommended
              </Badge>
              <h4 className="font-medium">{suggestedTransport.recommendedType.charAt(0).toUpperCase() + suggestedTransport.recommendedType.slice(1)}</h4>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                {transportOptions.find(o => o.type === suggestedTransport.recommendedType)?.icon || 
                <Car className="h-5 w-5" />}
                <span className="text-gray-600">{suggestedTransport.reasoning}</span>
              </div>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-gray-500" />
                  </TooltipTrigger>
                  <TooltipContent className="w-64">
                    <p className="mb-2">Total distance: {Math.round(suggestedTransport.totalDistanceKm)} km</p>
                    <p>Time for sightseeing: ~{Math.round(suggestedTransport.timeForSightseeing)} hrs</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            {!suggestedTransport.isRealistic && (
              <p className="text-sm text-red-500 mt-2 flex items-center">
                <Clock className="h-4 w-4 inline mr-1" />
                This trip may be rushed. Consider adding more days.
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default TransportSelector;
