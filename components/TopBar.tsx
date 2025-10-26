'use client';
import { useEffect, useState } from 'react';
import Link from "next/link";
import Cookies from "js-cookie";

export default function TopBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token"); // جبت التوكن من الكوكيز
    setIsLoggedIn(!!token); // لو فيه قيمة يبقى LoggedIn
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    setIsLoggedIn(false);
    window.location.href = "/"; // رجّع المستخدم للصفحة الرئيسية
  };

  const dateStr = new Intl.DateTimeFormat('ar-EG', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  return (
    <div className="w-full bg-white border-b border-gray-200 font-cairo">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-6">

          {/* التاريخ */}
          <div className="flex-1 text-right text-sm text-gray-600">
            {dateStr}
          </div>

          {/* النص بدل اللوجو */}
          <div className="flex-1 flex flex-col items-center justify-center leading-none select-none">
            <h1 className="text-[52px] font-extrabold tracking-tight" style={{ color: '#1E9CE0' }}>
              الاقتصادية
            </h1>
            <p className="text-gray-500 text-lg mt-1">
              مصدرُك للأخبار والاقتصاد والأعمال
            </p>
          </div>

          {/* زر تسجيل / خروج */}
          <div className="flex-1 flex justify-end">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="px-6 py-2 rounded-full text-white font-bold transition duration-200 hover:opacity-90"
                style={{ backgroundColor: '#1E9CE0' }}
              >
                خروج
              </button>
            ) : (
              <Link
                href="/login"
                className="px-6 py-2 rounded-full text-white font-bold transition duration-200 hover:opacity-90"
                style={{ backgroundColor: '#1E9CE0' }}
              >
                تسجيل
              </Link>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}