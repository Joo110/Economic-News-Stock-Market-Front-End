'use client';

import React, { FormEvent, useState } from 'react';

interface Sector {
  id: string;
  name: string;
}

interface Result {
  company: string;
  price: number;
  change: number;
  updated: string;
}

const SECTORS: Sector[] = [
  { id: '', name: 'كل القطاعات' },
  { id: 'bk', name: 'بنوك' },
  { id: 'tel', name: 'اتصالات' },
  { id: 'real', name: 'عقارات' },
  { id: 'ind', name: 'صناعة' },
];

export default function CompanyStats() {
  // default dates من المثال بتاعك
  const [sector, setSector] = useState<string>('');
  const [fromDate, setFromDate] = useState<string>('2025-07-19');
  const [toDate, setToDate] = useState<string>('2025-08-20');
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<Result[]>([]);
  const [message, setMessage] = useState<string>('');

  const handleFilter = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setResults([]);

    // محاكاة طلب API — استبدلها بfetch للـ API بتاعك
    await new Promise((r) => setTimeout(r, 600));

    // مثال: لو اخترنا قطاع 'bk' نرجع نتيجة وهمية، غير كدا مفيش نتائج
    if (sector === 'bk') {
      setResults([
        { company: 'البنك الأهلي', price: 12.5, change: 0.8, updated: '2025-08-19' },
        { company: 'بنك مصر', price: 8.3, change: -0.2, updated: '2025-08-18' },
      ]);
      setMessage('');
    } else {
      setResults([]);
      setMessage('عفواّ, لم نعثر على أى نتائج');
    }

    setLoading(false);
  };

  const clearFilter = () => {
    setSector('');
    setFromDate('2025-07-19');
    setToDate('2025-08-20');
    setResults([]);
    setMessage('');
  };

  return (
    <section dir="rtl" className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-100">
        {/* header */}
    <div className="px-6 py-4 bg-gradient-to-r from-[#1E9CE0] to-[#1E9CE0] text-white">
          <h2 className="text-xl font-bold">
            إحصائيات الشركات <span className="opacity-80">(BK)</span>
          </h2>
          <p className="text-sm mt-1 opacity-90">تصفية</p>
        </div>

        {/* filters */}
        <form onSubmit={handleFilter} className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            {/* القطاع */}
            <div>
              <label htmlFor="sector" className="block text-sm font-medium text-gray-700 mb-2">
                القطاع
              </label>
              <select
                id="sector"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-300"
              >
                {SECTORS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* من */}
            <div>
              <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700 mb-2">
                من
              </label>
              <input
                id="fromDate"
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-300"
              />
            </div>

            {/* الى */}
            <div>
              <label htmlFor="toDate" className="block text-sm font-medium text-gray-700 mb-2">
                إلى
              </label>
              <input
                id="toDate"
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-300"
              />
            </div>
          </div>

          {/* أزرار */}
          <div className="mt-4 flex gap-3">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg shadow-sm disabled:opacity-60"
              disabled={loading}
            >
              {loading ? 'جاري البحث...' : 'تطبيق الفلتر'}
            </button>
            <button
              type="button"
              onClick={clearFilter}
              className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              مسح الفلتر
            </button>
            <div className="ml-auto text-sm text-gray-500 self-center">يتم التحديث ربع سنويًا</div>
          </div>
        </form>

        <div className="border-t border-gray-100 p-6">
          {/* عنوان النتائج */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">النتائج</h3>
            <div className="text-sm text-gray-500">
              عرض من {fromDate} إلى {toDate}
            </div>
          </div>

          {/* حالة لا نتائج */}
          {message && (
            <div className="rounded-lg border border-dashed border-gray-200 p-6 text-center text-gray-600">
              <p className="text-lg font-medium">{message}</p>
              <p className="mt-2 text-sm">حاول تغيير الفلتر أو توسيع نطاق التاريخ.</p>
            </div>
          )}

          {/* جدول النتائج (لو فيه نتائج) */}
          {results.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-right table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-sm text-gray-600">اسم الشركة</th>
                    <th className="px-4 py-3 text-sm text-gray-600">السعر</th>
                    <th className="px-4 py-3 text-sm text-gray-600">التغير</th>
                    <th className="px-4 py-3 text-sm text-gray-600">آخر تحديث</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r, idx) => (
                    <tr key={idx} className="odd:bg-white even:bg-gray-50">
                      <td className="px-4 py-3 text-gray-800 font-medium">{r.company}</td>
                      <td className="px-4 py-3 text-gray-800">{r.price}</td>
                      <td className={`px-4 py-3 ${r.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {r.change >= 0 ? `+${r.change}` : r.change}
                      </td>
                      <td className="px-4 py-3 text-gray-500">{r.updated}</td>
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
