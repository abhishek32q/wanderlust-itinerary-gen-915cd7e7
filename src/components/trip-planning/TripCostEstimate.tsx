
import React, { useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import { Destination, GuideType } from '../../types';
import { useTripPlanning } from '../../context/trip-planning/TripPlanningContext';
import { calculateTransportCost } from '../../utils/tripPlanningUtils';

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
    getNearbyHotels
  } = useTripPlanning();
  
  const [tripCost, setTripCost] = useState<any>(null);
  const [totalDistance, setTotalDistance] = useState(0);
  const [availableGuides, setAvailableGuides] = useState<GuideType[]>([]);

  // Calculate total distance between destinations
  useEffect(() => {
    if (selectedDestinations.length > 1) {
      let distance = 0;
      for (let i = 0; i < selectedDestinations.length - 1; i++) {
        const from = selectedDestinations[i];
        const to = selectedDestinations[i + 1];
        distance += calculateDistanceBetweenDestinations(from, to);
      }
      setTotalDistance(distance);
    } else {
      setTotalDistance(0);
    }
  }, [selectedDestinations, calculateDistanceBetweenDestinations]);

  // Get available guides
  useEffect(() => {
    if (destinationIds.length > 0) {
      const guides = destinationIds.flatMap(destId => 
        getGuidesByDestination(destId)
      );
      setAvailableGuides(guides);
    }
  }, [destinationIds, getGuidesByDestination]);

  // Calculate trip costs
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
      if (totalDistance > 0) {
        transportCost = calculateTransportCost(totalDistance, transportType, isPremium);
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
        totalCost: transportCost + hotelsCost + destinationsCost + guidesCost
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
    getNearbyHotels
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
