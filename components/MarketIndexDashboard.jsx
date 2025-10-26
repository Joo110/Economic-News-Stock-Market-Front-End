'use client';

import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

// البيانات الوهمية للمؤشر. استبدلها ببياناتك من الـ API
const initialIndexData = {
  name: 'مؤشر إي جي إكس 30 (EGX30)',
  value: 35576.42,
  change: -0.01,
  open: 35576.42,
  high: 35880.68,
  low: 35449.52,
  prevClose: 35576.42,
  volume: 134891536,
  turnover: 1309871232.00,
  lastUpdated: 'الخميس أغسطس 14',
};

// البيانات الوهمية للرسم البياني. استبدلها ببياناتك من الـ API
const initialChartData = [
  { time: '09:15', value: 35800 },
  { time: '09:30', value: 35700 },
  { time: '09:45', value: 35650 },
  { time: '10:15', value: 35850 },
  { time: '10:30', value: 35750 },
  { time: '12:00', value: 35500 },
  { time: '12:15', value: 35450 },
  { time: '12:45', value: 35550 },
  { time: '13:00', value: 35500 },
  { time: '13:15', value: 35576.42 },
];

export default function MarketIndexDashboard() {
  const [indexData, setIndexData] = useState(initialIndexData);
  const [chartData, setChartData] = useState(initialChartData);
  const isPositiveChange = indexData.change >= 0;

  //
  //
  // === هنا يمكنك إضافة كود جلب البيانات من الـ API ===
  // يمكنك استخدام useEffect لجلب البيانات عند تحميل المكون
  // مثال:
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch('/api/market-data');
  //     const data = await response.json();
  //     setIndexData(data.index);
  //     setChartData(data.chart);
  //   };
  //   fetchData();
  // }, []);
  //
  //
  //

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  return (
<div className="bg-white rounded-lg shadow-lg p-6 max-w-6xl mx-auto my-10 border border-gray-200 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[#1E9CE0]">{indexData.name}</h2>
        <span className="text-gray-500 text-sm">{indexData.lastUpdated}</span>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-50 p-4 rounded-md text-center">
          <p className="text-xl text-gray-700">القيمة الحالية</p>
          <p className={`text-4xl font-bold mt-2 ${isPositiveChange ? 'text-green-600' : 'text-red-600'}`}>
            {formatNumber(indexData.value)}
          </p>
          <p className={`flex items-center justify-center mt-1 text-sm ${isPositiveChange ? 'text-green-600' : 'text-red-600'}`}>
            {isPositiveChange ? <FaArrowUp className="ml-1" /> : <FaArrowDown className="ml-1" />}
            {indexData.change > 0 ? `+${indexData.change}` : indexData.change}%
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-md">
          <ul className="text-gray-700 text-sm space-y-2">
            <li className="flex justify-between">
              <span>فتح</span>
              <span>{formatNumber(indexData.open)}</span>
            </li>
            <li className="flex justify-between">
              <span>إغلاق سابق</span>
              <span>{formatNumber(indexData.prevClose)}</span>
            </li>
            <li className="flex justify-between">
              <span>أعلى</span>
              <span className="text-green-600">{formatNumber(indexData.high)}</span>
            </li>
            <li className="flex justify-between">
              <span>أدنى</span>
              <span className="text-red-600">{formatNumber(indexData.low)}</span>
            </li>
          </ul>
        </div>
        <div className="bg-gray-50 p-4 rounded-md">
          <ul className="text-gray-700 text-sm space-y-2">
            <li className="flex justify-between">
              <span>حجم التداول</span>
              <span>{indexData.volume.toLocaleString()}</span>
            </li>
            <li className="flex justify-between">
              <span>قيمة التداول</span>
              <span>{indexData.turnover.toLocaleString()}</span>
            </li>
            <li className="text-xs text-gray-500 mt-2">جميع البيانات متأخرة 15 دقيقة أثناء الجلسة</li>
          </ul>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="time" tick={{ fill: '#6b7280' }} />
            <YAxis tick={{ fill: '#6b7280' }} domain={['dataMin', 'dataMax']} />
            <Tooltip
              labelFormatter={(label) => `الوقت: ${label}`}
              formatter={(value, name) => [`${formatNumber(value)}`, 'القيمة']}
              labelStyle={{ color: '#000' }}
            />
            <Line type="monotone" dataKey="value" stroke="#1E9CE0" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}