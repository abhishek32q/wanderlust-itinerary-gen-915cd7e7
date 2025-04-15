
import { HotelType } from '../types';

export const hotels: HotelType[] = [
  {
    id: 'hotel_001',
    name: 'Taj Palace',
    destinationId: 'dest_001',
    type: 'luxury',
    rating: 5,
    pricePerPerson: 8000,
    checkInTime: '14:00',
    checkOutTime: '12:00',
    amenities: ['WiFi', 'Swimming Pool', 'Spa', 'Restaurant', 'Air Conditioning', 'Room Service'],
    location: {
      address: '1 Taj Road',
      city: 'Agra',
      coordinates: {
        lat: 27.1751,
        lng: 78.0421
      },
      distanceFromCenter: 1.2,
      proximityScore: 9
    }
  },
  {
    id: 'hotel_002',
    name: 'Jaipur Heritage Hotel',
    destinationId: 'dest_002',
    type: 'standard',
    rating: 4,
    pricePerPerson: 3500,
    checkInTime: '14:00',
    checkOutTime: '11:00',
    amenities: ['WiFi', 'Restaurant', 'Air Conditioning', 'Room Service'],
    location: {
      address: '25 City Palace Road',
      city: 'Jaipur',
      coordinates: {
        lat: 26.9258,
        lng: 75.8237
      },
      distanceFromCenter: 0.8,
      proximityScore: 8
    }
  },
  {
    id: 'hotel_003',
    name: 'Goa Beach Resort',
    destinationId: 'dest_003',
    type: 'standard',
    rating: 4,
    pricePerPerson: 4500,
    checkInTime: '15:00',
    checkOutTime: '11:00',
    amenities: ['WiFi', 'Swimming Pool', 'Restaurant', 'Beach Access', 'Air Conditioning'],
    location: {
      address: 'Beach Road, Panaji',
      city: 'Goa',
      coordinates: {
        lat: 15.2993,
        lng: 74.1240
      },
      distanceFromCenter: 2.5,
      proximityScore: 7
    }
  },
  // Add more hotels as needed
];
