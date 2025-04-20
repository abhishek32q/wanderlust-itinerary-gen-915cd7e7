
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '../context/AuthContext';
import { useTripPlanning } from '../context/trip-planning/TripPlanningContext';
import { format } from 'date-fns';
import { TripPlan } from '../types';
import { MapPin, Calendar, Users, Navigation, Check, X } from 'lucide-react';

const BookingsHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { getUserTripPlans, cancelTripPlan } = useTripPlanning();
  const [tripPlans, setTripPlans] = useState<TripPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      const userTrips = getUserTripPlans(currentUser.id);
      setTripPlans(userTrips);
    }
    setIsLoading(false);
  }, [currentUser, getUserTripPlans]);

  const handleViewBooking = (tripId: string) => {
    navigate(`/bookings/${tripId}`);
  };

  const handleCancelTrip = async (tripId: string) => {
    try {
      await cancelTripPlan(tripId);
      // Update trip plans after cancellation
      if (currentUser) {
        const userTrips = getUserTripPlans(currentUser.id);
        setTripPlans(userTrips);
      }
    } catch (error) {
      console.error("Error cancelling trip:", error);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Booking History</h1>
          <div className="flex justify-center items-center py-12">
            <p>Loading your bookings...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!currentUser) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Booking History</h1>
          <Card>
            <CardContent className="p-8 text-center">
              <h2 className="text-xl font-semibold mb-4">Login Required</h2>
              <p className="text-gray-600 mb-6">Please login to view your booking history</p>
              <Button onClick={() => navigate('/login', { state: { returnPath: '/bookings-history' } })}>
                Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  if (tripPlans.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Booking History</h1>
          <Card>
            <CardContent className="p-8 text-center">
              <h2 className="text-xl font-semibold mb-4">No Bookings Found</h2>
              <p className="text-gray-600 mb-6">You haven't made any trip bookings yet.</p>
              <Button onClick={() => navigate('/trip-planner')}>Plan a Trip</Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Booking History</h1>
          <Button onClick={() => navigate('/trip-planner')}>Plan New Trip</Button>
        </div>

        <div className="space-y-6">
          {tripPlans.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(trip => (
            <Card key={trip.id} className="overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Booking ID</p>
                  <p className="font-mono text-sm">{trip.id}</p>
                </div>
                <div className="flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    trip.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    trip.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {trip.status === 'confirmed' ? 'Confirmed' :
                     trip.status === 'cancelled' ? 'Cancelled' : 'Pending'}
                  </span>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Trip Details</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <MapPin className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Destinations</p>
                          <p className="text-gray-600">{trip.destinationNames?.join(', ')}</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Calendar className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Visit Date</p>
                          <p className="text-gray-600">
                            {format(new Date(trip.startDate), 'MMM dd, yyyy')} - {
                              format(new Date(new Date(trip.startDate).setDate(
                                new Date(trip.startDate).getDate() + trip.numberOfDays
                              )), 'MMM dd, yyyy')
                            }
                          </p>
                          <p className="text-gray-500 text-sm">{trip.numberOfDays} days</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Navigation className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Transport</p>
                          <p className="text-gray-600 capitalize">{trip.transportType}</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Users className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Travel Style</p>
                          <p className="text-gray-600 capitalize">
                            {trip.travelStyle === 'base-hotel' ? 'Stay at base hotel' : 'Change hotels'}
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Booking Information</h3>
                    <ul className="space-y-3 mb-4">
                      <li className="flex justify-between">
                        <span className="text-gray-600">Booked on</span>
                        <span>{format(new Date(trip.createdAt), 'MMM dd, yyyy')}</span>
                      </li>
                      {trip.totalPrice && (
                        <li className="flex justify-between">
                          <span className="text-gray-600">Total Price</span>
                          <span className="font-medium">₹{trip.totalPrice.toLocaleString()}</span>
                        </li>
                      )}
                      {trip.isPremium && (
                        <li className="flex justify-between items-center">
                          <span className="text-gray-600">Premium Benefits</span>
                          <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">Applied</span>
                        </li>
                      )}
                    </ul>

                    <Separator className="my-4" />

                    <div className="flex justify-between gap-3 mt-4">
                      <Button 
                        variant="outline" 
                        onClick={() => handleViewBooking(trip.id)}
                      >
                        View Full Details
                      </Button>
                      
                      {trip.status !== 'cancelled' && (
                        <Button 
                          variant="destructive"
                          onClick={() => handleCancelTrip(trip.id)}
                        >
                          Cancel Trip
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default BookingsHistoryPage;
