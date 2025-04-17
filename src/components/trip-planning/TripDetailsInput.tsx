
import React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Destination } from '../../types';

interface TripDetailsInputProps {
  startDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  numberOfDays: number;
  setNumberOfDays: (days: number) => void;
  numberOfPeople: number;
  setNumberOfPeople: (people: number) => void;
  travelStyle: 'base-hotel' | 'mobile';
  setTravelStyle: (style: 'base-hotel' | 'mobile') => void;
  selectedDestinations: Destination[];
}

const TripDetailsInput: React.FC<TripDetailsInputProps> = ({
  startDate,
  setStartDate,
  numberOfDays,
  setNumberOfDays,
  numberOfPeople,
  setNumberOfPeople,
  travelStyle,
  setTravelStyle,
  selectedDestinations
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor="start-date">Start Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="start-date"
              variant="outline"
              className="w-full justify-start text-left font-normal mt-2"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startDate ? format(startDate, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={setStartDate}
              initialFocus
              className="pointer-events-auto p-3"
              disabled={(date) => date < new Date()}
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <div>
        <Label htmlFor="num-days">Number of Days</Label>
        <Input
          id="num-days"
          type="number"
          value={numberOfDays}
          onChange={(e) => setNumberOfDays(parseInt(e.target.value) || 1)}
          min={1}
          className="mt-2"
        />
      </div>
      
      <div>
        <Label htmlFor="num-people">Number of People</Label>
        <div className="flex items-center mt-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => numberOfPeople > 1 && setNumberOfPeople(numberOfPeople - 1)}
          >
            -
          </Button>
          <Input
            id="num-people"
            type="number"
            value={numberOfPeople}
            onChange={(e) => setNumberOfPeople(parseInt(e.target.value) || 1)}
            min={1}
            className="mx-2 text-center"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => setNumberOfPeople(numberOfPeople + 1)}
          >
            +
          </Button>
        </div>
      </div>

      <div>
        <Label>Travel Style</Label>
        <Select 
          value={travelStyle} 
          onValueChange={(value: any) => setTravelStyle(value)} 
          disabled={selectedDestinations.length <= 1}
        >
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Select style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mobile">Changing Hotels</SelectItem>
            <SelectItem value="base-hotel">Base Hotel</SelectItem>
          </SelectContent>
        </Select>
        {selectedDestinations.length <= 1 && (
          <p className="text-xs text-muted-foreground mt-1">
            Select multiple destinations to enable this option
          </p>
        )}
      </div>
    </div>
  );
};

export default TripDetailsInput;
