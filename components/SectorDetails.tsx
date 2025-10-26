'use client';

import React from "react";

export interface Sector {
  name: string;
  changePercent: number;
  changeValue: number;
  value: number;
  code?: string;
  open?: number;
  prevClose?: number;
  high?: number;
  low?: number;
  volume?: number;
  indexValue?: number;
}

interface SectorDetailsProps {
  sector: Sector;
  onClose: () => void;
}

export default function SectorDetails({ sector, onClose }: SectorDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[600px] max-h-[85vh] overflow-y-auto text-right shadow-lg">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-bold mb-2">{sector.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="mt-2 space-y-2">
          <div className="flex justify-between">
            <span className="font-semibold">{sector.value?.toFixed(2)}</span>
            <span className="text-gray-700">القيمة</span>
          </div>
          <div className="flex justify-between">
            <span className={`font-semibold ${sector.changeValue >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {sector.changeValue}
            </span>
            <span className="text-gray-700">التغير (قيمة)</span>
          </div>
          <div className="flex justify-between">
            <span className={`font-semibold ${sector.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {sector.changePercent}%
            </span>
            <span className="text-gray-700">التغير (%)</span>
          </div>
        </div>

        <div className="mt-4 border-t pt-4 text-sm text-gray-700">
          <div className="flex justify-between mb-1"><span>فتح</span><span>{sector.open ?? '-'}</span></div>
          <div className="flex justify-between mb-1"><span>إغلاق سابق</span><span>{sector.prevClose ?? '-'}</span></div>
          <div className="flex justify-between mb-1"><span>أعلى</span><span>{sector.high ?? '-'}</span></div>
          <div className="flex justify-between"><span>أدنى</span><span>{sector.low ?? '-'}</span></div>
        </div>
      </div>
    </div>
  );
}
