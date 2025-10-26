"use client";
import React, { useState } from "react";

export default function ProfilePage() {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [name, setName] = useState("Youssef Masoud");
  const [nickname, setNickname] = useState("Youssef Masoud");
  const [country, setCountry] = useState("");
  const [mobile, setMobile] = useState("");
  const [phone, setPhone] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [email, setEmail] = useState("youssefmasoud119@gmail.com");
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* العنوان الرئيسي */}
      <h1 className="text-3xl text-[#1E9CE0] font-bold mb-6">الصفحة الشخصية</h1>

      {/* المعلومات الشخصية */}
      <section className="bg-white shadow-md rounded-xl p-6 mb-6">
        <h2 className="text-xl text-gray-700 font-semibold mb-4">المعلومات الشخصية</h2>

        {/* صورة شخصية */}
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-500">الصورة الشخصية</label>
          <input
            type="file"
            onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-700"
          />
        </div>

        {/* الاسم */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-gray-600 font-medium">الاسم</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg p-2 text-gray-600"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-600">الاسم المستعار</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full border rounded-lg p-2 text-gray-600"
            />
          </div>
        </div>

        {/* الدولة ورقم الموبايل والهاتف */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block mb-2 font-medium text-gray-600">الدولة</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full border rounded-lg p-2 text-gray-600"
            >
              <option value="">اختر ...</option>
              <option value="eg">مصر</option>
              <option value="sa">السعودية</option>
              <option value="ae">الإمارات</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-600">رقم الموبايل</label>
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full border rounded-lg p-2 text-gray-600"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-600">رقم الهاتف</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded-lg p-2 text-gray-600"
            />
          </div>
        </div>

        {/* الوظيفة */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block mb-2 font-medium text-gray-600">نوع الوظيفة</label>
            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="w-full border rounded-lg p-2 text-gray-600"
            >
              <option value="">اختر ...</option>
              <option value="full">دوام كامل</option>
              <option value="part">دوام جزئي</option>
              <option value="freelance">عمل حر</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-600">المسمى الوظيفي</label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full border rounded-lg p-2 text-gray-600"
            />
          </div>
        </div>

        <button className="mt-6 px-6 py-2 rounded-lg bg-[#1E9CE0] text-white font-medium hover:bg-blue-700">
          حفظ التعديلات
        </button>
      </section>

      {/* تغيير البريد الإلكتروني */}
      <section className="bg-white shadow-md rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-600">تغيير البريد الإلكتروني</h2>

        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-600">البريد الإلكتروني الحالي</label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full border rounded-lg p-2 bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-600">البريد الإلكتروني الجديد</label>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="w-full border rounded-lg p-2 text-gray-600"
          />
        </div>

        <button className="px-6 py-2 rounded-lg bg-[#1E9CE0] text-white font-medium hover:bg-blue-700">
          حفظ التعديلات
        </button>
      </section>

      {/* تغيير كلمة المرور */}
      <section className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-600">تغيير كلمة المرور</h2>

        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-600">كلمة المرور</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg p-2 text-gray-600"
            placeholder="يجب ألا تقل عن 6 أحرف ولا تزيد عن 35"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-600">تأكيد كلمة المرور</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border rounded-lg p-2 text-gray-600"
          />
        </div>

        <button className="px-6 py-2 rounded-lg bg-[#1E9CE0] text-white font-medium hover:bg-blue-700">
          حفظ التعديلات
        </button>
      </section>
    </div>
  );
}