
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { IndianRupee } from 'lucide-react';
import { formatPrice } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';

interface PricingCardProps {
  destination: any;
  destinationId: string;
}

const PricingCard: React.FC<PricingCardProps> = ({ destination, destinationId }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate('/trip-planner', { state: { destinationId } });
  };

  return (
    <Card className="sticky top-6">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-xl font-bold">Plan Your Visit</h2>
        
        {destination.price?.adult === 0 ? (
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <p className="text-lg font-bold text-green-800">Free Entry</p>
            <p className="text-sm text-green-600">Open to all visitors</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Indian Adult</p>
                  <p className="text-sm text-gray-500">(12+ years)</p>
                </div>
                <p className="text-lg font-bold">
                  {destination.price && typeof destination.price === 'object' && destination.price.adult !== undefined
                    ? formatPrice(destination.price.adult)
                    : formatPrice(destination.price || 0)}
                </p>
              </div>
            </div>
            
            {destination.price && typeof destination.price === 'object' && destination.price.child > 0 && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Indian Child</p>
                    <p className="text-sm text-gray-500">(5-12 years)</p>
                  </div>
                  <p className="text-lg font-bold">{formatPrice(destination.price.child)}</p>
                </div>
              </div>
            )}
            
            {destination.price && typeof destination.price === 'object' && 
              destination.price.foreigner && destination.price.foreigner > 0 && (
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Foreign Visitor</p>
                    <p className="text-sm text-gray-500">(All ages)</p>
                  </div>
                  <p className="text-lg font-bold">{formatPrice(destination.price.foreigner)}</p>
                </div>
              </div>
            )}
          </div>
        )}
        
        <Button 
          onClick={handleBookNow} 
          className="w-full h-12 text-lg"
        >
          Start Planning
        </Button>
        
        <p className="text-sm text-gray-500 text-center">
          <IndianRupee className="inline w-3 h-3 mr-1" />
          No payment required to plan your trip
        </p>
      </CardContent>
    </Card>
  );
};

export default PricingCard;
