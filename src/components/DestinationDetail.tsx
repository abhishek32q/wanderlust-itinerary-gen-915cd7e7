
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDestinations } from '../context/DestinationContext';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import { ensureValidImageUrl } from '../utils/helpers';

// Import smaller components
import DestinationHero from './destination-detail/DestinationHero';
import DestinationTabs from './destination-detail/DestinationTabs';
import PricingCard from './destination-detail/PricingCard';
import SimilarDestinations from './destination-detail/SimilarDestinations';
import PremiumUpsell from './destination-detail/PremiumUpsell';
import DestinationNotFound from './destination-detail/DestinationNotFound';

const DestinationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { destinations, getDestinationById } = useDestinations();
  const { currentUser } = useAuth();

  const [destination, setDestination] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [similarDestinations, setSimilarDestinations] = useState<any[]>([]);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (id) {
      const foundDestination = getDestinationById(id);
      setDestination(foundDestination);

      if (foundDestination) {
        const similar = destinations
          .filter(d => 
            d.id !== id && 
            (d.city === foundDestination.city || 
             d.state === foundDestination.state)
          )
          .slice(0, 3);
        setSimilarDestinations(similar);
      }
    }
  }, [id, destinations, getDestinationById]);

  const handleImageError = () => {
    setImageError(true);
  };

  const imageUrl = imageError || !destination?.image
    ? '/placeholder.svg'
    : ensureValidImageUrl(destination?.image);

  if (!destination) {
    return (
      <Layout>
        <DestinationNotFound />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <DestinationHero destination={destination} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            <DestinationTabs 
              destination={destination}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isPremiumUser={!!currentUser?.isPremium}
              imageUrl={imageUrl}
            />
          </div>
          
          {/* Right Column - Booking & Related */}
          <div className="space-y-6">
            {/* Booking Card */}
            <PricingCard 
              destination={destination} 
              destinationId={id || ''}
            />
            
            {/* Similar Destinations */}
            <SimilarDestinations similarDestinations={similarDestinations} />
            
            {/* Premium Upsell */}
            {!currentUser?.isPremium && <PremiumUpsell />}
          </div>
        </div>
      </div>
    </Layout>
  );
};
 
export default DestinationDetail;
