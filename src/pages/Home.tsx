import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useSettings } from '../context/SettingsContext';
import { Search, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const { settings } = useSettings();
  const [destinations, setDestinations] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/destinations')
      .then(res => res.json())
      .then(data => setDestinations(data.slice(0, 3)));
  }, []);

  if (!settings) return null;

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=2000&q=80" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg"
          >
            {settings.heroHeading}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 mb-10 drop-shadow-md"
          >
            {settings.heroSubheading}
          </motion.p>
          
          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white p-2 rounded-full shadow-xl flex items-center max-w-2xl mx-auto"
          >
            <div className="flex-grow flex items-center px-4">
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <input 
                type="text" 
                placeholder="Where do you want to go?" 
                className="w-full bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-400 outline-none"
              />
            </div>
            <button className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-full font-medium transition-colors">
              Search
            </button>
          </motion.div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-theme mb-4">Featured Destinations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Explore our handpicked selection of the world's most breathtaking locations.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {destinations.map((dest, index) => (
              <motion.div 
                key={dest.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={dest.image} 
                    alt={dest.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-theme">
                    {dest.price}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-accent uppercase tracking-wider">{dest.region}</span>
                    <span className="text-sm text-gray-500">{dest.duration}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{dest.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{dest.description}</p>
                  <Link to="/destinations" className="inline-flex items-center text-theme font-medium hover:text-theme/80 transition-colors">
                    Explore Package <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/destinations" className="inline-block border-2 border-theme text-theme hover:bg-theme hover:text-white px-8 py-3 rounded-full font-medium transition-colors">
              View All Destinations
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-theme text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Our Travelers Say</h2>
            <p className="text-white/80 max-w-2xl mx-auto">Don't just take our word for it. Read about the unforgettable experiences of our clients.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm"
              >
                <div className="flex gap-1 text-accent mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-lg italic mb-6">"The trip of a lifetime! Every detail was perfectly planned. I couldn't have asked for a better experience."</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?img=${index + 10}`} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Sarah Johnson</h4>
                    <p className="text-sm text-white/70">Traveled to Japan</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Travel Inspiration in Your Inbox</h2>
          <p className="text-gray-600 mb-8">Sign up for our newsletter and receive exclusive offers, travel guides, and more.</p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-theme focus:border-transparent"
              required
            />
            <button type="submit" className="bg-theme hover:bg-theme/90 text-white px-8 py-3 rounded-full font-medium transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
