'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Switch } from '@headlessui/react';
import { platforms } from '../../config/platforms';
import BackToTop from '../../components/BackToTop.jsx';

function PlatformItem({ id, name, title, icon, enabled, onToggle }) {
  return (
    <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 w-full">
      <div className="flex items-center space-x-4">
        <div className="relative w-8 h-8">
          <Image src={icon} alt={name} fill className="object-contain" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">{name}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">{title}</p>
        </div>
      </div>
      <div>
        <Switch
          checked={enabled}
          onChange={() => onToggle()}
          className={`${enabled ? 'bg-red-400 dark:bg-red-800' : 'bg-gray-200 dark:bg-gray-500'} relative inline-flex h-5 w-9 items-center rounded-full transition-colors`}
        >
          <span className="sr-only">启用 {name}</span>
          <span
            className={`${enabled ? 'translate-x-4' : 'translate-x-1'} inline-block h-3 w-3 transform rounded-full bg-white transition-transform`}
          />
        </Switch>
      </div>
    </div>
  );
}

export default function ConfigPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const savedConfig = localStorage.getItem('platformConfig');
      if (savedConfig) {
        const parsedConfig = JSON.parse(savedConfig);
        const updatedConfig = platforms.map((platform) => {
          const existingPlatform = parsedConfig.find((p) => p.id === platform.id);
          return existingPlatform || { ...platform, enabled: true };
        });
        setItems(updatedConfig);
        localStorage.setItem('platformConfig', JSON.stringify(updatedConfig));
      } else {
        const initialItems = platforms.map((platform) => ({
          ...platform,
          enabled: true,
        }));
        setItems(initialItems);
        localStorage.setItem('platformConfig', JSON.stringify(initialItems));
      }
    } catch (error) {
      console.error('Error loading platform config:', error);
      const initialItems = platforms.map((platform) => ({
        ...platform,
        enabled: true,
      }));
      setItems(initialItems);
      localStorage.setItem('platformConfig', JSON.stringify(initialItems));
    }
  }, []);

  const handleToggle = (id) => {
    setItems((prevItems) => {
      const newItems = prevItems.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      );
      localStorage.setItem('platformConfig', JSON.stringify(newItems));
      return newItems;
    });
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">平台配置</h1>
            <p className="text-amber-500 dark:text-amber-400 text-sm">
              网站配置功能开发中，功能尚不稳定
            </p>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            开关控制平台显示状态
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {items.map((item) => (
              <PlatformItem
                key={item.id}
                id={item.id}
                name={item.name}
                title={item.title}
                icon={item.icon}
                enabled={item.enabled}
                onToggle={() => handleToggle(item.id)}
              />
            ))}
          </div>
        </div>
      </div>

      <BackToTop />
    </main>
  );
}
