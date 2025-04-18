
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTripPlanning } from '../../context/trip-planning/TripPlanningContext';
import { useDestinations } from '../../context/DestinationContext';
import { Destination } from '../../types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { ChevronLeft } from 'lucide-react';
import DestinationSelector from './DestinationSelector';
import TripDetailsInput from './TripDetailsInput';
import TransportSelector from './TransportSelector';
import TravelStyleSelector from './TravelStyleSelector';
import HotelTypeSelector from './HotelTypeSelector';
import GuideSelector from './GuideSelector';
import TripFeasibilityCheck from './TripFeasibilityCheck';
import TripCostEstimate from './TripCostEstimate';

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
  const { destinations } = useDestinations();
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

  const destinationIds = selectedDestinations.map(destination => destination.id);

  // Handle form submission
  const handleSubmitPlan = async () => {
    if (!currentUser) {
      toast({
        title: "Login Required",
        description: "Please login to plan a trip",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }
    
    if (!startDate) {
      toast({
        title: "Missing Start Date",
        description: "Please select a start date for your trip",
        variant: "destructive"
      });
      return;
    }

    if (selectedDestinations.length === 0) {
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
        selectedDestinations: destinationIds,
        destinationNames: selectedDestinations.map(dest => dest.name),
        transportType,
        travelStyle,
        isPremium: currentUser.isPremium,
        status: 'pending' as const,
      };
      
      const tripId = await saveTripPlan(tripPlanData);
      
      toast({
        title: "Trip Planned!",
        description: "Your trip has been successfully planned.",
      });
      
      navigate(`/bookings/${tripId}`);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to create trip plan. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
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
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Trip Details */}
          <div className="space-y-6">
            <DestinationSelector 
              selectedDestinations={selectedDestinations} 
            />
            
            <TripDetailsInput 
              startDate={startDate}
              setStartDate={setStartDate}
              numberOfDays={numberOfDays}
              setNumberOfDays={setNumberOfDays}
              numberOfPeople={numberOfPeople}
              setNumberOfPeople={setNumberOfPeople}
              travelStyle={travelStyle}
              setTravelStyle={setTravelStyle}
              selectedDestinations={selectedDestinations}
            />
            
            <HotelTypeSelector 
              hotelType={hotelType}
              setHotelType={setHotelType}
            />

            <GuideSelector 
              destinationIds={destinationIds}
              selectedGuideIds={selectedGuideIds}
              setSelectedGuideIds={setSelectedGuideIds}
            />
            
            <TransportSelector 
              transportType={transportType}
              setTransportType={setTransportType}
              destinationIds={destinationIds}
              numberOfDays={numberOfDays}
              isPremium={currentUser?.isPremium}
            />
          </div>
          
          {/* Right Column - Trip Summary */}
          <div className="space-y-6">
            <TripFeasibilityCheck 
              destinationIds={destinationIds}
              transportType={transportType}
              numberOfDays={numberOfDays}
            />
            
            <TripCostEstimate 
              destinationIds={destinationIds}
              selectedDestinations={selectedDestinations}
              transportType={transportType}
              hotelType={hotelType}
              travelStyle={travelStyle}
              numberOfDays={numberOfDays}
              numberOfPeople={numberOfPeople}
              selectedGuideIds={selectedGuideIds}
              isPremium={currentUser?.isPremium}
            />
            
            <div className="pt-4">
              <Button 
                onClick={handleSubmitPlan} 
                className="w-full"
                disabled={submitting || !startDate || selectedDestinations.length === 0}
              >
                {submitting ? 'Creating Plan...' : 'Create Trip Plan'}
              </Button>
              {!currentUser && (
                <p className="text-sm text-gray-500 text-center mt-2">
                  Login required to save trip plans
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TripPlanningForm;
