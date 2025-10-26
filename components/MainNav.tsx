'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { FaSearch, FaChevronDown, FaHome } from 'react-icons/fa';

const items = [
  { name: 'الرئيسية', href: '/Homescreen', type: 'Homescreen' },
  { name: 'الأسواق', href: '/markets', type: 'markets' },
  { name: 'الأخبار', href: '/news', type: 'news' },
  { name: 'أدوات التحليل', href: '/analysis-tools', type: 'analysis' },
  { name: 'الاقتصاد الإسلامي', href: '/IslamicEconomyNews' },
  { name: 'المعادن والطاقة', href: '/MetalsEnergyPrice' },
  { name: 'الأعضاء', href: '/UserTable', type: 'UserTable' },
  { name: 'شخصي', href: '/personal', type: 'profile' },
];

const markets = [
  { name: 'سوق الأسهم السعودي', href: '/markets/saudi' },
  { name: 'البورصة المصرية', href: '/markets' },
  { name: 'سوق دبي المالي', href: '/markets/dubai' },
  { name: 'سوق أبوظبي', href: '/markets/abudhabi' },
  { name: 'بورصة البحرين', href: '/markets/bahrain' },
  { name: 'بورصة قطر', href: '/markets/qatar' },
  { name: 'سوق مسقط', href: '/markets/muscat' },
  { name: 'سوق الكويت', href: '/markets/kuwait' },
  { name: 'بورصة عمان', href: '/markets/oman' },
  { name: 'سوق الدار البيضاء', href: '/markets/casablanca' },
  { name: 'بورصة تونس', href: '/markets/tunisia' },
  { name: 'سوق فلسطين', href: '/markets/palestine' },
  { name: 'سوق العراق', href: '/markets/iraq' },
  { name: 'مؤشرات الأسواق العالمية', href: '/markets/world-indices' },
  { name: 'أسعار العملات', href: '/CurrencyPrices' },
];

const newsCategories = [
  {
    title: 'أخبار الدول',
    items: [
      { name: 'مصر', href: '/new/countries/egypt' },
      { name: 'السعودية', href: '/news/countries/saudi' },
      { name: 'الإمارات', href: '/news/countries/uae' },
      { name: 'البحرين', href: '/news/countries/bahrain' },
      { name: 'قطر', href: '/news/countries/qatar' },
      { name: 'عمان', href: '/news/countries/oman' },
      { name: 'الكويت', href: '/news/countries/kuwait' },
      { name: 'الأردن', href: '/news/countries/jordan' },
      { name: 'المغرب', href: '/news/countries/morocco' },
      { name: 'تونس', href: '/news/countries/tunisia' },
      { name: 'فلسطين', href: '/news/countries/palestine' },
      { name: 'العراق', href: '/news/countries/iraq' },
    ],
  },
  {
    title: 'أخبار إقليمية',
    items: [
      { name: 'الخليج', href: '/news/regions/gulf' },
      { name: 'الشام', href: '/news/regions/lebanon-syria' },
      { name: 'شمال أفريقيا', href: '/news/regions/north-africa' },
      { name: 'الشرق الأوسط', href: '/news/regions/middle-east' },
    ],
  },
  {
    title: 'أخبار عالمية',
    items: [
      { name: 'اقتصاد عالمي', href: '/news/world/economy' },
      { name: 'أحداث عالمية', href: '/news/world/events' },
      { name: 'السوق الأمريكي', href: '/news/world/us-market' },
      { name: 'نفط ومعادن', href: '/news/world/oil-minerals' },
      { name: 'عملات', href: '/news/world/currencies' },
      { name: 'تقارير عالمية', href: '/news/world/reports' },
    ],
  },
];

const analysisTools = [
  { name: 'إحصائيات الشركات', href: '/CompanyStatis' },
  { name: 'المؤشرات الفنية', href: '/TechnicalIndicatorsProp' },
  { name: 'مقارنة الأداء', href: '/PerformanceComparisons' },
  { name: 'دعم/مقاومة', href: '/SupportResistances' },
  { name: 'مراقب السيولة', href: '/LiquidityMonitors' },
  { name: 'المؤشرات المالية', href: '/FinancialIndicator' },
];

// 👤 Profile Sections (زي الأسواق والأخبار)
const profileSections = [
  {
    title: 'إعداداتي',
    items: [
      { name: 'تنبيهات', href: '/AlertsManager' },
      { name: 'محفظتي', href: '/Wallet' },
    ],
  },
  {
    title: 'الحساب',
    items: [
      { name: 'تسجيل الخروج', href: '/logout' },
    ],
  },
];

