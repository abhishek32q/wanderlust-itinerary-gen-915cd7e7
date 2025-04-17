
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Lock } from 'lucide-react';
import CrowdChart from '../CrowdChart';

interface CrowdLevelDisplayProps {
  destination: any;
  isPremiumUser: boolean;
}

const CrowdLevelDisplay: React.FC<CrowdLevelDisplayProps> = ({ destination, isPremiumUser }) => {
  return (
    <div className="bg-white p-4 rounded-lg border">
      <h3 className="text-xl font-semibold mb-3">
        Crowd Levels
        {!isPremiumUser && (
          <Badge variant="outline" className="ml-2 bg-gray-100 text-gray-500">
            <Lock className="h-3 w-3 mr-1" /> Premium
          </Badge>
        )}
      </h3>
      
      {isPremiumUser ? (
        <>
          <CrowdChart crowdData={destination.crowdData} />
          <p className="text-xs text-gray-500 mt-2">
            Premium feature: Detailed hourly crowd forecasts help you plan the best time to visit.
          </p>
        </>
      ) : (
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded border border-gray-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Premium Feature</p>
                <p className="text-sm text-gray-600">
                  Upgrade to premium for detailed hourly crowd forecasts and personalized visit recommendations.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrowdLevelDisplay;
