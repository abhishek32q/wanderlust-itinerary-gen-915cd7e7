
import React from 'react';
import { Link } from 'react-router-dom';
import { ensureValidImageUrl } from '../../utils/helpers';

interface SimilarDestinationsProps {
  similarDestinations: any[];
}

const SimilarDestinations: React.FC<SimilarDestinationsProps> = ({ similarDestinations }) => {
  if (similarDestinations.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-4 rounded-lg border">
      <h3 className="text-xl font-semibold mb-4">Similar Destinations</h3>
      <div className="space-y-3">
        {similarDestinations.map((similar) => (
          <Link 
            key={similar.id} 
            to={`/destinations/${similar.id}`}
            className="block hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3 p-2">
              <img 
                src={ensureValidImageUrl(similar.image)} 
                alt={similar.name} 
                className="w-12 h-12 object-cover rounded-md"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder.svg';
                }}
              />
              <div className="overflow-hidden">
                <p className="font-medium truncate">{similar.name}</p>
                <p className="text-xs text-gray-500 truncate">
                  {similar.city}, {similar.state}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SimilarDestinations;
