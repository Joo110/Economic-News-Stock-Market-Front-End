'use client';

import React, { useMemo, useState } from 'react';

interface CompanyStockDataDto {
  companyId: number;
  companyName: string;
  lastPrice: number;
  priceChange: number;
  changePercent: number;
  value: number;
  volume: number;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  updatedAt: string;
  domesticVolume?: number;
  domesticValue?: number;
  foreignVolume?: number;
  foreignValue?: number;
}

const MOCK_DATA: CompanyStockDataDto[] = [
  // ... (نفس الموك اللي عندك)
  {
    companyId: 1,
    companyName: 'منازل',
    lastPrice: 58.3,
    priceChange: 23.1,
    changePercent: 65.63,
    value: 1325767.44,
    volume: 23438828,
    openPrice: 56.6,
    highPrice: 58.3,
    lowPrice: 54.9,
    updatedAt: '2025-08-20T12:44:00',
    domesticVolume: 18000000,
    domesticValue: 1000000,
    foreignVolume: 5438828,
    foreignValue: 325767.44,
  },
  // ... باقي العناصر
];

function fmtNumber(n?: number) {
  if (n === undefined || n === null) return '-';
  if (Math.abs(n) >= 1_000_000) return (n / 1_000_000).toFixed(2) + 'M';
  if (Math.abs(n) >= 1_000) return (n / 1_000).toFixed(2) + 'k';
  return n.toString();
}

// اسم المكون يبدأ بحرف كبير لاتيني -> يحل eslint error
export default function LiquidityMonitor() {
  const [data] = useState<CompanyStockDataDto[]>(MOCK_DATA);
  const [query, setQuery] = useState('');
  const [onlyForeign, setOnlyForeign] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim();
    let arr = data.filter(d =>
      q === '' ||
      d.companyName.includes(q) ||
      d.companyId.toString() === q
    );

    if (onlyForeign) {
      arr = arr.filter(d => (d.foreignVolume ?? 0) > (d.domesticVolume ?? 0));
    }

    return arr;
  }, [data, query, onlyForeign]);

  return (
    <section dir="rtl" className="max-w-7xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-100">
        <div className="px-6 py-4 bg-gradient-to-r from-[#1E9CE0] to-[#1E9CE0] text-white">
          <h2 className="text-xl font-bold">مراقب السيولة</h2>
          <p className="text-sm opacity-90">عرض بيانات التداول والسيولة الداخلية/الخارجية (MOCK)</p>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex gap-2 items-center">
            <input
              type="text"
              dir="auto"
              placeholder=" ابحث باسم الشركةأو الأيدي"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 rounded-lg border text-gray-500 border-gray-200 px-3 py-2"
            />
            <label className=" text-gray-500 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={onlyForeign}
                onChange={(e) => setOnlyForeign(e.target.checked)}
                className="w-4 h-4"
              />
              عرض الشركات ذات التدفق الخارجي الأكبر
            </label>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right table-auto border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-3 py-2 text-xs text-gray-500 ">#</th>
                  <th className="px-3 py-2 text-xs text-gray-500">الشركة</th>
                  <th className="px-3 py-2 text-xs text-gray-500">آخر سعر</th>
                  <th className="px-3 py-2 text-xs text-gray-500">التغير</th>
                  <th className="px-3 py-2 text-xs text-gray-500">التغير %</th>
                  <th className="px-3 py-2 text-xs text-gray-500">حجم</th>
                  <th className="px-3 py-2 text-xs text-gray-500">قيمة</th>
                  <th className="px-3 py-2 text-xs text-gray-500">سيولة داخلية (حجم)</th>
                  <th className="px-3 py-2 text-xs text-gray-500">سيولة خارجية (حجم)</th>
                  <th className="px-3 py-2 text-xs text-gray-500">نسبة الخارج %</th>
                  <th className="px-3 py-2 text-xs text-gray-500">اتجاه التدفق</th>
                  <th className="px-3 py-2 text-xs text-gray-500">آخر تحديث</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, idx) => {
                  const dom = row.domesticVolume ?? 0;
                  const forv = row.foreignVolume ?? 0;
                  const foreignShare = row.volume > 0 ? (forv / row.volume) * 100 : 0;
                  const flowDirection =
                    forv > dom ? 'تدفق خارجي' : dom > forv ? 'تدفق داخلي' : 'متوازن';

                  return (
                    <tr key={row.companyId} className="odd:bg-white even:bg-gray-50">
                      <td className="px-3 py-2 text-sm text-gray-500">{idx + 1}</td>
                      <td className="px-3 py-2 font-medium text-gray-800">{row.companyName}</td>
                      <td className="px-3 py-2 text-sm text-gray-500">{row.lastPrice.toFixed(2)}</td>
                      <td className={`px-3 py-2 text-sm text-gray-500 ${row.priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {row.priceChange >= 0 ? `+${row.priceChange}` : row.priceChange}
                      </td>
                      <td className={`px-3 py-2 text-sm ${row.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {row.changePercent.toFixed(2)}%
                      </td>
                      <td className="px-3 py-2 text-sm text-gray-500">{fmtNumber(row.volume)}</td>
                      <td className="px-3 py-2 text-sm text-gray-500">{fmtNumber(row.value)}</td>
                      <td className="px-3 py-2 text-sm text-gray-500">{row.domesticVolume ? fmtNumber(row.domesticVolume) : '-'}</td>
                      <td className="px-3 py-2 text-sm text-gray-500">{row.foreignVolume ? fmtNumber(row.foreignVolume) : '-'}</td>
                      <td className="px-3 py-2 text-sm text-gray-500">{row.volume ? foreignShare.toFixed(1) + '%' : '-'}</td>
                      <td className={`px-3 py-2 text-sm text-gray-500 ${flowDirection === 'تدفق خارجي' ? 'text-green-700' : flowDirection === 'تدفق داخلي' ? 'text-red-700' : 'text-gray-600'}`}>
                        {flowDirection}
                      </td>
                      <td className="px-3 py-2 text-sm text-gray-500">
                        {new Date(row.updatedAt).toLocaleTimeString('ar-EG', { hour: 'numeric', minute: 'numeric' })}
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={12} className="px-3 py-6 text-center text-gray-500">
                      لم يتم العثور على بيانات
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-gray-500 mt-3">
            ملاحظة: البيانات حالياً وهمية (MOCK). عند ربط API يجب أن ترجع الحقول: <code>domesticVolume</code>, <code>domesticValue</code>, <code>foreignVolume</code>, <code>foreignValue</code>.
          </p>
        </div>
      </div>
    </section>
  );
}
