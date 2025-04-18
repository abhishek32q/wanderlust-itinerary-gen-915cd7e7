
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const HeroSection: React.FC = () => {
  const { currentUser } = useAuth();
  
  return (
    <section className="relative bg-gradient-to-r from-blue-900 to-indigo-800 text-white">
      <div className="absolute inset-0 bg-[url('https://i.postimg.cc/nz9R0NPY/taj-mahal.jpg')] bg-cover bg-center opacity-20"></div>
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Experience <span className="text-amber-400">Crowd-Free</span> Journeys
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl mb-8 text-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            ZenWay Travels helps you discover peaceful destinations with real-time crowd insights and personalized itineraries.
          </motion.p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-white font-medium">
              <Link to="/destinations">
                Explore Destinations
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            {!currentUser && (
              <Button asChild size="lg" variant="outline" className="bg-white/10 text-white backdrop-blur-sm hover:bg-white/20">
                <Link to="/signup">
                  <UserPlus className="mr-2 h-5 w-5" />
                  Sign Up
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
