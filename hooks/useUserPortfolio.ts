import { useState } from "react";
import api from "@/lib/api";

interface ApiResponse<T> {
  status: number;
  message?: string;
  data?: T;
}

export interface AddAssetRequest {
  id: number;
  userID: string;
  currencyCode: string;
  currentRate: number;
  amount: number;
  buyPrice: number;
  buyDate: string;
}

export interface UserPortfolioDto {
  id: number;
  userID: string;
  currencyCode: string;
  currentRate: number;
  amount: number;
  buyPrice: number;
  buyDate: string;
}

export function useUserPortfolio() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const addAsset = async (asset: AddAssetRequest) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const res = await api.post<ApiResponse<UserPortfolioDto>>(
        "/api/UserPortfolio/add",
        asset
      );

      if (res.data.status === 200) {
        setSuccess("✅ تم إضافة الأصل بنجاح");
      } else {
        setError(res.data.message || "❌ فشل في إضافة الأصل");
      }

      return res.data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("❌ خطأ أثناء الإضافة");
      }
    } finally {
      setLoading(false);
    }
  };

  const getWallet = async (): Promise<UserPortfolioDto[]> => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.get<ApiResponse<UserPortfolioDto[]>>(
        "/api/UserPortfolio/me"
      );

      if (res.data.status === 200 && res.data.data) {
        return res.data.data;
      } else {
        setError(res.data.message || "❌ فشل تحميل المحفظة");
        return [];
      }
    } catch (err) {
      console.error(err);
      setError("❌ خطأ أثناء تحميل المحفظة");
      return [];
    } finally {
      setLoading(false);
    }
  };

  // 🆕 هنا الفانكشن بتاعة المسح
  const deleteAsset = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const res = await api.delete<ApiResponse<null>>(
        `/api/UserPortfolio/${id}`
      );

      if (res.data.status === 200) {
        setSuccess("🗑️ تم حذف الأصل بنجاح");
      } else {
        setError(res.data.message || "❌ فشل في حذف الأصل");
      }

      return res.data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("❌ خطأ أثناء الحذف");
      }
    } finally {
      setLoading(false);
    }
  };

  return { addAsset, getWallet, deleteAsset, loading, error, success };
}
