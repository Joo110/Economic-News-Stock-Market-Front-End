// app/news/countries/[slug]/page.tsx
import CountryNews from '@/components/CountryNews';
import Adbanner from '@/components/AdBanner';
import Footer from '@/components/Footer';

type PageProps = {
  params: { slug: string };
};

export default async function CountryNewsPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* المحتوى الأساسي */}
      <main className="flex-grow p-6">
        <CountryNews slug={slug} />
        <Adbanner />
      </main>

      {/* الفوتر دايماً في الآخر */}
      <Footer />
    </div>
  );
}
