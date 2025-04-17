
import React from 'react';
import Layout from '../components/Layout';
import { Separator } from '@/components/ui/separator';

const TermsPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
          <p className="text-gray-600 mb-6">Last Updated: April 15, 2025</p>
          
          <div className="prose prose-slate max-w-none">
            <p className="mb-4">
              Welcome to ZenWay Travels. Please read these Terms of Service carefully before using our website or booking our services.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing or using our website, booking our services, or creating an account, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">2. Booking and Payments</h2>
            <p className="mb-4">2.1 <strong>Booking Confirmation:</strong> Your booking is confirmed only after we send you a written confirmation and your payment has been processed successfully.</p>
            <p className="mb-4">2.2 <strong>Payment:</strong> Full payment is required at the time of booking unless otherwise specified. We accept various payment methods as indicated on our website.</p>
            <p className="mb-4">2.3 <strong>Pricing:</strong> All prices are in Indian Rupees (INR) unless otherwise stated. Prices are subject to change without notice until payment is made in full.</p>
            
            <Separator className="my-8" />
            
            <h2 className="text-xl font-bold mt-8 mb-4">3. Cancellations and Refunds</h2>
            <p className="mb-4">3.1 <strong>Cancellation by Customer:</strong> Cancellation policies vary depending on the type of service booked. Refunds will be processed according to the following schedule:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>More than 30 days before departure: 90% refund</li>
              <li>15-30 days before departure: 50% refund</li>
              <li>7-14 days before departure: 25% refund</li>
              <li>Less than 7 days before departure: No refund</li>
            </ul>
            <p className="mb-4">3.2 <strong>Cancellation by ZenWay Travels:</strong> In the rare event that we need to cancel your booking, you will be offered either a full refund or an alternative service of equivalent value.</p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">4. Travel Documents and Requirements</h2>
            <p className="mb-4">4.1 <strong>Travel Documentation:</strong> It is your responsibility to ensure you have all necessary travel documents (valid ID, passport, visa if applicable) for your journey.</p>
            <p className="mb-4">4.2 <strong>Health Requirements:</strong> You are responsible for complying with any health requirements or recommendations for your destination.</p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">5. Customer Responsibilities</h2>
            <p className="mb-4">5.1 <strong>Accurate Information:</strong> You must provide accurate personal information during booking.</p>
            <p className="mb-4">5.2 <strong>Behavior:</strong> You agree to behave in a manner that does not cause distress, danger, or annoyance to others.</p>
            <p className="mb-4">5.3 <strong>Compliance with Laws:</strong> You agree to comply with all local laws and regulations during your trip.</p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">6. Limitation of Liability</h2>
            <p className="mb-4">6.1 ZenWay Travels acts as an agent for transportation, hotel accommodations, and other services. We are not liable for any injury, damage, loss, accident, delay, or irregularity that may be caused by defect of any vehicle, acts of God, or any other cause beyond our control.</p>
            <p className="mb-4">6.2 We are not responsible for any loss or damage to your personal belongings during the trip.</p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">7. Changes to These Terms</h2>
            <p className="mb-4">We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting on our website.</p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">8. Governing Law</h2>
            <p className="mb-4">These Terms of Service shall be governed by and construed in accordance with the laws of India. Any disputes will be subject to the exclusive jurisdiction of the courts in New Delhi, India.</p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">9. Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:
              <br />
              Email: legal@zenwaytravels.com
              <br />
              Phone: +91 11 2345 6789
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsPage;
