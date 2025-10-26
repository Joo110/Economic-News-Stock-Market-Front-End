// app/news/islamic/page.tsx
import IslamicEconomyNews from '@/components/IslamicEconomyNews';
import Adbanner from '@/components/AdBanner';
import Footer from '@/components/Footer';

export default async function IslamicNewsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* المحتوى الأساسي */}
      <main className="flex-grow p-6">
        <IslamicEconomyNews />
        <Adbanner />
      </main>

      {/* الفوتر */}
      <Footer />
    </div>
  );
}
