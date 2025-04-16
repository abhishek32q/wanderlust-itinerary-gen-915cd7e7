
import React from 'react';
import Layout from '../components/Layout';
import { Shield, CheckCircle, Lock, Eye } from 'lucide-react';

const PrivacyPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-gray-600 mb-6">Last updated: April 16, 2025</p>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <Shield className="h-10 w-10 text-primary flex-shrink-0" />
            <div>
              <h2 className="text-xl font-semibold mb-2">Our Commitment to Privacy</h2>
              <p className="text-gray-600">
                At ZenWay Travels, we respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our website and services.
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Information We Collect</h3>
              <p className="text-gray-600 mb-3">
                We collect the following types of information:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                <li>Personal identification information (Name, email address, phone number)</li>
                <li>Billing information (Credit card details, billing address)</li>
                <li>Travel preferences and requirements</li>
                <li>Passport details (when required for bookings)</li>
                <li>Device information (IP address, browser type, operating system)</li>
                <li>Usage data (Pages visited, time spent on pages, links clicked)</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">How We Use Your Information</h3>
              <p className="text-gray-600 mb-3">
                We use your information for the following purposes:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                <li>Process and manage your bookings and transactions</li>
                <li>Communicate with you about your trips and services</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Personalize your experience and recommendations</li>
                <li>Improve our website and services</li>
                <li>Send promotional content and newsletters (if opted in)</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>
            
            <div className="flex items-start gap-4">
              <Lock className="h-6 w-6 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Data Security</h3>
                <p className="text-gray-600">
                  We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing, accidental loss, destruction, or damage. All payment information is encrypted using industry-standard SSL technology.
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Data Sharing</h3>
              <p className="text-gray-600 mb-3">
                We may share your information with:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                <li>Service providers (hotels, transport operators, activity providers)</li>
                <li>Payment processors and financial institutions</li>
                <li>Government authorities (when required by law)</li>
                <li>Professional advisors and consultants</li>
              </ul>
              <p className="text-gray-600 mt-3">
                We do not sell your personal data to third parties for marketing purposes.
              </p>
            </div>
            
            <div className="flex items-start gap-4">
              <Eye className="h-6 w-6 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Cookies and Tracking</h3>
                <p className="text-gray-600">
                  Our website uses cookies and similar tracking technologies to enhance user experience, analyze usage patterns, and deliver personalized content. You can manage your cookie preferences through your browser settings.
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Your Rights</h3>
              <p className="text-gray-600 mb-3">
                You have the following rights regarding your personal data:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                <li>Access your personal data</li>
                <li>Rectify inaccurate or incomplete data</li>
                <li>Request erasure of your data</li>
                <li>Restrict or object to processing</li>
                <li>Data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Data Retention</h3>
              <p className="text-gray-600">
                We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, including legal, accounting, or reporting requirements.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Children's Privacy</h3>
              <p className="text-gray-600">
                Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children. If we become aware that we have collected personal data from a child without verification of parental consent, we will take steps to remove that information from our servers.
              </p>
            </div>
            
            <div className="flex items-start gap-4 bg-primary/5 p-4 rounded-lg">
              <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
                <p className="text-gray-600">
                  If you have any questions about this Privacy Policy or our data practices, please contact us at:
                </p>
                <address className="text-gray-600 not-italic mt-2">
                  <strong>ZenWay Travels</strong><br />
                  123 Travel Lane, Zen District<br />
                  New Delhi, 110001, India<br />
                  Email: privacy@zenwaytravels.com<br />
                  Phone: +91 98765 43210
                </address>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center text-sm text-gray-500 mt-8">
          <p>
            We may update this Privacy Policy from time to time. The latest version will always be posted on our website.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPage;
