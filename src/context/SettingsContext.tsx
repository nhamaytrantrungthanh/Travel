import React, { createContext, useContext, useState, useEffect } from 'react';

export interface SiteSettings {
  siteName: string;
  heroHeading: string;
  heroSubheading: string;
  themeColor: string;
  accentColor: string;
  fontHeading: string;
  fontBody: string;
}

interface SettingsContextType {
  settings: SiteSettings | null;
  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<void>;
  loading: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch settings:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (settings) {
      document.documentElement.style.setProperty('--theme-color', settings.themeColor);
      document.documentElement.style.setProperty('--accent-color', settings.accentColor);
      
      if (settings.fontHeading === 'Playfair Display') {
        document.documentElement.style.setProperty('--font-serif', '"Playfair Display", serif');
      } else {
        document.documentElement.style.setProperty('--font-serif', settings.fontHeading);
      }

      if (settings.fontBody === 'Inter') {
        document.documentElement.style.setProperty('--font-sans', '"Inter", sans-serif');
      } else {
        document.documentElement.style.setProperty('--font-sans', settings.fontBody);
      }
    }
  }, [settings]);

  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings),
      });
      const data = await res.json();
      setSettings(data);
    } catch (err) {
      console.error('Failed to update settings:', err);
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
