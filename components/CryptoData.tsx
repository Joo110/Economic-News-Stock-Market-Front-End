"use client";

import { useCryptoCurrencies } from "@/hooks/useCryptoCurrencies";

export default function CryptoTable() {
  const { cryptos, loading, error } = useCryptoCurrencies();

  const formatNumber = (num: number) =>
    new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 2 }).format(num);

  const formatPrice = (num: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(num);

  if (loading) return <p className="text-center text-gray-600">⏳ جاري تحميل البيانات...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="bg-white border rounded-lg shadow-sm overflow-x-auto p-4">
      <h2 className="text-black text-3xl font-bold text-right mb-6">العملات الرقمية</h2>
      <table className="min-w-full text-sm text-right">
        <thead className="bg-gray-100 text-gray-700 font-bold">
          <tr>
            <th className="px-4 py-2">الاسم</th>
            <th className="px-4 py-2">السعر</th>
            <th className="px-4 py-2">تغير (24س)</th>
            <th className="px-4 py-2">تغير (7أيام)</th>
            <th className="px-4 py-2">القيمة السوقية</th>
            <th className="px-4 py-2">الحجم (24س)</th>
            <th className="px-4 py-2">المعروض</th>
          </tr>
        </thead>
        <tbody>
          {cryptos.map((crypto, index) => (
            <tr key={index} className="border-b hover:bg-gray-50 transition-all">
              <td className="px-4 py-2 font-medium text-gray-900">
                {crypto.name}{" "}
                <span className="text-gray-500 text-xs">
                  ({crypto.symbol?.toUpperCase() ?? crypto.coinId.toUpperCase()})
                </span>
              </td>
              <td className="px-4 py-2 text-black">{formatPrice(crypto.price)}</td>
              <td
                className={`px-4 py-2 font-semibold ${
                  crypto.change24h >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {crypto.change24h.toFixed(2)}%
              </td>
              <td
                className={`px-4 py-2 font-semibold ${
                  crypto.change7d >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {crypto.change7d.toFixed(2)}%
              </td>
              <td className="px-4 py-2 text-black">{formatNumber(crypto.marketCap)}</td>
              <td className="px-4 py-2 text-black">{formatNumber(crypto.volume24h)}</td>
              <td className="px-4 py-2 text-black">{formatNumber(crypto.supply)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
