
import React from 'react';
import Layout from '../components/Layout';
import TripPlanningForm from '../components/TripPlanningForm';
import { useLocation } from 'react-router-dom';

const TripPlannerPage: React.FC = () => {
  const location = useLocation();
  const { destinationId } = location.state || {};

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Plan Your Perfect Trip</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <TripPlanningForm preselectedDestinationId={destinationId} />
        </div>
      </div>
    </Layout>
  );
};

export default TripPlannerPage;
