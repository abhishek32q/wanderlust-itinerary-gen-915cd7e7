
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CallToAction: React.FC = () => {
  return (
    <section className="py-16 bg-blue-900 text-white text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">Ready to Experience Crowd-Free Travel?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">Start planning your peaceful journey with ZenWay Travels today.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" asChild className="bg-white text-blue-900 hover:bg-gray-100">
            <Link to="/trip-planner">Plan Your Trip</Link>
          </Button>
          <Button size="lg" asChild variant="outline" className="border-white text-white hover:bg-white/10">
            <Link to="/destinations">Explore Destinations</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
