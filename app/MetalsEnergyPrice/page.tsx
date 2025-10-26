import MetalsEnergyPrices from "@/components/MetalsEnergyPrices";
import Adbanner from '@/components/AdBanner';
import Footer from '@/components/Footer';

export default function MetalsEnergyPrice() {
 return (
    <div className="flex flex-col min-h-screen bg-gray-50">

        <MetalsEnergyPrices />
      {/* الفوتر */}
      <Footer />
    </div>
  );}