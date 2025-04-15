
import React, { createContext, useContext, useState, useCallback } from 'react';
import { TripPlan } from '../types';
import { useToast } from '@/hooks/use-toast';

interface BookingContextType {
  bookings: TripPlan[];
  loading: boolean;
  saveTripPlan: (tripPlan: TripPlan) => Promise<void>;
  getUserBookings: (userId: string) => TripPlan[];
  cancelBooking: (bookingId: string) => Promise<void>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<TripPlan[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const saveTripPlan = useCallback(async (tripPlan: TripPlan) => {
    setLoading(true);
    try {
      // In a real app, we would make an API call here
      setTimeout(() => {
        setBookings(prev => [...prev, tripPlan]);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error saving trip plan:', error);
      toast({
        title: 'Error',
        description: 'Failed to save trip plan',
        variant: 'destructive',
      });
      setLoading(false);
    }
  }, [toast]);

  const getUserBookings = useCallback((userId: string) => {
    return bookings.filter(booking => booking.userId === userId);
  }, [bookings]);

  const cancelBooking = useCallback(async (bookingId: string) => {
    setLoading(true);
    try {
      // In a real app, we would make an API call here
      setTimeout(() => {
        setBookings(prev => prev.filter(booking => booking.id !== bookingId));
        toast({
          title: 'Booking cancelled',
          description: 'Your booking has been cancelled successfully',
        });
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error cancelling booking:', error);
      toast({
        title: 'Error',
        description: 'Failed to cancel booking',
        variant: 'destructive',
      });
      setLoading(false);
    }
  }, [toast]);

  return (
    <BookingContext.Provider
      value={{
        bookings,
        loading,
        saveTripPlan,
        getUserBookings,
        cancelBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBookings must be used within a BookingProvider');
  }
  return context;
};
