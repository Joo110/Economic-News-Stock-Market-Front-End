// app/CompanyStatis/page.tsx
import React from 'react';
import LiquidityMonitor from '@/components/LiquidityMonitor';

export default function Page() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <LiquidityMonitor />
    </main>
  );
}