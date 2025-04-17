
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import TripPlanningForm from '../components/trip-planning/TripPlanningForm';
import { useLocation } from 'react-router-dom';
import { useDestinations } from '../context/DestinationContext';
import { Destination } from '../types';

const TripPlannerPage: React.FC = () => {
  const location = useLocation();
  const { destinationId } = location.state || {};
  const { destinations } = useDestinations();
  const [selectedDestinations, setSelectedDestinations] = useState<Destination[]>([]);

  // If destinationId is provided, set it as the selected destination
  useEffect(() => {
    if (destinationId) {
      const destination = destinations.find(dest => dest.id === destinationId);
      if (destination) {
        setSelectedDestinations([destination]);
      }
    }
  }, [destinationId, destinations]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Plan Your Perfect Trip</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <TripPlanningForm selectedDestinations={selectedDestinations} />
        </div>
      </div>
    </Layout>
  );
};

export default TripPlannerPage;
