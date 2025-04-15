
import { Destination } from '../types';

// Helper function to generate random crowd data
const generateCrowdData = () => {
  const times = ['00:00', '04:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];
  const crowdData: { [key: string]: number } = {};
  
  times.forEach(time => {
    let crowdLevel;
    const hour = parseInt(time.split(':')[0]);
    
    // Simulate realistic crowd patterns
    if (hour >= 10 && hour <= 16) {
      // Peak hours - higher crowds
      crowdLevel = Math.floor(Math.random() * 40) + 50; // 50-90%
    } else if ((hour >= 8 && hour < 10) || (hour > 16 && hour <= 20)) {
      // Moderate hours
      crowdLevel = Math.floor(Math.random() * 30) + 35; // 35-65%
    } else {
      // Off hours - lower crowds
      crowdLevel = Math.floor(Math.random() * 30) + 5; // 5-35%
    }
    
    crowdData[time] = crowdLevel;
  });
  
  return crowdData;
};

// Helper function for consistent pricing structure
const createPrice = (
  adult: number, 
  child: number = Math.floor(adult * 0.6), 
  foreigner: number = adult * 4,
  includes: string[] = []
) => ({
  adult,
  child,
  foreigner,
  includes
});

export const indiaDestinations: Destination[] = [
  {
    id: 'dest_001',
    name: 'Taj Mahal',
    city: 'Agra',
    state: 'Uttar Pradesh',
    description: 'One of the seven wonders of the world, this ivory-white marble mausoleum is a symbol of eternal love built by Emperor Shah Jahan in memory of his wife Mumtaz Mahal.',
    image: '/images/taj-mahal.jpg',
    crowdData: {
      '00:00': 5,
      '04:00': 10,
      '08:00': 65,
      '10:00': 90,
      '12:00': 95,
      '14:00': 85,
      '16:00': 70,
      '18:00': 50,
      '20:00': 20,
      '22:00': 10
    },
    price: createPrice(1100, 600, 2000, ['Main mausoleum', 'Gardens', 'Mosque']),
    rating: 4.8,
    coordinates: {
      lat: 27.1751,
      lng: 78.0421
    },
    bestTimeToVisit: 'Early Morning',
    tags: ['UNESCO', 'Historical', 'Architecture']
  },
  {
    id: 'dest_002',
    name: 'Jaipur City Palace',
    city: 'Jaipur',
    state: 'Rajasthan',
    description: 'A magnificent blend of Rajasthani and Mughal architecture, the City Palace is a historic royal residence that houses museums with an impressive collection of artifacts.',
    image: '/images/jaipur-palace.jpg',
    crowdData: {
      '00:00': 0,
      '04:00': 5,
      '08:00': 30,
      '10:00': 75,
      '12:00': 80,
      '14:00': 85,
      '16:00': 60,
      '18:00': 40,
      '20:00': 15,
      '22:00': 5
    },
    price: createPrice(700, 400, 1500, ['Palace complex', 'Museum', 'Audio guide']),
    rating: 4.5,
    coordinates: {
      lat: 26.9258,
      lng: 75.8237
    },
    bestTimeToVisit: 'Morning',
    tags: ['Historical', 'Museum', 'Architecture']
  },
  {
    id: 'dest_003',
    name: 'Goa Beaches',
    city: 'Panaji',
    state: 'Goa',
    description: 'Famous for its pristine beaches, Goa offers a perfect blend of Indian and Portuguese cultures with its white sandy shores, vibrant nightlife, and delicious seafood.',
    image: '/images/goa-beaches.jpg',
    crowdData: {
      '00:00': 30,
      '04:00': 5,
      '08:00': 25,
      '10:00': 50,
      '12:00': 70,
      '14:00': 75,
      '16:00': 80,
      '18:00': 60,
      '20:00': 65,
      '22:00': 50
    },
    price: createPrice(200, 100, 800, ['Beach access']),
    rating: 4.7,
    coordinates: {
      lat: 15.2993,
      lng: 74.1240
    },
    bestTimeToVisit: 'Early Morning',
    tags: ['Beach', 'Nightlife', 'Water Sports']
  },
  {
    id: 'dest_004',
    name: 'Varanasi Ghats',
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    description: 'One of the oldest continuously inhabited cities in the world, Varanasi\'s ghats along the holy Ganges River offer a spiritual experience with daily rituals and ceremonies.',
    image: '/images/varanasi-ghats.jpg',
    crowdData: {
      '00:00': 15,
      '04:00': 60,
      '08:00': 40,
      '10:00': 35,
      '12:00': 30,
      '14:00': 25,
      '16:00': 35,
      '18:00': 85,
      '20:00': 90,
      '22:00': 50
    },
    price: createPrice(0, 0, 0, ['Ghat access', 'Evening aarti']),
    rating: 4.6,
    coordinates: {
      lat: 25.3176,
      lng: 83.0100
    },
    bestTimeToVisit: 'Early Morning',
    tags: ['Spiritual', 'Cultural', 'River']
  },
  {
    id: 'dest_005',
    name: 'Darjeeling Hills',
    city: 'Darjeeling',
    state: 'West Bengal',
    description: 'Known for its tea plantations and the panoramic views of the Himalayas, Darjeeling is a charming hill station with the iconic Darjeeling Himalayan Railway.',
    image: '/images/darjeeling-hills.jpg',
    crowdData: {
      '00:00': 5,
      '04:00': 15,
      '08:00': 40,
      '10:00': 65,
      '12:00': 75,
      '14:00': 70,
      '16:00': 60,
      '18:00': 45,
      '20:00': 30,
      '22:00': 15
    },
    price: createPrice(300, 150, 1200, ['Tea garden tours', 'Toy train ride']),
    rating: 4.5,
    coordinates: {
      lat: 27.0360,
      lng: 88.2627
    },
    bestTimeToVisit: 'Early Morning',
    tags: ['Hill Station', 'Tea', 'Scenic']
  }
  // Add more destinations as needed
];
