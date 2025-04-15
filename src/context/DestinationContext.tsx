
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Destination } from '../types';
import { indiaDestinations } from '../data/destinations';
import { formatPrice } from '../utils/helpers';

interface DestinationContextType {
  destinations: Destination[];
  filteredDestinations: Destination[];
  loading: boolean;
  filters: {
    search: string;
    state: string;
    minPrice: number;
    maxPrice: number;
    crowdLevel: 'low' | 'medium' | 'high' | '';
  };
  updateFilter: (key: string, value: any) => void;
  clearFilters: () => void;
  getDestinationById: (id: string) => Destination | undefined;
  getCurrentCrowdLevel: (crowdData: { [key: string]: number }) => 'low' | 'medium' | 'high';
  getBestTimeToVisit: (crowdData: { [key: string]: number }) => string;
}

const DestinationContext = createContext<DestinationContextType | undefined>(undefined);

// Determine current hour in 24-hour format for crowd calculations
const getCurrentHour = () => {
  return new Date().getHours();
};

// Find the nearest time slot in crowd data
const getNearestTimeSlot = (hour: number, crowdData: { [key: string]: number }) => {
  const timeSlots = Object.keys(crowdData)
    .map(time => parseInt(time.split(':')[0]))
    .sort((a, b) => a - b);
  
  let nearest = timeSlots[0];
  let minDiff = Math.abs(hour - nearest);
  
  for (let i = 1; i < timeSlots.length; i++) {
    const diff = Math.abs(hour - timeSlots[i]);
    if (diff < minDiff) {
      minDiff = diff;
      nearest = timeSlots[i];
    }
  }
  
  return `${nearest.toString().padStart(2, '0')}:00`;
};

export const DestinationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState({
    search: '',
    state: '',
    minPrice: 0,
    maxPrice: 10000,
    crowdLevel: '',
  });

  useEffect(() => {
    // In a real app, this would be an API call
    setDestinations(indiaDestinations);
    setFilteredDestinations(indiaDestinations);
    setLoading(false);
  }, []);

  const getDestinationById = useCallback((id: string) => {
    return destinations.find(dest => dest.id === id);
  }, [destinations]);

  const getCurrentCrowdLevel = useCallback((crowdData: { [key: string]: number }) => {
    if (!crowdData) return 'medium';
    
    const currentHour = getCurrentHour();
    const nearestTimeSlot = getNearestTimeSlot(currentHour, crowdData);
    const crowdPercentage = crowdData[nearestTimeSlot] || 50;
    
    if (crowdPercentage <= 30) return 'low';
    if (crowdPercentage <= 70) return 'medium';
    return 'high';
  }, []);

  const getBestTimeToVisit = useCallback((crowdData: { [key: string]: number }) => {
    if (!crowdData) return 'Morning';
    
    const entries = Object.entries(crowdData)
      .filter(([time]) => {
        const hour = parseInt(time.split(':')[0]);
        return hour >= 8 && hour <= 18; // Consider only daytime hours
      })
      .sort(([, a], [, b]) => a - b);
    
    if (!entries.length) return 'Morning';
    
    const [bestTime] = entries[0];
    const hour = parseInt(bestTime.split(':')[0]);
    
    if (hour < 10) return 'Early Morning';
    if (hour < 12) return 'Morning';
    if (hour < 16) return 'Afternoon';
    return 'Evening';
  }, []);

  const updateFilter = useCallback((key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  useEffect(() => {
    setLoading(true);
    
    let filtered = [...destinations];
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(dest => 
        dest.name.toLowerCase().includes(searchLower) || 
        dest.city.toLowerCase().includes(searchLower) || 
        dest.state.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply state filter
    if (filters.state) {
      filtered = filtered.filter(dest => dest.state === filters.state);
    }
    
    // Apply price filter
    filtered = filtered.filter(dest => {
      const priceValue = dest.price?.adult || 0;
      return priceValue >= filters.minPrice && priceValue <= filters.maxPrice;
    });
    
    // Apply crowd level filter
    if (filters.crowdLevel) {
      filtered = filtered.filter(dest => 
        getCurrentCrowdLevel(dest.crowdData) === filters.crowdLevel
      );
    }
    
    setTimeout(() => {
      setFilteredDestinations(filtered);
      setLoading(false);
    }, 300);
  }, [filters, destinations, getCurrentCrowdLevel]);

  const clearFilters = useCallback(() => {
    setFilters({
      search: '',
      state: '',
      minPrice: 0,
      maxPrice: 10000,
      crowdLevel: '',
    });
  }, []);

  return (
    <DestinationContext.Provider
      value={{
        destinations,
        filteredDestinations,
        loading,
        filters,
        updateFilter,
        clearFilters,
        getDestinationById,
        getCurrentCrowdLevel,
        getBestTimeToVisit
      }}
    >
      {children}
    </DestinationContext.Provider>
  );
};

export const useDestinations = () => {
  const context = useContext(DestinationContext);
  if (context === undefined) {
    throw new Error('useDestinations must be used within a DestinationProvider');
  }
  return context;
};
