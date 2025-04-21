import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTripPlanning } from '../../context/trip-planning/TripPlanningContext';
import { Destination } from '../../types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { ChevronLeft } from 'lucide-react';
import TripPlanningFormContent from './TripPlanningFormContent';

interface TripPlanningFormProps {
  selectedDestinations: Destination[];
  onBackToSelection?: () => void;
}

const TripPlanningForm: React.FC<TripPlanningFormProps> = ({ 
  selectedDestinations: initialDestinations, 
  onBackToSelection 
}) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { saveTripPlan } = useTripPlanning();
  const [selectedDestinations, setSelectedDestinations] = useState<Destination[]>(initialDestinations);
  
  // Form state
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [numberOfDays, setNumberOfDays] = useState(Math.max(initialDestinations.length * 2, 3));
  const [numberOfPeople, setNumberOfPeople] = useState(2);
  const [transportType, setTransportType] = useState<'bus' | 'train' | 'flight' | 'car'>('car');
  const [hotelType, setHotelType] = useState<'budget' | 'standard' | 'luxury'>('standard');
  const [travelStyle, setTravelStyle] = useState<'base-hotel' | 'mobile'>('mobile');
  const [selectedGuideIds, setSelectedGuideIds] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleRemoveDestination = (id: string) => {
    setSelectedDestinations(prev => prev.filter(dest => dest.id !== id));
  };

  // Handle form submission
  const handleSubmitPlan = async () => {
    setErrorMsg(null);
    
    if (!currentUser) {
      toast({
        title: "Login Required",
        description: "Please login to plan a trip",
        variant: "destructive"
      });
      navigate('/login', { state: { returnPath: '/trip-planner' } });
      return;
    }
    
    if (!startDate) {
      setErrorMsg("Please select a start date for your trip");
      toast({
        title: "Missing Start Date",
        description: "Please select a start date for your trip",
        variant: "destructive"
      });
      return;
    }

    if (selectedDestinations.length === 0) {
      setErrorMsg("Please select at least one destination for your trip");
      toast({
        title: "No Destinations Selected",
        description: "Please select at least one destination for your trip",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setSubmitting(true);
      
      const tripPlanData = {
        userId: currentUser.id,
        startDate: startDate.toISOString(),
        numberOfDays,
        selectedDestinations: selectedDestinations.map(dest => dest.id),
        destinationNames: selectedDestinations.map(dest => dest.name),
        transportType,
        hotelType,
        travelStyle,
        isPremium: currentUser.isPremium,
        status: 'pending' as const,
      };
      
      console.log("Creating trip plan with data:", tripPlanData);
      const tripId = await saveTripPlan(tripPlanData);
      console.log("Trip created with ID:", tripId);
      
      toast({
        title: "Trip Planned!",
        description: "Your trip has been successfully planned.",
      });
      
      // Redirect to bookings history page to view the trip details
      navigate('/bookings-history');
    } catch (error) {
      console.error("Error creating trip plan:", error);
      setErrorMsg("Failed to create trip plan. Please try again.");
      toast({
        title: "Error",
        description: "Failed to create trip plan. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelPlan = () => {
    // If there's a back function provided, use it
    if (onBackToSelection) {
      onBackToSelection();
    } else {
      // Otherwise navigate to destinations page
      navigate('/destinations');
    }
  };

  if (selectedDestinations.length === 0 && !onBackToSelection) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-8">
            <h3 className="text-xl font-semibold mb-4">Select Destinations for Your Trip</h3>
            <p className="text-gray-500 mb-6">Please select at least one destination to start planning your trip.</p>
            <Button onClick={() => navigate('/destinations')}>Browse Destinations</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-gray-200">
      <CardContent className="p-6">
        {onBackToSelection && (
          <Button 
            variant="ghost" 
            onClick={onBackToSelection} 
            className="mb-4 -ml-2 text-gray-500 hover:text-gray-900"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Destination Selection
          </Button>
        )}
        
        <h2 className="text-2xl font-semibold mb-6">Plan Your Trip</h2>
        
        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600">
            {errorMsg}
          </div>
        )}
        
        <TripPlanningFormContent 
          selectedDestinations={selectedDestinations}
          onRemoveDestination={handleRemoveDestination}
          startDate={startDate}
          setStartDate={setStartDate}
          numberOfDays={numberOfDays}
          setNumberOfDays={setNumberOfDays}
          numberOfPeople={numberOfPeople}
          setNumberOfPeople={setNumberOfPeople}
          transportType={transportType}
          setTransportType={setTransportType}
          hotelType={hotelType}
          setHotelType={setHotelType}
          travelStyle={travelStyle}
          setTravelStyle={setTravelStyle}
          selectedGuideIds={selectedGuideIds}
          setSelectedGuideIds={setSelectedGuideIds}
          submitting={submitting}
          onSubmitPlan={handleSubmitPlan}
          onCancelPlan={handleCancelPlan}
          isPremium={currentUser?.isPremium}
        />
      </CardContent>
    </Card>
  );
};

export default TripPlanningForm;
