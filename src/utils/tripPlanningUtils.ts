export const getTransportAmenities = (type: string, isOvernight: boolean) => {
  const base = {
    'bus': ['Air Conditioning', 'Comfortable Seats', 'Onboard Entertainment'],
    'train': ['Dining Car', 'Comfortable Seating', 'Luggage Space'],
    'flight': ['In-flight Service', 'Meals & Refreshments', 'Entertainment System'],
    'car': ['Privacy', 'Flexibility', 'Door-to-door Service']
  }[type as 'bus' | 'train' | 'flight' | 'car'] || [];
  
  const overnight = {
    'bus': ['Sleeper Berths', 'Blankets & Pillows', 'Rest Stops'],
    'train': ['Sleeper Cabins', 'Bedding', '24hr Service'],
    'flight': ['Night Kits', 'Dimmed Cabin', 'Reclining Seats'],
    'car': ['Hotel Stops', 'Rest Areas', 'Driver Changes']
  }[type as 'bus' | 'train' | 'flight' | 'car'] || [];
  
  return isOvernight ? [...base, ...overnight] : base;
};

export const calculateTravelDetails = (distance: number, transportType: 'bus' | 'train' | 'flight' | 'car') => {
  let speed = 0;
  let transportTypes: string[] = [];

  switch (transportType) {
    case 'bus':
      speed = 45;
      transportTypes = ['AC Luxury Sleeper', 'AC Deluxe', 'Standard Bus', 'Non-AC Bus'];
      break;
    case 'train':
      speed = 60;
      transportTypes = ['Vande Bharat Express', 'Rajdhani Express', 'Express Train', 'Sleeper Train'];
      break;
    case 'flight':
      speed = 500;
      transportTypes = ['Business Class', 'Premium Economy', 'Economy', 'Budget Airline'];
      break;
    case 'car':
      speed = 50;
      transportTypes = ['Luxury Sedan', 'Premium SUV', 'Standard Sedan', 'Compact Car'];
      break;
  }

  const timeInHours = distance / speed;
  const hours = Math.floor(timeInHours);
  const minutes = Math.round((timeInHours - hours) * 60);
  const timeFormatted = `${hours}h ${minutes}m`;

  // Calculate departure and arrival times
  const departureTime = '08:00';
  let arrivalHour = 8 + hours;
  let arrivalMinute = minutes;
  
  if (arrivalHour >= 24) {
    arrivalHour = arrivalHour - 24;
  }
  
  const arrivalTime = `${arrivalHour.toString().padStart(2, '0')}:${arrivalMinute.toString().padStart(2, '0')}`;
  
  // Travel day classification
  let travelDayType = 'same-day';
  if (timeInHours > 8) {
    travelDayType = 'overnight';
  } else if (timeInHours > 4) {
    travelDayType = 'half-day';
  }

  return {
    time: timeInHours,
    timeFormatted,
    speed,
    transportTypes,
    departureTime,
    arrivalTime,
    travelDayType,
    restStopsNeeded: Math.floor(timeInHours / 3), // One rest stop every 3 hours
    fuelStopsNeeded: transportType === 'car' ? Math.floor(distance / 300) : 0 // One fuel stop every 300km for cars
  };
};

export const getOptimalTransportForDistance = (distance: number): 'bus' | 'train' | 'flight' | 'car' => {
  if (distance > 1000) return 'flight';
  if (distance > 300) return 'train';
  if (distance > 100) return 'car';
  return 'bus';
};

export const calculateTransportCost = (distance: number, transportType: string, isPremium: boolean = false) => {
  // Base cost calculations based on transport type
  let baseCost = 0;
  
  switch(transportType) {
    case 'bus':
      // Base fare + per km cost
      baseCost = 300 + (distance * 2.5);
      break;
    case 'train':
      // Base fare + per km cost (higher than bus)
      baseCost = 500 + (distance * 3.5);
      break;
    case 'flight':
      // High base fare + per km cost (lower per km than others due to high base)
      baseCost = 2500 + (distance * 5);
      break;
    case 'car':
      // Higher per km cost (includes fuel, depreciation, driver)
      baseCost = 1000 + (distance * 12);
      break;
    default:
      baseCost = distance * 5; // Default calculation
  }
  
  // Calculate travel time to determine if overnight amenities are needed
  const travelTimeHours = distance / getSpeedForTransport(transportType);
  const isOvernight = travelTimeHours > 8;
  
  // Add costs for overnight travel if needed
  if (isOvernight) {
    switch(transportType) {
      case 'bus':
        baseCost += 500; // Sleeper bus costs more
        break;
      case 'train':
        baseCost += 800; // Sleeper cabin costs
        break;
      case 'flight':
        baseCost += 1200; // Night flight premium
        break;
      case 'car':
        baseCost += 2000; // Driver change and overnight stays
        break;
    }
  }
  
  // Adjustment for transport type quality levels
  const qualityMultiplier = {
    'bus': { basic: 0.8, standard: 1, premium: 1.3 },
    'train': { basic: 0.8, standard: 1, premium: 1.5 },
    'flight': { basic: 0.9, standard: 1, premium: 2.5 },
    'car': { basic: 0.7, standard: 1, premium: 1.8 },
  };
  
  // Get the standard quality multiplier for the transport type
  const multiplier = qualityMultiplier[transportType as keyof typeof qualityMultiplier]?.standard || 1;
  baseCost *= multiplier;
  
  // Premium discount (10% off for premium users)
  if (isPremium) {
    baseCost *= 0.9;
  }
  
  return baseCost;
};

