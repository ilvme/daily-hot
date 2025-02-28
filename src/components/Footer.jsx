'use client';

import dayjs from "dayjs";


export default function Footer() {
  return (
    <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-300">
           今日热榜 ©&nbsp;
           <a
              href="https://ikangjia.cn"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
            >
              林深时觉寒
            </a>
          </p>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            Powered by&nbsp;
            <a
              href="https://nextjs.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors underline"
            >
              Next.js
            </a>
            &&nbsp;
            <a
              href="https://tailwindcss.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors underline"
            >
              Tailwindcss
            </a>
            &&nbsp;
            <a
              href="https://vercel.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors underline"
            >
              Vercel
            </a>
            .
          </div>
        </div>
      </div>
    </footer>
  );
}