
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface HotelTypeSelectorProps {
  hotelType: 'budget' | 'standard' | 'luxury';
  setHotelType: (type: 'budget' | 'standard' | 'luxury') => void;
}

const HotelTypeSelector: React.FC<HotelTypeSelectorProps> = ({ hotelType, setHotelType }) => {
  return (
    <div>
      <Label>Hotel Type</Label>
      <div className="grid grid-cols-3 gap-2 mt-2">
        <Button
          variant={hotelType === 'budget' ? 'default' : 'outline'}
          onClick={() => setHotelType('budget')}
          className="justify-start"
        >
          <span className="text-left">
            <span className="block font-medium">Budget</span>
            <span className="text-xs text-gray-500">Affordable</span>
          </span>
        </Button>
        
        <Button
          variant={hotelType === 'standard' ? 'default' : 'outline'}
          onClick={() => setHotelType('standard')}
          className="justify-start"
        >
          <span className="text-left">
            <span className="block font-medium">Standard</span>
            <span className="text-xs text-gray-500">Comfortable</span>
          </span>
        </Button>
        
        <Button
          variant={hotelType === 'luxury' ? 'default' : 'outline'}
          onClick={() => setHotelType('luxury')}
          className="justify-start"
        >
          <span className="text-left">
            <span className="block font-medium">Luxury</span>
            <span className="text-xs text-gray-500">Premium</span>
          </span>
        </Button>
      </div>
    </div>
  );
};

export default HotelTypeSelector;
