'use client';

import { useState, useEffect } from 'react';
import useSWR from 'swr';
import HotCard from '../components/HotCard';
import { platforms } from '../config/platforms';
import { ArrowUpIcon } from '@heroicons/react/24/outline';

const fetcher = (url) => fetch(url).then(res => res.json());

export default function Home() {
  const [refreshKeys, setRefreshKeys] = useState({});
  const [showScrollTop, setShowScrollTop] = useState(false);

  const refreshPlatform = (platform) => {
    setRefreshKeys(prev => ({
      ...prev,
      [platform]: Date.now()
    }));
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-2 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {platforms.map(platform => {
            const { data } = useSWR(
              `${platform.api}?t=${refreshKeys[platform.id] || ''}`,
              fetcher
            );
            return (
              <HotCard
                key={platform.id}
                data={{
                  platform: platform.id,
                  title: platform.title,
                  name: platform.name,
                  icon: platform.icon,
                  items: data?.data || [],
                  updateTime: data?.updateTime || new Date().toISOString()
                }}
                onRefresh={() => refreshPlatform(platform.id)}
              />
            );
          })}
        </div>
      </div>
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-110"
        >
          <ArrowUpIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>
      )}
    </main>
  );
}
