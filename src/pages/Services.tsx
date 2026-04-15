import { motion } from 'motion/react';
import { Plane, Hotel, Map, Shield } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: <Plane className="w-10 h-10 text-accent" />,
      title: 'Flight Booking',
      description: 'We handle all your flight arrangements, finding the best routes, premium seating, and competitive prices for your international journeys.',
    },
    {
      icon: <Hotel className="w-10 h-10 text-accent" />,
      title: 'Luxury Accommodations',
      description: 'Gain access to our exclusive network of 5-star hotels, boutique resorts, and private villas with special perks and upgrades.',
    },
    {
      icon: <Map className="w-10 h-10 text-accent" />,
      title: 'Guided Tours',
      description: 'Experience destinations authentically with our expert local guides who provide deep cultural insights and private access to landmarks.',
    },
    {
      icon: <Shield className="w-10 h-10 text-accent" />,
      title: 'Travel Insurance',
      description: 'Travel with peace of mind. We provide comprehensive travel insurance packages covering health, cancellations, and lost luggage.',
    },
  ];

  return (
    <div className="py-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-theme mb-6"
          >
            Our Services
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Comprehensive travel solutions designed to make your journey seamless from departure to return.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col sm:flex-row gap-6 p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="flex-shrink-0 bg-white p-4 rounded-xl shadow-sm h-fit">
                {service.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 bg-theme rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2000&q=80" alt="Background" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Need a Custom Itinerary?</h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8 text-lg">
              Our travel designers specialize in creating bespoke journeys tailored exactly to your preferences, pace, and interests.
            </p>
            <button className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors">
              Consult a Travel Designer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
