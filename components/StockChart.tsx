"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const data = [
  { time: "10:00", value: 1946 },
  { time: "11:00", value: 1945 },
  { time: "12:00", value: 1943 },
  { time: "13:00", value: 1944 },
];

export default function BHBXStockChart() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Header with tabs */}
      <div className="flex bg-[color:#1E9CE0] text-white text-sm">
        <div className="px-4 py-2 bg-[color:#1E9CE0]">معلومات وبطائق</div>
        <div className="px-4 py-2">العمليات</div>
        <div className="px-4 py-2">العربية</div>
        <div className="px-4 py-2">البحرين</div>
      </div>

      <div className="p-4">
        {/* Stock header */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-800">BHBX</h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-2xl font-bold text-gray-800">1,939.73</span>
            <span className="text-green-600 font-medium">1.84</span>
            <span className="text-green-600 font-medium">0.09%</span>
          </div>
        </div>

        {/* Chart container */}
        <div className="h-48 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: 50, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E9CE0" />
              <XAxis
                dataKey="time"
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 13,
                  fill: "#000",
                  fontWeight: "bold",
                  textAnchor: "start", // يخليهم على الشمال
                }}
                interval={0}
                tickMargin={10}
              />
              <YAxis
                domain={[1940, 1950]}
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 13,
                  fill: "#000",
                  fontWeight: "bold",
                  textAnchor: "start", // يخليهم على الشمال
                }}
                tickCount={4}
                width={50}
                tickMargin={10}
              />
              <Bar
                dataKey="value"
                fill="#1E9CE0"
                radius={[2, 2, 0, 0]}
                stroke="#4ECDC4"
                strokeWidth={1}
                maxBarSize={60}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-4 text-center">
          <div>
            <div className="text-gray-600 text-sm">عدد العمليات</div>
            <div className="font-bold text-lg text-black">56</div>
          </div>
          <div>
            <div className="text-gray-600 text-sm">قيمة التداول</div>
            <div className="font-bold text-lg text-black">500,779</div>
          </div>
          <div>
            <div className="text-gray-600 text-sm">حجم التداول</div>
            <div className="font-bold text-lg text-black">1,160,422</div>
          </div>
        </div>

        {/* Status indicators */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="w-8 h-2 bg-red-500 mx-auto mb-1"></div>
            <div className="text-sm text-gray-600">الخاسرة</div>
            <div className="font-bold">2</div>
          </div>
          <div className="text-center">
            <div className="w-8 h-2 bg-gray-400 mx-auto mb-1"></div>
            <div className="text-sm text-gray-600">الثابتة</div>
            <div className="font-bold">3</div>
          </div>
          <div className="text-center">
            <div className="w-8 h-2 bg-green-500 mx-auto mb-1"></div>
            <div className="text-sm text-gray-600">الرابحة</div>
            <div className="font-bold">4</div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="bg-gray-100 p-3 rounded">
          <div className="flex justify-between items-center">
            <span className="font-medium">الشركات المتداولة : 9</span>
            <span className="text-sm text-gray-600">آخر تحديث 01:00 ص</span>
          </div>
        </div>
      </div>
    </div>
  );
}
