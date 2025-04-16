
export const getTransportAmenities = (type: string, isOvernight: boolean) => {
  const base = {
    'bus': ['AC', 'Seats'],
    'train': ['Dining', 'Seats'],
    'flight': ['Service', 'Meals'],
    'car': ['Privacy', 'Flexibility']
  }[type as 'bus' | 'train' | 'flight' | 'car'] || [];
  return isOvernight ? [...base, 'Overnight option'] : base;
};

export const calculateTravelDetails = (distance: number, transportType: 'bus' | 'train' | 'flight' | 'car') => {
  let speed = 0;
  let transportTypes: string[] = [];

  switch (transportType) {
    case 'bus':
      speed = 45;
      transportTypes = ['AC Sleeper', 'Deluxe', 'Semi-Sleeper'];
      break;
    case 'train':
      speed = 60;
      transportTypes = ['AC First Class', 'AC 2-Tier', 'AC 3-Tier'];
      break;
    case 'flight':
      speed = 500;
      transportTypes = ['Economy', 'Premium Economy', 'Business'];
      break;
    case 'car':
      speed = 50;
      transportTypes = ['Sedan', 'SUV', 'Luxury'];
      break;
  }

  const timeInHours = distance / speed;
  const timeFormatted = `${Math.floor(timeInHours)}h ${Math.round((timeInHours % 1) * 60)}m`;

  return {
    time: timeInHours,
    timeFormatted,
    speed,
    transportTypes
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
    'bus': 2,
    'train': 3,
    'flight': 4,
    'car': 10
  };
  
  const baseRate = rates[transportType] || 5;
  const cost = distance * baseRate;
  
  if (transportType === 'flight') {
    return 2000 + cost;
  }
  
  return isPremium ? cost * 0.9 : cost; // 10% discount for premium users
};
