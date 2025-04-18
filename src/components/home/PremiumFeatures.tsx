
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '../../context/AuthContext';

const PremiumFeatures: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <section className="py-16 bg-gradient-to-r from-amber-50 to-amber-100">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Upgrade to Premium</h2>
          <p className="text-lg text-gray-700">Unlock exclusive features for crowd-free travel experiences</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-amber-200">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-2">1</span>
                Real-Time Crowd Data
              </h3>
              <p className="text-gray-600">Access live crowd levels and forecasts for all destinations.</p>
            </CardContent>
          </Card>
          
          <Card className="border-amber-200">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-2">2</span>
                Extended Cancellation
              </h3>
              <p className="text-gray-600">Cancel bookings up to 24 hours before without any charges.</p>
            </CardContent>
          </Card>
          
          <Card className="border-amber-200">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-2">3</span>
                AI Itinerary Planner
              </h3>
              <p className="text-gray-600">Smart travel plans optimize for crowd-free experiences.</p>
            </CardContent>
          </Card>
          
          <Card className="border-amber-200">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-2">4</span>
                Hidden Gems
              </h3>
              <p className="text-gray-600">Discover peaceful alternatives to crowded tourist hotspots.</p>
            </CardContent>
          </Card>
          
          <Card className="border-amber-200">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-2">5</span>
                Priority Support
              </h3>
              <p className="text-gray-600">Get quick assistance for any travel questions or issues.</p>
            </CardContent>
          </Card>
          
          <Card className="border-amber-200">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-2">6</span>
                Exclusive Deals
              </h3>
              <p className="text-gray-600">Access special rates and premium experiences at select locations.</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center mt-10">
          <Button size="lg" className="bg-amber-500 hover:bg-amber-600">
            {currentUser?.isPremium ? 'Manage Premium' : 'Upgrade to Premium'}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PremiumFeatures;
