'use client';

import Image from 'next/image';

import { useEffect, useState } from 'react';
import Link  from 'next/link';

const lunarCalendar = require('lunar-calendar');

export default function Header() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [theme] = useState('system');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);



  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    const applyTheme = (selectedTheme) => {
      if (selectedTheme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.add(systemTheme);
      } else {
        root.classList.add(selectedTheme);
      }
    };

    applyTheme(theme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        root.classList.remove('light', 'dark');
        applyTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const lunar = lunarCalendar.solarToLunar(currentTime.getFullYear(), currentTime.getMonth() + 1, currentTime.getDate());
  const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];


  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
      <Link href='/' className="flex items-center space-x-4 group">
        <div className="relative w-10 h-10 scale-120">
          <Image
            src="/hot.png"
            alt="热榜图标"
            fill
            className="object-contain"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
            每日热榜
          </h1>
          <span className="text-xs text-gray-600 dark:text-gray-400">汇聚全网热点，新闻一览无余</span>
        </div>
      </Link>

        <div className="flex-col justify-items-center">
          <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-300">
            <span className="text-sm">
              {`${currentTime.getFullYear()} 年 ${currentTime.getMonth() + 1} 月 ${currentTime.getDate()}日`}
            </span>
            <time className="text-sm">{currentTime.toLocaleTimeString('zh-CN', {hour12: false})}</time>
            <span className="text-sm">{weekDays[currentTime.getDay()]}</span>
          </div>

          <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-300">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {`${lunar.GanZhiYear}年 ${lunar.GanZhiMonth}月 ${lunar.GanZhiDay}日 农历${lunar.lunarMonthName}${lunar.lunarDayName}`}
            </span>
          </div>
        </div>

        <div>
          <Link href="/config">配置</Link>
        </div>
      </div>
    </header>
  );
}