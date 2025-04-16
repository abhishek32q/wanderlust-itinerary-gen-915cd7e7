
import React from 'react';
import Layout from '../components/Layout';

const PrivacyPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 prose max-w-none">
          <p className="text-gray-500 mb-6">Last updated: April 16, 2025</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">1. Introduction</h2>
          <p>
            ZenWay Travels ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
            explains how we collect, use, disclose, and safeguard your information when you visit our website 
            or use our services.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">2. Information We Collect</h2>
          <p>We may collect personal information that you voluntarily provide to us when you:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Create an account</li>
            <li>Book a trip or service</li>
            <li>Sign up for our newsletter</li>
            <li>Contact our customer service</li>
            <li>Participate in surveys or promotions</li>
          </ul>
          <p>This information may include:</p>
          <ul className="list-disc pl-6">
            <li>Name, email address, phone number, and billing address</li>
            <li>Payment information</li>
            <li>Travel preferences and history</li>
            <li>Government-issued identification for travel purposes</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">3. How We Use Your Information</h2>
          <p>We use your information for various purposes, including to:</p>
          <ul className="list-disc pl-6">
            <li>Process and manage your travel bookings</li>
            <li>Communicate with you about your account or bookings</li>
            <li>Send you marketing communications (if you've opted in)</li>
            <li>Improve our website and services</li>
            <li>Comply with legal obligations</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">4. How We Share Your Information</h2>
          <p>
            We may share your information with travel suppliers (hotels, airlines, etc.), payment processors,
            and service providers who assist us in providing our services. We do not sell your personal information
            to third parties.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">5. Your Rights</h2>
          <p>
            Depending on your location, you may have certain rights regarding your personal information, such as 
            the right to access, correct, delete, or restrict processing of your data.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">6. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at privacy@zenwaytravels.com.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPage;
