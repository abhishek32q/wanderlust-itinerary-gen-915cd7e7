
import { Bus, Train, Plane, Car } from 'lucide-react';

/**
 * Get transport amenities based on type and overnight option
 */
export const getTransportAmenities = (type: string, isOvernight: boolean = false) => {
  const base = {
    'bus': ['AC', 'WiFi', 'Reclining Seats'],
    'train': ['Dining', 'Charging Points', 'Toilets'],
    'flight': ['In-flight Service', 'Meals', 'Entertainment'],
    'car': ['Privacy', 'Flexibility', 'Door-to-door']
  }[type as 'bus' | 'train' | 'flight' | 'car'] || ['Comfort'];
  
  return isOvernight ? [...base, 'Overnight option', 'Blankets'] : base;
};

/**
 * Get transport types based on transport category
 */
export const getTransportTypes = (transportType: 'bus' | 'train' | 'flight' | 'car'): string[] => {
  switch (transportType) {
    case 'bus':
      return ['Ordinary', 'AC Seater', 'AC Sleeper', 'Volvo Luxury'];
    case 'train':
      return ['Sleeper', 'AC 3 Tier', 'AC 2 Tier', 'AC First Class', 'Vande Bharat'];
    case 'flight':
      return ['Economy', 'Premium Economy', 'Business Class', 'First Class'];
    case 'car':
      return ['Hatchback', 'Sedan', 'SUV', 'Luxury Sedan'];
    default:
      return ['Standard'];
  }
};

/**
 * Get best transport type based on distance and days
 */
export const getSuggestedTransport = (
  totalDistanceKm: number,
  numberOfDays: number,
  isPremium: boolean = false
) => {
  let recommendedType: 'bus' | 'train' | 'flight' | 'car' = 'car';
  let reasoning = '';
  
  if (totalDistanceKm > 1000) {
    recommendedType = 'flight';
    reasoning = 'Best for long distances over 1000km';
  } else if (totalDistanceKm > 300) {
    recommendedType = 'train';
    reasoning = 'Comfortable for medium distances';
  } else if (numberOfDays > 7) {
    recommendedType = 'car';
    reasoning = 'Flexibility for longer trips';
  } else {
    recommendedType = 'bus';
    reasoning = 'Economical for short trips';
  }
  
  let alternativeType: 'bus' | 'train' | 'flight' | 'car';
  if (recommendedType === 'flight') alternativeType = 'train';
  else if (recommendedType === 'train') alternativeType = 'car';
  else if (recommendedType === 'car') alternativeType = 'bus';
  else alternativeType = 'car';
  
  return {
    recommendedType,
    alternativeType,
    reasoning,
    totalDistanceKm,
    totalTravelTimeHours: calculateTravelTimeHours(totalDistanceKm, recommendedType),
    timeForSightseeing: (numberOfDays * 8) - calculateTravelTimeHours(totalDistanceKm, recommendedType),
    isRealistic: ((numberOfDays * 8) - calculateTravelTimeHours(totalDistanceKm, recommendedType)) > 0,
    premiumAdvantages: isPremium ? [
      'Priority boarding',
      'Extra luggage allowance',
      'Flexible cancellation',
      'Premium seating'
    ] : undefined
  };
};

/**
 * Calculate travel time based on distance and transport type
 */
export const calculateTravelTimeHours = (distanceKm: number, transportType: 'bus' | 'train' | 'flight' | 'car'): number => {
  const speeds = {
    'bus': 45, // km/h
    'train': 60,
    'flight': 500,
    'car': 50
  };
  
  const baseTime = distanceKm / speeds[transportType];
  
  // Add additional time for flights (boarding, security, etc.)
  if (transportType === 'flight') {
    return baseTime + 1.5;
  }
  
  return baseTime;
};

/**
 * Format the transport details for display
 */
export const getTransportDetails = (type: string) => {
  switch(type) {
    case 'bus':
      return {
        advantages: ['Economical', 'Multiple stops', 'No parking needed'],
        overnight: 'Sleeper available for long routes',
        icon: Bus,
        transportTypes: getTransportTypes('bus')
      };
    case 'train':
      return {
        advantages: ['Comfortable', 'Scenic views', 'No traffic'],
        overnight: 'Sleeper/AC options available',
        icon: Train,
        transportTypes: getTransportTypes('train')
      };
    case 'flight':
      return {
        advantages: ['Fastest option', 'Best for long distances', 'Time-saving'],
        overnight: 'Red-eye flights available',
        icon: Plane,
        transportTypes: getTransportTypes('flight')
      };
    case 'car':
      return {
        advantages: ['Flexible schedule', 'Door-to-door convenience', 'Privacy'],
        overnight: 'Not recommended, find hotels',
        icon: Car,
        transportTypes: getTransportTypes('car')
      };
    default:
      return {
        advantages: ['Flexible schedule', 'Door-to-door convenience', 'Privacy'],
        overnight: 'Not recommended, find hotels',
        icon: Car,
        transportTypes: ['Standard']
      };
  }
};
