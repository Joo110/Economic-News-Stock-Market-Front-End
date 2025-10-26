// app/CompanyStatis/page.tsx
import React from 'react';
import CompanyStats from '@/components/CompanyStats';

export default function Page() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <CompanyStats />
    </main>
  );
}