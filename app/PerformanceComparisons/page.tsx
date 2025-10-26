// app/CompanyStatis/page.tsx
import React from 'react';
import PerformanceComparison from '@/components/PerformanceComparison';

export default function Page() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <PerformanceComparison />
    </main>
  );
}