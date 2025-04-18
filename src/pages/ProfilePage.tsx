
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { useTripPlanning } from '../context/trip-planning/TripPlanningContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { User, Calendar, MapPin, CreditCard, History, Award, Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { TripPlan } from '../types';
import { format, parseISO } from 'date-fns';

const ProfilePage: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const { getUserTripPlans } = useTripPlanning();
  const [userTrips, setUserTrips] = useState<TripPlan[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      const trips = getUserTripPlans(currentUser.id);
      setUserTrips(trips);
    }
  }, [currentUser, getUserTripPlans]);

  if (!currentUser) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6 pb-8">
              <div className="mb-6">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-gray-400" />
                </div>
                <h1 className="text-2xl font-bold mb-2">Profile</h1>
                <p className="text-gray-500 mb-6">Please login to view your profile</p>
              </div>
              <div className="space-y-4">
                <Button onClick={() => navigate('/login')} className="w-full">Login</Button>
                <Button onClick={() => navigate('/signup')} variant="outline" className="w-full">Sign Up</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  // Filter trips by status
  const upcomingTrips = userTrips.filter(trip => trip.status !== 'cancelled' && new Date(trip.startDate) > new Date());
  const pastTrips = userTrips.filter(trip => {
    const startDate = new Date(trip.startDate);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + trip.numberOfDays);
    return endDate < new Date() && trip.status !== 'cancelled';
  });
  const cancelledTrips = userTrips.filter(trip => trip.status === 'cancelled');
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Overview */}
          <Card className="md:col-span-1">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center text-white mb-4">
                  <User className="w-16 h-16" />
                </div>
                
                <h2 className="text-2xl font-bold">{currentUser.name}</h2>
                <p className="text-gray-500 mb-2">{currentUser.email}</p>
                
                <Badge variant={currentUser.isPremium ? "default" : "outline"} className="mb-4">
                  {currentUser.isPremium ? "Premium Member" : "Standard Account"}
                </Badge>
                
                <div className="flex flex-col gap-3 w-full text-left mt-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span>Member since: January 2025</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>Location: New Delhi, India</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-700">
                    <History className="w-5 h-5 text-primary" />
                    <span>{pastTrips.length} trips completed</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-700">
                    <Briefcase className="w-5 h-5 text-primary" />
                    <span>{upcomingTrips.length} upcoming trips</span>
                  </div>
                </div>
                
                {currentUser.isPremium ? (
                  <div className="mt-6 w-full bg-amber-50 border border-amber-200 rounded-md p-3">
                    <div className="flex items-center gap-2 text-amber-700">
                      <Award className="w-5 h-5 text-amber-500" />
                      <span className="font-medium">Premium Member Benefits:</span>
                    </div>
                    <ul className="text-sm text-amber-700 mt-2 space-y-1 text-left">
                      <li>• Access to flight bookings</li>
                      <li>• Detailed crowd data</li>
                      <li>• Priority customer support</li>
                      <li>• Special discounts (10% off)</li>
                    </ul>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    className="mt-6 w-full border-amber-200 text-amber-700 hover:bg-amber-50"
                    onClick={() => navigate('/premium')}
                  >
                    <Award className="mr-2 h-5 w-5 text-amber-500" />
                    Upgrade to Premium
                  </Button>
                )}
                
                <div className="flex gap-2 mt-6 w-full">
                  <Button variant="outline" className="flex-1" onClick={() => navigate('/bookings')}>
                    My Bookings
                  </Button>
                  <Button variant="destructive" className="flex-1" onClick={logout}>
                    Log Out
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Trip History */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-2xl">My Trips & Bookings</CardTitle>
              <CardDescription>View and manage your travel plans</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="upcoming" className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="upcoming" className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Upcoming ({upcomingTrips.length})
                  </TabsTrigger>
                  <TabsTrigger value="past" className="flex items-center gap-1">
                    <History className="h-4 w-4" />
                    Past ({pastTrips.length})
                  </TabsTrigger>
                  <TabsTrigger value="cancelled" className="flex items-center gap-1">
                    <CreditCard className="h-4 w-4" />
                    Cancelled ({cancelledTrips.length})
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="upcoming">
                  {upcomingTrips.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingTrips.map((trip) => (
                        <TripCard key={trip.id} trip={trip} />
                      ))}
                    </div>
                  ) : (
                    <EmptyTripState 
                      title="No upcoming trips" 
                      description="You don't have any upcoming trips. Start planning your next adventure!" 
                    />
                  )}
                </TabsContent>
                
                <TabsContent value="past">
                  {pastTrips.length > 0 ? (
                    <div className="space-y-4">
                      {pastTrips.map((trip) => (
                        <TripCard key={trip.id} trip={trip} isPast={true} />
                      ))}
                    </div>
                  ) : (
                    <EmptyTripState 
                      title="No past trips" 
                      description="You don't have any past trips with us yet." 
                    />
                  )}
                </TabsContent>
                
                <TabsContent value="cancelled">
                  {cancelledTrips.length > 0 ? (
                    <div className="space-y-4">
                      {cancelledTrips.map((trip) => (
                        <TripCard key={trip.id} trip={trip} isCancelled={true} />
                      ))}
                    </div>
                  ) : (
                    <EmptyTripState 
                      title="No cancelled bookings" 
                      description="You don't have any cancelled bookings." 
                    />
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

// Trip Card Component
interface TripCardProps {
  trip: TripPlan;
  isPast?: boolean;
  isCancelled?: boolean;
}

const TripCard: React.FC<TripCardProps> = ({ trip, isPast = false, isCancelled = false }) => {
  const navigate = useNavigate();
  const startDate = parseISO(trip.startDate);
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + (trip.numberOfDays - 1));
  
  return (
    <div className={`border rounded-lg p-4 hover:border-primary transition-colors ${isCancelled ? 'bg-gray-50' : ''}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">
            {trip.destinationNames ? trip.destinationNames.join(', ') : 'Trip'}
          </h3>
          <p className="text-sm text-gray-500">
            {format(startDate, 'MMM d, yyyy')} - {format(endDate, 'MMM d, yyyy')}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant={isCancelled ? 'destructive' : isPast ? 'secondary' : 'default'} className="text-xs">
              {isCancelled ? 'Cancelled' : isPast ? 'Completed' : 'Upcoming'}
            </Badge>
            {trip.isPremium && (
              <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-300">
                Premium
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          {trip.totalPrice && (
            <p className="font-medium">₹{trip.totalPrice.toLocaleString()}</p>
          )}
          <Button 
            size="sm" 
            variant={isPast || isCancelled ? "outline" : "default"} 
            className="mt-2"
            onClick={() => navigate(`/bookings/${trip.id}`)}
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

// Empty State Component
interface EmptyTripStateProps {
  title: string;
  description: string;
}

const EmptyTripState: React.FC<EmptyTripStateProps> = ({ title, description }) => {
  const navigate = useNavigate();
  
  return (
    <div className="text-center py-10 border border-dashed rounded-lg">
      <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-gray-500 mb-6 max-w-md mx-auto">{description}</p>
      <Button onClick={() => navigate('/trip-planner')}>Plan a Trip</Button>
    </div>
  );
};

export default ProfilePage;
