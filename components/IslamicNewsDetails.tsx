'use client';

import React from 'react';
import Image from 'next/image';

type NewsDetailsProps = {
  id?: string;
  title?: string;
  image?: string;
  publishedAt?: string;
  content?: string;
};

export default function IslamicNewsDetails({
  id,
  title = "التمويل الإسلامي يحقق نموًا كبيرًا في الأسواق العالمية",
  image = "/Images/FakeNews.png",
  publishedAt = "23 أغسطس 2025 02:30 م",
  content = `أظهرت التقارير الأخيرة أن التمويل الإسلامي يشهد توسعًا ملحوظًا في عدد من الدول العربية والآسيوية،
مدفوعًا بزيادة الطلب على المنتجات المالية المتوافقة مع الشريعة الإسلامية.

وأشار الخبراء إلى أن البنوك الإسلامية تركز على تنويع استثماراتها في قطاعات مثل العقارات والتكنولوجيا،
بالإضافة إلى دعم المشروعات الصغيرة والمتوسطة.

كما أكدوا أن مستقبل الاقتصاد الإسلامي واعد للغاية،
خاصة مع اتجاه المزيد من الأسواق لاعتماد معايير الصكوك والتمويل الأخضر المتوافق مع الشريعة.`,
}: NewsDetailsProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-5xl mx-auto my-10 border border-gray-200">
      {/* العنوان */}
      <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-snug text-right">
        {title}
      </h1>

      {/* خط فاصل */}
      <hr className="my-4 border-t-2 border-gray-200" />

      {/* الصورة */}
      <div className="w-full h-[400px] relative rounded-lg overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* مصدر الخبر (ثابت: الاقتصاد الإسلامي) */}
      <p className="text-center text-sm text-gray-500 mt-2">الاقتصاد الإسلامي</p>

      {/* وقت النشر */}
      <div className="flex justify-end mt-4">
        <span className="text-xs text-gray-400">{publishedAt}</span>
      </div>

      {/* المحتوى */}
      <div className="mt-6 space-y-6 text-right">
        {content.split("\n").map((para, i) => (
          <p key={i} className="text-lg md:text-xl leading-relaxed text-gray-700">
            {para.trim()}
          </p>
        ))}
      </div>
    </div>
  );
}
