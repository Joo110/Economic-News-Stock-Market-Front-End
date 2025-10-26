'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

type Article = {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  url?: string;
  image?: string;
};

type Props = {
  slug?: string;
  initialData?: Article[];
};

const COUNTRY_NAMES: Record<string, string> = {
  egypt: 'مصر',
  saudi: 'السعودية',
  uae: 'الإمارات',
  bahrain: 'البحرين',
  qatar: 'قطر',
  oman: 'عمان',
  kuwait: 'الكويت',
  jordan: 'الأردن',
  morocco: 'المغرب',
  tunisia: 'تونس',
  palestine: 'فلسطين',
  iraq: 'العراق',
  gulf: 'الخليج',
  'north-africa': 'شمال أفريقيا',
  'middle-east': 'الشرق الأوسط',
};

// مولد أخبار وهمية
const generateMockArticles = (country: string): Article[] => {
  const arr: Article[] = [];
  for (let i = 1; i <= 56; i++) {
    arr.push({
      id: `${country}-${i}`,
      title: `${country} - خبر رقم ${i}`,
      excerpt: `هذا ملخص قصير عن الخبر رقم ${i} الخاص بـ ${country}.`,
      publishedAt: `قبل ${i} دقيقة`,
      url: `/news/${country}/${i}`, // تعديل الرابط للتفاصيل
      image: `/Images/FakeNews2.png`, // نفس الصورة لكل الأخبار
    });
  }
  return arr;
};

export default function CountryNews({ slug: propSlug, initialData }: Props) {
  const params = useParams();
  const slug = (propSlug ?? (params as { slug?: string } | undefined)?.slug ?? '').toString();
  const [articles, setArticles] = useState<Article[]>(initialData ?? []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData && initialData.length) {
      setArticles(initialData);
      return;
    }

    setLoading(true);
    const t = setTimeout(() => {
      const key = slug?.toLowerCase() ?? 'global';
      setArticles(generateMockArticles(key));
      setLoading(false);
    }, 300);

    return () => clearTimeout(t);
  }, [slug, initialData]);

  const displayCountry = COUNTRY_NAMES[slug?.toLowerCase()] ?? (slug ? decodeURIComponent(slug) : 'الأخبار');

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-7xl mx-auto my-10 border border-gray-200">
      {/* الهيدر */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-right">
          <h2 className="text-4xl font-bold text-[#1E9CE0]">أخبار {displayCountry}</h2>
          <p className="text-sm text-gray-500">أحدث الأخبار الخاصة بـ {displayCountry}</p>
        </div>
      </div>

      {/* الأخبار */}
      {loading ? (
        <div className="py-12 text-center text-gray-500">جارٍ التحميل...</div>
      ) : articles.length === 0 ? (
        <div className="py-12 text-center text-gray-500">لا توجد مقالات حاليا لهذه الدولة.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((a) => (
            <div key={a.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm flex flex-col">
              {a.image && (
                <div className="w-full h-40 relative">
                  <Image
                    src={a.image}
                    alt={a.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-4 text-right flex flex-col flex-grow">
                <span className="text-xs text-gray-500 font-medium">{a.publishedAt}</span>
                <h3 className="mt-2 text-md font-bold text-gray-900 leading-tight">
                  {a.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600 flex-grow">{a.excerpt}</p>

                {/* زر اعرف المزيد */}
                <Link
                 href={`/NewsDetails/${1}`} // الرابط للصفحة
                  className="mt-3 inline-block text-sm font-semibold text-[#1E9CE0] hover:underline"
                  >
                   اعرف المزيد →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
