
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const DestinationNotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <p>Destination not found</p>
      <Button className="mt-4" onClick={() => navigate("/destinations")}>
        Back to Destinations
      </Button>
    </div>
  );
};

export default DestinationNotFound;
