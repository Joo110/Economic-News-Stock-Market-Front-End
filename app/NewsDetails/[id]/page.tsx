import NewsDetails from '@/components/NewsDetails';
import AdBanner from '@/components/AdBanner';
import Footer from '@/components/Footer';

export default function NewsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full max-w-4xl h-[150px] mb-40 mx-auto"> 
        <AdBanner />
      </div>
      
      <main className="flex-grow">
        <NewsDetails />
      </main>
      
      <Footer />
    </div>
  );
}
