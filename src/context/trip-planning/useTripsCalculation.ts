
import { useCallback } from 'react';
import { useDestinations } from '../DestinationContext';
import { Destination, HotelType, TripItineraryDay } from '../../types';
import { hotels } from '../../data/hotels';
import { generateOptimalItinerary as generateItinerary } from '../../utils/travelCalculator';
import { getTransportAmenities as getTransportAmenitiesUtil } from '../../utils/tripPlanningUtils';

export const useTripsCalculation = () => {
  const { destinations } = useDestinations();

  // Calculate distance using Haversine formula
  const calculateDistance = useCallback((lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }, []);

  // Calculate distance between destinations
  const calculateDistanceBetweenDestinations = useCallback((from: Destination, to: Destination): number => {
    if (!from.coordinates || !to.coordinates) return 0;
    return calculateDistance(
      from.coordinates.lat,
      from.coordinates.lng,
      to.coordinates.lat,
      to.coordinates.lng
    );
  }, [calculateDistance]);

  // Calculate hotel proximity
  const calculateHotelProximity = useCallback((hotel: HotelType, destination: Destination): HotelType => {
    if (!destination.coordinates) return hotel;
    
    const distance = calculateDistance(
      hotel.location.coordinates.lat,
      hotel.location.coordinates.lng,
      destination.coordinates.lat,
      destination.coordinates.lng
    );
    
    const proximityScore = Math.max(1, 10 - Math.floor(distance / 2));
    
    return {
      ...hotel,
      location: {
        ...hotel.location,
        distanceFromCenter: distance,
        proximityScore
      }
    };
  }, [calculateDistance]);

  // Get hotels by destination with proximity data
  const getHotelsByDestination = useCallback((destinationId: string): HotelType[] => {
    const destination = destinations.find(d => d.id === destinationId);
    return hotels
      .filter(hotel => hotel.destinationId === destinationId)
      .map(hotel => destination ? calculateHotelProximity(hotel, destination) : hotel);
  }, [destinations, calculateHotelProximity]);

  // Get nearby hotels sorted by distance
  const getNearbyHotels = useCallback((destinationId: string, limit = 3) => {
    return getHotelsByDestination(destinationId)
      .sort((a, b) => a.location.distanceFromCenter - b.location.distanceFromCenter)
      .slice(0, limit);
  }, [getHotelsByDestination]);

  // Get optimal hotels that balance proximity across destinations
  const getOptimalHotels = useCallback((destinationIds: string[]): HotelType[] => {
    const destinationHotels = destinationIds.map(destId => {
      const destination = destinations.find(d => d.id === destId);
      return hotels
        .filter(h => h.destinationId === destId)
        .map(h => destination ? calculateHotelProximity(h, destination) : h);
    });

    const avgProximity = destinationHotels.reduce((sum, hotels) => {
      const destAvg = hotels.reduce((sum, hotel) => sum + hotel.location.proximityScore, 0) / hotels.length;
      return sum + destAvg;
    }, 0) / destinationIds.length;

    return destinationHotels.map(hotels => 
      hotels.sort((a, b) => 
        Math.abs(a.location.proximityScore - avgProximity) - 
        Math.abs(b.location.proximityScore - avgProximity)
      )[0]
    );
  }, [destinations, calculateHotelProximity]);

  // Get distance matrix between destinations
  const getDistanceMatrix = useCallback((destinationIds: string[]) => {
    const selectedDestinations = destinationIds
      .map(id => destinations.find(d => d.id === id))
      .filter(Boolean) as Destination[];
    
    if (selectedDestinations.length < 2) return [];

    const matrix = [];
    for (let i = 0; i < selectedDestinations.length - 1; i++) {
      const from = selectedDestinations[i];
      const to = selectedDestinations[i + 1];
      const distance = calculateDistanceBetweenDestinations(from, to);
      
      matrix.push({
        fromId: from.id,
        toId: to.id,
        fromName: from.name,
        toName: to.name,
        distanceKm: distance,
        travelTimesByTransport: {
          bus: Math.round(distance / 45),
          train: Math.round(distance / 60),
          flight: Math.round(distance / 500) + 1.5, // Adding 1.5 hours for boarding/security
          car: Math.round(distance / 50)
        }
      });
    }
    return matrix;
  }, [destinations, calculateDistanceBetweenDestinations]);

  // Generate optimal itinerary with premium features
  const generateOptimalItinerary = useCallback((options: {
    destinationIds: string[];
    transportType: 'bus' | 'train' | 'flight' | 'car';
    numberOfDays: number;
    startDate: Date;
    travelStyle?: 'base-hotel' | 'mobile';
    isPremium?: boolean;
  }): TripItineraryDay[] => {
    // Use the improved function from travelCalculator.ts
    return generateItinerary(
      options,
      destinations,
      calculateDistanceBetweenDestinations
    );
  }, [destinations, calculateDistanceBetweenDestinations]);

  // Get transport amenities
  const getTransportAmenities = useCallback((type: string, isOvernight: boolean) => {
    return getTransportAmenitiesUtil(type, isOvernight);
  }, []);

  // Check trip feasibility
  const checkTripFeasibility = useCallback((options: {
    destinationIds: string[];
    transportType: 'bus' | 'train' | 'flight' | 'car';
    numberOfDays: number;
  }) => {
    const distanceMatrix = getDistanceMatrix(options.destinationIds);
    const totalDistance = distanceMatrix.reduce((sum, segment) => sum + segment.distanceKm, 0);
    const travelHours = distanceMatrix.reduce((sum, segment) => 
      sum + segment.travelTimesByTransport[options.transportType], 0);
    
    const daysNeeded = Math.ceil(travelHours / 8) + options.destinationIds.length;
    
    return {
      feasible: options.numberOfDays >= daysNeeded,
      daysNeeded,
      daysShort: options.numberOfDays < daysNeeded ? daysNeeded - options.numberOfDays : undefined,
      breakdown: distanceMatrix.map(segment => ({
        fromId: segment.fromId,
        toId: segment.toId,
        fromName: segment.fromName,
        toName: segment.toName,
        distanceKm: segment.distanceKm,
        travelHours: segment.travelTimesByTransport[options.transportType]
      })),
      totalDistance,
      totalTravelHours: travelHours
    };
  }, [getDistanceMatrix]);

  // Get suggested transport
  const getSuggestedTransport = useCallback((
    destinationIds: string[], 
    numberOfDays: number,
    isPremium?: boolean
  ) => {
    const distanceMatrix = getDistanceMatrix(destinationIds);
    const totalDistance = distanceMatrix.reduce((sum, segment) => sum + segment.distanceKm, 0);
    const totalTravelHours = {
      bus: distanceMatrix.reduce((sum, segment) => sum + segment.travelTimesByTransport.bus, 0),
      train: distanceMatrix.reduce((sum, segment) => sum + segment.travelTimesByTransport.train, 0),
      flight: distanceMatrix.reduce((sum, segment) => sum + segment.travelTimesByTransport.flight, 0),
      car: distanceMatrix.reduce((sum, segment) => sum + segment.travelTimesByTransport.car, 0)
    };
    
    let recommendedType: 'bus' | 'train' | 'flight' | 'car' = 'car';
    let alternativeType: 'bus' | 'train' | 'flight' | 'car' = 'train';
    let reasoning = '';
    
    if (totalDistance > 1000) {
      recommendedType = 'flight';
      alternativeType = 'train';
      reasoning = 'Best for long distances over 1000km';
    } else if (totalDistance > 300) {
      recommendedType = 'train';
      alternativeType = 'car';
      reasoning = 'Comfortable for medium distances';
    } else if (numberOfDays > 7) {
      recommendedType = 'car';
      alternativeType = 'bus';
      reasoning = 'Flexibility for longer trips';
    } else {
      recommendedType = 'bus';
      alternativeType = 'car';
      reasoning = 'Economical for short trips';
    }
    
    const sightseeingTime = (numberOfDays * 8) - totalTravelHours[recommendedType];
    
    return {
      recommendedType,
      alternativeType,
      reasoning,
      totalDistanceKm: totalDistance,
      totalTravelTimeHours: totalTravelHours[recommendedType],
      timeForSightseeing: sightseeingTime,
      isRealistic: sightseeingTime > 0,
      premiumAdvantages: isPremium ? [
        'Priority boarding',
        'Extra luggage allowance',
        'Flexible cancellation'
      ] : undefined
    };
  }, [getDistanceMatrix]);

  // Calculate trip costs
  const calculateTripCost = useCallback((options: {
    destinationIds: string[];
    guideIds: string[];
    hotelType: 'budget' | 'standard' | 'luxury';
    transportType: 'bus' | 'train' | 'flight' | 'car';
    numberOfDays: number;
    numberOfPeople: number;
  }) => {
    const selectedDestinations = options.destinationIds
      .map(id => destinations.find(d => d.id === id))
      .filter(Boolean) as Destination[];
      
    let destinationsCost = 0;
    
    for (const dest of selectedDestinations) {
      if (typeof dest.price === 'number') {
        destinationsCost += dest.price;
      } else if (dest.price && typeof dest.price.adult === 'number') {
        destinationsCost += dest.price.adult;
      }
    }
    
    destinationsCost *= options.numberOfPeople;
    
    const hotelCostPerDay = hotels
      .filter(h => options.destinationIds.includes(h.destinationId) && h.type === options.hotelType)
      .reduce((sum, h) => sum + h.pricePerPerson, 0) / options.destinationIds.length;
    const hotelsCost = hotelCostPerDay * options.numberOfPeople * options.numberOfDays;
    
    const transportCost = hotels
      .filter(t => t.type === options.hotelType)
      .reduce((sum, t) => sum + t.pricePerPerson, 0) * options.numberOfPeople;
    
    const guidesCost = hotels
      .filter(g => options.guideIds.includes(g.id))
      .reduce((sum, g) => sum + g.pricePerPerson, 0) * options.numberOfDays;
    
    return {
      destinationsCost,
      hotelsCost,
      transportCost,
      guidesCost,
      totalCost: destinationsCost + hotelsCost + transportCost + guidesCost
    };
  }, [destinations]);

  return {
    calculateDistance,
    calculateDistanceBetweenDestinations,
    calculateHotelProximity,
    getHotelsByDestination,
    getNearbyHotels,
    getOptimalHotels,
    getDistanceMatrix,
    generateOptimalItinerary,
    getTransportAmenities,
    checkTripFeasibility,
    getSuggestedTransport,
    calculateTripCost
  };
};
