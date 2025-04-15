
/**
 * Get appropriate background class for crowd level
 * @param level Crowd level: 'low', 'medium', or 'high'
 * @returns Tailwind class for background color
 */
export const getCrowdLevelBgClass = (level: 'low' | 'medium' | 'high') => {
  switch (level) {
    case 'low':
      return 'bg-green-100 text-green-800';
    case 'medium':
      return 'bg-amber-100 text-amber-800';
    case 'high':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

/**
 * Format date for display
 * @param date Date object or string
 * @returns Formatted date string
 */
export const formatDate = (date: Date | string) => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

/**
 * Format price for display with currency symbol
 * @param price Price value or price object
 * @returns Formatted price string
 */
export const formatPrice = (price: number | undefined | { adult: number; child: number; foreigner: number; includes: string[] }) => {
  // If price is undefined or NaN
  if (price === undefined) {
    return '₹0';
  }

  // If price is an object with an adult property (from Destination type)
  if (typeof price === 'object' && 'adult' in price) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price.adult);
  }
  
  // If price is a number
  if (typeof price === 'number' && !isNaN(price)) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  }
  
  return '₹0';
};

/**
 * Ensure image URL is valid and fallback to placeholder if needed
 * @param url Image URL
 * @returns Valid image URL or placeholder
 */
export const ensureValidImageUrl = (url: string) => {
  // If URL is missing or invalid
  if (!url || url.startsWith('postimg.cc') || !isValidUrl(url)) {
    return '/placeholder.svg';  // Return a placeholder image
  }
  
  // Unsplash URLs sometimes need proper formatting to work with their API
  if (url.includes('unsplash.com') && !url.includes('ixlib=rb')) {
    // Add Unsplash API parameters if not already present
    if (url.includes('?')) {
      return `${url}&w=800&auto=format&fit=crop`;
    } else {
      return `${url}?w=800&auto=format&fit=crop`;
    }
  }
  
  // Return the original URL if it seems valid
  return url;
};

/**
 * Check if a string is a valid URL
 * @param string URL to check
 * @returns boolean indicating if the URL is valid
 */
const isValidUrl = (string: string): boolean => {
  try {
    // Try to create a URL object - this will fail for invalid URLs
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

/**
 * Format time from 24-hour format to 12-hour format
 * @param time Time string in format HH:MM
 * @returns Formatted time string
 */
export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':').map(Number);
  
  if (isNaN(hours)) return time; // Return original if parsing fails
  
  if (hours === 0) return '12 AM';
  if (hours === 12) return '12 PM';
  
  return hours > 12 ? `${hours - 12} PM` : `${hours} AM`;
};
