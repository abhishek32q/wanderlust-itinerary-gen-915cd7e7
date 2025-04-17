
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Check } from 'lucide-react';
import { GuideType } from '../../types';
import { useTripPlanning } from '../../context/trip-planning/TripPlanningContext';

interface GuideSelectorProps {
  destinationIds: string[];
  selectedGuideIds: string[];
  setSelectedGuideIds: (ids: string[]) => void;
}

const GuideSelector: React.FC<GuideSelectorProps> = ({ 
  destinationIds, 
  selectedGuideIds, 
  setSelectedGuideIds 
}) => {
  const { getGuidesByDestination } = useTripPlanning();
  const [availableGuides, setAvailableGuides] = useState<GuideType[]>([]);

  // Get available guides for selected destinations
  useEffect(() => {
    if (destinationIds.length > 0) {
      const guides = destinationIds.flatMap(destId => 
        getGuidesByDestination(destId)
      );
      setAvailableGuides(guides);
    }
  }, [destinationIds, getGuidesByDestination]);

  const toggleGuideSelection = (guideId: string) => {
    if (selectedGuideIds.includes(guideId)) {
      setSelectedGuideIds(selectedGuideIds.filter(id => id !== guideId));
    } else {
      setSelectedGuideIds([...selectedGuideIds, guideId]);
    }
  };

  if (availableGuides.length === 0) {
    return (
      <Card>
        <CardContent className="p-4 text-center">
          <p className="text-sm text-gray-500">No guides available for the selected destinations.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <Label className="mb-2 block">Tour Guides</Label>
      <div className="bg-gray-50 p-4 rounded-lg space-y-3 max-h-48 overflow-y-auto">
        {availableGuides.map(guide => (
          <div 
            key={guide.id} 
            className={`flex items-center justify-between p-2 rounded cursor-pointer ${
              selectedGuideIds.includes(guide.id) ? "bg-primary/10 border border-primary/30" : "bg-white border"
            }`}
            onClick={() => toggleGuideSelection(guide.id)}
          >
            <div>
              <p className="font-medium">{guide.name}</p>
              <p className="text-sm text-gray-500">
                {guide.languages.join(', ')} • ₹{guide.pricePerDay}/day
              </p>
            </div>
            <div className="flex items-center">
              <span className="text-amber-500 mr-1">★</span> 
              <span>{guide.rating}</span>
              <div className={`ml-3 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedGuideIds.includes(guide.id) ? "border-primary bg-primary text-white" : "border-gray-300"
              }`}>
                {selectedGuideIds.includes(guide.id) && <Check className="h-3 w-3" />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuideSelector;