export default function MainNav() {
  const [isMarketsOpen, setIsMarketsOpen] = useState(false);
  const [isNewsOpen, setIsNewsOpen] = useState(false);
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  const toggleMarkets = () => {
    setIsMarketsOpen((s) => {
      const next = !s;
      if (next) {
        setIsNewsOpen(false);
        setIsAnalysisOpen(false);
        setIsProfileOpen(false);
      }
      return next;
    });
  };
  const toggleNews = () => {
    setIsNewsOpen((s) => {
      const next = !s;
      if (next) {
        setIsMarketsOpen(false);
        setIsAnalysisOpen(false);
        setIsProfileOpen(false);
      }
      return next;
    });
  };
  const toggleAnalysis = () => {
    setIsAnalysisOpen((s) => {
      const next = !s;
      if (next) {
        setIsMarketsOpen(false);
        setIsNewsOpen(false);
        setIsProfileOpen(false);
      }
      return next;
    });
  };
  const toggleProfile = () => {
    setIsProfileOpen((s) => {
      const next = !s;
      if (next) {
        setIsMarketsOpen(false);
        setIsNewsOpen(false);
        setIsAnalysisOpen(false);
      }
      return next;
    });
  };

  useEffect(() => {
    function handleDocClick(e: MouseEvent) {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target as Node)) {
        setIsMarketsOpen(false);
        setIsNewsOpen(false);
        setIsAnalysisOpen(false);
        setIsProfileOpen(false);
      }
    }
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsMarketsOpen(false);
        setIsNewsOpen(false);
        setIsAnalysisOpen(false);
        setIsProfileOpen(false);
      }
    }
    document.addEventListener('click', handleDocClick);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('click', handleDocClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <nav className="w-full bg-[#1E9CE0] relative" ref={navRef}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <ul className="flex items-center gap-8 text-white font-bold text-lg tracking-wide">
            {items.map((it) => (
              <li key={it.name} className="relative">
                {['markets', 'news', 'analysis', 'profile'].includes(it.type || '') ? (
                  <div
                    className="flex items-center gap-1 cursor-pointer hover:underline hover:decoration-white hover:underline-offset-4 select-none"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (it.type === 'markets') toggleMarkets();
                      if (it.type === 'news') toggleNews();
                      if (it.type === 'analysis') toggleAnalysis();
                      if (it.type === 'profile') toggleProfile();
                    }}
                  >
                    {it.name}
                    <FaChevronDown
                      className={`text-xs mt-1 transition-transform duration-200 ${
                        (it.type === 'markets' && isMarketsOpen) ||
                        (it.type === 'news' && isNewsOpen) ||
                        (it.type === 'analysis' && isAnalysisOpen) ||
                        (it.type === 'profile' && isProfileOpen)
                          ? 'rotate-180'
                          : ''
                      }`}
                    />
                  </div>
                ) : (
                  <Link
                    href={it.href}
                    className="hover:underline hover:decoration-white hover:underline-offset-4"
                  >
                    {it.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* الأسواق */}
       {/* شاشة الأسواق */}
      {isMarketsOpen && (
        <div className="w-full bg-white shadow-lg absolute top-full left-0 z-50 py-8 px-4 border-t border-gray-200">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="col-span-1">
              <h3 className="text-lg font-bold text-[#1E9CE0] mb-2">أسواقنا</h3>
              <ul>
                {markets.slice(0, 5).map((m) => (
                  <li key={m.name}>
                    <Link href={m.href} className="block py-1 text-gray-800 hover:text-[#1E9CE0]">
                      {m.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-1">
              <h3 className="text-lg font-bold text-[#1E9CE0] mb-2">أسواق الخليج</h3>
              <ul>
                {markets.slice(5, 9).map((m) => (
                  <li key={m.name}>
                    <Link href={m.href} className="block py-1 text-gray-800 hover:text-[#1E9CE0]">
                      {m.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-1">
              <h3 className="text-lg font-bold text-[#1E9CE0] mb-2">أسواق عربية أخرى</h3>
              <ul>
                {markets.slice(9, 13).map((m) => (
                  <li key={m.name}>
                    <Link href={m.href} className="block py-1 text-gray-800 hover:text-[#1E9CE0]">
                      {m.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-1">
              <h3 className="text-lg font-bold text-[#1E9CE0] mb-2">أسواق عالمية</h3>
              <ul>
                {markets.slice(13, 16).map((m) => (
                  <li key={m.name}>
                    <Link href={m.href} className="block py-1 text-gray-800 hover:text-[#1E9CE0]">
                      {m.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* شاشة الأخبار (محدّثة بالبيانات الجديدة من الصورة) */}
      {isNewsOpen && (
        <div className="w-full bg-white shadow-lg absolute top-full left-0 z-50 py-8 px-4 border-t border-gray-200">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newsCategories.map((cat) => (
              <div key={cat.title} className="col-span-1">
                <h3 className="text-lg font-bold text-[#1E9CE0] mb-2">{cat.title}</h3>
                <ul>
                  {cat.items.map((it) => (
                    <li key={it.name}>
                      <Link href={it.href} className="block py-1 text-gray-800 hover:text-[#1E9CE0]">
                        {it.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* عمود إضافي للروابط المهمة (كما قبل) */}
            <div className="col-span-1">
              <h3 className="text-lg font-bold text-[#1E9CE0] mb-2">روابط مهمة</h3>
              <ul>
                <li>
                  <Link href="/news/latest" className="block py-1 text-gray-800 hover:text-[#1E9CE0]">
                    آخر الأخبار الاقتصادية
                  </Link>
                </li>
                <li>
                  <Link href="/news/analysis" className="block py-1 text-gray-800 hover:text-[#1E9CE0]">
                    تحليلات ووجهات نظر
                  </Link>
                </li>
                <li>
                  <Link href="/news/interviews" className="block py-1 text-gray-800 hover:text-[#1E9CE0]">
                    لقاءات ومقابلات
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}


      {/* أدوات التحليل */}
      {isAnalysisOpen && (
        <div className="w-full bg-white shadow-lg absolute top-full left-0 z-50 py-8 px-4 border-t border-gray-200">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {analysisTools.map((tool) => (
              <div key={tool.name} className="col-span-1">
                <Link href={tool.href} className="block py-2 text-gray-800 hover:text-[#1E9CE0] font-medium">
                  {tool.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 👤 شخصي */}
      {isProfileOpen && (
        <div className="w-full bg-white shadow-lg absolute top-full left-0 z-50 py-8 px-4 border-t border-gray-200">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
            {profileSections.map((section) => (
              <div key={section.title} className="col-span-1">
                <h3 className="text-lg font-bold text-[#1E9CE0] mb-2">{section.title}</h3>
                <ul>
                  {section.items.map((p) => (
                    <li key={p.name}>
                      <Link href={p.href} className="block py-1 text-gray-800 hover:text-[#1E9CE0]">
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}




