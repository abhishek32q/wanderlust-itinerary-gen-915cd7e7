
import { HotelType } from '../types';

export const hotels: HotelType[] = [
  {
    id: "h1",
    name: "Taj View Hotel",
    destinationId: "d1", // Taj Mahal
    type: "luxury",
    rating: 4.5,
    pricePerPerson: 4500,
    checkInTime: "14:00",
    checkOutTime: "12:00",
    amenities: ["WiFi", "Pool", "Restaurant", "Spa", "Room Service"],
    location: {
      address: "Taj East Gate Road, Agra",
      coordinates: {
        lat: 27.1731,
        lng: 78.0413
      },
      distanceFromCenter: 0.5,
      proximityScore: 9
    }
  },
  {
    id: "h2",
    name: "Budget Stay Agra",
    destinationId: "d1", // Taj Mahal
    type: "budget",
    rating: 3.2,
    pricePerPerson: 1200,
    checkInTime: "14:00",
    checkOutTime: "11:00",
    amenities: ["WiFi", "AC", "Breakfast"],
    location: {
      address: "Fatehabad Road, Agra",
      coordinates: {
        lat: 27.1601,
        lng: 78.0368
      },
      distanceFromCenter: 1.8,
      proximityScore: 7
    }
  },
  {
    id: "h3",
    name: "Pink City Resort",
    destinationId: "d2", // Jaipur City Palace
    type: "standard",
    rating: 3.8,
    pricePerPerson: 2800,
    checkInTime: "12:00",
    checkOutTime: "10:00",
    amenities: ["WiFi", "Restaurant", "Parking", "AC"],
    location: {
      address: "Civil Lines, Jaipur",
      coordinates: {
        lat: 26.9237,
        lng: 75.8197
      },
      distanceFromCenter: 1.2,
      proximityScore: 8
    }
  },
  {
    id: "h4",
    name: "Beachside Paradise",
    destinationId: "d3", // Calangute Beach
    type: "luxury",
    rating: 4.7,
    pricePerPerson: 5500,
    checkInTime: "15:00",
    checkOutTime: "11:00",
    amenities: ["Beach Access", "Pool", "Bar", "Restaurant", "WiFi", "Spa"],
    location: {
      address: "Calangute Beach Road, Goa",
      coordinates: {
        lat: 15.5432,
        lng: 73.7531
      },
      distanceFromCenter: 0.3,
      proximityScore: 10
    }
  },
  {
    id: "h5",
    name: "Budget Beach Huts",
    destinationId: "d3", // Calangute Beach
    type: "budget",
    rating: 3.5,
    pricePerPerson: 1800,
    checkInTime: "12:00",
    checkOutTime: "10:00",
    amenities: ["WiFi", "Beach Access", "Fan"],
    location: {
      address: "Calangute Beach Road, Goa",
      coordinates: {
        lat: 15.5450,
        lng: 73.7545
      },
      distanceFromCenter: 0.7,
      proximityScore: 8
    }
  }
];
