
import { TransportType } from '../types';

export const transports: TransportType[] = [
  // Bus types
  {
    id: "t1",
    type: "bus",
    name: "AC Luxury Sleeper Bus",
    pricePerPerson: 1400,
    amenities: ["AC", "Sleeper Berths", "Charging Points", "WiFi", "Blankets", "Water Bottle"]
  },
  {
    id: "t2",
    type: "bus",
    name: "AC Deluxe Bus",
    pricePerPerson: 1200,
    amenities: ["AC", "Reclining Seats", "Charging Points", "WiFi"]
  },
  {
    id: "t3",
    type: "bus",
    name: "Standard Bus",
    pricePerPerson: 800,
    amenities: ["AC", "Standard Seats"]
  },
  {
    id: "t4",
    type: "bus",
    name: "Non-AC Bus",
    pricePerPerson: 500,
    amenities: ["Standard Seats"]
  },
  
  // Train types
  {
    id: "t5",
    type: "train",
    name: "Vande Bharat Express",
    pricePerPerson: 1800,
    amenities: ["AC", "Executive Seats", "Premium Catering", "WiFi", "USB Charging"]
  },
  {
    id: "t6",
    type: "train",
    name: "Rajdhani Express (2AC)",
    pricePerPerson: 2200,
    amenities: ["AC", "Berth", "Premium Meals", "Bedding", "Charging Points"]
  },
  {
    id: "t7",
    type: "train",
    name: "Express Train (AC Chair Car)",
    pricePerPerson: 1500,
    amenities: ["AC", "Comfortable Seats", "Catering", "Charging Points"]
  },
  {
    id: "t8",
    type: "train",
    name: "Sleeper Train (3AC)",
    pricePerPerson: 1200,
    amenities: ["AC", "Berth", "Bedding", "Basic Meals"]
  },
  
  // Flight types
  {
    id: "t9",
    type: "flight",
    name: "Business Class Flight",
    pricePerPerson: 15000,
    amenities: ["Priority Boarding", "Premium Meals", "Extra Baggage", "Lounge Access", "Extra Legroom"]
  },
  {
    id: "t10",
    type: "flight",
    name: "Premium Economy Flight",
    pricePerPerson: 8000,
    amenities: ["Extra Legroom", "Enhanced Meal", "Priority Check-in", "Extra Baggage"]
  },
  {
    id: "t11",
    type: "flight",
    name: "Economy Flight",
    pricePerPerson: 5000,
    amenities: ["In-flight Entertainment", "Meal", "Baggage Allowance"]
  },
  {
    id: "t12",
    type: "flight",
    name: "Budget Airline",
    pricePerPerson: 3500,
    amenities: ["Basic Seat", "Hand Baggage Only"]
  },
  
  // Car types
  {
    id: "t13",
    type: "car",
    name: "Luxury Sedan",
    pricePerPerson: 5000,
    amenities: ["AC", "Premium Sound System", "Leather Seats", "WiFi", "Refreshments"]
  },
  {
    id: "t14",
    type: "car",
    name: "Premium SUV",
    pricePerPerson: 4000,
    amenities: ["AC", "Music System", "Spacious", "Charging Points", "WiFi"]
  },
  {
    id: "t15",
    type: "car",
    name: "Standard Sedan",
    pricePerPerson: 2500,
    amenities: ["AC", "Music System", "Comfortable Seats"]
  },
  {
    id: "t16",
    type: "car",
    name: "Compact Car",
    pricePerPerson: 1800,
    amenities: ["AC", "Basic Audio", "Fuel Efficient"]
  }
];
