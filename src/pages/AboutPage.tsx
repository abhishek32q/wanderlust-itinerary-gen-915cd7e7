
import React from 'react';
import Layout from '../components/Layout';

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">About ZenWay Travels</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
          <p className="mb-4">
            At ZenWay Travels, we believe that travel should be an enriching experience that brings harmony and balance to your life. 
            Our mission is to create personalized travel experiences that connect you with the authentic essence of destinations 
            across India while ensuring a stress-free journey.
          </p>
          <p>
            We focus on responsible tourism that benefits local communities while providing our travelers with 
            meaningful cultural exchanges and unforgettable memories.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Our Story</h2>
          <p>
            Founded in 2023 by a group of passionate travelers, ZenWay Travels started with a simple idea: create travel 
            experiences that go beyond the obvious tourist attractions. Over the years, we have built relationships with 
            local guides, homestay owners, and cultural experts across India to provide our customers with authentic 
            experiences that can't be found in typical travel packages.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Why Choose Us?</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>Personalized itineraries tailored to your interests</li>
            <li>Focus on authentic local experiences</li>
            <li>Responsible travel practices</li>
            <li>24/7 support during your trip</li>
            <li>Expert local guides who know hidden gems</li>
            <li>Carefully selected accommodations that reflect local culture</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