function getSpeedForTransport(transportType: string): number {
  switch(transportType) {
    case 'bus': return 45; // km/h
    case 'train': return 60; // km/h
    case 'flight': return 500; // km/h
    case 'car': return 50; // km/h
    default: return 50; // default speed
  }
}

// Generate detailed itinerary with activities
export const generateDetailedSchedule = (destinationType: string, dayType: 'arrival' | 'full' | 'departure', travelStyle: 'base-hotel' | 'mobile' = 'mobile') => {
  // Base schedule templates based on destination type and day type
  const scheduleTemplates = {
    'arrival': {
      'base-hotel': [
        {time: '09:00', activity: 'Check-in at base hotel', notes: 'Drop luggage, freshen up'},
        {time: '11:00', activity: 'Local orientation and area exploration'},
        {time: '13:00', activity: 'Lunch at nearby restaurant'},
        {time: '15:00', activity: 'Brief visit to closest attraction'},
        {time: '18:00', activity: 'Return to hotel and relax'},
        {time: '20:00', activity: 'Dinner at hotel or nearby restaurant'}
      ],
      'mobile': [
        {time: '10:00', activity: 'Arrive at destination'},
        {time: '11:00', activity: 'Local orientation and area exploration'},
        {time: '13:00', activity: 'Lunch at popular local spot'},
        {time: '15:00', activity: 'Visit first attraction'},
        {time: '17:00', activity: 'Check-in at hotel', notes: 'Freshen up and relax'},
        {time: '20:00', activity: 'Dinner and local experiences'}
      ]
    },
    'departure': {
      'base-hotel': [
        {time: '07:00', activity: 'Breakfast at hotel'},
        {time: '08:30', activity: 'Check-out and luggage storage'},
        {time: '09:30', activity: 'Last-minute shopping or sightseeing'},
        {time: '12:00', activity: 'Lunch at favorite spot'},
        {time: '14:00', activity: 'Departure preparation'},
        {time: '16:00', activity: 'Depart for next destination or home'}
      ],
      'mobile': [
        {time: '07:00', activity: 'Early breakfast'},
        {time: '08:30', activity: 'Check-out from hotel'},
        {time: '09:30', activity: 'Brief visit to missed attractions'},
        {time: '12:00', activity: 'Final meal at destination'},
        {time: '14:00', activity: 'Departure preparation'},
        {time: '16:00', activity: 'Depart for next destination'}
      ]
    },
    'full': {
      'any': [
        {time: '08:00', activity: 'Breakfast'},
        {time: '09:30', activity: 'Morning activity/sightseeing'},
        {time: '12:30', activity: 'Lunch'},
        {time: '14:00', activity: 'Afternoon activity/sightseeing'},
        {time: '17:00', activity: 'Free time/relaxation'},
        {time: '19:30', activity: 'Dinner and evening activities'}
      ]
    }
  };
  
  // Get the base schedule based on day type and travel style
  let baseSchedule;
  if (dayType === 'full') {
    baseSchedule = scheduleTemplates.full.any;
  } else {
    baseSchedule = scheduleTemplates[dayType][travelStyle] || scheduleTemplates[dayType].mobile;
  }
  
  // Customize activities based on destination type
  const customizedSchedule = baseSchedule.map(item => {
    // Keep the time slot the same
    const newItem = { ...item };
    
    // Customize activities based on destination type for specific times
    switch (destinationType) {
      case 'beach':
        if (item.time === '09:30') newItem.activity = 'Beach walk and swimming';
        if (item.time === '14:00') newItem.activity = 'Water sports or sunbathing';
        if (item.time === '19:30') newItem.activity = 'Seafood dinner at beachside restaurant';
        break;
      case 'mountain':
        if (item.time === '09:30') newItem.activity = 'Hiking on scenic trails';
        if (item.time === '14:00') newItem.activity = 'Visit to viewpoint or nature walk';
        if (item.time === '19:30') newItem.activity = 'Dinner at mountain lodge';
        break;
      case 'historical':
        if (item.time === '09:30') newItem.activity = 'Visit to historical monuments';
        if (item.time === '14:00') newItem.activity = 'Guided tour of heritage sites';
        if (item.time === '19:30') newItem.activity = 'Dinner at traditional restaurant';
        break;
      case 'city':
        if (item.time === '09:30') newItem.activity = 'City sightseeing tour';
        if (item.time === '14:00') newItem.activity = 'Shopping and local market exploration';
        if (item.time === '19:30') newItem.activity = 'Dinner and nightlife experience';
        break;
    }
    
    return newItem;
  });
  
  return customizedSchedule;
};
