
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Star, CreditCard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const PremiumPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, updateUserStatus } = useAuth();
  
  // Premium features list
  const premiumFeatures = [
    {
      title: "Crowd Analytics",
      description: "Access real-time and historical crowd data for all destinations, so you can plan your visit during less crowded times.",
      features: [
        "Real-time crowd levels",
        "Historical trends",
        "Best time recommendations"
      ]
    },
    {
      title: "Free Tour Guides",
      description: "Enjoy one free tour guide at each destination on your trip, enhancing your experience with local expertise.",
      features: [
        "One free guide per destination",
        "Professional local experts",
        "Multilingual options"
      ]
    },
    {
      title: "Advanced Trip Planning",
      description: "Get access to advanced trip planning tools, including predicted crowd levels for future dates.",
      features: [
        "Future crowd predictions",
        "Personalized itineraries",
        "Priority booking"
      ]
    }
  ];

  // Handle premium subscription
  const handleUpgradeToPremium = async () => {
    try {
      // In a real app, this would integrate with a payment gateway
      // For now, we'll just simulate becoming a premium member
      if (currentUser) {
        await updateUserStatus({ ...currentUser, isPremium: true });
        navigate('/profile');
      } else {
        navigate('/login', { state: { returnPath: '/premium' } });
      }
    } catch (error) {
      console.error("Error upgrading to premium:", error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Premium Membership</h1>
        <p className="text-gray-600 mb-8">Enhance your travel experience with our premium features</p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {premiumFeatures.map((feature, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  {index === 0 && <Star className="h-5 w-5 text-amber-500" />}
                  {index === 1 && <CreditCard className="h-5 w-5 text-amber-500" />}
                  {index === 2 && <Check className="h-5 w-5 text-amber-500" />}
                  {feature.title}
                </CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feature.features.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-amber-50 to-amber-100 px-6 py-8">
            <h2 className="text-2xl font-bold mb-2">Premium Membership</h2>
            <div className="flex items-end gap-2 mb-4">
              <span className="text-4xl font-bold">₹999</span>
              <span className="text-gray-700">/year</span>
            </div>
            <p className="text-gray-700 mb-6">Unlock all premium features and enhance your travel experience.</p>
            <Button 
              size="lg"
              onClick={handleUpgradeToPremium}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              <Star className="h-4 w-4 mr-2" />
              {currentUser?.isPremium ? 'Already a Premium Member' : 'Upgrade to Premium'}
            </Button>
          </div>
          <CardContent className="pt-6">
            <h3 className="font-semibold text-xl mb-4">All Premium Benefits</h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-blue-500 mt-0.5" />
                <span>Access to all premium features</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-blue-500 mt-0.5" />
                <span>One free tour guide per destination</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-blue-500 mt-0.5" />
                <span>Complete crowd analytics and predictions</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-blue-500 mt-0.5" />
                <span>Priority customer support</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-blue-500 mt-0.5" />
                <span>No ads or promotional content</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-blue-500 mt-0.5" />
                <span>10% discount on travel bookings</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="font-semibold mb-2">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">Can I cancel my premium subscription?</h4>
              <p className="text-gray-600">Yes, you can cancel your subscription at any time. Your premium benefits will continue until the end of your billing period.</p>
            </div>
            <div>
              <h4 className="font-medium">How do I claim my free tour guide?</h4>
              <p className="text-gray-600">When planning a trip as a premium member, you can select one free guide per destination during the trip planning process.</p>
            </div>
            <div>
              <h4 className="font-medium">Is there a family subscription option?</h4>
              <p className="text-gray-600">Not yet, but we're working on introducing family plans soon. Stay tuned for updates!</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PremiumPage;
