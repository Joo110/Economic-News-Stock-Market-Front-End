'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// البيانات الوهمية للأخبار
const initialNewsData = [
  {
    id: 1,
    title: 'التمويل الدولية تقرض بنك قناة السويس 50 مليون دولار لدعم المشروعات الصغيرة',
    source: 'بنوك ومالية',
    image: '/images/news1.jpg',
  },
  {
    id: 2,
    title: 'مصر: طرح سيارات ملاكي وميكروباص وبيك آب في مزاد علني 19 أغسطس',
    source: 'الوزارات',
    image: '/images/news2.jpg',
  },
  {
    id: 3,
    title: 'منصة "ميس للطاقة" تباطؤ إنتاج الغاز الطبيعي في مصر خلال الربع الثاني',
    source: 'اقتصاد كلي',
    image: '/images/news3.jpg',
  },
  {
    id: 4,
    title: 'تراجع صادرات الموالح المصرية 12% بالنصف الأول من 2025',
    source: 'الوزارات',
    image: '/images/news4.jpg',
  },
];

export default function NewsSection() {
  const [news, setNews] = useState(initialNewsData);

  //
  // === هنا يمكنك إضافة كود جلب البيانات من الـ API ===
  // يمكنك استخدام useEffect لجلب الأخبار حسب اسم البورصة (مثال: 'البورصة المصرية')
  // useEffect(() => {
  //   const fetchNews = async () => {
  //     // يمكنك تمرير اسم البورصة إلى الـ API
  //     const response = await fetch(`/api/news?market=egypt`);
  //     const data = await response.json();
  //     setNews(data);
  //   };
  //   fetchNews();
  // }, []);
  //
  //

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-7xl mx-auto my-10 border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 text-right">آخر أخبار السوق</h2>
        <Link href="/news">
          <span className="text-sm font-semibold text-[#1E9CE0] hover:underline cursor-pointer">
            المزيد من الأخبار
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {news.map((item) => (
          <div key={item.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm">
            {/* في حال عدم وجود صور فعلية، يمكنك إزالة هذا الجزء */}
            {item.image && (
              <div className="w-full h-40 relative">
                <Image
                  src={item.image}
                  alt={item.title}
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full"
                />
              </div>
            )}
            <div className="p-4">
              <span className="text-xs text-gray-500 font-medium">{item.source}</span>
              <h3 className="mt-2 text-md font-bold text-gray-900 leading-tight">
                <Link href={`/news/${item.id}`} className="hover:text-[#1E9CE0] transition-colors">
                  {item.title}
                </Link>
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}