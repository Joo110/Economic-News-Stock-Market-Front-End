'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export interface CompanyRow {
  id: string;
  name: string;
  lastPrice: number;
  changeValue: number;
  changePercent: number;
  value: number; // قيمة التداول
  quantity: number; // كمية التداول
  open?: number;
  high?: number;
  low?: number;
  updatedAt?: string; // وقت آخر تحديث (يمكن أن يكون timestamp)
}

const mockData: CompanyRow[] = [
  // بيانات تجريبية مأخوذة بشكل تقريبي من الصورة
  {
    id: 'masr-bank',
    name: 'البنك المصري الخليجي',
    lastPrice: 0.27,
    changeValue: -0.01,
    changePercent: -1.81,
    value: 122518.45,
    quantity: 450054,
    open: 0.28,
    high: 0.28,
    low: 0.27,
    updatedAt: '01:02 م',
  },
  {
    id: 'ahli-intl',
    name: 'بنك الشركة المصرفية العربية الدولية',
    lastPrice: 2.11,
    changeValue: 0.42,
    changePercent: 19.91,
    value: 253.0,
    quantity: 100,
    open: 2.11,
    high: 2.53,
    low: 2.11,
    updatedAt: '09:39 ص 24 يونيو',
  },
  {
    id: 'suez-bank',
    name: 'بنك قناة السويس',
    lastPrice: 24.63,
    changeValue: -0.19,
    changePercent: -0.77,
    value: 2655048.75,
    quantity: 107515,
    open: 24.82,
    high: 25.18,
    low: 24.5,
    updatedAt: '01:14 م',
  },
  {
    id: 'qatar-national',
    name: 'بنك قطر الوطني',
    lastPrice: 29.21,
    changeValue: 0.21,
    changePercent: 0.72,
    value: 471367.47,
    quantity: 16149,
    open: 29.0,
    high: 29.38,
    low: 28.93,
    updatedAt: '01:26 م',
  },
  // أضف صفوف إضافية حسب الحاجة...
];

type Props = {
  data?: CompanyRow[]; // لو عاوز تجيب من الوسيط/API مرّرها هنا
};

export default function MarketCompanies({ data }: Props) {
  const [rows, setRows] = useState<CompanyRow[]>(data ?? mockData);
  const router = useRouter();

  useEffect(() => {
    // لو المستقبل هيمرّر data كـ prop نستخدمها
    if (data) {
      setRows(data);
    }
  }, [data]);

  // --- مكان استقبال البيانات من API في المستقبل ---
  // لو عايز تجيب من API شغّل الدالة fetchData() وغيّر الـ useEffect
  async function fetchDataFromApi() {
    try {
      // مثال: const res = await fetch('/api/market/companies');
      // const json = await res.json();
      // setRows(json);
      // حالياً معلّق لأنك قلت هتستقبل البيانات مستقبلًا
    } catch (err) {
      console.error('Failed to fetch market data', err);
    }
  }
  // ---------------------------------------------------

  const goToCompany = (row: CompanyRow) => {
    // لو عندك صفحة لكل شركة استخدم id
    // مثال: router.push(`/company/${encodeURIComponent(row.id)}`);
    // حاليا نوجّه لصفحة عامة
    router.push(`/sector?code=${encodeURIComponent(row.id)}`);
  };

  const fmt = (n?: number) =>
    n === undefined || n === null ? '—' : n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="max-w-7xl mx-auto my-10 p-4 bg-white rounded-lg shadow border border-gray-200">
      <div className="flex justify-between items-center mb-4 ">
        <h3 className="text-right text-black text-xl font-semibold ">كل شركات القطاع</h3>
        <div className="text-sm text-gray-500">آخر تحديث: الآن</div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-[#1E9CE0] text-white">
            <tr className="text-right">
              <th className="px-4 py-2 text-right">السهم</th>
              <th className="px-4 py-2 text-center">آخر سعر</th>
              <th className="px-4 py-2 text-center">نسبة التغير</th>
              <th className="px-4 py-2 text-center">التغير</th>
              <th className="px-4 py-2 text-center">القيمة</th>
              <th className="px-4 py-2 text-center">الكمية</th>
              <th className="px-4 py-2 text-center">أعلى</th>
              <th className="px-4 py-2 text-center">أدنى</th>
              <th className="px-4 py-2 text-center">آخر تحديث</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r, idx) => (
              <tr
                key={r.id}
                onClick={() => goToCompany(r)}
                className={`cursor-pointer hover:bg-gray-50 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
              >
                <td className="px-4 py-3 whitespace-nowrap text-right font-medium text-gray-900">{r.name}</td>

                <td className="px-4 py-3 whitespace-nowrap text-center text-gray-800">{fmt(r.lastPrice)}</td>

                <td
                  className={`px-4 py-3 whitespace-nowrap text-center font-semibold ${
                    (r.changePercent ?? 0) >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {(r.changePercent ?? 0) >= 0 ? `+${r.changePercent.toFixed(2)}%` : `${r.changePercent.toFixed(2)}%`}
                </td>

                <td
                  className={`px-4 py-3 whitespace-nowrap text-center font-semibold ${
                    (r.changeValue ?? 0) >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {(r.changeValue ?? 0) >= 0 ? `+${r.changeValue.toFixed(2)}` : r.changeValue.toFixed(2)}
                </td>

                <td className="px-4 py-3 whitespace-nowrap text-center text-gray-700">{(r.value ?? 0).toLocaleString()}</td>

                <td className="px-4 py-3 whitespace-nowrap text-center text-gray-700">{(r.quantity ?? 0).toLocaleString()}</td>

                <td className="px-4 py-3 whitespace-nowrap text-center text-gray-700">{r.high ?? '—'}</td>

                <td className="px-4 py-3 whitespace-nowrap text-center text-gray-700">{r.low ?? '—'}</td>

                <td className="px-4 py-3 whitespace-nowrap text-center text-gray-500">{r.updatedAt ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* footer صغير */}
      <div className="mt-3 text-xs text-gray-500 text-right">البيانات تجريبية — تم وضع مكان لاستقبال البيانات من API مستقبلًا</div>
    </div>
  );
}
