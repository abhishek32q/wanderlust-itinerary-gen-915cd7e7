
import React from 'react';
import Layout from '../components/Layout';

const TermsPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 prose max-w-none">
          <p className="text-gray-500 mb-6">Last updated: April 16, 2025</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">1. Agreement to Terms</h2>
          <p>
            By accessing or using the ZenWay Travels website or services, you agree to be bound by these Terms 
            of Service. If you do not agree to these Terms, you may not access or use our services.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">2. Use of Services</h2>
          <p>
            ZenWay Travels provides a platform for users to browse, plan, and book travel experiences. You agree 
            to use our services only for lawful purposes and in accordance with these Terms.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">3. Account Registration</h2>
          <p>
            To access certain features of our website, you may need to create an account. You are responsible for 
            maintaining the confidentiality of your account information and for all activities that occur under your account.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">4. Booking and Payments</h2>
          <p>
            When you book a trip or service through our platform, you agree to pay all fees and taxes associated with your booking.
            Cancellation and refund policies vary depending on the specific travel service and will be communicated to you 
            before you complete your booking.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">5. Travel Documents and Requirements</h2>
          <p>
            You are responsible for ensuring that you have all necessary travel documents, including valid identification, 
            visas, and health certifications required for your trip.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">6. Limitation of Liability</h2>
          <p>
            ZenWay Travels is not liable for any loss, damage, injury, claim, or expense arising from your use of our services 
            or any travel experiences booked through our platform.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">7. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Any changes will be effective immediately upon posting on our website.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">8. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at legal@zenwaytravels.com.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default TermsPage;
