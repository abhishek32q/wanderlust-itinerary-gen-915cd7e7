
import React from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { Home, Globe } from 'lucide-react';

interface TravelStyleSelectorProps {
  value: 'base-hotel' | 'mobile';
  onChange: (value: 'base-hotel' | 'mobile') => void;
  disabled?: boolean;
}

const TravelStyleSelector: React.FC<TravelStyleSelectorProps> = ({
  value,
  onChange,
  disabled = false
}) => {
  return (
    <div className="space-y-2">
      <Label>Travel Style</Label>
      <RadioGroup
        value={value}
        onValueChange={(val) => onChange(val as 'base-hotel' | 'mobile')}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2"
        disabled={disabled}
      >
        <Label
          htmlFor="base-hotel"
          className="cursor-pointer"
        >
          <Card className={`p-4 border-2 ${value === 'base-hotel' ? 'border-primary' : 'border-border'}`}>
            <div className="flex items-start gap-3">
              <RadioGroupItem value="base-hotel" id="base-hotel" className="mt-1" />
              <div>
                <div className="flex items-center">
                  <Home className="h-4 w-4 mr-2" />
                  <span className="font-medium">Base Hotel</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Stay in one hotel and take day trips to nearby destinations.
                </p>
              </div>
            </div>
          </Card>
        </Label>
        
        <Label
          htmlFor="mobile"
          className="cursor-pointer"
        >
          <Card className={`p-4 border-2 ${value === 'mobile' ? 'border-primary' : 'border-border'}`}>
            <div className="flex items-start gap-3">
              <RadioGroupItem value="mobile" id="mobile" className="mt-1" />
              <div>
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-2" />
                  <span className="font-medium">Mobile Tour</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Change hotels as you move from destination to destination.
                </p>
              </div>
            </div>
          </Card>
        </Label>
      </RadioGroup>
    </div>
  );
};

export default TravelStyleSelector;
