'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Sector {
  name: string;
  changePercent: number;
  changeValue: number;
  value: number;
  code?: string;
  open?: number;
  prevClose?: number;
  high?: number;
  low?: number;
  volume?: number;
  indexValue?: number;
}

const initialSectorsData: Sector[] = [
  { name: 'بنوك', changePercent: -0.77, changeValue: -22.72, value: 2910.21, code: "BANK" },
  { name: 'موارد أساسية', changePercent: 0.26, changeValue: 9.16, value: 3589.06, code: "BASIC" },
  { name: 'رعاية صحية و أدوية', changePercent: -0.11, changeValue: -1.81, value: 1578.93 },
  { name: 'خدمات و منتجات صناعية وسيارات', changePercent: 1.09, changeValue: 101.41, value: 9432.50 },
  { name: 'عقارات', changePercent: -0.81, changeValue: -27.46, value: 3354.12 },
  { name: 'سياحة وترفيه', changePercent: 1.37, changeValue: 54.12, value: 4018.39 },
  { name: 'اتصالات و اعلام و تكنولوجيا المعلومات', changePercent: -0.20, changeValue: -6.73, value: 3310.57 },
  { name: 'أغذية و مشروبات و تبغ', changePercent: -0.37, changeValue: -9.73, value: 2621.65 },
  { name: 'طاقة و خدمات مساندة', changePercent: 0.05, changeValue: 0.38, value: 818.83 },
  { name: 'تجارة و موزعون', changePercent: 2.66, changeValue: 269.04, value: 10373.72 },
  { name: 'خدمات النقل والشحن', changePercent: -2.20, changeValue: -75.04, value: 3336.64 },
  { name: 'خدمات تعليمية', changePercent: 3.14, changeValue: 154.02, value: 5058.89 },
  { name: 'خدمات مالية غير مصرفية', changePercent: -1.14, changeValue: -18.27, value: 1579.51 },
  { name: 'مقاولات و إنشاءات هندسية', changePercent: 0.71, changeValue: 27.16, value: 3848.60 },
  { name: 'منسوجات و سلع معمرة', changePercent: -0.74, changeValue: -31.68, value: 4271.23 },
  { name: 'مواد البناء', changePercent: 0.76, changeValue: 42.67, value: 5635.23 },
  { name: 'ورق ومواد تعبئة و تغليف', changePercent: -9.28, changeValue: -250.91, value: 2454.04 },
];

export default function MarketSectors() {
  const [sectors] = useState<Sector[]>(initialSectorsData);
  const router = useRouter();

  const goToSectorPage = (sector: Sector) => {
    // استخدم code إذا موجود وإلا اسم القطاع، وحوّله لسلاسل مناسبة للرابط
    const id = encodeURIComponent((sector.code ?? sector.name).replace(/\s+/g, '-'));
    // نوجّه للصفحة الثابتة /sector مع تمرير الكود كـ query param
    router.push(`/sector?code=${id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-7xl mx-auto my-10 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 text-right mb-6">قطاعات السوق</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">القطاع</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">القيمة</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">التغير (قيمة)</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">التغير (%)</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sectors.map((sector) => (
              <tr
                key={sector.code ?? sector.name}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => goToSectorPage(sector)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-right font-medium text-gray-900">{sector.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{sector.value.toFixed(2)}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-center text-sm font-semibold ${sector.changeValue >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {sector.changeValue.toFixed(2)}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-center text-sm font-semibold ${sector.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {sector.changePercent > 0 ? `+${sector.changePercent.toFixed(2)}` : sector.changePercent.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
