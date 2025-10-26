'use client';

import React from 'react';
import Image from 'next/image';

type NewsDetailsProps = {
  title?: string;
  image?: string;
  publishedAt?: string;
  country?: string;
  content?: string;
};

export default function NewsDetails({
  title = "أمريكا تتحرك لتعزيز قدراتها البحرية عبر شراكات مع كوريا الجنوبية واليابان",
  image = "/Images/FakeNews2.png",
  publishedAt = "18 أغسطس 2025 04:17 م",
  country = "أمريكا",
  content = `تسعى أمريكا إلى الاستفادة من خبرات كوريا الجنوبية واليابان في بناء السفن لتعزيز قدراتها 
التي باتت متراجعة مقارنة بالصين، وفق وكالة أسوشيتدبرس.

ويبحث السيناتور تامي دكوورث، الديمقراطية من إلينوي، وأندي كيم، الديمقراطي من نيوجيرسي، 
خلال زيارة إلى سيول ومن بعدها طوكيو، التعاون في بناء السفن من ثاني وثالث أكبر دول العالم 
في هذا المجال.

وتغلب واشنطن في دراستها إمكانية تشكيل مشاريع مشتركة لبناء وإصلاح السفن غير القتالية
وزيادة التعاون البحري.

وتتضمن الخطط أيضًا تحسين التدريب البحري للضباط الأمريكيين وتعزيز تبادل الخبرات التقنية
مع الحلفاء الآسيويين. هذا بالإضافة إلى دراسة أساليب حديثة لإدارة الأسطول
وتطوير نظم الدفاع البحري.

كما يهدف المشروع إلى تعزيز الابتكار في تصميم السفن والمعدات البحرية
لتتناسب مع التهديدات الحديثة والمتغيرة في المنطقة، وضمان جاهزية الأسطول الأمريكي
لأي سيناريو محتمل.`,

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

      {/* مصدر الخبر */}
      <p className="text-center text-sm text-gray-500 mt-2">{country}</p>

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
