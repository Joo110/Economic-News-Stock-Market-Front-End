'use client';

import { useParams, useRouter } from 'next/navigation';
import SectorDashboard, { Sector } from '@/components/SectorDashboard';
import React from 'react';
import NewsSection from '@/components/NewsSection';
import AdBanner from '@/components/AdBanner';
import Footer from '@/components/Footer';
import MarketCompanie from '@/components/MarketCompanies';

// بيانات تجريبية
const mockSectors: Sector[] = [
  {
    name: 'بنوك',
    code: 'BANK',
    value: 2910.21,
    changePercent: -0.77,
    changeValue: -22.72,
    open: 2932.93,
    prevClose: 2932.93,
    high: 2935.84,
    low: 2905.93,
    volume: 9787748,
    indexValue: 2910.21,
  },
  {
    name: 'موارد أساسية',
    code: 'BASIC',
    value: 3589.06,
    changePercent: 0.26,
    changeValue: 9.16,
  },
];

export default function SectorPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string | undefined;

  const sectorFound = mockSectors.find(
    (s) => encodeURIComponent(s.code ?? s.name.replace(/\s+/g, '-')) === id
  );

  // fallback
  const sectorToShow: Sector = sectorFound ?? mockSectors[0];

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">
      <SectorDashboard sector={sectorToShow} onClose={() => router.push('/')} />
        {/* عمود الأخبار */}
          <NewsSection />

          <MarketCompanie />
        {/* عمود الإعلان */}
        <div>
          <AdBanner imageUrl="/Images/FakeNews.png" />
          
        </div>
        <Footer />
      </div>
  );
}