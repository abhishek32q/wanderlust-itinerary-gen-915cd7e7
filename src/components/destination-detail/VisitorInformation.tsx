
import React from 'react';
import { Calendar, Clock, Camera } from 'lucide-react';

interface VisitorInformationProps {
  destination: any;
}

const VisitorInformation: React.FC<VisitorInformationProps> = ({ destination }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="text-xl font-semibold mb-3">Visitor Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-start gap-3">
          <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">Best Time to Visit</p>
            <p className="text-sm text-gray-600">{destination.bestTimeToVisit}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">Opening Hours</p>
            <p className="text-sm text-gray-600">{destination.openingHours || '9 AM - 6 PM (Standard)'}</p>
          </div>
        </div>
        {destination.price?.includes && destination.price.includes.length > 0 && (
          <div className="flex items-start gap-3">
            <Camera className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Entry Includes</p>
              <p className="text-sm text-gray-600">{destination.price.includes.join(', ')}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisitorInformation;
