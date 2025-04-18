
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Hotel, Map } from 'lucide-react';

interface TravelStyleSelectorProps {
  travelStyle: 'base-hotel' | 'mobile';
  setTravelStyle: (style: 'base-hotel' | 'mobile') => void;
  isDisabled?: boolean;
}

const TravelStyleSelector: React.FC<TravelStyleSelectorProps> = ({ 
  travelStyle, 
  setTravelStyle,
  isDisabled = false
}) => {
  return (
    <div>
      <Label className="block mb-2">Travel Style</Label>
      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant={travelStyle === 'mobile' ? 'default' : 'outline'}
          className={`flex items-center justify-center gap-2 h-auto py-3 ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => !isDisabled && setTravelStyle('mobile')}
          disabled={isDisabled}
        >
          <Map className="h-4 w-4" />
          <div className="text-left">
            <span className="block font-medium">Changing Hotels</span>
            <span className="text-xs">Stay at different hotels</span>
          </div>
        </Button>
        
        <Button
          type="button"
          variant={travelStyle === 'base-hotel' ? 'default' : 'outline'}
          className={`flex items-center justify-center gap-2 h-auto py-3 ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => !isDisabled && setTravelStyle('base-hotel')}
          disabled={isDisabled}
        >
          <Hotel className="h-4 w-4" />
          <div className="text-left">
            <span className="block font-medium">Base Hotel</span>
            <span className="text-xs">Stay at one central hotel</span>
          </div>
        </Button>
      </div>
      
      {isDisabled && (
        <p className="text-xs text-muted-foreground mt-1">
          Select multiple destinations to enable this option
        </p>
      )}
    </div>
  );
};

export default TravelStyleSelector;
