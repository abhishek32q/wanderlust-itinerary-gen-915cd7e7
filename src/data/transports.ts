
import { TransportType } from '../types';

export const transports: TransportType[] = [
  {
    id: "t1",
    type: "bus",
    name: "AC Deluxe Bus",
    pricePerPerson: 1200,
    amenities: ["AC", "Reclining Seats", "Charging Points", "WiFi"]
  },
  {
    id: "t2",
    type: "bus",
    name: "Standard Bus",
    pricePerPerson: 800,
    amenities: ["AC", "Standard Seats"]
  },
  {
    id: "t3",
    type: "train",
    name: "Express Train (AC Chair Car)",
    pricePerPerson: 1500,
    amenities: ["AC", "Comfortable Seats", "Catering", "Charging Points"]
  },
  {
    id: "t4",
    type: "train",
    name: "Sleeper Train (2AC)",
    pricePerPerson: 2200,
    amenities: ["AC", "Berth", "Bedding", "Catering", "Charging Points"]
  },
  {
    id: "t5",
    type: "flight",
    name: "Economy Flight",
    pricePerPerson: 5000,
    amenities: ["AC", "In-flight Entertainment", "Meal", "Baggage Allowance"]
  },
  {
    id: "t6",
    type: "flight",
    name: "Business Class Flight",
    pricePerPerson: 15000,
    amenities: ["AC", "Priority Boarding", "Premium Meals", "Extra Baggage", "Lounge Access"]
  },
  {
    id: "t7",
    type: "car",
    name: "Standard Sedan",
    pricePerPerson: 2500,
    amenities: ["AC", "Music System", "Comfortable Seats"]
  },
  {
    id: "t8",
    type: "car",
    name: "Premium SUV",
    pricePerPerson: 4000,
    amenities: ["AC", "Music System", "Spacious", "Charging Points", "WiFi"]
  }
];
