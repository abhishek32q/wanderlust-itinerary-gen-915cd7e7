
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface TripPlanningSubmitProps {
  startDate?: Date;
  selectedDestinationIds: string[];
  submitting: boolean;
  onSubmit: () => void;
  onCancel?: () => void;
}

const TripPlanningSubmit: React.FC<TripPlanningSubmitProps> = ({
  startDate,
  selectedDestinationIds,
  submitting,
  onSubmit,
  onCancel
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
    <div className="pt-4 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        {onCancel && (
          <Button 
            onClick={onCancel} 
            variant="outline"
            disabled={submitting}
            className="flex items-center justify-center"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Cancelling...
              </>
            ) : (
              'Cancel'
            )}
          </Button>
        )}
        <Button 
          onClick={handleSubmit} 
          className={onCancel ? "flex items-center justify-center" : "w-full flex items-center justify-center"}
          disabled={submitting || !startDate || selectedDestinationIds.length === 0}
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Creating Plan...
            </>
          ) : (
            'Create Trip Plan'
          )}
        </Button>
      </div>
      
      {!currentUser && (
        <p className="text-sm text-gray-500 text-center mt-2">
          Login required to save trip plans
        </p>
      )}
    </div>
  );
};

export default TripPlanningSubmit;
