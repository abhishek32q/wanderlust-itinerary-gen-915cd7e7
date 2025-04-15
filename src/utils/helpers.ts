
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
 * @param price Price value
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
