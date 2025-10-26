'use client';

import React from 'react';
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts';

// ===== exported type =====
export interface Sector {
  name: string;
  code?: string;
  value?: number;
  changePercent?: number;
  changeValue?: number;
  open?: number;
  prevClose?: number;
  high?: number;
  low?: number;
  volume?: number;
  indexValue?: number;
}

// بيانات وهمية للشارت (يمكن تعديلها لاحقاً)
const mockChartData = [
  { time: '09:30', close: 2530.2, volume: 250 },
  { time: '09:32', close: 2530.0, volume: 150 },
  { time: '09:34', close: 2529.82, volume: 571 },
  { time: '09:36', close: 2529.8, volume: 120 },
  { time: '09:38', close: 2529.8, volume: 80 },
  { time: '10:00', close: 2529.8, volume: 100 },
  { time: '11:00', close: 2529.8, volume: 90 },
  { time: '12:00', close: 2529.8, volume: 70 },
  { time: '13:30', close: 2529.8, volume: 60 },
];

interface SectorDashboardProps {
  sector: Sector;
  onClose?: () => void;
}

/**
 * نوع لعناصر payload اللي بترجعها recharts للـ Tooltip
 * استخدمنا Record<string, unknown> بدل any علشان نتجنب استخدام any
 */
interface TooltipPayloadItem {
  dataKey?: string;
  value?: number | string;
  name?: string;
  payload?: Record<string, unknown>;
  color?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-300 rounded-lg p-3 shadow-lg text-right text-sm">
        <div className="mb-1 text-gray-600">{label}</div>
        <div className="flex flex-col space-y-1">
          {payload.map((entry, idx) => (
            <div key={idx}>
              {entry.dataKey === 'close' && (
                <span className="font-semibold text-blue-600">● إغلاق: {entry.value}</span>
              )}
              {entry.dataKey === 'volume' && (
                <span className="font-semibold text-green-600">● حجم التداول: {entry.value}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function SectorDashboard({ sector, onClose }: SectorDashboardProps) {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-[#1E9CE0] text-white p-4 flex justify-between items-center">
          <div className="text-right">
            <h1 className="text-xl font-bold">
              {sector.name} {sector.code ? `(${sector.code})` : ''}
            </h1>
            <div className="text-sm text-gray-200">{sector.indexValue ?? ''}</div>
          </div>

          {onClose && (
            <button onClick={onClose} className="bg-red-500 text-white px-3 py-1 rounded text-sm">
              إغلاق
            </button>
          )}
        </div>

        <div className="p-6">
          {/* Top stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="text-right">
              <div className="text-3xl font-bold text-red-600">
                {sector.value?.toLocaleString(undefined, { maximumFractionDigits: 2 }) ?? '—'}
              </div>
              <div className="flex justify-end gap-4 mt-2">
                <div
                  className={`font-semibold ${
                    (sector.changeValue ?? 0) >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {sector.changeValue ?? '—'}
                </div>
                <div
                  className={`font-semibold ${
                    (sector.changePercent ?? 0) >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {sector.changePercent ?? '—'}%
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b text-gray-700 pb-2">
                  <span className="font-semibold">{sector.open ?? '—'}</span>
                  <span className="text-gray-700">فتح</span>
                </div>
                <div className="flex justify-between items-center border-b text-gray-700 pb-2">
                  <span className="font-semibold">{sector.prevClose ?? '—'}</span>
                  <span className="text-gray-700">إغلاق سابق</span>
                </div>
                <div className="flex justify-between items-center border-b text-gray-700 pb-2">
                  <span className="font-semibold">{sector.high ?? '—'}</span>
                  <span className="text-gray-700">أعلى</span>
                </div>
                <div className="flex justify-between items-center text-gray-700">
                  <span className="font-semibold">{sector.low ?? '—'}</span>
                  <span className="text-gray-700">أدنى</span>
                </div>
              </div>

              <div className="mt-6 space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>حجم التداول</span>
                  <span>{sector.volume ?? '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span>قيمة التداول</span>
                  <span>{((sector.value ?? 0) * 1000).toLocaleString()}</span>
                </div>
                <div className="mt-3 text-xs text-gray-500">جميع البيانات تجريبية (mock)</div>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <ResponsiveContainer width="100%" height={350}>
              <ComposedChart data={mockChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <YAxis
                  yAxisId="left"
                  domain={[2529.6, 2530.4]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  tickFormatter={(v) => (typeof v === 'number' ? v.toFixed(1) : String(v))}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  domain={[0, 600]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="close"
                  stroke="#22d3ee"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: '#22d3ee' }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="volume"
                  stroke="#0f766e"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: '#0f766e' }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}