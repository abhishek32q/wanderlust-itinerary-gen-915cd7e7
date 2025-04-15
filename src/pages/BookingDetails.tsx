
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBookings } from "../context/BookingContext";
import { useTripPlanning } from "../context/TripPlanningContext";
import { useAuth } from "../context/AuthContext";
import { useDestinations } from "../context/DestinationContext";
import Layout from '../components/Layout';
import TripItinerary from '../components/TripItinerary';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Loader2, Calendar, MapPin, Clock, IndianRupee, X, Download, CheckCircle } from 'lucide-react';
import { formatPrice } from '../utils/helpers';

const BookingDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { bookings, cancelBooking } = useBookings();
  const { getTripPlanById } = useTripPlanning();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [booking, setBooking] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [cancellationInProgress, setCancellationInProgress] = useState<boolean>(false);
  
  useEffect(() => {
    // Find booking details either from bookings or tripPlans context
    if (id) {
      const foundBooking = bookings.find(b => b.id === id);
      if (foundBooking) {
        setBooking(foundBooking);
      } else {
        const tripPlan = getTripPlanById(id);
        if (tripPlan) {
          setBooking(tripPlan);
        }
      }
      setLoading(false);
    }
  }, [id, bookings, getTripPlanById]);
  
  const handleCancelBooking = async () => {
    if (!id) return;
    
    try {
      setCancellationInProgress(true);
      await cancelBooking(id);
      navigate('/bookings', { state: { cancelled: true } });
    } catch (err) {
      console.error('Failed to cancel booking:', err);
    } finally {
      setCancellationInProgress(false);
    }
  };
  
  // Calculate if the booking is eligible for cancellation
  // Premium users: Can cancel within 24 hours of booking
  // Free users: Can cancel within 1 hour of booking
  const isCancellable = () => {
    if (!booking || !booking.createdAt) return false;
    
    const createdTime = new Date(booking.createdAt).getTime();
    const currentTime = new Date().getTime();
    const hoursSinceBooking = (currentTime - createdTime) / (1000 * 60 * 60);
    
    if (currentUser?.isPremium) {
      return hoursSinceBooking < 24; // 24 hours for premium
    } else {
      return hoursSinceBooking < 1; // 1 hour for free users
    }
  };
  
  const getBookingStatus = () => {
    if (booking.cancelled) return 'cancelled';
    
    const today = new Date();
    const tripStartDate = new Date(booking.startDate);
    const tripEndDate = new Date(booking.startDate);
    tripEndDate.setDate(tripEndDate.getDate() + booking.numberOfDays);
    
    if (today < tripStartDate) return 'upcoming';
    if (today > tripEndDate) return 'completed';
    return 'active';
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }
  
  if (!booking) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center min-h-[60vh] flex flex-col justify-center">
          <h1 className="text-2xl font-bold mb-2">Booking Not Found</h1>
          <p className="text-gray-600 mb-6">The booking you're looking for does not exist or has been removed.</p>
          <Button onClick={() => navigate('/bookings')}>Back to My Bookings</Button>
        </div>
      </Layout>
    );
  }
  
  const status = getBookingStatus();
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Button variant="outline" size="sm" onClick={() => navigate('/bookings')}>
                &larr; Back to Bookings
              </Button>
              
              <Badge 
                className={`${
                  status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                  status === 'active' ? 'bg-green-100 text-green-800' :
                  status === 'completed' ? 'bg-gray-100 text-gray-800' :
                  'bg-red-100 text-red-800'
                }`}
              >
                {status === 'upcoming' ? 'Upcoming' :
                 status === 'active' ? 'Active' :
                 status === 'completed' ? 'Completed' :
                 'Cancelled'}
              </Badge>
            </div>
            
            <h1 className="text-3xl font-bold">
              {booking.selectedDestinations?.length > 0 ?
                `Trip to ${booking.selectedDestinations.length > 1 ? 
                  `${booking.selectedDestinations.length} destinations` : 
                  booking.destinationNames?.[0] || 'destination'}`
                : 'Trip Details'
              }
            </h1>
          </div>
          
          <div className="flex gap-2">
            {!booking.cancelled && isCancellable() && (
              <Button 
                variant="destructive" 
                onClick={handleCancelBooking}
                disabled={cancellationInProgress}
              >
                {cancellationInProgress ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <X className="w-4 h-4 mr-2" />
                )}
                Cancel Booking
              </Button>
            )}
            
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download Ticket
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Trip Itinerary</h2>
                
                {booking.itinerary && booking.itinerary.length > 0 ? (
                  <TripItinerary 
                    itinerary={booking.itinerary}
                    transportType={booking.transportType || 'car'} 
                    isPremium={currentUser?.isPremium}
                  />
                ) : (
                  <div className="bg-gray-50 p-6 rounded-lg text-center">
                    <p className="text-gray-600">No detailed itinerary available for this trip.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Booking Summary - Right */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                      <span>Travel Dates</span>
                    </div>
                    <span className="font-medium">
                      {booking.startDate ? new Date(booking.startDate).toLocaleDateString() : 'Not specified'} 
                      {booking.numberOfDays && ` (${booking.numberOfDays} days)`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center pb-2 border-b">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-gray-500" />
                      <span>Destinations</span>
                    </div>
                    <span className="font-medium">
                      {booking.selectedDestinations?.length || 'Not specified'}
                    </span>
                  </div>
                  
                  {booking.transportType && (
                    <div className="flex justify-between items-center pb-2 border-b">
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-gray-500" />
                        <span>Transport</span>
                      </div>
                      <span className="font-medium capitalize">
                        {booking.transportType}
                      </span>
                    </div>
                  )}
                  
                  {booking.status && (
                    <div className="flex justify-between items-center pb-2 border-b">
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2 text-gray-500" />
                        <span>Status</span>
                      </div>
                      <Badge 
                        className={`capitalize ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}
                      >
                        {booking.status}
                      </Badge>
                    </div>
                  )}
                  
                  {booking.totalPrice && (
                    <div className="flex justify-between items-center pt-2">
                      <div className="flex items-center">
                        <IndianRupee className="w-5 h-5 mr-2 text-gray-500" />
                        <span>Total Price</span>
                      </div>
                      <span className="font-semibold text-lg">
                        {typeof booking.totalPrice === 'number' ? 
                          formatPrice(booking.totalPrice) : 
                          booking.totalPrice}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {booking.selectedHotels && booking.selectedHotels.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Hotel Details</h2>
                  <div className="space-y-3">
                    {booking.selectedHotels.map((hotel: any, index: number) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-semibold">{hotel.name}</p>
                        <p className="text-sm text-gray-600">{hotel.location?.address || 'Address not available'}</p>
                        <div className="flex justify-between mt-2">
                          <span className="text-sm">{hotel.type || 'Standard'}</span>
                          <span className="text-sm font-medium">
                            {typeof hotel.pricePerPerson === 'number' ? 
                              formatPrice(hotel.pricePerPerson) : 
                              'Price not available'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            
            {currentUser?.isPremium && (
              <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-amber-900 mb-3">Premium Benefits Active</h3>
                  <ul className="text-sm text-amber-800 space-y-2 pl-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span>24-hour cancellation window</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span>Priority customer support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span>Smart crowd insights</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookingDetails;
