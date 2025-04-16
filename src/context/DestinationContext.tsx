
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Destination } from '../types';

// Sample destination data
const sampleDestinations: Destination[] = [
  {
    id: "d1",
    name: "Taj Mahal",
    city: "Agra",
    state: "Uttar Pradesh",
    description: "One of the seven wonders of the world, the Taj Mahal is a beautiful white marble mausoleum built by Emperor Shah Jahan in memory of his wife Mumtaz Mahal.",
    image: "https://i.postimg.cc/nz9R0NPY/taj-mahal.jpg",
    rating: 4.8,
    price: {
      adult: 1100,
      child: 50,
      foreigner: 1100,
      includes: ["Entry", "Garden access"]
    },
    bestTimeToVisit: "October to March",
    coordinates: {
      lat: 27.1751,
      lng: 78.0421
    },
    crowdData: {
      "6:00": 15,
      "7:00": 20,
      "8:00": 35,
      "9:00": 60,
      "10:00": 90,
      "11:00": 95,
      "12:00": 85,
      "13:00": 75,
      "14:00": 80,
      "15:00": 70,
      "16:00": 60,
      "17:00": 40,
      "18:00": 25
    }
  },
  {
    id: "d2",
    name: "Jaipur City Palace",
    city: "Jaipur",
    state: "Rajasthan",
    description: "The City Palace was established at the same time as the city of Jaipur, by Maharaja Sawai Jai Singh II, who moved his court to Jaipur from Amber, in 1727.",
    image: "https://i.postimg.cc/htTQzSnj/jaipur-palace.jpg",
    rating: 4.5,
    price: {
      adult: 500,
      child: 200,
      foreigner: 1000
    },
    bestTimeToVisit: "November to February",
    coordinates: {
      lat: 26.9255,
      lng: 75.8236
    },
    crowdData: {
      "9:00": 30,
      "10:00": 40,
      "11:00": 70,
      "12:00": 75,
      "13:00": 65,
      "14:00": 60,
      "15:00": 80,
      "16:00": 85,
      "17:00": 60
    }
  },
  {
    id: "d3",
    name: "Calangute Beach",
    city: "Goa",
    state: "Goa",
    description: "Calangute Beach is the largest beach in North Goa and one of the most popular beaches in the region, offering a variety of water sports and beachside activities.",
    image: "https://i.postimg.cc/Y0wZR1Yz/goa-beach.jpg",
    rating: 4.2,
    price: 0,
    bestTimeToVisit: "November to February",
    coordinates: {
      lat: 15.5440,
      lng: 73.7528
    },
    crowdData: {
      "6:00": 10,
      "8:00": 25,
      "10:00": 40,
      "12:00": 60,
      "14:00": 75,
      "16:00": 80,
      "18:00": 90,
      "20:00": 85,
      "22:00": 70
    }
  }
];

// Filter type for destinations
interface DestinationFilters {
  search: string;
  state: string;
  minPrice: number;
  maxPrice: number;
  crowdLevel: "" | "low" | "medium" | "high";
}

interface DestinationContextType {
  destinations: Destination[];
  loading: boolean;
  error: string | null;
  getDestinationById: (id: string) => Destination | undefined;
  filterDestinations: (filters: DestinationFilters) => Destination[];
  getCurrentCrowdLevel: (crowdData: Record<string, number>) => "low" | "medium" | "high";
  getBestTimeToVisit: (crowdData: Record<string, number>) => string;
}

const DestinationContext = createContext<DestinationContextType | undefined>(undefined);

export const DestinationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Initialize destinations from sample data or localStorage
  useEffect(() => {
    try {
      // Try to get from localStorage first
      const storedDestinations = localStorage.getItem('destinations');
      if (storedDestinations) {
        setDestinations(JSON.parse(storedDestinations));
      } else {
        // If not found, use sample data and save it
        setDestinations(sampleDestinations);
        localStorage.setItem('destinations', JSON.stringify(sampleDestinations));
      }
    } catch (err) {
      console.error('Failed to load destinations:', err);
      setError('Failed to load destinations');
      // Fall back to sample data
      setDestinations(sampleDestinations);
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Get a destination by ID
  const getDestinationById = (id: string): Destination | undefined => {
    return destinations.find(dest => dest.id === id);
  };
  
  // Filter destinations based on criteria
  const filterDestinations = (filters: DestinationFilters): Destination[] => {
    return destinations.filter(destination => {
      // Search filter
      if (filters.search && !destination.name.toLowerCase().includes(filters.search.toLowerCase()) &&
          !destination.city.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      
      // State filter
      if (filters.state && destination.state !== filters.state) {
        return false;
      }
      
      // Price filter
      let price = 0;
      if (typeof destination.price === 'number') {
        price = destination.price;
      } else if (destination.price && typeof destination.price.adult === 'number') {
        price = destination.price.adult;
      }
      
      if (price < filters.minPrice || (filters.maxPrice > 0 && price > filters.maxPrice)) {
        return false;
      }
      
      // Crowd level filter
      if (filters.crowdLevel) {
        const crowdLevel = getCurrentCrowdLevel(destination.crowdData);
        if (crowdLevel !== filters.crowdLevel) {
          return false;
        }
      }
      
      return true;
    });
  };
  
  // Get current crowd level based on time
  const getCurrentCrowdLevel = (crowdData: Record<string, number>): "low" | "medium" | "high" => {
    if (!crowdData || Object.keys(crowdData).length === 0) return "low";
    
    // Get current hour
    const now = new Date();
    const currentHour = now.getHours() + ":00";
    
    // Find the closest time in crowdData
    const times = Object.keys(crowdData);
    let closestTime = times[0];
    let minTimeDiff = Infinity;
    
    for (const time of times) {
      const [hours] = time.split(":").map(Number);
      const currentHours = parseInt(currentHour);
      const diff = Math.abs(hours - currentHours);
      if (diff < minTimeDiff) {
        minTimeDiff = diff;
        closestTime = time;
      }
    }
    
    const crowdLevel = crowdData[closestTime] || 0;
    
    if (crowdLevel < 30) return "low";
    if (crowdLevel < 70) return "medium";
    return "high";
  };
  
  // Get best time to visit based on crowd data
  const getBestTimeToVisit = (crowdData: Record<string, number>): string => {
    if (!crowdData || Object.keys(crowdData).length === 0) return "Any time";
    
    // Find times with lowest crowd levels
    const entries = Object.entries(crowdData);
    entries.sort((a, b) => a[1] - b[1]);
    
    // Get the top 2 least crowded times
    const leastCrowded = entries.slice(0, 2);
    
    // Format the times
    return leastCrowded.map(([time]) => {
      const [hours] = time.split(':').map(Number);
      if (hours === 0) return "12 AM";
      if (hours === 12) return "12 PM";
      return hours > 12 ? `${hours - 12} PM` : `${hours} AM`;
    }).join(" or ");
  };
  
  return (
    <DestinationContext.Provider value={{
      destinations,
      loading,
      error,
      getDestinationById,
      filterDestinations,
      getCurrentCrowdLevel,
      getBestTimeToVisit
    }}>
      {children}
    </DestinationContext.Provider>
  );
};

// Hook for using destination context
export const useDestinations = () => {
  const context = useContext(DestinationContext);
  if (context === undefined) {
    throw new Error('useDestinations must be used within a DestinationProvider');
  }
  return context;
};
