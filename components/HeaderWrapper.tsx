// components/HeaderWrapper.tsx
"use client";

import Header from "@/components/Header";
import AdBanner from "@/components/AdBanner";
import { useRef, useState, useEffect } from "react";

export default function HeaderWrapper({ children }: { children: React.ReactNode }) {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  return (
    <>
      <div
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-50 bg-white shadow-md"
      >
        {/* إعلان أعلى الصفحة */}
        <div className="px-4 py-2">
          <div className="rounded-lg overflow-hidden border mx-auto" style={{ maxWidth: "900px" }}>
<img
  src="/Images/لالا.jpg"
  alt="إعلان تجريبي"
  className="w-full h-[80px] object-cover"
/>

          </div>
        </div>

        {/* الهيدر */}
        <Header />
      </div>

      {/* تعويض التثبيت */}
      <main style={{ paddingTop: headerHeight }}>{children}</main>
    </>
  );
}
