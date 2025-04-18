
import React from 'react';
import Layout from '../components/Layout';
import HeroSection from '../components/home/HeroSection';
import HowItWorks from '../components/home/HowItWorks';
import FeaturedDestinations from '../components/home/FeaturedDestinations';
import PremiumFeatures from '../components/home/PremiumFeatures';
import CallToAction from '../components/home/CallToAction';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <HeroSection />
      <HowItWorks />
      <FeaturedDestinations />
      <PremiumFeatures />
      <CallToAction />
    </Layout>
  );
};

export default HomePage;
