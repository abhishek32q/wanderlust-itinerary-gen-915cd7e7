
import React from 'react';
import Layout from '../components/Layout';

const TermsPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
        
        <div className="space-y-6 bg-white rounded-lg shadow-md p-6">
          <div>
            <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-700">
              By accessing and using the ZenWay Travels website and services, you accept and agree to be 
              bound by these Terms and Conditions and our Privacy Policy. If you do not agree to these 
              terms, please do not use our services.
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-3">2. Booking and Payment</h2>
            <p className="text-gray-700 mb-2">
              All bookings are subject to availability and confirmation. A booking is confirmed once 
              full payment has been received or as specified in your itinerary.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>Payment methods accepted include credit/debit cards, net banking, and UPI</li>
              <li>Prices are subject to change without prior notice until booking is confirmed</li>
              <li>Additional fees may apply for changes to confirmed bookings</li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-3">3. Cancellation and Refund Policy</h2>
            <p className="text-gray-700 mb-2">
              Our refund policy varies depending on when you cancel your booking:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>Cancellations made 48 hours or more before scheduled departure: Full refund minus processing fee</li>
              <li>Cancellations made between 24-48 hours before scheduled departure: 50% refund</li>
              <li>Cancellations made less than 24 hours before scheduled departure: No refund</li>
              <li>No-shows: No refund will be provided</li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-3">4. Travel Documents</h2>
            <p className="text-gray-700">
              It is the traveler's responsibility to ensure they have all necessary valid travel documents, 
              including but not limited to identification, permits, and visas where required. ZenWay Travels 
              is not responsible for any issues arising from incomplete or invalid travel documentation.
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-3">5. Health and Safety</h2>
            <p className="text-gray-700">
              Travelers are responsible for ensuring they are fit to travel. ZenWay Travels reserves the right 
              to refuse service to anyone whose health or behavior might compromise the safety or enjoyment of 
              other travelers. We recommend obtaining travel insurance that covers health emergencies.
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-3">6. Limitation of Liability</h2>
            <p className="text-gray-700">
              ZenWay Travels acts as an intermediary between travelers and service providers (hotels, 
              transportation companies, activity operators). While we carefully select our partners, we 
              cannot be held liable for their actions or omissions. Our liability for any claims is limited 
              to the cost of the services provided by us.
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-3">7. Privacy Policy</h2>
            <p className="text-gray-700">
              We collect and process personal data in accordance with our Privacy Policy, which is 
              incorporated into these Terms and Conditions by reference.
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-3">8. Modifications to Terms</h2>
            <p className="text-gray-700">
              ZenWay Travels reserves the right to modify these Terms and Conditions at any time. 
              Changes will be effective immediately upon posting on our website. Your continued use of 
              our services after changes constitutes acceptance of the modified terms.
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-3">9. Governing Law</h2>
            <p className="text-gray-700">
              These Terms and Conditions shall be governed by and construed in accordance with the laws 
              of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction 
              of the courts in Delhi, India.
            </p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 mt-8">
              Last Updated: April 16, 2025
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsPage;
