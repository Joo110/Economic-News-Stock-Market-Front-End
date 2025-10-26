import IslamicNewsDetails from '@/components/IslamicNewsDetails';
import AdBanner from '@/components/AdBanner';
import Footer from '@/components/Footer';

export default function NewsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* المحتوى */}
      <main className="flex-grow p-6">
        <div className="max-w-5xl mx-auto">
          <IslamicNewsDetails />

          {/* إعلان تحت الخبر */}
            <AdBanner />
        </div>
      </main>

      {/* الفوتر */}
      <Footer />
    </div>
  );
}
