
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import TripPlanningForm from '../components/trip-planning/TripPlanningForm';
import { useLocation } from 'react-router-dom';
import { useDestinations } from '../context/DestinationContext';
import { Destination } from '../types';
import { Card, CardContent } from '@/components/ui/card';
import DestinationSelector from '../components/trip-planning/DestinationSelector';
import { Button } from '@/components/ui/button';

const TripPlannerPage: React.FC = () => {
  const location = useLocation();
  const { destinationId } = location.state || {};
  const { destinations } = useDestinations();
  const [selectedDestinations, setSelectedDestinations] = useState<Destination[]>([]);
  const [isSelectingDestinations, setIsSelectingDestinations] = useState(!destinationId);

  // If destinationId is provided, set it as the selected destination
  useEffect(() => {
    if (destinationId) {
      const destination = destinations.find(dest => dest.id === destinationId);
      if (destination) {
        setSelectedDestinations([destination]);
      }
    }
  }, [destinationId, destinations]);

  const handleDestinationToggle = (destination: Destination) => {
    if (selectedDestinations.some(dest => dest.id === destination.id)) {
      setSelectedDestinations(selectedDestinations.filter(dest => dest.id !== destination.id));
    } else {
      setSelectedDestinations([...selectedDestinations, destination]);
    }
  };

  const handleRemoveDestination = (id: string) => {
    setSelectedDestinations(selectedDestinations.filter(dest => dest.id !== id));
  };

  const handleProceedToPlanning = () => {
    setIsSelectingDestinations(false);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Plan Your Perfect Trip</h1>
        
        {isSelectingDestinations ? (
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Select Destinations for Your Trip</h2>
                
                {selectedDestinations.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-lg font-medium mb-2">Selected Destinations:</h3>
                    <DestinationSelector 
                      selectedDestinations={selectedDestinations} 
                      onRemoveDestination={handleRemoveDestination}
                    />
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                  {destinations.map(destination => (
                    <div
                      key={destination.id}
                      className={`border rounded-lg overflow-hidden cursor-pointer transition-colors ${
                        selectedDestinations.some(dest => dest.id === destination.id)
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => handleDestinationToggle(destination)}
                    >
                      <div className="aspect-w-16 aspect-h-9">
                        <img
                          src={destination.image}
                          alt={destination.name}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium">{destination.name}</h3>
                        <p className="text-sm text-gray-500">{destination.city}, {destination.state}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <Button
                  onClick={handleProceedToPlanning}
                  disabled={selectedDestinations.length === 0}
                >
                  Continue to Planning
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <TripPlanningForm 
              selectedDestinations={selectedDestinations} 
              onBackToSelection={() => setIsSelectingDestinations(true)}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TripPlannerPage;
