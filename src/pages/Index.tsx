
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useDestinations } from '../context/DestinationContext';
import { Destination } from '../types';
import DestinationFilters from '../components/destinations/DestinationFilters';
import DestinationsList from '../components/destinations/DestinationsList';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { destinations, getCurrentCrowdLevel } = useDestinations();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [sortOption, setSortOption] = useState('name');

  // Get unique states for filter
  const states = useMemo(() => {
    const uniqueStates = [...new Set(destinations.map(dest => dest.state))];
    return uniqueStates.sort();
  }, [destinations]);

  // Filter destinations based on search query and selected state
  const filteredDestinations = useMemo(() => {
    return destinations.filter(destination => {
      const matchesSearch = 
        destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        destination.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        destination.state.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesState = !selectedState || destination.state === selectedState;
      
      return matchesSearch && matchesState;
    });
  }, [destinations, searchQuery, selectedState]);

  // Sort destinations based on sort option
  const sortedDestinations = useMemo(() => {
    return [...filteredDestinations].sort((a, b) => {
      switch (sortOption) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return b.rating - a.rating;
        case 'priceAsc':
          const priceA = typeof a.price === 'number' ? a.price : (a.price?.adult || 0);
          const priceB = typeof b.price === 'number' ? b.price : (b.price?.adult || 0);
          return priceA - priceB;
        case 'priceDesc':
          const priceADesc = typeof a.price === 'number' ? a.price : (a.price?.adult || 0);
          const priceBDesc = typeof b.price === 'number' ? b.price : (b.price?.adult || 0);
          return priceBDesc - priceADesc;
        default:
          return 0;
      }
    });
  }, [filteredDestinations, sortOption]);

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedState('');
    setSortOption('name');
  };

  // Handle plan trip button click
  const handlePlanTrip = (destination: Destination) => {
    navigate('/trip-planner', { state: { destinationId: destination.id } });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Explore Destinations</h1>
        <p className="text-gray-600 mb-8">Discover peaceful and uncrowded travel spots for your next adventure.</p>
        
        <DestinationFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          sortOption={sortOption}
          setSortOption={setSortOption}
          states={states}
          resetFilters={resetFilters}
        />
        
        <DestinationsList
          destinations={sortedDestinations}
          title={filteredDestinations.length > 0 
            ? `All Destinations (${filteredDestinations.length})`
            : "No Destinations Found"}
          getCurrentCrowdLevel={getCurrentCrowdLevel}
          onPlanTrip={handlePlanTrip}
        />
      </div>
    </Layout>
  );
};

export default Index;
