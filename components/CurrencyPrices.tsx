'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Calculator } from 'lucide-react';
import { useCurrencies } from '../hooks/useCurrencies';

export default function CurrencyPrices() {
  const router = useRouter();
  const { currencies, loading, error } = useCurrencies();

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-6">
      {/* العنوان */}
      <div className="bg-[#1E9CE0] text-white text-center w-full max-w-6xl rounded-t-lg p-4 text-2xl font-bold">
        أسعار العملات
      </div>

      {/* البوكس الأبيض */}
      <div className="bg-white w-full max-w-6xl border rounded-b-lg shadow p-6 mb-18">
        {/* الهيدر + الحاسبة */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-700 font-semibold text-lg">
            أسعار العملات مقابل الدولار
          </p>
          <button
            onClick={() => router.push("/CurrencyConverter")}
            className="flex items-center gap-2 bg-[#1E9CE0] text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
          >
            <Calculator size={20} />
            الحاسبة
          </button>
        </div>

        {/* حالة التحميل أو الخطأ */}
        {loading && <p>جاري التحميل...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* الجدول */}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-center">
              <thead>
                <tr className="bg-[#1E9CE0] text-white">
                  <th className="p-3 border w-1/4">الرمز</th>
                  <th className="p-3 border w-1/4">الاسم</th>
                  <th className="p-3 border w-1/4">دولار لـ وحدة</th>
                  <th className="p-3 border w-1/4">وحدة لـ دولار</th>
                </tr>
              </thead>
              <tbody>
                {currencies.map((c, idx) => {
                  const usdToUnit = c.rateToUSD !== 0 ? 1 / c.rateToUSD : 0;
                  const unitToUsd = c.rateToUSD;
                  return (
                    <tr
                      key={c.id}
                      className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="border p-3 text-gray-600">{c.code}</td>
                      <td className="border p-3 text-gray-600">{c.name}</td>
                      <td className="border p-3 text-gray-600">{unitToUsd.toFixed(4)}</td>
                      <td className="border p-3 text-gray-600">{usdToUnit.toFixed(4)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
