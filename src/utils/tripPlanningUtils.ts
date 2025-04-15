
/**
 * Get transport amenities based on type and overnight requirement
 * @param type Transport type: 'bus', 'train', 'flight', or 'car'
 * @param isOvernight Whether overnight travel is needed
 * @returns Array of amenities
 */
export const getTransportAmenities = (type: string, isOvernight: boolean = false) => {
  const baseAmenities = {
    'bus': ['Air Conditioning', 'Comfortable Seating', 'Reading Light'],
    'train': ['Dining Car', 'Sleeper Berths', 'Power Outlets'],
    'flight': ['In-flight Service', 'Meal Service', 'Entertainment'],
    'car': ['Privacy', 'Flexibility', 'Door-to-door Travel']
  }[type as 'bus' | 'train' | 'flight' | 'car'] || [];
  
  const overnightAmenities = {
    'bus': ['Reclining Seats', 'Blankets', 'Rest Stops'],
    'train': ['Sleeper Cabins', 'Overnight Berths', 'Shower Facilities'],
    'flight': ['Sleep Kit', 'Extended Legroom', 'Red-eye Options'],
    'car': ['Hotel Stops', 'Rest Areas', 'Driver Changes']
  }[type as 'bus' | 'train' | 'flight' | 'car'] || [];
  
  return isOvernight ? [...baseAmenities, ...overnightAmenities] : baseAmenities;
};

/**
 * Get transport types based on transport category
 * @param type Transport type: 'bus', 'train', 'flight', or 'car'  
 * @returns Array of transport types
 */
export const getTransportTypes = (type: string) => {
  return {
    'bus': ['Volvo AC', 'Semi-sleeper', 'Sleeper', 'Local'],
    'train': ['AC First Class', 'AC 2-Tier', 'AC 3-Tier', 'Sleeper Class', 'General'],
    'flight': ['Economy', 'Premium Economy', 'Business Class', 'First Class'],
    'car': ['Hatchback', 'Sedan', 'SUV', 'Luxury']
  }[type as 'bus' | 'train' | 'flight' | 'car'] || ['Standard'];
};

/**
 * Format price for display
 * @param price Price value to format
 * @returns Formatted price string
 */
export const formatPrice = (price: number | undefined) => {
  if (price === undefined || isNaN(price)) {
    return '₹0';
  }
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
};
