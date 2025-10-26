// app/CompanyStatis/page.tsx
import React from 'react';
import FinancialIndicator from '@/components/FinancialIndicators';

export default function Page() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <FinancialIndicator />
    </main>
  );
}