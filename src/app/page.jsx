'use client';

import { useState, useEffect } from 'react';
import HotCard from '../components/HotCard';
import { platforms } from '../config/platforms';
import BackToTop from '../components/BackToTop.jsx';

export default function Home() {
  const [configuredPlatforms, setConfiguredPlatforms] = useState([]);

  useEffect(() => {
    const savedConfig = localStorage.getItem('platformConfig');
    if (savedConfig) {
      setConfiguredPlatforms(JSON.parse(savedConfig));
    } else {
      setConfiguredPlatforms(platforms.map((platform) => ({ ...platform, enabled: true })));
    }
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-2 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {configuredPlatforms
            .filter((platform) => platform.enabled)
            .map((platform) => (
              <HotCard
                key={platform.id}
                platform={platform.id}
                name={platform.name}
                title={platform.title}
                icon={platform.icon}
                api={platform.api}
              />
            ))}
        </div>
      </div>

      {/*返回顶部*/}
      <BackToTop />
    </main>
  );
}
