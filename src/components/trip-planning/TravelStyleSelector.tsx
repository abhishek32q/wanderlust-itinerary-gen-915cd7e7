
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Home, Map } from 'lucide-react';

interface TravelStyleSelectorProps {
  travelStyle: 'base-hotel' | 'mobile';
  setTravelStyle: (style: 'base-hotel' | 'mobile') => void;
  disabled?: boolean;
}

const TravelStyleSelector: React.FC<TravelStyleSelectorProps> = ({
  travelStyle,
  setTravelStyle,
  disabled = false
}) => {
  return (
    <div>
      <Label className="block mb-2">Travel Style</Label>
      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant={travelStyle === 'base-hotel' ? 'default' : 'outline'}
          className="flex flex-col items-center justify-center h-24 px-3 py-4"
          onClick={() => setTravelStyle('base-hotel')}
          disabled={disabled}
        >
          <Home className="h-8 w-8 mb-2" />
          <div className="text-center">
            <p className="font-medium">Base Hotel</p>
            <p className="text-xs">Stay in one place</p>
          </div>
        </Button>

        <Button
          type="button"
          variant={travelStyle === 'mobile' ? 'default' : 'outline'}
          className="flex flex-col items-center justify-center h-24 px-3 py-4"
          onClick={() => setTravelStyle('mobile')}
          disabled={disabled}
        >
          <Map className="h-8 w-8 mb-2" />
          <div className="text-center">
            <p className="font-medium">Changing Hotels</p>
            <p className="text-xs">Stay near each destination</p>
          </div>
        </Button>
      </div>
      {disabled && (
        <p className="text-xs text-muted-foreground mt-2">
          Select multiple destinations to enable this option
        </p>
      )}
    </div>
  );
};

export default TravelStyleSelector;
