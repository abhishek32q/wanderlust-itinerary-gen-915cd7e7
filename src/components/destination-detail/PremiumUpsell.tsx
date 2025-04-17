
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PremiumUpsell: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Star className="h-5 w-5 text-amber-600 fill-amber-600" />
          <h3 className="text-lg font-semibold text-amber-900">Upgrade to Premium</h3>
        </div>
        <ul className="text-sm text-amber-800 space-y-2 mb-4 pl-2">
          <li className="flex items-start gap-2">
            <Star className="h-4 w-4 text-amber-600 fill-amber-600 mt-0.5 flex-shrink-0" />
            <span>Detailed hourly crowd forecasts</span>
          </li>
          <li className="flex items-start gap-2">
            <Star className="h-4 w-4 text-amber-600 fill-amber-600 mt-0.5 flex-shrink-0" />
            <span>Best time to visit recommendations</span>
          </li>
          <li className="flex items-start gap-2">
            <Star className="h-4 w-4 text-amber-600 fill-amber-600 mt-0.5 flex-shrink-0" />
            <span>Personalized itinerary planning</span>
          </li>
        </ul>
        <Button 
          variant="outline" 
          className="w-full border-amber-400 text-amber-800 hover:bg-amber-200 hover:text-amber-900"
          onClick={() => navigate('/premium')}
        >
          Unlock Premium Features
        </Button>
      </CardContent>
    </Card>
  );
};

export default PremiumUpsell;
