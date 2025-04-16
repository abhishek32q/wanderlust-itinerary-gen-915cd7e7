
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Car, Bus, Train, Plane, Calendar as CalendarIcon, Users, MapPin, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTripPlanning } from '../context/TripPlanningContext';
import { useDestinations } from '../context/DestinationContext';
import { TransportType, HotelType, Destination } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface TripPlanningFormProps {
  selectedDestinations: Destination[];
}

const TripPlanningForm: React.FC<TripPlanningFormProps> = ({ selectedDestinations }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { checkTripFeasibility, getSuggestedTransport, getOptimalHotels, saveTripPlan } = useTripPlanning();
  const { getCurrentCrowdLevel } = useDestinations();

  // Form state
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [numberOfDays, setNumberOfDays] = useState(Math.max(selectedDestinations.length * 2, 3));
  const [numberOfPeople, setNumberOfPeople] = useState(2);
  const [transportType, setTransportType] = useState<'bus' | 'train' | 'flight' | 'car'>('car');
  const [hotelType, setHotelType] = useState<'budget' | 'standard' | 'luxury'>('standard');
  const [travelStyle, setTravelStyle] = useState<'base-hotel' | 'mobile'>('mobile');
  
  // Derived data
  const [suggestedTransport, setSuggestedTransport] = useState<any>(null);
  const [feasibilityCheck, setFeasibilityCheck] = useState<any>(null);
  const [optimalHotels, setOptimalHotels] = useState<HotelType[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const destinationIds = selectedDestinations.map(destination => destination.id);

  // Check trip feasibility when parameters change
  useEffect(() => {
    if (selectedDestinations.length > 0 && transportType) {
      const feasibility = checkTripFeasibility({
        destinationIds,
        transportType,
        numberOfDays
      });
      setFeasibilityCheck(feasibility);
      
      const suggested = getSuggestedTransport(
        destinationIds, 
        numberOfDays,
        currentUser?.isPremium
      );
      setSuggestedTransport(suggested);
      
      const hotels = getOptimalHotels(destinationIds);
      setOptimalHotels(hotels);
    }
  }, [selectedDestinations, transportType, numberOfDays, currentUser?.isPremium]);

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

  // Calculate estimated cost (simplified)
  const calculateEstimatedCost = () => {
    let baseCost = 0;
    
    // Transport cost based on distance
    const distance = feasibilityCheck?.totalDistance || 0;
    const transportRates = { bus: 2, train: 3, flight: 6, car: 4 };
    const transportCost = transportType === 'flight' 
      ? 2000 + (distance * transportRates[transportType])
      : distance * transportRates[transportType];
    
    // Hotel cost based on type
    const hotelRates = { budget: 1500, standard: 3000, luxury: 6000 };
    const hotelCost = hotelRates[hotelType] * numberOfDays;
    
    // Destination entry costs (estimated)
    const entryCost = selectedDestinations.reduce((total, dest) => {
      const price = typeof dest.price === 'number' 
        ? dest.price 
        : (dest.price?.adult || 100);
      return total + price;
    }, 0);
    
    baseCost = transportCost + hotelCost + entryCost;
    
    // Multiply by number of people
    baseCost *= numberOfPeople;
    
    // Premium discount
    if (currentUser?.isPremium) {
      baseCost *= 0.9; // 10% discount
    }
    
    return Math.round(baseCost);
  };

  const getTransportIcon = (type: string) => {
    switch (type) {
      case 'bus': return <Bus className="h-5 w-5" />;
      case 'train': return <Train className="h-5 w-5" />;
      case 'flight': return <Plane className="h-5 w-5" />;
      case 'car': return <Car className="h-5 w-5" />;
      default: return <Car className="h-5 w-5" />;
    }
  };

  if (selectedDestinations.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">Please select at least one destination to start planning your trip.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-gray-200">
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold mb-6">Plan Your Trip</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Trip Details */}
          <div className="space-y-6">
            <div>
              <Label>Trip Destinations</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedDestinations.map(destination => (
                  <Badge key={destination.id} className="px-3 py-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    {destination.name}
                    <span className={`ml-2 inline-block w-2 h-2 rounded-full 
                      ${getCurrentCrowdLevel(destination.crowdData) === 'low' ? 'bg-green-500' : 
                        getCurrentCrowdLevel(destination.crowdData) === 'medium' ? 'bg-yellow-500' : 
                        'bg-red-500'}`}>
                    </span>
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start-date">Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="start-date"
                      variant="outline"
                      className="w-full justify-start text-left font-normal mt-2"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <Label htmlFor="num-days">Number of Days</Label>
                <Input
                  id="num-days"
                  type="number"
                  value={numberOfDays}
                  onChange={(e) => setNumberOfDays(parseInt(e.target.value) || 1)}
                  min={1}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="num-people">Number of People</Label>
                <div className="flex items-center mt-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => numberOfPeople > 1 && setNumberOfPeople(numberOfPeople - 1)}
                  >
                    -
                  </Button>
                  <Input
                    id="num-people"
                    type="number"
                    value={numberOfPeople}
                    onChange={(e) => setNumberOfPeople(parseInt(e.target.value) || 1)}
                    min={1}
                    className="mx-2 text-center"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setNumberOfPeople(numberOfPeople + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div>
                <Label>Travel Style</Label>
                <Select value={travelStyle} onValueChange={(value: any) => setTravelStyle(value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mobile">Changing Hotels</SelectItem>
                    <SelectItem value="base-hotel">Base Hotel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label>Hotel Type</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <Button
                  variant={hotelType === 'budget' ? 'default' : 'outline'}
                  onClick={() => setHotelType('budget')}
                  className="justify-start"
                >
                  <span className="text-left">
                    <span className="block font-medium">Budget</span>
                    <span className="text-xs text-gray-500">Affordable</span>
                  </span>
                </Button>
                
                <Button
                  variant={hotelType === 'standard' ? 'default' : 'outline'}
                  onClick={() => setHotelType('standard')}
                  className="justify-start"
                >
                  <span className="text-left">
                    <span className="block font-medium">Standard</span>
                    <span className="text-xs text-gray-500">Comfortable</span>
                  </span>
                </Button>
                
                <Button
                  variant={hotelType === 'luxury' ? 'default' : 'outline'}
                  onClick={() => setHotelType('luxury')}
                  className="justify-start"
                >
                  <span className="text-left">
                    <span className="block font-medium">Luxury</span>
                    <span className="text-xs text-gray-500">Premium</span>
                  </span>
                </Button>
              </div>
            </div>
            
            <Separator />
            
            {/* Transport Selection */}
            <div>
              <Label>Transportation</Label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                <Button
                  variant={transportType === 'bus' ? 'default' : 'outline'}
                  onClick={() => setTransportType('bus')}
                  className="flex flex-col h-auto py-3"
                >
                  <Bus className="h-6 w-6 mb-1" />
                  <span>Bus</span>
                  <span className="text-xs text-gray-500">Affordable</span>
                </Button>
                
                <Button
                  variant={transportType === 'train' ? 'default' : 'outline'}
                  onClick={() => setTransportType('train')}
                  className="flex flex-col h-auto py-3"
                >
                  <Train className="h-6 w-6 mb-1" />
                  <span>Train</span>
                  <span className="text-xs text-gray-500">Comfortable</span>
                </Button>
                
                <Button
                  variant={transportType === 'flight' ? 'default' : 'outline'}
                  onClick={() => setTransportType('flight')}
                  className="flex flex-col h-auto py-3"
                  disabled={!currentUser?.isPremium}
                >
                  <Plane className="h-6 w-6 mb-1" />
                  <span>Flight</span>
                  {!currentUser?.isPremium && (
                    <span className="text-xs text-amber-500">Premium</span>
                  )}
                </Button>
                
                <Button
                  variant={transportType === 'car' ? 'default' : 'outline'}
                  onClick={() => setTransportType('car')}
                  className="flex flex-col h-auto py-3"
                >
                  <Car className="h-6 w-6 mb-1" />
                  <span>Car</span>
                  <span className="text-xs text-gray-500">Private</span>
                </Button>
              </div>
            </div>
            
            {/* Recommended Transport */}
            {suggestedTransport && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm flex items-center gap-1 text-gray-600 mb-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                  Recommended Transport:
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getTransportIcon(suggestedTransport.recommendedType)}
                    <span className="font-medium capitalize">{suggestedTransport.recommendedType}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600">{suggestedTransport.reasoning}</p>
                </div>
                
                {!suggestedTransport.isRealistic && (
                  <p className="text-sm text-red-500 mt-2">
                    <Clock className="h-4 w-4 inline mr-1" />
                    This trip may be rushed. Consider adding more days.
                  </p>
                )}
              </div>
            )}
          </div>
          
          {/* Right Column - Trip Summary */}
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3 flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Trip Feasibility Check
              </h3>
              
              {feasibilityCheck && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Distance:</span>
                    <span className="font-medium">{Math.round(feasibilityCheck.totalDistance)} km</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Travel Hours:</span>
                    <span className="font-medium">{Math.round(feasibilityCheck.totalTravelHours)} hours</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Minimum Days Needed:</span>
                    <span className={`font-medium ${feasibilityCheck.feasible ? 'text-green-600' : 'text-red-600'}`}>
                      {feasibilityCheck.daysNeeded} days
                    </span>
                  </div>
                  
                  {!feasibilityCheck.feasible && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded text-sm mt-2">
                      <p className="font-medium">Trip needs {feasibilityCheck.daysShort} more day(s)</p>
                      <p className="mt-1">Consider adding more days or reducing destinations.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Trip Cost Estimate */}
            <div>
              <h3 className="font-semibold mb-3">Cost Estimate</h3>
              
              <div className="bg-white border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Transport:</span>
                  <span className="font-medium">₹{Math.round((feasibilityCheck?.totalDistance || 0) * (transportType === 'flight' ? 6 : transportType === 'car' ? 4 : transportType === 'train' ? 3 : 2) * numberOfPeople).toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Hotel ({numberOfDays} nights):</span>
                  <span className="font-medium">₹{(numberOfDays * (hotelType === 'luxury' ? 6000 : hotelType === 'standard' ? 3000 : 1500) * numberOfPeople).toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Entry Tickets:</span>
                  <span className="font-medium">₹{Math.round(selectedDestinations.reduce((total, dest) => {
                    const price = typeof dest.price === 'number' 
                      ? dest.price 
                      : (dest.price?.adult || 100);
                    return total + price;
                  }, 0) * numberOfPeople).toLocaleString()}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between items-center font-semibold">
                  <span>Total (for {numberOfPeople} people):</span>
                  <span className="text-lg">₹{calculateEstimatedCost().toLocaleString()}</span>
                </div>
                
                {currentUser?.isPremium && (
                  <div className="bg-amber-50 border border-amber-200 text-amber-700 p-2 rounded text-sm mt-2 flex gap-2 items-center">
                    <span className="text-amber-500 font-bold">✦</span>
                    <p>Premium discount applied (10%)</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="pt-4">
              <Button 
                onClick={handleSubmitPlan} 
                className="w-full"
                disabled={submitting || !startDate || !feasibilityCheck?.feasible}
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
