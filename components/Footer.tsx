"use client";

import React from 'react';
import { Facebook, Instagram, Linkedin, MessageCircle, Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* العمود الأول - النشرة الإلكترونية */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-right">إنضم إلى النشرة الإلكترونية</h3>
            <div className="flex mb-6">
              <input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                className="flex-1 px-3 py-2 text-white text-sm rounded-r-md border-none outline-none"
              />
              <button className="bg-[color:#1E9CE0] px-4 py-2 rounded-l-md">
                <span className="text-sm font-medium">إرسال</span>
              </button>
            </div>
            
            {/* أيقونات التواصل الاجتماعي */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-3 text-right">تابعنا على</h4>
              <div className="flex gap-3 justify-end">
                <div className="w-8 h-8 bg-gray-600 hover:bg-gray-500 rounded-full flex items-center justify-center cursor-pointer">
                  <MessageCircle size={16} />
                </div>
                <div className="w-8 h-8 bg-gray-600 hover:bg-gray-500 rounded-full flex items-center justify-center cursor-pointer">
                  <Send size={16} />
                </div>
                <div className="w-8 h-8 bg-gray-600 hover:bg-gray-500 rounded-full flex items-center justify-center cursor-pointer">
                  <Linkedin size={16} />
                </div>
                <div className="w-8 h-8 bg-gray-600 hover:bg-gray-500 rounded-full flex items-center justify-center cursor-pointer">
                  <Facebook size={16} />
                </div>
                <div className="w-8 h-8 bg-gray-600 hover:bg-gray-500 rounded-full flex items-center justify-center cursor-pointer">
                  <Instagram size={16} />
                </div>
                <div className="w-8 h-8 bg-gray-600 hover:bg-gray-500 rounded-full flex items-center justify-center cursor-pointer">
                  <span className="text-xs font-bold">X</span>
                </div>
              </div>
            </div>
          </div>

          {/* العمود الثاني - من نحن */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-right">من نحن</h3>
            <ul className="space-y-2 text-right">
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">فريق الإقتصادية</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">أرشيف الإقتصادية</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">سياسة الخصوصية</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">إدارة الكوكيز</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">إتصل بنا</a></li>
            </ul>
          </div>

          {/* العمود الثالث - التكنولوجيا */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-right">التكنولوجيا</h3>
            <ul className="space-y-2 text-right">
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">ريادة الأعمال</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">الرأي</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">الأخبار</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">الرياضة</a></li>
            </ul>
          </div>

          {/* العمود الرابع - الرئيسية */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-right">الرئيسية</h3>
            <ul className="space-y-2 text-right">
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">الأسواق</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">الشركات</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">الطاقة</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">العقارات</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* القسم السفلي */}
      <div className="bg-gray-800 py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* اللوغو */}
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold">الإقتصادية</h2>
            </div>

            {/* النص والحقوق */}
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm mb-2">
                حقوق النشر محفوظة © الإقتصادية. كل الحقوق محفوظة ويحتم استئذان وثيقة المستخدم
              </p>
              <a href="#" className="text-gray-400 text-sm hover:text-white">
                https://www.aleqt.com/contact
              </a>
            </div>

            {/* لوغو الشركة */}
            <div className="mt-4 md:mt-0">
              <div className="bg-black px-4 py-2 rounded">
                <span className="text-white font-bold text-lg">srmg</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;