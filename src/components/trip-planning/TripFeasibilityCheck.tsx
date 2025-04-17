
import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { useTripPlanning } from '../../context/trip-planning/TripPlanningContext';

interface TripFeasibilityCheckProps {
  destinationIds: string[];
  transportType: 'bus' | 'train' | 'flight' | 'car';
  numberOfDays: number;
}

const TripFeasibilityCheck: React.FC<TripFeasibilityCheckProps> = ({
  destinationIds,
  transportType,
  numberOfDays
}) => {
  const { checkTripFeasibility } = useTripPlanning();
  const [feasibilityCheck, setFeasibilityCheck] = useState<any>(null);
  
  useEffect(() => {
    if (destinationIds.length > 0 && transportType) {
      const feasibility = checkTripFeasibility({
        destinationIds,
        transportType,
        numberOfDays
      });
      setFeasibilityCheck(feasibility);
    }
  }, [destinationIds, transportType, numberOfDays, checkTripFeasibility]);

  if (!feasibilityCheck) {
    return null;
  }

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-semibold mb-3 flex items-center">
        <Clock className="h-5 w-5 mr-2" />
        Trip Feasibility Check
      </h3>
      
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
    </div>
  );
};

export default TripFeasibilityCheck;
