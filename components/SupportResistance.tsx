'use client';

import React, { useState } from 'react';

interface Item {
  name: string;
  price: number;
  change: number;
  updated: string;
  resistanceStatus: string;
}

const MOCK_DATA: Item[] = [
  { name: 'منازل', price: 58.3, change: 65.63, updated: '12:44 م', resistanceStatus: 'السعر أعلى من المقاومة الثانية' },
  { name: 'شمال الزور', price: 173, change: 18.49, updated: '12:44 م', resistanceStatus: 'السعر أعلى من المقاومة الثانية' },
  { name: 'ايفا فنادق', price: 804, change: -44.93, updated: '12:44 م', resistanceStatus: 'السعر أقل من الدعم الثاني' },
  { name: 'بيتك', price: 794, change: 8.17, updated: '12:44 م', resistanceStatus: 'السعر أعلى من المقاومة الثانية' },
  { name: 'متحدة', price: 185, change: -15.91, updated: '12:44 م', resistanceStatus: 'السعر أقل من الدعم الثاني' },
  // ممكن تضيف باقي البيانات هنا
];

export default function SupportResistance() {
  const [items, setItems] = useState<Item[]>([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleAdd = () => {
    if (items.length >= 6) {
      setError("لا يمكنك إضافة أكثر من 6 شركات");
      return;
    }

    const found = MOCK_DATA.find((x) => x.name.includes(input));
    if (found && !items.find((i) => i.name === found.name)) {
      setItems([...items, found]);
      setError('');
    } else {
      setError("الشركة غير موجودة أو مضافة مسبقاً");
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
          <h2 className="text-xl font-bold">الدعم والمقاومة</h2>
          <p className="text-sm opacity-90">اعرض الدعم والمقاومة اللحظية للشركات</p>
        </div>

        {/* filters */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="ابحث باسم الشركة"
                className="flex-1 rounded-lg border border-gray-200 px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-300"
              />
              <button
                onClick={handleAdd}
                className="bg-[#1E9CE0] hover:bg-sky-700 text-white px-4 py-2 rounded-lg"
              >
                إضافة
              </button>
            </div>
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
              لم يتم اختيار أي شركة بعد.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-right table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-sm text-gray-600">الشركة</th>
                    <th className="px-4 py-3 text-sm text-gray-600">آخر سعر</th>
                    <th className="px-4 py-3 text-sm text-gray-600">التغير ٪</th>
                    <th className="px-4 py-3 text-sm text-gray-600">الدعم والمقاومة اللحظية</th>
                    <th className="px-4 py-3 text-sm text-gray-600">آخر تحديث</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => (
                    <tr key={idx} className="odd:bg-white even:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-[#1E9CE0]">{item.name}</td>
                      <td className="px-4 py-3 text-gray-600">{item.price}</td>
                      <td
                        className={`px-4 py-3 ${
                          item.change >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {item.change >= 0 ? `+${item.change}%` : `${item.change}%`}
                      </td>
                      <td className="px-4 py-3 text-gray-600">{item.resistanceStatus}</td>
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