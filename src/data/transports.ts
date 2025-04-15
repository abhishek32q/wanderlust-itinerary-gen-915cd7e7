
import { TransportType } from '../types';

export const transports: TransportType[] = [
  {
    id: 'transport_001',
    name: 'Regular Bus',
    type: 'bus',
    pricePerPerson: 600,
    amenities: ['Air conditioning', 'Comfortable seating'],
    transportTypes: ['Volvo AC', 'Semi-sleeper', 'Sleeper', 'Local']
  },
  {
    id: 'transport_002',
    name: 'Express Train',
    type: 'train',
    pricePerPerson: 800,
    amenities: ['Air conditioning', 'Food service'],
    transportTypes: ['AC First Class', 'AC 2-Tier', 'AC 3-Tier', 'Sleeper Class', 'General']
  },
  {
    id: 'transport_003',
    name: 'Rental Car',
    type: 'car',
    pricePerPerson: 1400,
    amenities: ['Air conditioning', 'Music system'],
    transportTypes: ['Hatchback', 'Sedan', 'SUV', 'Luxury']
  },
  {
    id: 'transport_004',
    name: 'Economy Flight',
    type: 'flight',
    pricePerPerson: 5000,
    amenities: ['Basic meal', 'Entertainment system'],
    transportTypes: ['Economy', 'Premium Economy', 'Business Class', 'First Class']
  }
];
