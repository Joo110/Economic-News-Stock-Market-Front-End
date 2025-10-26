'use client';

import React, { FormEvent, useState } from 'react';

interface Result {
  company: string;
  marketValue: string;
  profitability: string;
  growth: string;
  liquidity: string;
  sharia: string;
  updated: string;
}

export default function FinancialIndicators() {
  const [companyName, setCompanyName] = useState('');
  const [period, setPeriod] = useState('q3');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Result[]>([]);
  const [message, setMessage] = useState('');

  const handleFilter = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setResults([]);

    await new Promise((r) => setTimeout(r, 600));

    // مثال: بحث عن "bk" يجيب بيانات وهمية
    if (companyName.includes('bk')) {
      setResults([
        {
          company: 'البنك الأهلي (*)',
          marketValue: '25%',
          profitability: '18%',
          growth: '12%',
          liquidity: '30%',
          sharia: '✔',
          updated: '2025-08-15',
        },
        {
          company: 'بنك مصر',
          marketValue: '20%',
          profitability: '15%',
          growth: '10%',
          liquidity: '25%',
          sharia: '✔',
          updated: '2025-08-15',
        },
      ]);
    } else {
      setMessage('عفواّ, لم نعثر على أى نتائج');
    }

    setLoading(false);
  };

  const clearFilter = () => {
    setCompanyName('');
    setPeriod('q3');
    setResults([]);
    setMessage('');
  };

  return (
    <section dir="rtl" className="max-w-5xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-100">
        {/* header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#1E9CE0] to-[#1E9CE0] text-white">
          <h2 className="text-xl font-bold">المؤشرات المالية (BK)</h2>
          <p className="text-sm mt-1 opacity-90">تصفية</p>
        </div>

        {/* filters */}
        <form onSubmit={handleFilter} className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          {/* اسم الشركة */}
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
              اسم الشركة أو الرمز
            </label>
            <input
              id="companyName"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="ابحث باسم أو رمز الشركة"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
          </div>

          {/* الفترة */}
          <div>
            <label htmlFor="period" className="block text-sm font-medium text-gray-700 mb-2">
              الفترة
            </label>
            <select
              id="period"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-300"
            >
              <option value="q1">الربع الأول</option>
              <option value="q2">الربع الثاني</option>
              <option value="q3">الربع الثالث</option>
              <option value="q4">الربع الرابع</option>
            </select>
          </div>

          {/* أزرار */}
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg shadow-sm disabled:opacity-60"
              disabled={loading}
            >
              {loading ? 'جاري البحث...' : 'تطبيق الفلتر'}
            </button>
            <button
              type="button"
              onClick={clearFilter}
              className="flex-1 border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              مسح الفلتر
            </button>
          </div>
        </form>

        {/* note */}
        <div className="px-6 text-sm text-gray-500">ملحوظة: الشركات ذات العلامة (*) تكون السنة المالية لها لا تبدأ في يناير</div>
        <div className="px-6 text-sm text-gray-500 mb-2">يتم تحديث النسب المالية ربع سنويًا</div>

        {/* results */}
        <div className="border-t border-gray-100 p-6">
          {message && (
            <div className="rounded-lg border border-dashed border-gray-200 p-6 text-center text-gray-600">
              <p className="text-lg font-medium">{message}</p>
              <p className="mt-2 text-sm">حاول تغيير الفلتر أو إدخال رمز آخر.</p>
            </div>
          )}

          {results.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-right table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-sm text-gray-600">اسم الشركة</th>
                    <th className="px-4 py-3 text-sm text-gray-600">نسب القيم السوقية</th>
                    <th className="px-4 py-3 text-sm text-gray-600">نسب الربحية</th>
                    <th className="px-4 py-3 text-sm text-gray-600">نسب النمو</th>
                    <th className="px-4 py-3 text-sm text-gray-600">نسب السيولة</th>
                    <th className="px-4 py-3 text-sm text-gray-600">نسب الامتثال للشريعة</th>
                    <th className="px-4 py-3 text-sm text-gray-600">آخر تحديث</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r, idx) => (
                    <tr key={idx} className="odd:bg-white even:bg-gray-50">
                      <td className="px-4 py-3 text-gray-800 font-medium">{r.company}</td>
                      <td className="px-4 py-3">{r.marketValue}</td>
                      <td className="px-4 py-3">{r.profitability}</td>
                      <td className="px-4 py-3">{r.growth}</td>
                      <td className="px-4 py-3">{r.liquidity}</td>
                      <td className="px-4 py-3">{r.sharia}</td>
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
