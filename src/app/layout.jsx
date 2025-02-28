import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaceFrownIcon } from "@heroicons/react/24/outline";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: '今日热榜 - 全网新闻热点尽握掌中',
  description: '今日热榜, 聚合全网新闻热点，让你一目了然~',
  keywords: ['今日热榜, 新闻热点', '新闻', '热点', '微博热搜', '抖音热搜', ''],
  author: {name :'林深时觉寒', url: 'https://ikangjia.cn' },
}


export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
