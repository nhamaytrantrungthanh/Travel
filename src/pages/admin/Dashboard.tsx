import { useState, useEffect } from 'react';
import { MapPin, FileText, Users, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({ destinations: 0, posts: 0 });

  useEffect(() => {
    Promise.all([
      fetch('/api/destinations').then(res => res.json()),
      fetch('/api/posts').then(res => res.json())
    ]).then(([destData, postData]) => {
      setStats({
        destinations: destData.length,
        posts: postData.length
      });
    });
  }, []);

  const cards = [
    { title: 'Total Destinations', value: stats.destinations, icon: <MapPin className="w-8 h-8 text-blue-500" />, bg: 'bg-blue-50' },
    { title: 'Blog Posts', value: stats.posts, icon: <FileText className="w-8 h-8 text-green-500" />, bg: 'bg-green-50' },
    { title: 'Active Bookings', value: '24', icon: <TrendingUp className="w-8 h-8 text-purple-500" />, bg: 'bg-purple-50' },
    { title: 'New Leads', value: '12', icon: <Users className="w-8 h-8 text-orange-500" />, bg: 'bg-orange-50' },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`p-4 rounded-lg ${card.bg}`}>
              {card.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{card.title}</p>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="w-2 h-2 rounded-full bg-theme"></div>
              <div>
                <p className="text-sm text-gray-800 font-medium">New booking inquiry for Santorini</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
