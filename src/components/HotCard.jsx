import Image from 'next/image';
import { ArrowPathIcon, InboxIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

const fetcher = (url) => fetch(url).then(res => res.json());

export default function HotCard({ platform, name, title, icon, api }) {
  const [isTimeout, setIsTimeout] = useState(false);
  const [refreshKey, setRefreshKey] = useState('');

  const { data, error } = useSWR(
    `${api}?t=${refreshKey}`,
    fetcher,
    { 
      revalidateOnFocus: false,
      refreshInterval: 300000,
      shouldRetryOnError: true,
      errorRetryCount: 3
    }
  );

  const items = data?.data;
  const updateTime = data?.updateTime || new Date().toISOString();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!items) {
        setIsTimeout(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [items]);

  const handleRefresh = () => {
    setRefreshKey(Date.now().toString());
  };

  const renderContent = () => {
    if (!items) {
      if (isTimeout) {
        return (
          <div className="flex-1 flex flex-col items-center justify-center space-y-2 text-gray-400 dark:text-gray-500">
            <InboxIcon className="w-12 h-12" />
            <p className="text-sm">暂无数据</p>
          </div>
        );
      }
      return (
        <div className="flex-1 flex flex-col space-y-3 p-4 animate-pulse">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
              <div className="flex-1 h-5 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
            </div>
          ))}
        </div>
      );
    }

    if (items.length === 0) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center space-y-2 text-gray-400 dark:text-gray-500">
          <InboxIcon className="w-12 h-12" />
          <p className="text-sm">暂无数据</p>
        </div>
      );
    }

    return (
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-500">
        {items.slice(0, 30).map((item, index) => (
          <a
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start px-4 py-1.5 hover:bg-gray-50/80 dark:hover:bg-gray-700/50 transition-all duration-200 group"
          >
            <span className={`w-6 mr-2 font-medium rounded-md text-center ${index < 3 ? 'text-white' : 'bg-gray-100 dark:bg-gray-500'} ${index === 0 ? 'bg-red-600' : index === 1 ? 'bg-orange-500' : index === 2 ? 'bg-yellow-500' : ''}`}>
              {index + 1}
            </span>
            <span className="flex-1 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 whitespace-pre-wrap break-words">
              {item.title}
            </span>
          </a>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] overflow-hidden h-[410px] flex flex-col transition-transform">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative w-6 h-6 rounded-lg overflow-hidden shadow-inner">
            <Image src={icon} alt={platform} fill className="object-cover" />
          </div>
          <h2 className="text-x font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">{name}</h2>
        </div>
        <h3 className="text-sm text-gray-600 dark:text-gray-400">{title}</h3>
      </div>

      {renderContent()}

      <div className="px-4 py-1.5 flex items-center justify-between text-xs">
        <span className="flex items-center space-x-1">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span>{dayjs(updateTime).fromNow()}更新</span>
        </span>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleRefresh}
            className="flex items-center space-x-1 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group"
          >
            <ArrowPathIcon className="w-5 h-5 group-active:animate-spin" />
          </button>
        </div>
      </div>
    </div>
  );
}