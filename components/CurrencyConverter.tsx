"use client";
import React, { useState } from "react";
import { useCurrencyConverter } from "@/hooks/useCurrencyConverter";
import currencyNames from "@/lib/currencyNames";

export default function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EGP");
  const [amount, setAmount] = useState<number>(1);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);

  const { result, loading, error, convert } = useCurrencyConverter();

  const handleConvert = () => {
    convert(fromCurrency, toCurrency, amount);
    setLastUpdate(new Date().toLocaleString("en-US"));
  };

  // دالة لتنسيق الرقم بدون أصفار زيادة
  const formatNumber = (num: number) => {
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 4,
    });
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md text-center">
        <h2 className="text-4xl font-bold text-[#1E9CE0] mb-4">محول العملات</h2>

        {/* إدخال الرقم */}
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="border rounded-lg p-2 w-full mb-3 text-center text-gray-500"
        />

        {/* العملة من */}
        <select
          className="form-select border rounded-lg p-2 w-full mb-3 text-gray-500"
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {Object.entries(currencyNames).map(([code, description]) => (
            <option key={code} value={code}>
              {description} ({code})
            </option>
          ))}
        </select>

        {/* العملة إلى */}
        <select
          className="form-select border rounded-lg p-2 w-full mb-3 text-gray-500"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {Object.entries(currencyNames).map(([code, description]) => (
            <option key={code} value={code}>
              {description} ({code})
            </option>
          ))}
        </select>

        {/* زر التحويل */}
        <button
          onClick={handleConvert}
          disabled={loading}
          className="bg-[#1E9CE0] text-white w-full py-2 rounded-lg mb-4 hover:bg-blue-600 transition disabled:bg-gray-400"
        >
          {loading ? "جاري التحويل..." : "تحويل"}
        </button>

        {/* النتيجة */}
        {error && <p className="text-red-500">{error}</p>}
        {result && (
          <div className="bg-gray-50 border rounded-lg p-4">
            <p className="text-lg font-semibold text-gray-700">
              كل {formatNumber(amount)}{" "}
              {currencyNames[result.fromCode] || result.fromCode} ={" "}
              {formatNumber(result.convertedAmount)}{" "}
              {currencyNames[result.toCode] || result.toCode}
            </p>
            <small className="text-gray-500">آخر تحديث: {lastUpdate}</small>
          </div>
        )}
      </div>
    </div>
  );
}
