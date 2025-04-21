
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface TripPlanningSubmitProps {
  startDate?: Date;
  selectedDestinationIds: string[];
  submitting: boolean;
  onSubmit: () => void;
}

const TripPlanningSubmit: React.FC<TripPlanningSubmitProps> = ({
  startDate,
  selectedDestinationIds,
  submitting,
  onSubmit
}) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleSubmit = () => {
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
      toast({
        title: "Missing Start Date",
        description: "Please select a start date for your trip",
        variant: "destructive"
      });
      return;
    }

    if (selectedDestinationIds.length === 0) {
      toast({
        title: "No Destinations Selected",
        description: "Please select at least one destination for your trip",
        variant: "destructive"
      });
      return;
    }

    onSubmit();
  };

  return (
    <div className="pt-4">
      <Button 
        onClick={handleSubmit} 
        className="w-full"
        disabled={submitting || !startDate || selectedDestinationIds.length === 0}
      >
        {submitting ? 'Creating Plan...' : 'Create Trip Plan'}
      </Button>
      {!currentUser && (
        <p className="text-sm text-gray-500 text-center mt-2">
          Login required to save trip plans
        </p>
      )}
    </div>
  );
};

export default TripPlanningSubmit;
