"use client";

import { useEffect, useState } from "react";
import NewsFeed from "@/components/NewsFeed";
import StockChart from "@/components/StockChart";
import AdBanner from "@/components/AdBanner";
import MarketsTable from "@/components/MarketData";
import CryptoTable from "@/components/CryptoData";
import Footer from "@/components/Footer";
import { FaUserCircle } from "react-icons/fa";

interface Opinion {
  author: string;
  title: string;
  date: string;
}

export default function HomePage() {
  const [opinions, setOpinions] = useState<Opinion[]>([
    { author: "بكر الهبوب", title: "رحلة التحول من الشركات العائلية إلى مكاتب العائلة", date: "الأربعاء 13 أغسطس 2025" },
    { author: "لارا ويليامز", title: "السلاحف البحرية ليست الضحية الوحيدة للبلاستيك", date: "الأربعاء 13 أغسطس 2025" },
    { author: "بكر الهبوب", title: "رحلة التحول من الشركات العائلية إلى مكاتب العائلة", date: "الأربعاء 13 أغسطس 2025" },
    { author: "محمد الفاضل", title: "كيف تؤثر التكنولوجيا المالية على البنوك التقليدية؟", date: "الأربعاء 13 أغسطس 2025" },
    { author: "لارا ويليامز", title: "السلاحف البحرية ليست الضحية الوحيدة للبلاستيك", date: "الأربعاء 13 أغسطس 2025" },
  ]);

  useEffect(() => {
    // ممكن تجيب البيانات من API بعدين
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 mt-5">
        <div className="md:col-span-2">
          <NewsFeed />
          <div className="mt-4">
            <AdBanner imageUrl="/Images/adbanner3.jpg" />
          </div>
        </div>

        <div>
          <StockChart />
          <div className="mt-4">
            <AdBanner imageUrl="/Images/adbanner2.jpg" />
          </div>

          <div className="mt-4 bg-white border rounded-lg p-4 shadow-sm">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">الرأي</h3>
            <div className="space-y-4">
              {opinions.map((opinion, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 hover:shadow-sm transition-all cursor-pointer"
                >
                  <FaUserCircle className="text-gray-400 text-3xl flex-shrink-0" />
                  <div className="flex-1">
                    <div className="text-lg font-bold" style={{ color: "#1E9CE0" }}>
                      {opinion.author}
                    </div>
                    <div className="text-gray-900 font-medium text-base leading-snug">
                      {opinion.title}
                    </div>
                    <div className="text-xs text-gray-500 italic mt-1">{opinion.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* جدول الأسواق */}
        <div className="md:col-span-3 mt-4">
          <MarketsTable />
        </div>

        {/* جدول العملات الرقمية */}
        <div className="md:col-span-3 mt-8">
          <CryptoTable />
        </div>
      </div>

      {/* الفوتر */}
      <Footer />
    </>
  );
}