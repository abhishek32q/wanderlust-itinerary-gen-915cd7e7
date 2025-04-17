
import React, { createContext, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TripPlanningContextType, TripPlan } from '../../types';
import { useToast } from '../../hooks/use-toast';
import { useBookings } from '../BookingContext';
import { useTripsState } from './useTripsState';
import { useTripsCalculation } from './useTripsCalculation';
import { hotels } from '../../data/hotels';
import { transports } from '../../data/transports';
import { guides } from '../../data/guides';

const TripPlanningContext = createContext<TripPlanningContextType | undefined>(undefined);

export const TripPlanningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tripPlans, setTripPlans] = useState<TripPlan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { saveTripPlan: saveBookingTripPlan } = useBookings();
  
  const {
    loadTripsFromStorage,
    saveTripsToStorage
  } = useTripsState();
  
  const {
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
  } = useTripsCalculation();

  // Initialize trip plans from localStorage
  useEffect(() => {
    try {
      const storedPlans = loadTripsFromStorage();
      if (storedPlans) {
        setTripPlans(storedPlans);
      }
    } catch (err) {
      console.error('Error initializing trip plans:', err);
      setError('Failed to load trip plans');
    } finally {
      setLoading(false);
    }
  }, [loadTripsFromStorage]);

  // Persist trip plans to localStorage
  useEffect(() => {
    if (tripPlans.length > 0 || !loading) {
      try {
        saveTripsToStorage(tripPlans);
      } catch (err) {
        console.error('Failed to save trip plans to localStorage:', err);
      }
    }
  }, [tripPlans, loading, saveTripsToStorage]);

  // Save trip plan with validation
  const saveTripPlan = async (tripPlanData: Omit<TripPlan, 'id' | 'createdAt'>): Promise<string> => {
    setError(null);
    setLoading(true);

    try {
      if (!tripPlanData.selectedDestinations?.length) {
        throw new Error('At least one destination is required');
      }

      const newTripPlanId = `trip_${uuidv4()}`;
      const transportType = tripPlanData.transportType || 'car';
      
      const optimalHotels = getOptimalHotels(tripPlanData.selectedDestinations);
      
      const itinerary = generateOptimalItinerary({
        destinationIds: tripPlanData.selectedDestinations,
        transportType,
        numberOfDays: tripPlanData.numberOfDays,
        startDate: new Date(tripPlanData.startDate),
        travelStyle: tripPlanData.travelStyle,
        isPremium: tripPlanData.isPremium
      });
      
      const avgProximityScore = optimalHotels.reduce((sum, hotel) => 
        sum + hotel.location.proximityScore, 0) / optimalHotels.length;

      const newTripPlan: TripPlan = {
        ...tripPlanData,
        id: newTripPlanId,
        createdAt: new Date().toISOString(),
        transportType,
        selectedHotels: optimalHotels,
        itinerary,
        hotelProximityScore: avgProximityScore
      };

      setTripPlans(prev => [...prev, newTripPlan]);
      await saveBookingTripPlan(newTripPlan);
      
      toast({
        title: 'Trip Plan Saved!',
        description: 'Your trip plan has been created successfully.',
      });

      return newTripPlanId;
    } catch (err) {
      const errorMsg = (err as Error).message || 'Failed to create trip plan';
      setError(errorMsg);
      toast({
        title: 'Trip Planning Failed',
        description: errorMsg,
        variant: 'destructive',
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get user trip plans
  const getUserTripPlans = (userId: string) => {
    return tripPlans.filter(plan => plan.userId === userId);
  };

  // Get trip plan by ID
  const getTripPlanById = (id: string) => {
    return tripPlans.find(plan => plan.id === id);
  };

  // Cancel trip plan
  const cancelTripPlan = async (tripPlanId: string) => {
    setLoading(true);
    try {
      setTripPlans(prev => prev.filter(plan => plan.id !== tripPlanId));
      toast({
        title: 'Trip Cancelled',
        description: 'Your trip has been cancelled.',
      });
    } catch (err) {
      setError('Failed to cancel trip');
      toast({
        title: 'Cancellation Failed',
        description: 'Failed to cancel trip',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getGuidesByDestination = (destId: string) => {
    return guides.filter(g => g.destinationId === destId);
  };

  return (
    <TripPlanningContext.Provider
      value={{
        hotels,
        transports,
        guides,
        tripPlans,
        loading,
        error,
        getHotelsByDestination,
        getGuidesByDestination,
        calculateTripCost,
        saveTripPlan,
        getUserTripPlans,
        getTripPlanById,
        cancelTripPlan,
        checkTripFeasibility,
        generateOptimalItinerary,
        calculateDistanceBetweenDestinations,
        getDistanceMatrix,
        getSuggestedTransport,
        getTransportAmenities,
        getOptimalHotels,
        getNearbyHotels,
        calculateHotelProximity
      }}
    >
      {children}
    </TripPlanningContext.Provider>
  );
};

// Hook for using trip planning context
export const useTripPlanning = () => {
  const context = useContext(TripPlanningContext);
  if (context === undefined) {
    throw new Error('useTripPlanning must be used within a TripPlanningProvider');
  }
  return context;
};
