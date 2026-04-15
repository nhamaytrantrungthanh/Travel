import { Link, Outlet } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import { Plane, Menu, X, Facebook, Twitter, Instagram } from 'lucide-react';
import { useState } from 'react';

export default function Layout() {
  const { settings } = useSettings();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!settings) return null;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-2">
              <Plane className="w-8 h-8 text-theme" />
              <span className="font-serif text-2xl font-bold text-theme">{settings.siteName}</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-gray-600 hover:text-theme font-medium transition-colors">Home</Link>
              <Link to="/about" className="text-gray-600 hover:text-theme font-medium transition-colors">About</Link>
              <Link to="/destinations" className="text-gray-600 hover:text-theme font-medium transition-colors">Destinations</Link>
              <Link to="/services" className="text-gray-600 hover:text-theme font-medium transition-colors">Services</Link>
              <Link to="/blog" className="text-gray-600 hover:text-theme font-medium transition-colors">Blog</Link>
              <Link to="/contact" className="text-gray-600 hover:text-theme font-medium transition-colors">Contact</Link>
              <Link to="/admin" className="px-4 py-2 bg-theme text-white rounded-lg font-medium hover:bg-theme/90 transition-colors">Admin</Link>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-gray-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-4 pt-2 pb-6 space-y-1 flex flex-col">
              <Link to="/" className="block px-3 py-2 text-gray-600 hover:text-theme hover:bg-gray-50 rounded-md" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/about" className="block px-3 py-2 text-gray-600 hover:text-theme hover:bg-gray-50 rounded-md" onClick={() => setIsMenuOpen(false)}>About</Link>
              <Link to="/destinations" className="block px-3 py-2 text-gray-600 hover:text-theme hover:bg-gray-50 rounded-md" onClick={() => setIsMenuOpen(false)}>Destinations</Link>
              <Link to="/services" className="block px-3 py-2 text-gray-600 hover:text-theme hover:bg-gray-50 rounded-md" onClick={() => setIsMenuOpen(false)}>Services</Link>
              <Link to="/blog" className="block px-3 py-2 text-gray-600 hover:text-theme hover:bg-gray-50 rounded-md" onClick={() => setIsMenuOpen(false)}>Blog</Link>
              <Link to="/contact" className="block px-3 py-2 text-gray-600 hover:text-theme hover:bg-gray-50 rounded-md" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              <Link to="/admin" className="block px-3 py-2 text-theme font-medium hover:bg-gray-50 rounded-md" onClick={() => setIsMenuOpen(false)}>Admin</Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Plane className="w-6 h-6 text-accent" />
                <span className="font-serif text-xl font-bold">{settings.siteName}</span>
              </div>
              <p className="text-gray-400 max-w-sm">
                {settings.heroSubheading}
              </p>
              <div className="flex gap-4 mt-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
              </div>
            </div>
            
            <div>
              <h3 className="font-serif font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/destinations" className="text-gray-400 hover:text-white transition-colors">Destinations</Link></li>
                <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
                <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-serif font-semibold text-lg mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>123 Travel Avenue</li>
                <li>New York, NY 10001</li>
                <li>hello@{settings.siteName.toLowerCase().replace(/\s+/g, '')}.com</li>
                <li>+1 (555) 123-4567</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} {settings.siteName}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
