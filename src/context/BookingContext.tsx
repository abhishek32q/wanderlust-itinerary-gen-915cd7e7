
import React, { createContext, useContext, useState, useEffect } from 'react';
import { TripPlan } from '../types';
import { useAuth } from './AuthContext';

interface BookingContextType {
  bookings: TripPlan[];
  loading: boolean;
  error: string | null;
  getUserBookings: (userId: string) => TripPlan[];
  getBookingById: (bookingId: string) => TripPlan | undefined;
  cancelBooking: (bookingId: string) => Promise<void>;
  saveTripPlan: (tripPlan: TripPlan) => Promise<void>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [bookings, setBookings] = useState<TripPlan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize bookings from localStorage
  useEffect(() => {
    try {
      const storedBookings = localStorage.getItem('bookings');
      if (storedBookings) {
        setBookings(JSON.parse(storedBookings));
      }
    } catch (err) {
      console.error('Failed to load bookings:', err);
      setError('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  }, []);

  // Save bookings to localStorage when updated
  useEffect(() => {
    try {
      localStorage.setItem('bookings', JSON.stringify(bookings));
    } catch (err) {
      console.error('Failed to save bookings to localStorage:', err);
    }
  }, [bookings]);

  // Get user's bookings
  const getUserBookings = (userId: string): TripPlan[] => {
    return bookings.filter(booking => booking.userId === userId);
  };

  // Get booking by ID
  const getBookingById = (bookingId: string): TripPlan | undefined => {
    return bookings.find(booking => booking.id === bookingId);
  };

  // Cancel a booking
  const cancelBooking = async (bookingId: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        setLoading(true);
        // Find the booking
        const bookingIndex = bookings.findIndex(booking => booking.id === bookingId);
        
        if (bookingIndex === -1) {
          reject(new Error('Booking not found'));
          return;
        }
        
        // Check cancellation eligibility
        const booking = bookings[bookingIndex];
        const createdAt = new Date(booking.createdAt);
        const now = new Date();
        const hoursElapsed = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);
        
        const isPremium = currentUser?.isPremium || false;
        const cancellationWindow = isPremium ? 24 : 1; // hours
        
        if (hoursElapsed > cancellationWindow) {
          reject(new Error(`Cancellation window of ${cancellationWindow} hour(s) has passed`));
          return;
        }
        
        // Cancel the booking
        const updatedBookings = [...bookings];
        updatedBookings[bookingIndex] = {
          ...booking,
          status: 'cancelled'
        };
        
        setBookings(updatedBookings);
        resolve();
      } catch (err) {
        reject(err);
      } finally {
        setLoading(false);
      }
    });
  };

  // Save a trip plan as a booking
  const saveTripPlan = async (tripPlan: TripPlan): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        if (!currentUser) {
          reject(new Error('User must be logged in to save a trip plan'));
          return;
        }
        
        setLoading(true);
        
        // Add the booking
        const updatedBookings = [...bookings, {
          ...tripPlan,
          userId: currentUser.id,
          status: 'confirmed'
        }];
        
        setBookings(updatedBookings);
        resolve();
      } catch (err) {
        reject(err);
      } finally {
        setLoading(false);
      }
    });
  };

  return (
    <BookingContext.Provider value={{
      bookings,
      loading,
      error,
      getUserBookings,
      getBookingById,
      cancelBooking,
      saveTripPlan
    }}>
      {children}
    </BookingContext.Provider>
  );
};

// Hook for using booking context
export const useBookings = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBookings must be used within a BookingProvider');
  }
  return context;
};
