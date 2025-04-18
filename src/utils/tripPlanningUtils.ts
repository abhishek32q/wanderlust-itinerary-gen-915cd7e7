
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
  const rates: Record<string, number> = {
    'bus': 2.5,
    'train': 3.5,
    'flight': 5,
    'car': 12
  };
  
  const baseRate = rates[transportType] || 5;
  const cost = distance * baseRate;
  
  if (transportType === 'flight') {
    // Base fare + distance-based fare
    return 2500 + (cost * 0.8);
  }
  
  // Premium discount
  return isPremium ? cost * 0.9 : cost; // 10% discount for premium users
};

// Generate detailed itinerary with activities
export const generateDetailedSchedule = (destinationType: string, dayType: 'arrival' | 'full' | 'departure') => {
  const activities: Record<string, Array<{time: string, activity: string, notes?: string}>> = {
    'beach': [
      {time: '09:00', activity: 'Breakfast at beachside cafe', notes: 'Try local seafood specialties'},
      {time: '10:30', activity: 'Beach relaxation time', notes: 'Sunbathing and swimming'},
      {time: '13:00', activity: 'Lunch at beach shack'},
      {time: '14:30', activity: 'Water sports activities', notes: 'Parasailing, jet ski available'},
      {time: '16:30', activity: 'Beach volleyball'},
      {time: '18:00', activity: 'Sunset walk on the beach'},
      {time: '19:30', activity: 'Seafood dinner', notes: 'Fresh catch of the day'}
    ],
    'mountain': [
      {time: '07:00', activity: 'Early breakfast'},
      {time: '08:30', activity: 'Hiking expedition', notes: 'Moderate difficulty trail'},
      {time: '12:30', activity: 'Picnic lunch at viewpoint'},
      {time: '14:00', activity: 'Visit local handicraft village'},
      {time: '16:00', activity: 'Tea at mountain cafe'},
      {time: '17:30', activity: 'Photography at sunset point'},
      {time: '19:00', activity: 'Traditional dinner', notes: 'Local mountain cuisine'}
    ],
    'city': [
      {time: '08:30', activity: 'Breakfast at city cafe'},
      {time: '10:00', activity: 'City sightseeing tour', notes: 'Historical monuments and landmarks'},
      {time: '13:00', activity: 'Lunch at popular local restaurant'},
      {time: '14:30', activity: 'Shopping at local markets'},
      {time: '16:30', activity: 'Visit to museum/art gallery'},
      {time: '18:30', activity: 'Evening cultural show'},
      {time: '20:00', activity: 'Dinner at fine dining restaurant'}
    ],
    'historic': [
      {time: '08:00', activity: 'Breakfast at hotel'},
      {time: '09:30', activity: 'Guided tour of historical sites', notes: 'Ancient architecture exploration'},
      {time: '12:30', activity: 'Traditional lunch'},
      {time: '14:00', activity: 'Visit to local museum'},
      {time: '16:00', activity: 'Historical walking tour'},
      {time: '17:30', activity: 'Visit to heritage market'},
      {time: '19:30', activity: 'Dinner at heritage restaurant', notes: 'Traditional recipes'}
    ],
    'wildlife': [
      {time: '06:00', activity: 'Early morning safari', notes: 'Best time for wildlife spotting'},
      {time: '09:30', activity: 'Breakfast at jungle lodge'},
      {time: '11:00', activity: 'Visit to conservation center'},
      {time: '13:00', activity: 'Lunch at jungle retreat'},
      {time: '15:30', activity: 'Evening safari/nature walk'},
      {time: '18:00', activity: 'Birdwatching session'},
      {time: '19:30', activity: 'Dinner and wildlife documentary'}
    ]
  };
  
  // Default to city if type not found
  const scheduleTemplate = activities[destinationType] || activities['city'];
  
  if (dayType === 'arrival') {
    // Return afternoon and evening activities only
    return scheduleTemplate.filter(item => {
      const hour = parseInt(item.time.split(':')[0]);
      return hour >= 14;
    });
  } 
  else if (dayType === 'departure') {
    // Return morning and early afternoon activities only
    return scheduleTemplate.filter(item => {
      const hour = parseInt(item.time.split(':')[0]);
      return hour < 14;
    });
  }
  
  // Return full day schedule
  return scheduleTemplate;
};
