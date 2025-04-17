
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import VisitorInformation from './VisitorInformation';
import CrowdLevelDisplay from './CrowdLevelDisplay';

interface DestinationTabsProps {
  destination: any;
  activeTab: string;
  setActiveTab: (value: string) => void;
  isPremiumUser: boolean;
  imageUrl: string;
}

const DestinationTabs: React.FC<DestinationTabsProps> = ({ 
  destination, 
  activeTab, 
  setActiveTab, 
  isPremiumUser,
  imageUrl
}) => {
  return (
    <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="photos">Photos</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>
      
      {/* Overview Tab */}
      <TabsContent value="overview" className="space-y-6">
        <div className="prose max-w-none">
          <h2 className="text-2xl font-bold mb-4">About {destination.name}</h2>
          <p className="text-gray-700">{destination.description}</p>
        </div>
        
        <VisitorInformation destination={destination} />
        
        {/* Crowd Chart */}
        <CrowdLevelDisplay 
          destination={destination} 
          isPremiumUser={isPremiumUser} 
        />
      </TabsContent>
      
      {/* Photos Tab */}
      <TabsContent value="photos" className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: Math.min(6, 1) }).map((_, index) => (
            <img 
              key={index}
              src={imageUrl} 
              alt={`${destination.name} photo ${index + 1}`}
              className="w-full h-48 object-cover rounded-lg shadow-sm"
              loading="lazy"
            />
          ))}
        </div>
      </TabsContent>
      
      {/* Reviews Tab */}
      <TabsContent value="reviews" className="space-y-6">
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <p className="text-gray-600">Reviews coming soon</p>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default DestinationTabs;
