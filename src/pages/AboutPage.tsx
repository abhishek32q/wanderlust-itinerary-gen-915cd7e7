
import React from 'react';
import Layout from '../components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MapPin, Globe, Users, Award, Sparkles } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">About ZenWay Travels</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your trusted partner for seamless travel experiences across India since 2010.
          </p>
        </div>
        
        {/* Hero Section */}
        <div className="rounded-lg overflow-hidden mb-12 relative">
          <img 
            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80" 
            alt="India landscape" 
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="text-white p-6 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Discover India's Hidden Treasures</h2>
              <p className="text-lg max-w-xl">With expert local guides and personalized itineraries tailored to your interests.</p>
            </div>
          </div>
        </div>
        
        {/* Company Info */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Our Story</h2>
              <p className="text-gray-700 mb-4">
                ZenWay Travels was founded in 2010 with a simple mission: to help travelers discover the true essence of India through authentic, hassle-free experiences.
              </p>
              <p className="text-gray-700 mb-4">
                What began as a small tour operation in New Delhi has grown into one of India's most respected travel companies, with a dedicated team of travel experts, local guides, and customer support professionals.
              </p>
              <p className="text-gray-700">
                Our focus has always been on creating personalized travel experiences that go beyond the typical tourist attractions, allowing our clients to immerse themselves in the rich culture, history, and natural beauty of India.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Our Values</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Customer-Centered</h3>
                    <p className="text-sm text-gray-600">Your satisfaction is our top priority. We design every trip with your unique preferences in mind.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Globe className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Responsible Tourism</h3>
                    <p className="text-sm text-gray-600">We're committed to sustainable travel practices that respect local communities and protect the environment.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Excellence</h3>
                    <p className="text-sm text-gray-600">From accommodations to guides, we maintain the highest standards in every aspect of our service.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Stats */}
        <div className="bg-primary/5 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">ZenWay Travels By The Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-4xl font-bold text-primary">15+</p>
              <p className="text-gray-600">Years of Experience</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">50k+</p>
              <p className="text-gray-600">Satisfied Travelers</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">100+</p>
              <p className="text-gray-600">Destinations</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">450+</p>
              <p className="text-gray-600">Expert Local Guides</p>
            </div>
          </div>
        </div>
        
        {/* Team */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Meet Our Leadership</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Vikram Patel",
                position: "Founder & CEO",
                bio: "Travel enthusiast with 20+ years experience in tourism industry across India and Southeast Asia."
              },
              {
                name: "Priya Sharma",
                position: "Operations Director",
                bio: "Former hotel executive with expertise in creating seamless travel experiences and customer satisfaction."
              },
              {
                name: "Rajesh Kumar",
                position: "Head of Tour Development",
                bio: "Passionate traveler and historian who has explored every corner of India to find unique experiences."
              }
            ].map((person, index) => (
              <Card key={index}>
                <CardContent className="pt-6 text-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="font-bold text-lg">{person.name}</h3>
                  <p className="text-primary mb-2">{person.position}</p>
                  <p className="text-sm text-gray-600">{person.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Office Locations */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">Our Offices</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                city: "New Delhi",
                address: "123 Travel Lane, Zen District, New Delhi, 110001",
                phone: "+91 11 2345 6789"
              },
              {
                city: "Mumbai",
                address: "456 Journey Street, Serenity Road, Mumbai, 400001",
                phone: "+91 22 6543 2109"
              },
              {
                city: "Bangalore",
                address: "789 Explorer Avenue, Tranquil Heights, Bangalore, 560001",
                phone: "+91 80 9876 5432"
              }
            ].map((office, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-bold">{office.city}</h3>
                      <p className="text-sm text-gray-600 mb-2">{office.address}</p>
                      <p className="text-sm text-gray-600">{office.phone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
