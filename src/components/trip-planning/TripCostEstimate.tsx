
import React, { useState, useEffect, useMemo } from 'react';
import { Separator } from '@/components/ui/separator';
import { Destination, GuideType } from '../../types';
import { useTripPlanning } from '../../context/trip-planning/TripPlanningContext';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface TripCostEstimateProps {
  destinationIds: string[];
  selectedDestinations: Destination[];
  transportType: 'bus' | 'train' | 'flight' | 'car';
  hotelType: 'budget' | 'standard' | 'luxury';
  travelStyle: 'base-hotel' | 'mobile';
  numberOfDays: number;
  numberOfPeople: number;
  selectedGuideIds: string[];
  isPremium?: boolean;
}

const TripCostEstimate: React.FC<TripCostEstimateProps> = ({
  destinationIds,
  selectedDestinations,
  transportType,
  hotelType,
  travelStyle,
  numberOfDays,
  numberOfPeople,
  selectedGuideIds,
  isPremium
}) => {
  const { 
    getHotelsByDestination,
    getGuidesByDestination,
    calculateDistanceBetweenDestinations,
    getOptimalHotels,
    getNearbyHotels,
    transports
  } = useTripPlanning();
  
  const [tripCost, setTripCost] = useState<any>(null);
  const [totalDistance, setTotalDistance] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const [availableGuides, setAvailableGuides] = useState<GuideType[]>([]);
  const [transportDetails, setTransportDetails] = useState<{
    distanceBreakdown: Array<{from: string; to: string; distance: number}>;
    totalTravelTime: number;
  }>({ distanceBreakdown: [], totalTravelTime: 0 });

  // Calculate total distance between destinations - memoized for performance
  const calculatedDistance = useMemo(() => {
    if (selectedDestinations.length <= 1) {
      return {
        totalDistance: 0,
        breakdown: [],
        travelTime: 0,
        speed: 0
      };
    }
    
    let distance = 0;
    const breakdown: Array<{from: string; to: string; distance: number}> = [];
    
    // Different calculation based on travel style
    if (travelStyle === 'mobile') {
      // Linear travel between destinations
      for (let i = 0; i < selectedDestinations.length - 1; i++) {
        const from = selectedDestinations[i];
        const to = selectedDestinations[i + 1];
        if (!from.coordinates || !to.coordinates) continue;
        
        const segmentDistance = calculateDistanceBetweenDestinations(from, to);
        distance += segmentDistance;
        breakdown.push({
          from: from.name,
          to: to.name,
          distance: segmentDistance
        });
      }
    } else if (travelStyle === 'base-hotel' && selectedDestinations.length > 1) {
      // Travel from base hotel to each destination and back
      const baseDestination = selectedDestinations[0];
      
      for (let i = 1; i < selectedDestinations.length; i++) {
        const destination = selectedDestinations[i];
        if (!baseDestination.coordinates || !destination.coordinates) continue;
        
        const toDistance = calculateDistanceBetweenDestinations(baseDestination, destination);
        const fromDistance = calculateDistanceBetweenDestinations(destination, baseDestination);
        
        distance += (toDistance + fromDistance);
        
        breakdown.push({
          from: baseDestination.name,
          to: destination.name,
          distance: toDistance
        });
        breakdown.push({
          from: destination.name,
          to: baseDestination.name,
          distance: fromDistance
        });
      }
    }
    
    // Calculate travel time based on transport mode
    const speedMap = {
      'bus': 45,    // km/h
      'train': 60,  // km/h
      'flight': 500, // km/h
      'car': 50     // km/h
    };
    
    const speed = speedMap[transportType] || 50;
    const travelTime = distance / speed;
    
    return {
      totalDistance: distance,
      breakdown,
      travelTime,
      speed
    };
  }, [selectedDestinations, calculateDistanceBetweenDestinations, transportType, travelStyle]);

  // Set total distance and transport details when calculated
  useEffect(() => {
    if (typeof calculatedDistance === 'object' && calculatedDistance !== null) {
      setTotalDistance(calculatedDistance.totalDistance);
      setTransportDetails({
        distanceBreakdown: calculatedDistance.breakdown,
        totalTravelTime: calculatedDistance.travelTime
      });
    }
  }, [calculatedDistance]);

  // Get available guides - memoized for performance
  const guides = useMemo(() => {
    if (destinationIds.length === 0) return [];
    
    try {
      return destinationIds.flatMap(destId => 
        getGuidesByDestination(destId)
      );
    } catch (error) {
      console.error("Error fetching guides:", error);
      return [];
    }
  }, [destinationIds, getGuidesByDestination]);

  // Set available guides when fetched
  useEffect(() => {
    setAvailableGuides(guides);
  }, [guides]);

  // Calculate trip costs with improved logic and error handling
  useEffect(() => {
    if (selectedDestinations.length === 0) return;
    
    const calculateCosts = async () => {
      try {
        setIsCalculating(true);
        
        // Get hotels based on travel style and number of destinations
        let hotelsList = [];
        
        try {
          if (selectedDestinations.length > 1 && travelStyle === 'mobile') {
            // Multiple destinations with changing hotels
            hotelsList = getOptimalHotels(destinationIds) || [];
          } else if (selectedDestinations.length > 1 && travelStyle === 'base-hotel') {
            // Multiple destinations with base hotel - find most central
            const centralHotel = getNearbyHotels(destinationIds[0], 1) || [];
            hotelsList = centralHotel;
          } else if (selectedDestinations.length === 1) {
            // Single destination - just get hotels for that destination
            const destHotels = getHotelsByDestination(destinationIds[0]) || [];
            hotelsList = destHotels
              .filter(hotel => hotel.type === hotelType)
              .slice(0, 1);
          }
        } catch (error) {
          console.error("Error getting hotels:", error);
          hotelsList = [];
        }
        
        // Calculate transport cost based on distance and type
        let transportCost = 0;
        
        try {
          // Find the selected transport details - safely handle undefined values
          const availableTransports = transports ? transports.filter(t => t.type === transportType) : [];
          let selectedTransport = null;
          
          if (availableTransports.length > 0) {
            selectedTransport = availableTransports.reduce((max, transport) => 
              transport.pricePerPerson > max.pricePerPerson ? transport : max, 
              availableTransports[0]
            );
          }
          
          if (totalDistance > 0) {
            // Base cost per km based on transport type
            const baseCostPerKm = {
              'bus': 2.5,
              'train': 3.5,
              'flight': 5,
              'car': 12
            }[transportType] || 5;
            
            // Calculate cost based on distance
            transportCost = totalDistance * baseCostPerKm;
            
            if (transportType === 'flight') {
              // For flights: base fare + distance-based fare
              transportCost = 2500 + (transportCost * 0.8);
            }
            
            // Premium discount (10%)
            if (isPremium) {
              transportCost *= 0.9;
            }
            
            // Multiply by number of people
            transportCost *= numberOfPeople;
          }
        } catch (error) {
          console.error("Error calculating transport cost:", error);
          transportCost = 5000 * numberOfPeople;
        }
        
        // Calculate hotels cost based on type and number of days
        let hotelsCost = 0;
        try {
          if (hotelsList && hotelsList.length > 0) {
            // Safely calculate hotel costs
            const validHotels = hotelsList.filter(h => h && typeof h.pricePerPerson === 'number');
            
            if (validHotels.length > 0) {
              const hotelCostPerDay = validHotels.reduce((sum, h) => sum + h.pricePerPerson, 0) / validHotels.length;
              hotelsCost = hotelCostPerDay * numberOfDays * numberOfPeople;
            } else {
              // Fallback costs if no valid hotels found
              const fallbackCosts = {
                'budget': 1500,
                'standard': 3000,
                'luxury': 8000
              };
              hotelsCost = (fallbackCosts[hotelType] || 3000) * numberOfDays * numberOfPeople;
            }
          } else {
            // Fallback if no hotels found
            const fallbackCosts = {
              'budget': 1500,
              'standard': 3000,
              'luxury': 8000
            };
            hotelsCost = (fallbackCosts[hotelType] || 3000) * numberOfDays * numberOfPeople;
          }
        } catch (error) {
          console.error("Error calculating hotel costs:", error);
          hotelsCost = 3000 * numberOfDays * numberOfPeople;
        }
        
        // Calculate destinations cost (entry tickets)
        let destinationsCost = 0;
        try {
          for (const dest of selectedDestinations) {
            if (typeof dest.price === 'number') {
              destinationsCost += dest.price;
            } else if (dest.price && typeof dest.price.adult === 'number') {
              destinationsCost += dest.price.adult;
            } else {
              // Fallback price if not defined
              destinationsCost += 500;
            }
          }
          destinationsCost *= numberOfPeople;
        } catch (error) {
          console.error("Error calculating destination costs:", error);
          destinationsCost = 500 * selectedDestinations.length * numberOfPeople;
        }
        
        // Calculate guides cost
        let guidesCost = 0;
        try {
          if (selectedGuideIds.length > 0 && availableGuides.length > 0) {
            const selectedGuides = availableGuides.filter(g => selectedGuideIds.includes(g.id));
            guidesCost = selectedGuides.reduce((sum, g) => sum + (g.pricePerDay || 2000), 0) * numberOfDays;
          }
        } catch (error) {
          console.error("Error calculating guide costs:", error);
          guidesCost = selectedGuideIds.length > 0 ? 2000 * numberOfDays : 0;
        }
        
        // Set total trip cost
        setTripCost({
          transportCost,
          hotelsCost,
          destinationsCost,
          guidesCost,
          totalCost: transportCost + hotelsCost + destinationsCost + guidesCost,
          totalDistance,
          travelTimeHours: transportDetails.totalTravelTime,
          transportDetails: transportDetails.distanceBreakdown
        });
      } catch (error) {
        console.error("Error calculating trip cost:", error);
        toast({
          title: "Calculation Error",
          description: "There was an error calculating the trip cost. Using estimated values.",
          variant: "destructive"
        });
        
        // Set fallback costs so UI doesn't break
        setTripCost({
          transportCost: 5000 * numberOfPeople,
          hotelsCost: 3000 * numberOfDays * numberOfPeople,
          destinationsCost: 500 * selectedDestinations.length * numberOfPeople,
          guidesCost: selectedGuideIds.length > 0 ? 2000 * numberOfDays : 0,
          totalCost: (5000 + (3000 * numberOfDays) + (500 * selectedDestinations.length)) * numberOfPeople + 
                    (selectedGuideIds.length > 0 ? 2000 * numberOfDays : 0),
          totalDistance,
          travelTimeHours: totalDistance / 50,
          transportDetails: []
        });
      } finally {
        setIsCalculating(false);
      }
    };

    // Add a slight delay to prevent UI freeze and ensure other state is set
    const timer = setTimeout(() => {
      calculateCosts();
    }, 500);
    
    return () => clearTimeout(timer);
  }, [
    selectedDestinations,
    destinationIds,
    transportType,
    hotelType,
    travelStyle,
    numberOfDays,
    numberOfPeople,
    selectedGuideIds,
    totalDistance,
    isPremium,
    availableGuides,
    getHotelsByDestination,
    getOptimalHotels,
    getNearbyHotels,
    transports,
    transportDetails
  ]);

  if (isCalculating) {
    return (
      <div>
        <h3 className="font-semibold mb-3">Cost Estimate</h3>
        <div className="bg-white border rounded-lg p-4 flex flex-col items-center justify-center py-6">
          <Loader2 className="h-6 w-6 animate-spin mb-2 text-primary" />
          <p className="text-sm text-gray-600">Calculating trip cost...</p>
        </div>
      </div>
    );
  }

  if (!tripCost) {
    return (
      <div>
        <h3 className="font-semibold mb-3">Cost Estimate</h3>
        <div className="bg-white border rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">Select all options to see cost estimate</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-semibold mb-3">Cost Estimate</h3>
      
      <div className="bg-white border rounded-lg p-4 space-y-3">
        {/* Travel breakdown */}
        {tripCost.transportDetails && tripCost.transportDetails.length > 0 && (
          <div className="bg-gray-50 p-2 rounded-md mb-3 text-sm">
            <p className="font-medium mb-2">Travel Breakdown:</p>
            <ul className="space-y-1">
              {tripCost.transportDetails.map((segment: any, index: number) => (
                <li key={index} className="flex justify-between">
                  <span>{segment.from} → {segment.to}</span>
                  <span className="font-medium">{Math.round(segment.distance)} km</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 font-medium">
              Total Distance: {Math.round(tripCost.totalDistance)} km
            </p>
            <p className="text-sm text-gray-600">
              Estimated Travel Time: {Math.round(tripCost.travelTimeHours)} hours
            </p>
          </div>
        )}

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Transport ({transportType}):</span>
          <span className="font-medium">₹{Math.round(tripCost.transportCost).toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">
            Hotels ({numberOfDays} nights, {hotelType}):
          </span>
          <span className="font-medium">₹{Math.round(tripCost.hotelsCost).toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Entry Tickets:</span>
          <span className="font-medium">₹{Math.round(tripCost.destinationsCost).toLocaleString()}</span>
        </div>

        {selectedGuideIds.length > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Guide Services:</span>
            <span className="font-medium">₹{Math.round(tripCost.guidesCost).toLocaleString()}</span>
          </div>
        )}
        
        <Separator />
        
        <div className="flex justify-between items-center font-semibold">
          <span>Total (for {numberOfPeople} people):</span>
          <span className="text-lg">₹{Math.round(tripCost.totalCost).toLocaleString()}</span>
        </div>
        
        {isPremium && (
          <div className="bg-amber-50 border border-amber-200 text-amber-700 p-2 rounded text-sm mt-2 flex gap-2 items-center">
            <span className="text-amber-500 font-bold">✦</span>
            <p>Premium discount applied (10%)</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripCostEstimate;
