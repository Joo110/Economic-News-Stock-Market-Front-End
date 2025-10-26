import Market from '@/components/MarketIndexDashboard';
import MarketSectors from '@/components/MarketSectors';
import NewsSection from '@/components/NewsSection';
import AdBanner from '@/components/AdBanner';
import Footer from '@/components/Footer';

export default function EgyptMarketPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* الداشبورد الرئيسي */}

      <div className="max-w-7xl mx-auto p-4 flex-1">
        <Market />

        {/* قطاعات السوق */}
        <MarketSectors />

        {/* الأخبار */}
        <NewsSection />

        <AdBanner imageUrl="/Images/FakeNews.png" />
      </div>

      {/* الفوتر بعرض كامل */}
      <Footer />
    </div>
  );
}
