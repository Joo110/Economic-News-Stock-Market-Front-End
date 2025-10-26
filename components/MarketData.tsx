"use client";

import React, { useEffect, useState } from "react";

interface MarketData {
  name: string;
  last: string;
  high: string;
  low: string;
  change: string;
  changePercent: string;
  time: string;
}

export default function MarketsTable() {
  const [markets, setMarkets] = useState<MarketData[]>([
    { name: "المؤشر العام", last: "10,833.59", high: "10,833.59", low: "10,752.43", change: "+70.14", changePercent: "+0.65%", time: "15:15:59" },
    { name: "مؤشر EGX 30", last: "35,576.42", high: "35,880.68", low: "35,449.52", change: "-278.84", changePercent: "-0.78%", time: "14:16:59" },
    { name: "داو جونز", last: "44,734.47", high: "44,890.84", low: "44,700.99", change: "-187.80", changePercent: "-0.42%", time: "16:32:04" },
    { name: "إس آند بي 500", last: "6,443.73", high: "6,449.49", low: "6,441.39", change: "-22.85", changePercent: "-0.35%", time: "16:33:34" },
    { name: "ناسداك", last: "21,647.26", high: "21,662.08", low: "21,627.13", change: "-65.88", changePercent: "-0.30%", time: "16:33:32" },
    { name: "يو اس سمال كاب 2000", last: "2,299.67", high: "2,300.20", low: "2,294.97", change: "-28.39", changePercent: "-1.22%", time: "16:33:33" },
    { name: "فيكس 500", last: "15.13", high: "15.39", low: "14.57", change: "+0.64", changePercent: "+4.42%", time: "16:33:31" },
    { name: "إس آند بي كندا", last: "27,932.85", high: "27,942.58", low: "27,916.19", change: "-60.58", changePercent: "-0.22%", time: "16:33:31" },
    { name: "مؤشر بوفيسبا", last: "135,736", high: "136,686", low: "135,631", change: "-951", changePercent: "-0.70%", time: "16:18:30" },
    { name: "S&P/BMV IPC", last: "58,101.43", high: "58,405.91", low: "58,078.17", change: "-376.14", changePercent: "-0.64%", time: "16:33:32" },
  ]);

  useEffect(() => {
    // لاحقًا ممكن تجيب البيانات من API
  }, []);

  return (
    <div className="w-full bg-white border rounded-lg shadow-sm overflow-x-auto p-4">
      {/* العنوان كبير وعلى اليمين */}
<h2 className="text-black text-4xl font-bold text-right mb-8">الأسواق</h2>

      <table className="min-w-full text-sm text-right">
        <thead className="bg-gray-100 text-gray-700 font-bold">
          <tr>
            <th className="px-4 py-2">الاسم</th>
            <th className="px-4 py-2">الأخير</th>
            <th className="px-4 py-2">عالي</th>
            <th className="px-4 py-2">منخفض</th>
            <th className="px-4 py-2">التغيير</th>
            <th className="px-4 py-2">التغيير %</th>
            <th className="px-4 py-2">الوقت</th>
          </tr>
        </thead>
        <tbody>
          {markets.map((market, index) => (
            <tr key={index} className="border-b hover:bg-gray-50 transition-all">
              <td className="px-4 py-2 font-medium text-gray-900">{market.name}</td>
              <td className="px-4 py-2 text-black">{market.last}</td>
              <td className="px-4 py-2 text-black">{market.high}</td>
              <td className="px-4 py-2 text-black">{market.low}</td>
              <td className={`px-4 py-2 text-black font-semibold ${market.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                {market.change}
              </td>
              <td className={`px-4 py-2 font-semibold ${market.changePercent.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                {market.changePercent}
              </td>
              <td className="px-4 py-2 text-black">{market.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
