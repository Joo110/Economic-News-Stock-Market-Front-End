"use client";
import React, { useState } from "react";
import { useCreateUser } from "@/hooks/useCreateUser";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { createUser, loading, error, success } = useCreateUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("كلمة المرور وتأكيدها غير متطابقين");
      return;
    }

    const newUser = {
  fullName: name,
  country: city,
  username: name,   // لو عايز اسم المستخدم = الاسم
  email: email,
  password: password,
};


    console.log("📌 إرسال بيانات المستخدم:", newUser);

    await createUser(newUser);
  };

  return (
    <div className="max-w-2xl w-full mx-auto p-8">
      <h1 className="text-4xl text-[#1E9CE0] font-bold mb-8 text-center">
        إنشاء حساب جديد
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8"
      >
        {/* الاسم */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700 text-lg">
            الاسم
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg p-3 text-gray-700 text-lg focus:ring-2 focus:ring-[#1E9CE0] outline-none"
            required
          />
        </div>

        {/* الايميل */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700 text-lg">
            البريد الإلكتروني
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg p-3 text-gray-700 text-lg focus:ring-2 focus:ring-[#1E9CE0] outline-none"
            required
          />
        </div>

        {/* المدينة */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700 text-lg">
            المدينة
          </label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border rounded-lg p-3 text-gray-700 text-lg focus:ring-2 focus:ring-[#1E9CE0] outline-none"
            required
          />
        </div>

        {/* كلمة المرور */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700 text-lg">
            كلمة المرور
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg p-3 text-gray-700 text-lg focus:ring-2 focus:ring-[#1E9CE0] outline-none"
            required
            minLength={6}
          />
        </div>

        {/* تأكيد كلمة المرور */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700 text-lg">
            تأكيد كلمة المرور
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border rounded-lg p-3 text-gray-700 text-lg focus:ring-2 focus:ring-[#1E9CE0] outline-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 px-6 py-3 rounded-lg bg-[#1E9CE0] text-white font-semibold text-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "⏳ جاري إنشاء الحساب..." : "إنشاء حساب"}
        </button>

        {/* رسائل النجاح/الخطأ */}
        {error && (
          <p className="mt-4 text-red-500 font-semibold text-center">{error}</p>
        )}
        {success && (
          <p className="mt-4 text-green-600 font-semibold text-center">
            {success}
          </p>
        )}
      </form>
    </div>
  );
}
