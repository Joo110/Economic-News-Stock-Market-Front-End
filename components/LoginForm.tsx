'use client';

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks/useLogin";

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const loginMutation = useLogin();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    setSuccessMessage(null);

    try {
      const response = await loginMutation.mutateAsync({
        email: emailOrUsername,
        password,
      });

      console.log("🔑 Login response:", response);

      setSuccessMessage("✅ تم تسجيل الدخول بنجاح");
      setTimeout(() => router.push("/"), 1500);
    } catch (err) {
      if (err instanceof Error) setFormError(err.message);
      else setFormError("❌ فشل تسجيل الدخول");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center font-cairo">
      <div className="bg-white p-10 shadow-lg rounded-lg w-[420px]">
        {/* لوجو */}
        <div className="text-center mb-6">
          <img
            src="/Images/IconLogin.png"
            alt="شعار الموقع"
            className="mx-auto"
            style={{ width: "160px" }}
          />
        </div>

        {/* عنوان */}
        <h2 className="text-center text-black text-3xl font-bold mb-3">أهلاً بك</h2>
        <p className="text-center text-black text-lg mb-6">
          من فضلك قم بتسجيل الدخول
        </p>

        {/* رسالة خطأ / نجاح */}
        {formError && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-base text-center">
            {formError}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-base text-center">
            {successMessage}
          </div>
        )}

        {/* الفورم */}
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <label className="block mb-2 text-black text-lg font-semibold">
              البريد الإلكتروني أو اسم المستخدم
            </label>
            <input
              type="text"
              required
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              className="w-full border rounded px-4 py-3 text-lg outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="اكتب البريد أو اسم المستخدم"
            />
          </div>

          <div>
            <label className="block mb-2 text-lg text-black font-semibold flex justify-between">
              كلمة المرور
              <span
                className="cursor-pointer text-[#1E9CE0] text-sm"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "إخفاء" : "إظهار"}
              </span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded px-4 py-3 text-lg outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="اكتب كلمة المرور"
            />
          </div>

          {/* تذكرني */}
          <div className="flex items-center gap-2">
            <input type="checkbox" id="remember" className="cursor-pointer" />
            <label htmlFor="remember" className="text-base text-gray-600">
              تذكرني
            </label>
          </div>

          {/* زر تسجيل الدخول */}
          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full bg-[#1E9CE0] hover:bg-blue-500 text-white text-lg font-bold py-3 rounded transition disabled:opacity-60"
          >
            {loginMutation.isPending ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
          </button>
        </form>

        {/* نسيت كلمة المرور */}
        <div className="text-center mt-6">
          <button
            type="button"
            className="text-base text-[#1E9CE0] hover:underline"
            onClick={() => router.push("/forgot")}
          >
            هل نسيت كلمة المرور؟
          </button>
        </div>
      </div>
    </div>
  );
}