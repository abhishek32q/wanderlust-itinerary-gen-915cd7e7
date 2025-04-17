
import React from 'react';
import Layout from '../components/Layout';
import { Separator } from '@/components/ui/separator';

const PrivacyPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-gray-600 mb-6">Last Updated: April 15, 2025</p>
          
          <div className="prose prose-slate max-w-none">
            <p className="mb-4">
              At ZenWay Travels, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">Information We Collect</h2>
            <p className="mb-4">We may collect personal information that you voluntarily provide to us when you:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Register an account with us</li>
              <li>Make a booking or purchase</li>
              <li>Sign up for our newsletter</li>
              <li>Contact our customer service</li>
              <li>Participate in contests, surveys, or promotions</li>
            </ul>
            <p className="mb-4">This information may include:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Name, email address, phone number, and billing address</li>
              <li>Payment information (credit card details, though we do not store complete credit card information)</li>
              <li>Travel preferences and requirements</li>
              <li>Passport details when required for booking</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-8 mb-4">How We Use Your Information</h2>
            <p className="mb-4">We may use the information we collect for various purposes, including:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Process and manage your bookings</li>
              <li>Process payments and prevent fraudulent transactions</li>
              <li>Send administrative information, such as booking confirmations</li>
              <li>Respond to your inquiries and resolve disputes</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Improve our website, products, and services</li>
              <li>Comply with legal obligations</li>
            </ul>
            
            <Separator className="my-8" />
            
            <h2 className="text-xl font-bold mt-8 mb-4">Sharing Your Information</h2>
            <p className="mb-4">We may share your information with:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Travel service providers (hotels, transport companies) necessary to complete your booking</li>
              <li>Payment processors to process transactions</li>
              <li>Marketing partners (with your consent)</li>
              <li>Legal authorities when required by law</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-8 mb-4">Cookies and Tracking Technologies</h2>
            <p className="mb-4">
              We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">Data Security</h2>
            <p className="mb-4">
              We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards, no security system is impenetrable.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">Your Privacy Rights</h2>
            <p className="mb-4">
              Depending on your location, you may have various rights regarding your personal information, such as:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Right to access and obtain a copy of your personal information</li>
              <li>Right to rectify any inaccurate information</li>
              <li>Right to request deletion of your personal information</li>
              <li>Right to restrict processing of your personal information</li>
              <li>Right to data portability</li>
              <li>Right to object to processing</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-8 mb-4">Changes to This Privacy Policy</h2>
            <p className="mb-4">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              Email: privacy@zenwaytravels.com
              <br />
              Phone: +91 11 2345 6789
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPage;
