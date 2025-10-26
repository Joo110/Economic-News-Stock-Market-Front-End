'use client';
import React, { useState } from 'react';

const MOCK_DATA: { [key: string]: number[] } = {
  "MANAZEL": [35.2, 36.5, 37.1, 36.9, 37.5, 38.0, 37.8, 38.2, 38.5, 39.0, 38.7, 39.2, 39.5, 40.0, 40.2, 40.5],
  "ZIN": [120, 122, 121, 123, 125, 126, 124, 127, 128, 129, 130, 131, 132, 133, 134, 135],
  "EIVA": [800, 805, 803, 808, 810, 812, 815, 817, 820, 822, 825, 823, 827, 829, 830, 832],
  "BAYT": [790, 792, 795, 798, 800, 803, 805, 807, 810, 812, 815, 817, 820, 822, 825, 828],
  "MUTAHIDA": [180, 182, 181, 183, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196],
  "SAHLIYA": [400, 398, 395, 393, 390, 388, 387, 385, 382, 380, 378, 376, 374, 373, 371, 370]
};

export default function TechnicalIndicatorsInteractive() {
  const [symbol, setSymbol] = useState('');
  const [closes, setCloses] = useState<number[]>([]);

  const handleFetchData = () => {
    const data = MOCK_DATA[symbol.toUpperCase()];
    if (data) setCloses(data);
    else setCloses([]);
  };

  // الحسابات زي المثال اللي قبل كده
  const period = 14;
  const calculateMA = (closes: number[], period: number) => closes.length < period ? 0 : closes.slice(-period).reduce((a,b)=>a+b,0)/period;
  const calculateRSI = (closes: number[], period: number) => {
    if(closes.length < period+1) return 0;
    let gain=0, loss=0;
    for(let i=closes.length-period; i<closes.length; i++){
      const change = closes[i]-closes[i-1];
      if(change>0) gain+=change; else loss-=change;
    }
    if(loss===0) return 100;
    return 100 - 100/(1+gain/loss);
  };
  const calculateEMA = (closes:number[], period:number) => {
    if(closes.length<period) return 0;
    const k=2/(period+1);
    let ema=closes.slice(0,period).reduce((a,b)=>a+b,0)/period;
    for(let i=period;i<closes.length;i++) ema=closes[i]*k + ema*(1-k);
    return ema;
  };
  const calculateMACD = (closes:number[]) => calculateEMA(closes,12)-calculateEMA(closes,26);

  const ma = calculateMA(closes, period).toFixed(2);
  const rsi = calculateRSI(closes, period).toFixed(2);
  const macd = calculateMACD(closes).toFixed(2);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-2xl border border-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-[#1E9CE0]">المؤشرات الفنية</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="ادخل رمز السهم (مثال: MANAZEL)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2 text-gray-600"
        />
        <button onClick={handleFetchData} className="bg-[#1E9CE0] text-white px-4 py-2 rounded-lg">
          احسب
        </button>
      </div>

      {closes.length>0 ? (
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4 border rounded-lg">
            <p className="text-gray-600 font-medium">MA ({period})</p>
            <p className="text-gray-800 text-lg">{ma}</p>
          </div>
          <div className="p-4 border rounded-lg">
            <p className="text-gray-600 font-medium">RSI ({period})</p>
            <p className="text-gray-800 text-lg">{rsi}</p>
          </div>
          <div className="p-4 border rounded-lg">
            <p className="text-gray-600 font-medium">MACD</p>
            <p className="text-gray-800 text-lg">{macd}</p>
          </div>
        </div>
      ) : <p className="text-center text-gray-500 mt-4">ادخل رمز سهم صحيح لعرض المؤشرات</p>}
    </div>
  );
}
