
import React, { useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import { Destination, GuideType } from '../../types';
import { useTripPlanning } from '../../context/trip-planning/TripPlanningContext';

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
  const [availableGuides, setAvailableGuides] = useState<GuideType[]>([]);
  const [transportDetails, setTransportDetails] = useState<{
    distanceBreakdown: Array<{from: string; to: string; distance: number}>;
    totalTravelTime: number;
  }>({ distanceBreakdown: [], totalTravelTime: 0 });

  // Calculate total distance between destinations
  useEffect(() => {
    if (selectedDestinations.length > 1) {
      let distance = 0;
      const breakdown: Array<{from: string; to: string; distance: number}> = [];
      
      // Different calculation based on travel style
      if (travelStyle === 'mobile') {
        // Linear travel between destinations
        for (let i = 0; i < selectedDestinations.length - 1; i++) {
          const from = selectedDestinations[i];
          const to = selectedDestinations[i + 1];
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
          const toDistance = calculateDistanceBetweenDestinations(baseDestination, destination);
          const fromDistance = calculateDistanceBetweenDestinations(destination, baseDestination);
          
          // Round trip distance
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
      
      setTotalDistance(distance);
      
      // Calculate travel time based on transport mode
      const speedMap = {
        'bus': 45,    // km/h
        'train': 60,  // km/h
        'flight': 500, // km/h
        'car': 50     // km/h
      };
      
      const speed = speedMap[transportType] || 50;
      const travelTime = distance / speed;
      
      setTransportDetails({
        distanceBreakdown: breakdown,
        totalTravelTime: travelTime
      });
    } else {
      setTotalDistance(0);
      setTransportDetails({ distanceBreakdown: [], totalTravelTime: 0 });
    }
  }, [selectedDestinations, calculateDistanceBetweenDestinations, transportType, travelStyle]);

  // Get available guides
  useEffect(() => {
    if (destinationIds.length > 0) {
      const guides = destinationIds.flatMap(destId => 
        getGuidesByDestination(destId)
      );
      setAvailableGuides(guides);
    }
  }, [destinationIds, getGuidesByDestination]);

  // Calculate trip costs with improved logic
  useEffect(() => {
    if (selectedDestinations.length > 0) {
      // Get hotels based on travel style and number of destinations
      let hotelsList = [];
      
      if (selectedDestinations.length > 1 && travelStyle === 'mobile') {
        // Multiple destinations with changing hotels
        hotelsList = getOptimalHotels(destinationIds);
      } else if (selectedDestinations.length > 1 && travelStyle === 'base-hotel') {
        // Multiple destinations with base hotel - find most central
        const centralHotel = getNearbyHotels(destinationIds[0], 1);
        hotelsList = centralHotel;
      } else if (selectedDestinations.length === 1) {
        // Single destination - just get hotels for that destination
        hotelsList = getHotelsByDestination(destinationIds[0])
          .filter(hotel => hotel.type === hotelType)
          .slice(0, 1);
      }
      
      // Calculate transport cost based on distance and type
      let transportCost = 0;
      
      // Find the selected transport details
      const selectedTransport = transports
        .filter(t => t.type === transportType)
        .reduce((max, transport) => 
          transport.pricePerPerson > max.pricePerPerson ? transport : max, 
          transports.find(t => t.type === transportType) || { pricePerPerson: 0 }
        );
      
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
      
      // Calculate hotels cost based on type and number of days
      let hotelsCost = 0;
      if (hotelsList.length > 0) {
        const hotelCostPerDay = hotelsList.reduce((sum, h) => sum + h.pricePerPerson, 0) / hotelsList.length;
        hotelsCost = hotelCostPerDay * numberOfDays * numberOfPeople;
      }
      
      // Calculate destinations cost (entry tickets)
      let destinationsCost = 0;
      for (const dest of selectedDestinations) {
        if (typeof dest.price === 'number') {
          destinationsCost += dest.price;
        } else if (dest.price && typeof dest.price.adult === 'number') {
          destinationsCost += dest.price.adult;
        }
      }
      destinationsCost *= numberOfPeople;
      
      // Calculate guides cost
      let guidesCost = 0;
      if (selectedGuideIds.length > 0) {
        const selectedGuides = availableGuides.filter(g => selectedGuideIds.includes(g.id));
        guidesCost = selectedGuides.reduce((sum, g) => sum + g.pricePerDay, 0) * numberOfDays;
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
    }
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

  if (!tripCost) {
    return (
      <div>
        <h3 className="font-semibold mb-3">Cost Estimate</h3>
        <div className="bg-white border rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">Loading cost estimate...</p>
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
