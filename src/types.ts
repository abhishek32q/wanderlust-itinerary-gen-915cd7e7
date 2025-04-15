
// Destination Types
export interface Destination {
  id: string;
  name: string;
  city: string;
  state: string;
  description: string;
  image: string;
  crowdData: { [key: string]: number };
  price: PriceType;
  rating: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  bestTimeToVisit: string;
  tags: string[];
  attractions?: string[];
}

export interface PriceType {
  adult: number;
  child: number;
  foreigner: number;
  includes: string[];
}

// Hotel Types
export interface HotelType {
  id: string;
  name: string;
  destinationId: string;
  type: 'budget' | 'standard' | 'luxury';
  rating: number;
  pricePerPerson: number;
  checkInTime?: string;
  checkOutTime?: string;
  amenities: string[];
  location: {
    address: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    distanceFromCenter: number;
    proximityScore: number;
  };
}

// Transport Types
export interface TransportType {
  id: string;
  name: string;
  type: 'bus' | 'train' | 'flight' | 'car';
  pricePerPerson: number;
  amenities: string[];
  transportTypes: string[];
}

// Guide Types
export interface GuideType {
  id: string;
  name: string;
  destinationId: string;
  pricePerDay: number;
  languages: string[];
  expertise: string[];
  rating: number;
  image?: string;
}

// Trip Plan Types
export interface TripPlan {
  id: string;
  userId: string;
  name: string;
  numberOfDays: number;
  numberOfPeople: number;
  startDate: string;
  endDate: string;
  selectedDestinations: string[];
  selectedHotels?: HotelType[];
  transportType: 'bus' | 'train' | 'flight' | 'car';
  guideIds?: string[];
  travelStyle?: 'base-hotel' | 'mobile';
  itinerary: TripItineraryDay[];
  totalCost?: number;
  isPremium?: boolean;
  createdAt: string;
  hotelProximityScore?: number;
}

export interface TripItineraryDay {
  day: number;
  date: Date;
  destinationId: string;
  destinationName: string;
  activities: string[];
  isTransitDay: boolean;
  transportDetails?: {
    fromDestination: string;
    toDestination: string;
    distance: number;
    duration: string;
    departureTime: string;
    arrivalTime: string;
  };
  detailedSchedule?: {
    time: string;
    activity: string;
    location: string;
    notes?: string;
  }[];
  hotels?: HotelType[];
  departureTime?: string;
  arrivalTime?: string;
  freshUpStops?: {
    time: string;
    location: string;
  }[];
}

// Trip Planning Context Type
export interface TripPlanningContextType {
  hotels: HotelType[];
  transports: TransportType[];
  guides: GuideType[];
  tripPlans: TripPlan[];
  loading: boolean;
  error: string | null;
  getHotelsByDestination: (destinationId: string) => HotelType[];
  getGuidesByDestination: (destinationId: string) => GuideType[];
  calculateTripCost: (options: {
    destinationIds: string[];
    guideIds: string[];
    hotelType: 'budget' | 'standard' | 'luxury';
    transportType: 'bus' | 'train' | 'flight' | 'car';
    numberOfDays: number;
    numberOfPeople: number;
  }) => {
    destinationsCost: number;
    hotelsCost: number;
    transportCost: number;
    guidesCost: number;
    totalCost: number;
  };
  saveTripPlan: (
    tripPlanData: Omit<TripPlan, 'id' | 'createdAt'>
  ) => Promise<string>;
  getUserTripPlans: (userId: string) => TripPlan[];
  getTripPlanById: (id: string) => TripPlan | undefined;
  cancelTripPlan: (tripPlanId: string) => Promise<void>;
  checkTripFeasibility: (options: {
    destinationIds: string[];
    transportType: 'bus' | 'train' | 'flight' | 'car';
    numberOfDays: number;
  }) => {
    feasible: boolean;
    daysNeeded: number;
    daysShort?: number;
    breakdown: {
      fromId: string;
      toId: string;
      fromName: string;
      toName: string;
      distanceKm: number;
      travelHours: number;
    }[];
    totalDistance: number;
    totalTravelHours: number;
  };
  generateOptimalItinerary: (options: {
    destinationIds: string[];
    transportType: 'bus' | 'train' | 'flight' | 'car';
    numberOfDays: number;
    startDate: Date;
    travelStyle?: 'base-hotel' | 'mobile';
    isPremium?: boolean;
  }) => TripItineraryDay[];
  calculateDistanceBetweenDestinations: (from: Destination, to: Destination) => number;
  getDistanceMatrix: (
    destinationIds: string[]
  ) => {
    fromId: string;
    toId: string;
    fromName: string;
    toName: string;
    distanceKm: number;
    travelTimesByTransport: {
      bus: number;
      train: number;
      flight: number;
      car: number;
    };
  }[];
  getSuggestedTransport: (
    destinationIds: string[],
    numberOfDays: number,
    isPremium?: boolean
  ) => {
    recommendedType: 'bus' | 'train' | 'flight' | 'car';
    alternativeType: 'bus' | 'train' | 'flight' | 'car';
    reasoning: string;
    totalDistanceKm: number;
    totalTravelTimeHours: number;
    timeForSightseeing: number;
    isRealistic: boolean;
    premiumAdvantages?: string[];
  };
  getTransportAmenities: (type: string, isOvernight: boolean) => string[];
  getOptimalHotels: (destinationIds: string[]) => HotelType[];
  getNearbyHotels: (destinationId: string, limit?: number) => HotelType[];
  calculateHotelProximity: (hotel: HotelType, destination: Destination) => HotelType;
}
