
import React from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { User, Calendar, MapPin, CreditCard, History } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const ProfilePage: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Profile</h1>
          <p className="mb-6">Please login to view your profile</p>
          <Button onClick={() => navigate('/login')}>Login</Button>
        </div>
      </Layout>
    );
  }

  // Mock booking history data
  const mockBookings = [
    {
      id: 'book_1',
      destination: 'Taj Mahal',
      date: '2025-05-15',
      status: 'confirmed',
      totalAmount: 12500,
    },
    {
      id: 'book_2',
      destination: 'Jaipur City Tour',
      date: '2025-06-22',
      status: 'pending',
      totalAmount: 8750,
    },
    {
      id: 'book_3',
      destination: 'Kerala Backwaters',
      date: '2025-07-10',
      status: 'completed',
      totalAmount: 15200,
    }
  ];
  
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
                    <span>3 trips completed</span>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-6 w-full">
                  <Button variant="outline" className="flex-1" onClick={() => navigate('/bookings')}>
                    View Trips
                  </Button>
                  <Button variant="destructive" className="flex-1" onClick={logout}>
                    Log Out
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Booking History */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>My Trips & Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="upcoming">
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="upcoming" className="flex-1">Upcoming</TabsTrigger>
                  <TabsTrigger value="past" className="flex-1">Past</TabsTrigger>
                  <TabsTrigger value="canceled" className="flex-1">Canceled</TabsTrigger>
                </TabsList>
                
                <TabsContent value="upcoming">
                  <div className="space-y-4">
                    {mockBookings.filter(booking => booking.status !== 'completed').map(booking => (
                      <div key={booking.id} className="border rounded-lg p-4 hover:border-primary transition-colors">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{booking.destination}</h3>
                            <p className="text-sm text-gray-500">Trip Date: {booking.date}</p>
                          </div>
                          <Badge variant={booking.status === 'confirmed' ? 'default' : 'outline'}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <p className="font-medium">₹{booking.totalAmount.toLocaleString()}</p>
                          <Button size="sm" onClick={() => navigate(`/bookings/${booking.id}`)}>
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="past">
                  <div className="space-y-4">
                    {mockBookings.filter(booking => booking.status === 'completed').map(booking => (
                      <div key={booking.id} className="border rounded-lg p-4 hover:border-primary transition-colors">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{booking.destination}</h3>
                            <p className="text-sm text-gray-500">Trip Date: {booking.date}</p>
                          </div>
                          <Badge variant="secondary">Completed</Badge>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <p className="font-medium">₹{booking.totalAmount.toLocaleString()}</p>
                          <Button size="sm" variant="outline" onClick={() => navigate(`/bookings/${booking.id}`)}>
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="canceled">
                  <div className="p-8 text-center text-gray-500">
                    <p>No canceled bookings found.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
