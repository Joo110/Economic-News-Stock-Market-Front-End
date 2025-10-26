// app/CompanyStatis/page.tsx
import React from "react";
import UserTable from "@/components/UserTable";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* المحتوى */}
      <main className="flex-grow p-8">
        <UserTable />
      </main>

      {/* الفوتر */}
      <Footer />
    </div>
  );
}