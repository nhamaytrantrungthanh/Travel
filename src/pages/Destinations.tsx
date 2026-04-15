import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Filter } from 'lucide-react';

export default function Destinations() {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetch('/api/destinations')
      .then(res => res.json())
      .then(data => setDestinations(data));
  }, []);

  const regions = ['All', ...Array.from(new Set(destinations.map(d => d.region)))];

  const filteredDestinations = filter === 'All' 
    ? destinations 
    : destinations.filter(d => d.region === filter);

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-theme mb-6"
          >
            Explore Destinations
          </motion.h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our curated selection of premium travel packages across the globe.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <div className="flex items-center text-gray-500 mr-4">
            <Filter className="w-5 h-5 mr-2" />
            <span className="font-medium">Filter by Region:</span>
          </div>
          {regions.map(region => (
            <button
              key={region}
              onClick={() => setFilter(region)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === region 
                  ? 'bg-theme text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((dest, index) => (
            <motion.div 
              key={dest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group flex flex-col"
            >
              <div className="relative h-64 overflow-hidden flex-shrink-0">
                <img 
                  src={dest.image} 
                  alt={dest.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-theme">
                  {dest.price}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-accent uppercase tracking-wider">{dest.region}</span>
                  <span className="text-sm text-gray-500">{dest.duration}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{dest.title}</h3>
                <p className="text-gray-600 mb-6 flex-grow">{dest.description}</p>
                <button className="w-full py-3 border border-theme text-theme hover:bg-theme hover:text-white rounded-lg font-medium transition-colors flex items-center justify-center">
                  View Details <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {filteredDestinations.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No destinations found for this region.
          </div>
        )}
      </div>
    </div>
  );
}
