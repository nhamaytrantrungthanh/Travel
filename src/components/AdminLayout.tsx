import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, MapPin, FileText, Settings, LogOut, Globe } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export default function AdminLayout() {
  const location = useLocation();
  const { settings } = useSettings();

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Destinations', path: '/admin/destinations', icon: <MapPin className="w-5 h-5" /> },
    { name: 'Blog Posts', path: '/admin/posts', icon: <FileText className="w-5 h-5" /> },
    { name: 'Site Settings', path: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Settings className="w-6 h-6 text-theme" />
            Admin
          </h2>
          <p className="text-sm text-gray-500 mt-1">{settings?.siteName} CMS</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive 
                    ? 'bg-theme text-white' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-theme'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100 space-y-2">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-gray-600 hover:bg-gray-50 hover:text-theme transition-colors">
            <Globe className="w-5 h-5" />
            View Site
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-red-600 hover:bg-red-50 transition-colors">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm h-16 flex items-center px-8">
          <h1 className="text-xl font-semibold text-gray-800">
            {navItems.find(item => item.path === location.pathname)?.name || 'Admin'}
          </h1>
        </header>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
