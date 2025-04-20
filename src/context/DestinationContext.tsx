import React, { createContext, useContext, useState, useEffect } from 'react';
import { Destination } from '../types';

// 20 Sample destination data
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
  },
  {
    id: "d4",
    name: "Darjeeling Hill Station",
    city: "Darjeeling",
    state: "West Bengal",
    description: "Famous for its tea plantations, Darjeeling is a picturesque hill station with views of Kanchenjunga, the world's third highest mountain.",
    image: "https://i.postimg.cc/gkJ8DLbZ/darjeeling.jpg",
    rating: 4.6,
    price: {
      adult: 150,
      child: 50
    },
    bestTimeToVisit: "April to June",
    coordinates: {
      lat: 27.0410,
      lng: 88.2663
    },
    crowdData: {
      "8:00": 40,
      "10:00": 60,
      "12:00": 75,
      "14:00": 70,
      "16:00": 60,
      "18:00": 45
    }
  },
  {
    id: "d5",
    name: "Varanasi Ghats",
    city: "Varanasi",
    state: "Uttar Pradesh",
    description: "The ghats of Varanasi are riverfront steps leading to the banks of the River Ganges. The city has 88 ghats, most being used for bathing and religious ceremonies.",
    image: "https://i.postimg.cc/BvzCcwkk/varanasi.jpg",
    rating: 4.4,
    price: 0,
    bestTimeToVisit: "October to March",
    coordinates: {
      lat: 25.3176,
      lng: 83.0128
    },
    crowdData: {
      "5:00": 60,
      "6:00": 75,
      "7:00": 70,
      "16:00": 50,
      "17:00": 65,
      "18:00": 80,
      "19:00": 70
    }
  },
  {
    id: "d6",
    name: "Ranthambore National Park",
    city: "Sawai Madhopur",
    state: "Rajasthan",
    description: "Ranthambore National Park is one of the largest national parks in northern India, known for its tiger population and is one of the best places in India to see these majestic predators in the jungle.",
    image: "https://i.postimg.cc/rmNQjcNV/ranthambore.jpg",
    rating: 4.7,
    price: {
      adult: 1000,
      child: 500
    },
    bestTimeToVisit: "October to June",
    coordinates: {
      lat: 26.0173,
      lng: 76.5026
    },
    crowdData: {
      "6:00": 60,
      "8:00": 70,
      "10:00": 50,
      "14:00": 35,
      "16:00": 60
    }
  },
  {
    id: "d7",
    name: "Mysore Palace",
    city: "Mysore",
    state: "Karnataka",
    description: "The Mysore Palace is a historical palace and the royal residence of the Wadiyar dynasty. It is now one of the most famous tourist attractions in India.",
    image: "https://i.postimg.cc/QM9kDJb8/mysore-palace.jpg",
    rating: 4.6,
    price: {
      adult: 200,
      child: 100,
      foreigner: 1000
    },
    bestTimeToVisit: "October to March",
    coordinates: {
      lat: 12.3052,
      lng: 76.6552
    },
    crowdData: {
      "9:00": 40,
      "10:00": 60,
      "11:00": 75,
      "12:00": 80,
      "13:00": 75,
      "14:00": 70,
      "15:00": 60,
      "16:00": 50,
      "17:00": 45
    }
  },
  {
    id: "d8",
    name: "Andaman Islands",
    city: "Port Blair",
    state: "Andaman and Nicobar",
    description: "The Andaman Islands are an Indian archipelago in the Bay of Bengal, known for pristine beaches, coral reefs and water sports opportunities.",
    image: "https://i.postimg.cc/8z7pMhWj/andaman.jpg",
    rating: 4.8,
    price: {
      adult: 500,
      child: 250
    },
    bestTimeToVisit: "November to May",
    coordinates: {
      lat: 11.7401,
      lng: 92.6586
    },
    crowdData: {
      "8:00": 30,
      "10:00": 50,
      "12:00": 70,
      "14:00": 75,
      "16:00": 60,
      "18:00": 40
    }
  },
  {
    id: "d9",
    name: "Jim Corbett National Park",
    city: "Nainital",
    state: "Uttarakhand",
    description: "Jim Corbett National Park is the oldest national park in India, known for its Bengal tiger population and diverse wildlife.",
    image: "https://i.postimg.cc/2y1YQwhv/jim-corbett.jpg",
    rating: 4.5,
    price: {
      adult: 600,
      child: 300
    },
    bestTimeToVisit: "November to June",
    coordinates: {
      lat: 29.5300,
      lng: 78.7747
    },
    crowdData: {
      "6:00": 55,
      "8:00": 70,
      "10:00": 60,
      "14:00": 45,
      "16:00": 65
    }
  },
  {
    id: "d10",
    name: "Ellora Caves",
    city: "Aurangabad",
    state: "Maharashtra",
    description: "Ellora is a UNESCO World Heritage Site featuring Buddhist, Hindu and Jain cave temples carved into the solid rock.",
    image: "https://i.postimg.cc/MG3vJ9kq/ellora-caves.jpg",
    rating: 4.7,
    price: {
      adult: 350,
      child: 100,
      foreigner: 600
    },
    bestTimeToVisit: "June to March",
    coordinates: {
      lat: 20.0268,
      lng: 75.1779
    },
    crowdData: {
      "9:00": 30,
      "10:00": 45,
      "11:00": 65,
      "12:00": 70,
      "13:00": 60,
      "14:00": 55,
      "15:00": 50,
      "16:00": 40
    }
  },
  {
    id: "d11",
    name: "Valley of Flowers",
    city: "Chamoli",
    state: "Uttarakhand",
    description: "The Valley of Flowers is a UNESCO World Heritage Site known for its meadows of endemic alpine flowers and diverse flora and fauna.",
    image: "https://i.postimg.cc/9QDTCpWN/valley-of-flowers.jpg",
    rating: 4.9,
    price: {
      adult: 150,
      child: 50,
      foreigner: 400
    },
    bestTimeToVisit: "July to September",
    coordinates: {
      lat: 30.7283,
      lng: 79.6058
    },
    crowdData: {
      "8:00": 40,
      "10:00": 60,
      "12:00": 75,
      "14:00": 65,
      "16:00": 45
    }
  },
  {
    id: "d12",
    name: "Khajuraho Temples",
    city: "Khajuraho",
    state: "Madhya Pradesh",
    description: "The Khajuraho Group of Monuments is famous for their Nagara-style architectural symbolism and erotic sculptures.",
    image: "https://i.postimg.cc/N0mFFt13/khajuraho.jpg",
    rating: 4.6,
    price: {
      adult: 400,
      child: 100,
      foreigner: 600
    },
    bestTimeToVisit: "October to March",
    coordinates: {
      lat: 24.8318,
      lng: 79.9195
    },
    crowdData: {
      "9:00": 30,
      "10:00": 45,
      "11:00": 60,
      "12:00": 65,
      "13:00": 60,
      "14:00": 55,
      "15:00": 50,
      "16:00": 40
    }
  },
  {
    id: "d13",
    name: "Hampi Ruins",
    city: "Hampi",
    state: "Karnataka",
    description: "Hampi is a UNESCO World Heritage Site featuring ruins of the ancient Vijayanagara Empire, with stunning temples, ruins, and monuments.",
    image: "https://i.postimg.cc/BvCGyh5C/hampi.jpg",
    rating: 4.7,
    price: {
      adult: 250,
      child: 100,
      foreigner: 500
    },
    bestTimeToVisit: "October to March",
    coordinates: {
      lat: 15.3350,
      lng: 76.4600
    },
    crowdData: {
      "8:00": 35,
      "10:00": 55,
      "12:00": 70,
      "14:00": 65,
      "16:00": 50
    }
  },
  {
    id: "d14",
    name: "Golden Temple",
    city: "Amritsar",
    state: "Punjab",
    description: "The Golden Temple, also known as Harmandir Sahib, is the holiest gurdwara and the most important pilgrimage site of Sikhism.",
    image: "https://i.postimg.cc/7ZCcVT8d/golden-temple.jpg",
    rating: 4.9,
    price: 0,
    bestTimeToVisit: "October to March",
    coordinates: {
      lat: 31.6200,
      lng: 74.8765
    },
    crowdData: {
      "5:00": 50,
      "7:00": 70,
      "9:00": 80,
      "11:00": 85,
      "13:00": 75,
      "15:00": 65,
      "17:00": 75,
      "19:00": 90,
      "21:00": 80
    }
  },
  {
    id: "d15",
    name: "Ajanta Caves",
    city: "Aurangabad",
    state: "Maharashtra",
    description: "The Ajanta Caves are 30 rock-cut Buddhist cave monuments dating from the 2nd century BCE to about 480 CE, featuring paintings and sculptures.",
    image: "https://i.postimg.cc/3x7fvvVD/ajanta-caves.jpg",
    rating: 4.7,
    price: {
      adult: 300,
      child: 100,
      foreigner: 500
    },
    bestTimeToVisit: "November to March",
    coordinates: {
      lat: 20.5519,
      lng: 75.7033
    },
    crowdData: {
      "9:00": 30,
      "11:00": 50,
      "13:00": 65,
      "15:00": 55,
      "17:00": 40
    }
  },
  {
    id: "d16",
    name: "Dudhsagar Falls",
    city: "South Goa",
    state: "Goa",
    description: "Dudhsagar Falls is a four-tiered waterfall located on the Mandovi River, offering spectacular views especially during the monsoon season.",
    image: "https://i.postimg.cc/9fKjCbCt/dudhsagar-falls.jpg",
    rating: 4.5,
    price: {
      adult: 200,
      child: 100
    },
    bestTimeToVisit: "July to October",
    coordinates: {
      lat: 15.3144,
      lng: 74.3144
    },
    crowdData: {
      "8:00": 40,
      "10:00": 65,
      "12:00": 80,
      "14:00": 75,
      "16:00": 60
    }
  },
  {
    id: "d17",
    name: "Sundarbans National Park",
    city: "South 24 Parganas",
    state: "West Bengal",
    description: "Sundarbans National Park is a UNESCO World Heritage Site and a tiger reserve known for its mangrove forests and diverse wildlife.",
    image: "https://i.postimg.cc/Wb5bKhDH/sundarbans.jpg",
    rating: 4.6,
    price: {
      adult: 450,
      child: 200,
      foreigner: 700
    },
    bestTimeToVisit: "October to March",
    coordinates: {
      lat: 21.9497,
      lng: 88.9673
    },
    crowdData: {
      "6:00": 35,
      "8:00": 55,
      "10:00": 70,
      "12:00": 65,
      "14:00": 60,
      "16:00": 45
    }
  },
  {
    id: "d18",
    name: "Kaziranga National Park",
    city: "Golaghat",
    state: "Assam",
    description: "Kaziranga National Park is a UNESCO World Heritage Site known for the Indian one-horned rhinoceros and tigers.",
    image: "https://i.postimg.cc/WbJ8qCnm/kaziranga.jpg",
    rating: 4.8,
    price: {
      adult: 500,
      child: 250,
      foreigner: 800
    },
    bestTimeToVisit: "November to April",
    coordinates: {
      lat: 26.5834,
      lng: 93.1709
    },
    crowdData: {
      "6:00": 45,
      "8:00": 65,
      "10:00": 75,
      "14:00": 60,
      "16:00": 50
    }
  },
  {
    id: "d19",
    name: "Jaisalmer Fort",
    city: "Jaisalmer",
    state: "Rajasthan",
    description: "Jaisalmer Fort is one of the largest fully preserved fortified cities in the world, with people still living within its walls.",
    image: "https://i.postimg.cc/VLcY0ZCS/jaisalmer-fort.jpg",
    rating: 4.7,
    price: {
      adult: 250,
      child: 100,
      foreigner: 500
    },
    bestTimeToVisit: "October to March",
    coordinates: {
      lat: 26.9124,
      lng: 70.9152
    },
    crowdData: {
      "9:00": 40,
      "11:00": 60,
      "13:00": 75,
      "15:00": 70,
      "17:00": 55
    }
  },
  {
    id: "d20",
    name: "Munnar Hill Station",
    city: "Munnar",
    state: "Kerala",
    description: "Munnar is a hill station in Kerala known for its tea plantations and stunning natural beauty.",
    image: "https://i.postimg.cc/y8nZY8cd/munnar.jpg",
    rating: 4.7,
    price: {
      adult: 180,
      child: 80
    },
    bestTimeToVisit: "September to May",
    coordinates: {
      lat: 10.0889,
      lng: 77.0595
    },
    crowdData: {
      "8:00": 35,
      "10:00": 55,
      "12:00": 70,
      "14:00": 65,
      "16:00": 50,
      "18:00": 40
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
