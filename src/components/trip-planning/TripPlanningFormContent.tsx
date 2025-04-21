
import React from 'react';
import { Destination } from '../../types';
import DestinationSelector from './DestinationSelector';
import TripDetailsInput from './TripDetailsInput';
import TransportSelector from './TransportSelector';
import TravelStyleSelector from './TravelStyleSelector';
import HotelTypeSelector from './HotelTypeSelector';
import GuideSelector from './GuideSelector';
import TripFeasibilityCheck from './TripFeasibilityCheck';
import TripCostEstimate from './TripCostEstimate';
import TripPlanningSubmit from './TripPlanningSubmit';

interface TripPlanningFormContentProps {
  selectedDestinations: Destination[];
  onRemoveDestination: (id: string) => void;
  startDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  numberOfDays: number;
  setNumberOfDays: (days: number) => void;
  numberOfPeople: number;
  setNumberOfPeople: (people: number) => void;
  transportType: 'bus' | 'train' | 'flight' | 'car';
  setTransportType: (type: 'bus' | 'train' | 'flight' | 'car') => void;
  hotelType: 'budget' | 'standard' | 'luxury';
  setHotelType: (type: 'budget' | 'standard' | 'luxury') => void;
  travelStyle: 'base-hotel' | 'mobile';
  setTravelStyle: (style: 'base-hotel' | 'mobile') => void;
  selectedGuideIds: string[];
  setSelectedGuideIds: (ids: string[]) => void;
  submitting: boolean;
  onSubmitPlan: () => void;
  onCancelPlan?: () => void;
  isPremium?: boolean;
}

const TripPlanningFormContent: React.FC<TripPlanningFormContentProps> = ({
  selectedDestinations,
  onRemoveDestination,
  startDate,
  setStartDate,
  numberOfDays,
  setNumberOfDays,
  numberOfPeople,
  setNumberOfPeople,
  transportType,
  setTransportType,
  hotelType,
  setHotelType,
  travelStyle,
  setTravelStyle,
  selectedGuideIds,
  setSelectedGuideIds,
  submitting,
  onSubmitPlan,
  onCancelPlan,
  isPremium
}) => {
  const destinationIds = selectedDestinations.map(destination => destination.id);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Left Column - Trip Details */}
      <div className="space-y-6">
        <DestinationSelector 
          selectedDestinations={selectedDestinations} 
          onRemoveDestination={onRemoveDestination}
        />
        
        <TripDetailsInput 
          startDate={startDate}
          setStartDate={setStartDate}
          numberOfDays={numberOfDays}
          setNumberOfDays={setNumberOfDays}
          numberOfPeople={numberOfPeople}
          setNumberOfPeople={setNumberOfPeople}
          travelStyle={travelStyle}
          setTravelStyle={setTravelStyle}
          selectedDestinations={selectedDestinations}
        />
        
        <HotelTypeSelector 
          hotelType={hotelType}
          setHotelType={setHotelType}
        />

        <GuideSelector 
          destinationIds={destinationIds}
          selectedGuideIds={selectedGuideIds}
          setSelectedGuideIds={setSelectedGuideIds}
        />
        
        <TransportSelector 
          transportType={transportType}
          setTransportType={setTransportType}
          destinationIds={destinationIds}
          numberOfDays={numberOfDays}
          isPremium={isPremium}
        />
      </div>
      
      {/* Right Column - Trip Summary */}
      <div className="space-y-6">
        {destinationIds.length > 0 && (
          <TripFeasibilityCheck 
            destinationIds={destinationIds}
            transportType={transportType}
            numberOfDays={numberOfDays}
          />
        )}
        
        {startDate && destinationIds.length > 0 && (
          <TripCostEstimate 
            destinationIds={destinationIds}
            selectedDestinations={selectedDestinations}
            transportType={transportType}
            hotelType={hotelType}
            travelStyle={travelStyle}
            numberOfDays={numberOfDays}
            numberOfPeople={numberOfPeople}
            selectedGuideIds={selectedGuideIds}
            isPremium={isPremium}
          />
        )}
        
        <TripPlanningSubmit
          startDate={startDate}
          selectedDestinationIds={destinationIds}
          submitting={submitting}
          onSubmit={onSubmitPlan}
          onCancel={onCancelPlan}
        />
      </div>
    </div>
  );
};

export default TripPlanningFormContent;
