
import { useCallback } from 'react';
import { TripPlan } from '../../types';

export const useTripsState = () => {
  // Load trips from localStorage
  const loadTripsFromStorage = useCallback((): TripPlan[] | null => {
    try {
      const storedTripPlans = localStorage.getItem('tripPlans');
      if (storedTripPlans) {
        const parsedPlans = JSON.parse(storedTripPlans);
        if (Array.isArray(parsedPlans)) {
          return parsedPlans;
        } else {
          console.warn('Invalid trip plans data in localStorage');
          localStorage.removeItem('tripPlans');
        }
      }
      return null;
    } catch (error) {
      console.error('Error loading trips from storage:', error);
      return null;
    }
  }, []);

  // Save trips to localStorage
  const saveTripsToStorage = useCallback((tripPlans: TripPlan[]): void => {
    try {
      localStorage.setItem('tripPlans', JSON.stringify(tripPlans));
    } catch (error) {
      console.error('Error saving trips to storage:', error);
    }
  }, []);

  return {
    loadTripsFromStorage,
    saveTripsToStorage
  };
};
