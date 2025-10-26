"use client";

import { useEffect, useState } from "react";

type NewsItem = {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
  imageUrl: string;
};

export default function NewsFeed() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fakeNews: NewsItem[] = [
      {
        id: "1",
        title: "السعودية تسجل أدنى تضخم منذ 5 أشهر",
        description:
          "تراجع معدل التضخم في السعودية خلال يوليو الماضي إلى 2.1% على أساس سنوي...",
        url: "#",
        source: "وكالة الأنباء",
        publishedAt: "الخميس 14 أغسطس 2025",
        imageUrl: "/Images/Saudi.jpg",
      },
      ...Array.from({ length: 9 }, (_, i) => ({
        id: `${i + 2}`,
        title: `عنوان خبر ${i + 1}`,
        description: "هذا وصف قصير للخبر يوضح تفاصيل سريعة...",
        url: "#",
        source: "رويترز",
        publishedAt: "2025-08-13",
        imageUrl: "/Images/fakenew6.jpg",
      })),
    ];

    setTimeout(() => {
      setNews(fakeNews);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <p>جارِ تحميل الأخبار...</p>;

  return (
    <div className="space-y-6">
      {/* الخبر الرئيسي */}
      {news.length > 0 && (
        <article className="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-white rounded-xl overflow-hidden shadow">
          {/* النص على الشمال */}
          <div className="order-2 lg:order-1 p-6 flex flex-col justify-center">
            <p className="text-gray-500 text-sm">تقارير وتحليلات</p>
            <h2 className="text-2xl font-bold leading-snug text-black">
              {news[0].title}
            </h2>
            <p className="text-gray-600 mt-3">{news[0].description}</p>
            <p className="text-gray-400 text-sm mt-2">{news[0].publishedAt}</p>
          </div>
          {/* الصورة على اليمين */}
          <img
            src={news[0].imageUrl}
            alt={news[0].title}
            className="order-1 lg:order-2 w-full h-full object-cover"
          />
        </article>
      )}

      {/* باقي الأخبار */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {news.slice(1).map((n) => (
          <article
            key={n.id}
            className="border rounded-xl overflow-hidden bg-white shadow hover:shadow-md transition-shadow flex flex-col"
          >
            <img
              src={n.imageUrl}
              alt={n.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 flex flex-col justify-between flex-grow">
              <div>
                <h3 className="text-lg font-bold text-black">{n.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{n.description}</p>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
                <span>{n.source}</span>
                <a href={n.url} className="text-blue-500 hover:underline">
                  قراءة المزيد
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
