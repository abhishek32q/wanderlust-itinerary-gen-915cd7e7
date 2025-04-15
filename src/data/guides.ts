
import { GuideType } from '../types';

export const guides: GuideType[] = [
  {
    id: 'guide_001',
    name: 'Rajesh Sharma',
    destinationId: 'dest_001',
    pricePerDay: 2000,
    languages: ['English', 'Hindi', 'French'],
    expertise: ['History', 'Architecture'],
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&auto=format&fit=crop'
  },
  {
    id: 'guide_002',
    name: 'Priya Singh',
    destinationId: 'dest_002',
    pricePerDay: 1800,
    languages: ['English', 'Hindi', 'German'],
    expertise: ['Culture', 'Local Cuisine'],
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop'
  },
  {
    id: 'guide_003',
    name: 'Michael Fernandes',
    destinationId: 'dest_003',
    pricePerDay: 2200,
    languages: ['English', 'Portuguese', 'Spanish'],
    expertise: ['Beach Activities', 'Water Sports'],
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop'
  },
  // Add more guides as needed
];
