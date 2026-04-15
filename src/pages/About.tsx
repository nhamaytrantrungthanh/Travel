import { motion } from 'motion/react';
import { useSettings } from '../context/SettingsContext';

export default function About() {
  const { settings } = useSettings();

  if (!settings) return null;

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-theme mb-6"
          >
            About {settings.siteName}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            We believe that travel is the ultimate catalyst for personal growth, cultural understanding, and unforgettable memories.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" 
              alt="Our Team" 
              className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Founded in 2010, {settings.siteName} started with a simple idea: to make premium international travel accessible, seamless, and deeply enriching. What began as a small boutique agency has grown into a global network of travel experts, local guides, and hospitality partners.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Over the past decade, we have helped thousands of travelers explore the world's most captivating destinations. From the sun-drenched coasts of the Mediterranean to the vibrant streets of Tokyo, our mission remains the same: to curate extraordinary journeys that leave a lasting impact.
            </p>
          </motion.div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'Elena Rodriguez', role: 'Founder & CEO', img: 'https://i.pravatar.cc/300?img=47' },
              { name: 'David Chen', role: 'Head of Operations', img: 'https://i.pravatar.cc/300?img=11' },
              { name: 'Sarah Thompson', role: 'Lead Travel Designer', img: 'https://i.pravatar.cc/300?img=5' },
              { name: 'Michael Osei', role: 'Destination Specialist', img: 'https://i.pravatar.cc/300?img=8' },
            ].map((member, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <img src={member.img} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
                <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                <p className="text-accent text-sm font-medium">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
