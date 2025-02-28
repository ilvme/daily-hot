import { useEffect, useState } from 'react';
import { ArrowUpIcon } from '@heroicons/react/24/outline/index.js';

export default function BackToTop() {
  const [showScrollTop, setShowScrollTop] = useState(false);
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
    <div>
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="z-50 fixed bottom-8 right-8 p-3 bg-red-400 dark:bg-gray-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:cursor-pointer hover:scale-110"
        >
          <ArrowUpIcon className="w-6 h-6 text-white dark:text-gray-300" />
        </button>
      )}
    </div>
  );
}
