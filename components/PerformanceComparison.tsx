'use client';

import React, { useState } from 'react';

interface Item {
  name: string;
  price: number;
  change: number;
  updated: string;
}

const MOCK_DATA: Item[] = [
  { name: 'بنك دبي التجاري', price: 8.12, change: 77.29, updated: '2025-08-20' },
  { name: 'دبي للتأمين', price: 12.4, change: 25.15, updated: '2025-08-20' },
  { name: 'مؤشر الخدمات المالية', price: 3672.22, change: 55.76, updated: '2025-08-20' },
  { name: 'إعمار العقارية', price: 6.55, change: 12.45, updated: '2025-08-20' },
  { name: 'بنك أبوظبي الأول', price: 14.75, change: -5.12, updated: '2025-08-20' },
  { name: 'سوق دبي المالي', price: 2.32, change: 30.10, updated: '2025-08-20' },
];

export default function PerformanceComparison() {
  const [items, setItems] = useState<Item[]>([]);
  const [input, setInput] = useState('');
  const [period, setPeriod] = useState('3m');
  const [error, setError] = useState('');

  const handleAdd = () => {
    if (items.length >= 6) {
      setError("لا يمكنك إضافة أكثر من 6 أسهم أو مؤشرات");
      return;
    }

    const found = MOCK_DATA.find((x) => x.name.includes(input));
    if (found && !items.find((i) => i.name === found.name)) {
      setItems([...items, found]);
      setError('');
    } else {
      setError("السهم غير موجود أو مضاف مسبقاً");
    }
    setInput('');
  };

  const handleClear = () => {
    setItems([]);
    setInput('');
    setError('');
  };

  return (
    <section dir="rtl" className="max-w-5xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-100">
        {/* header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#1E9CE0] to-[#1E9CE0] text-white">
          <h2 className="text-xl font-bold">مقارنة الأداء</h2>
          <p className="text-sm opacity-90">قارن بين أداء الأسهم والمؤشرات (حتى 6 أسهم/مؤشرات)</p>
        </div>

        {/* filters */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-2 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="أضف سهماً أو مؤشراً (مثال: إعمار)"
                className="flex-1 rounded-lg border border-gray-200 px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-300"
              />
              <button
                onClick={handleAdd}
                className="bg-[#1E9CE0] hover:bg-sky-700 text-white px-4 py-2 rounded-lg"
              >
                إضافة
              </button>
            </div>

            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="rounded-lg border border-gray-200 px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-300"
            >
              <option value="3m">٣ شهور</option>
              <option value="1y">سنة</option>
              <option value="all">الكل</option>
            </select>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            onClick={handleClear}
            className="text-red-600 text-sm underline hover:text-red-800"
          >
            مسح الكل
          </button>
        </div>

        {/* results */}
        <div className="border-t border-gray-100 p-6">
          {items.length === 0 ? (
            <div className="rounded-lg border border-dashed border-gray-200 p-6 text-center text-gray-600">
              لم يتم اختيار أي سهم أو مؤشر بعد.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-right table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-sm text-gray-600">الاسم</th>
                    <th className="px-4 py-3 text-sm text-gray-600">السعر</th>
                    <th className="px-4 py-3 text-sm text-gray-600">التغير</th>
                    <th className="px-4 py-3 text-sm text-gray-600">الفترة</th>
                    <th className="px-4 py-3 text-sm text-gray-600">آخر تحديث</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => (
                    <tr key={idx} className="odd:bg-white even:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-800">{item.name}</td>
                      <td className="px-4 py-3 text-gray-600">{item.price}</td>
                      <td
                        className={`px-4 py-3 ${
                          item.change >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {item.change >= 0 ? `+${item.change}%` : `${item.change}%`}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {period === '3m'
                          ? '٣ شهور'
                          : period === '1y'
                          ? 'سنة'
                          : 'الكل'}
                      </td>
                      <td className="px-4 py-3 text-gray-500">{item.updated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
