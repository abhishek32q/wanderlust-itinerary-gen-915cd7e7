
import React from 'react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { MapPin, Phone, Mail, MessageSquare } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ContactPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Thank you for contacting us. We'll get back to you soon!",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6 bg-white shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <p className="text-gray-600 mb-6">
              We'd love to hear from you! Send us a message and we'll respond as soon as possible.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <Input id="name" placeholder="Your name" required />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <Input id="email" type="email" placeholder="your.email@example.com" required />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <Input id="subject" placeholder="How can we help you?" required />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <Textarea id="message" placeholder="Tell us more about your inquiry..." className="min-h-[150px]" required />
              </div>
              
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </Card>
          
          <div className="space-y-6">
            <Card className="p-6 bg-white shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p className="text-gray-600">123 Travel Lane, Zen District</p>
                    <p className="text-gray-600">New Delhi, 110001, India</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-gray-600">+91 98765 43210</p>
                    <p className="text-gray-600">+91 11 2345 6789</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-gray-600">info@zenwaytravels.com</p>
                    <p className="text-gray-600">support@zenwaytravels.com</p>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-white shadow-md">
              <h2 className="text-lg font-semibold mb-2">Office Hours</h2>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Saturday:</span>
                  <span>10:00 AM - 4:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Sunday:</span>
                  <span>Closed</span>
                </li>
              </ul>
            </Card>
            
            <div className="bg-primary/10 p-4 rounded-lg flex items-center">
              <MessageSquare className="h-6 w-6 text-primary mr-3" />
              <p className="text-sm">Need immediate assistance? Try our live chat support available on the bottom right of your screen.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
