// app/CompanyStatis/page.tsx
import React from "react";
import Wallet from "@/components/Wallet";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* المحتوى */}
      <main className="flex-grow p-8">
        <Wallet />
      </main>

      {/* الفوتر */}
      <Footer />
    </div>
  );
}