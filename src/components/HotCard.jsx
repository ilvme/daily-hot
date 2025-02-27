import Image from 'next/image';
import Link from 'next/link';
import { ArrowPathIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';

dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

export default function HotCard({ data, onRefresh }) {
  const { platform, name, title, icon, items, updateTime } = data;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] overflow-hidden h-[400px] flex flex-col transition-transform">
      <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="relative w-6 h-6 rounded-lg overflow-hidden shadow-inner">
            <Image src={icon} alt={platform} fill className="object-cover"
            />
          </div>
          <h2 className="text-x font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">{name}</h2>
        </div>
        <h3 className="text-sm text-gray-600 dark:text-gray-400">{title}</h3>
      </div>
      
      <div className=" flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-500">
        {items.slice(0, 15).map((item, index) => (
          <a
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start px-5 py-1 hover:bg-gray-50/80 dark:hover:bg-gray-700/50 transition-all duration-200 group"
          >
            <span className={`w-6 font-medium ${index < 3 ? 'text-lg' : 'text-gray-400 dark:text-gray-500'} ${index === 0 ? 'text-red-500' : index === 1 ? 'text-orange-500' : index === 2 ? 'text-yellow-500' : ''}`}>
              {index + 1}
            </span>
            <span className="flex-1 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 whitespace-pre-wrap break-words">{item.title}</span>
          </a>
        ))}
      </div>

      <div className="px-5 py-3 flex items-center justify-between text-sm text-gray-500 bg-gray-50/50 dark:bg-gray-800/50">
        <span className="flex items-center space-x-1">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span>{dayjs(updateTime).fromNow()}更新</span>
        </span>
        <div className="flex items-center space-x-2">
          <button
            onClick={onRefresh}
            className="flex items-center space-x-1 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <ArrowPathIcon className="w-5 h-5" />
          </button>
          <Link
            href={`/list?plantform=${platform}`}
            className="flex items-center space-x-1 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <EllipsisHorizontalIcon className="w-5 h-5" />
          </Link>
          
        </div>
      </div>
    </div>
  );
}