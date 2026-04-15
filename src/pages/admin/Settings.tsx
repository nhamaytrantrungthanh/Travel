import { useState, useEffect } from 'react';
import { useSettings } from '../../context/SettingsContext';
import { Save } from 'lucide-react';

export default function Settings() {
  const { settings, updateSettings } = useSettings();
  const [formData, setFormData] = useState(settings || {
    siteName: '', heroHeading: '', heroSubheading: '', themeColor: '', accentColor: '', fontHeading: '', fontBody: ''
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateSettings(formData);
    setTimeout(() => setIsSaving(false), 500);
  };

  return (
    <div className="max-w-3xl">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Site Settings</h2>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">General</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
              <input type="text" value={formData.siteName} onChange={e => setFormData({...formData, siteName: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-theme outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hero Heading</label>
              <input type="text" value={formData.heroHeading} onChange={e => setFormData({...formData, heroHeading: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-theme outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hero Subheading</label>
              <textarea rows={2} value={formData.heroSubheading} onChange={e => setFormData({...formData, heroSubheading: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-theme outline-none resize-none"></textarea>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Appearance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Theme Color</label>
              <div className="flex gap-2">
                <input type="color" value={formData.themeColor} onChange={e => setFormData({...formData, themeColor: e.target.value})} className="h-10 w-10 rounded cursor-pointer border-0 p-0" />
                <input type="text" value={formData.themeColor} onChange={e => setFormData({...formData, themeColor: e.target.value})} className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-theme outline-none uppercase" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Accent Color</label>
              <div className="flex gap-2">
                <input type="color" value={formData.accentColor} onChange={e => setFormData({...formData, accentColor: e.target.value})} className="h-10 w-10 rounded cursor-pointer border-0 p-0" />
                <input type="text" value={formData.accentColor} onChange={e => setFormData({...formData, accentColor: e.target.value})} className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-theme outline-none uppercase" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heading Font</label>
              <select value={formData.fontHeading} onChange={e => setFormData({...formData, fontHeading: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-theme outline-none bg-white">
                <option value="Playfair Display">Playfair Display (Serif)</option>
                <option value="Merriweather">Merriweather (Serif)</option>
                <option value="Inter">Inter (Sans-serif)</option>
                <option value="Roboto">Roboto (Sans-serif)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Body Font</label>
              <select value={formData.fontBody} onChange={e => setFormData({...formData, fontBody: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-theme outline-none bg-white">
                <option value="Inter">Inter (Sans-serif)</option>
                <option value="Roboto">Roboto (Sans-serif)</option>
                <option value="Open Sans">Open Sans (Sans-serif)</option>
                <option value="Lato">Lato (Sans-serif)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button type="submit" disabled={isSaving} className="bg-theme hover:bg-theme/90 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors disabled:opacity-70">
            <Save className="w-4 h-4" /> {isSaving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
