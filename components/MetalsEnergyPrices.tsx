"use client";

import React, { useState } from "react";
import { useMetalsCommodity, MetalPrice } from "../hooks/useMetalsCommodity";
import { useCurrencies, Currency } from "../hooks/useCurrencies";

type PriceRow = {
  type: string;
  unit: string;
  price: number;
  lastUpdate: string;
};

export default function MetalsEnergyPrices() {
  const [currencyCode, setCurrencyCode] = useState("USD"); // الرمز بدل الاسم
  const { data: metals, loading: loadingMetals, error: errorMetals } = useMetalsCommodity();
  const { currencies, loading: loadingCurr, error: errorCurr } = useCurrencies();

  // خريطة ترجمة المعادن
  const metalNames: Record<string, string> = {
    gold: "ذهب",
    silver: "فضة",
    platinum: "بلاتين",
    palladium: "بلاديوم",
    copper: "نحاس",
    aluminum: "ألومنيوم",
    lead: "رصاص",
    nickel: "نيكل",
    zinc: "زنك",
  };

  // خريطة ترجمة الوحدات
  const unitNames: Record<string, string> = {
    toz: "أوقية",
    kg: "كيلو",
    lb: "رطل",
    barrel: "برميل",
  };

  // إيجاد معامل التحويل حسب العملة المختارة
  const selectedCurrency: Currency | undefined = currencies.find(c => c.code === currencyCode);
  const conversionRate = selectedCurrency?.rateToUSD || 1;

  // تحويل بيانات المعادن للسعر حسب العملة
  const rows: PriceRow[] = metals.map((item: MetalPrice) => ({
    type: metalNames[item.type] || item.type,
    unit: unitNames[item.unit] || item.unit,
    price: parseFloat((item.price * conversionRate).toFixed(2)),
    lastUpdate: new Date(item.lastUpdated).toLocaleDateString("ar-EG", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
  }));

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-6">
      {/* العنوان */}
      <div className="bg-[#1E9CE0] text-white text-center w-full max-w-7xl rounded-t-lg p-6 text-2xl font-bold">
        أسعار المعادن ومصادر الطاقة
      </div>

      <div className="bg-white w-full max-w-7xl border rounded-b-lg shadow p-8">
        {/* اختيار العملة */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700">
            اختر عملة
          </label>
          <select
            value={currencyCode}
            onChange={(e) => setCurrencyCode(e.target.value)}
            className="w-full border rounded p-2 text-gray-500"
          >
            {currencies.map(c => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
          <p className="text-sm text-gray-500 mt-2">
            يمكنك الإطلاع على آخر أسعار المعادن ومصادر الطاقة (يتم التحديث يومياً)
          </p>
        </div>

        {/* حالة التحميل أو الخطأ */}
        {(loadingMetals || loadingCurr) && <p className="text-center">جاري التحميل...</p>}
        {(errorMetals || errorCurr) && (
          <p className="text-center text-red-600">{errorMetals || errorCurr}</p>
        )}

        {/* الجدول */}
        {!loadingMetals && !loadingCurr && !errorMetals && !errorCurr && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-center">
              <thead>
                <tr className="bg-[#1E9CE0] text-white">
                  <th className="p-4 border w-1/3">النوع</th>
                  <th className="p-4 border w-1/4">وحدة القياس</th>
                  <th className="p-4 border w-1/4">السعر</th>
                  <th className="p-4 border w-1/4">آخر تحديث</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="border p-4 text-gray-500">{row.type}</td>
                    <td className="border p-4 text-gray-500">{row.unit}</td>
                    <td className="border p-4 text-gray-500">{row.price}</td>
                    <td className="border p-4 text-gray-500">{row.lastUpdate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
