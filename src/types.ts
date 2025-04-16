
// Define application-wide types

export interface Destination {
  id: string;
  name: string;
  city: string;
  state: string;
  description: string;
  image: string;
  rating: number;
  price: number | PriceType;
  bestTimeToVisit: string;
  openingHours?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  crowdData: Record<string, number>;
  attractions?: string[]; // Added attractions property
}

export interface PriceType {
  adult: number;
  child?: number;
  foreigner?: number;
  includes?: string[];
}

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
    coordinates: {
      lat: number;
      lng: number;
    };
    distanceFromCenter: number;
    proximityScore: number;
  };
}

export interface TransportType {
  id: string;
  type: 'bus' | 'train' | 'flight' | 'car';
  name: string;
  pricePerPerson: number;
  amenities: string[];
}

export interface GuideType {
  id: string;
  name: string;
  destinationId: string;
  languages: string[];
  pricePerDay: number;
  rating: number;
}

export interface TripItineraryDay {
  day: number;
  date: string;
  destinationId: string;
  destinationName: string;
  isTransitDay: boolean;
  transportDetails?: {
    fromDestination?: string;
    distance?: number;
    departureTime?: string;
    arrivalTime?: string;
    transportType?: string;
  };
  freshUpStops?: Array<{
    time: string;
    location: string;
  }>;
  detailedSchedule?: Array<{
    time: string;
    activity: string;
    notes?: string;
  }>;
  hotels?: HotelType[];
}

export interface TripPlan {
  id: string;
  userId: string;
  createdAt: string;
  startDate: string;
  numberOfDays: number;
  selectedDestinations: string[];
  destinationNames?: string[];
  transportType?: 'bus' | 'train' | 'flight' | 'car';
  travelStyle?: 'base-hotel' | 'mobile';
  selectedHotels?: HotelType[];
  hotelProximityScore?: number;
  itinerary?: TripItineraryDay[];
  totalPrice?: number;
  status?: 'pending' | 'confirmed' | 'cancelled';
  isPremium?: boolean;
}

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
  saveTripPlan: (tripPlanData: Omit<TripPlan, 'id' | 'createdAt'>) => Promise<string>;
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
    breakdown: Array<{
      fromId: string;
      toId: string;
      fromName: string;
      toName: string;
      distanceKm: number;
      travelHours: number;
    }>;
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
  getDistanceMatrix: (destinationIds: string[]) => Array<{
    fromId: string;
    toId: string;
    fromName: string;
    toName: string;
    distanceKm: number;
    travelTimesByTransport: Record<'bus' | 'train' | 'flight' | 'car', number>;
  }>;
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
