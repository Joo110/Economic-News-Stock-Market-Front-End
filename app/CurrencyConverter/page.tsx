// app/CompanyStatis/page.tsx
import React from "react";
import CurrencyConverter from "@/components/CurrencyConverter";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* المحتوى */}
      <main className="flex-grow p-8">
        <CurrencyConverter />
      </main>

      {/* الفوتر */}
      <Footer />
    </div>
  );
}
