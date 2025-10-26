"use client";

import React, { useState, useEffect } from "react";
import { FaWallet, FaArrowUp, FaArrowDown, FaPlus, FaTrash } from "react-icons/fa";
import { useUserPortfolio, UserPortfolioDto } from "@/hooks/useUserPortfolio";
import { useCurrencies, ApiResponse } from "@/hooks/useCurrencies";
import currencyNames from "@/lib/currencyNames";
import Cookies from "js-cookie";

// ✅ Interface واضح للـ state
interface AssetForm {
  currencyCode: string;
  amount: number | null;
  buyPrice: number | null;
}

export default function Wallet() {
  const [wallet, setWallet] = useState<UserPortfolioDto[]>([]);
  const [newAsset, setNewAsset] = useState<AssetForm>({
    currencyCode: "",
    amount: null,
    buyPrice: null,
  });

  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { addAsset, getWallet, deleteAsset, loading, error, success } = useUserPortfolio();
  const { getCurrencyByCode } = useCurrencies();

  useEffect(() => {
    loadWallet();
  }, []);

  const loadWallet = async () => {
    const data = await getWallet();

    const updatedData = await Promise.all(
      data.map(async (asset) => {
        const currency = await getCurrencyByCode(asset.currencyCode);
        return currency
          ? { ...asset, currentRate: currency.data.rateToUSD }
          : { ...asset, currentRate: asset.currentRate ?? 0 };
      })
    );

    setWallet(updatedData);
  };

  const handleCurrencyChange = async (code: string) => {
    if (!code) {
      setNewAsset({ currencyCode: "", amount: null, buyPrice: null });
      return;
    }

    try {
      const response: ApiResponse = await getCurrencyByCode(code);
      const newBuyPrice = response?.data?.rateToUSD ?? 0;

      setNewAsset((prev) => ({
        ...prev,
        currencyCode: code,
        buyPrice: newBuyPrice,
      }));
    } catch (err) {
      console.error("خطأ في جلب سعر العملة:", err);
      setNewAsset((prev) => ({
        ...prev,
        currencyCode: code,
        buyPrice: 0,
      }));
    }
  };

  const handleAddAsset = async () => {
    if (!newAsset.currencyCode || !newAsset.amount || !newAsset.buyPrice) return;

    const token = Cookies.get("token");
    const payload = token ? JSON.parse(atob(token.split(".")[1])) : null;
    const userID = payload?.UserId || payload?.UserID || "";

    const currency = await getCurrencyByCode(newAsset.currencyCode);

    const assetToSend = {
      id: 0,
      userID,
      currencyCode: newAsset.currencyCode,
      currentRate: currency?.data.rateToUSD ?? newAsset.buyPrice,
      amount: newAsset.amount,
      buyPrice: newAsset.buyPrice,
      buyDate: new Date().toISOString(),
    };

    const result = await addAsset(assetToSend);
    if (result?.status === 200) {
      await loadWallet();
      setNewAsset({ currencyCode: "", amount: null, buyPrice: null });
    }
  };

  const requestDeleteAsset = (id: number) => {
    setDeleteId(id); // فتح المودال
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    const result = await deleteAsset(deleteId);
    if (result?.status === 200) {
      await loadWallet();
    }
    setDeleteId(null); // إغلاق المودال
  };

  const cancelDelete = () => {
    setDeleteId(null); // إغلاق المودال بدون حذف
  };

  const formatNumber = (num?: number) => {
    if (num === undefined || num === null || isNaN(num)) return "0.00";
    return Number(num).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const totalInvested = wallet.reduce((sum, a) => sum + (a.amount || 0) * (a.buyPrice || 0), 0);
  const totalCurrentValue = wallet.reduce((sum, a) => sum + (a.amount || 0) * (a.currentRate || 0), 0);
  const totalProfitLoss = totalCurrentValue - totalInvested;
  const profitLossPercentage =
    totalInvested > 0 ? ((totalProfitLoss / totalInvested) * 100).toFixed(2) : "0.00";
  const isProfit = totalProfitLoss >= 0;

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-800 flex items-center justify-center">
          <FaWallet className="ml-3 text-[#1E9CE0]" />
          لوحة محفظتي
        </h1>

        {error && <p className="text-red-600 text-center">{error}</p>}
        {success && <p className="text-green-600 text-center">{success}</p>}

        {/* الملخص */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-gray-500 font-semibold mb-2">إجمالي الاستثمار</h3>
            <p className="text-3xl font-bold text-gray-800">${formatNumber(totalInvested)}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-gray-500 font-semibold mb-2">القيمة الحالية</h3>
            <p className="text-3xl font-bold text-gray-800">${formatNumber(totalCurrentValue)}</p>
          </div>
          <div
            className={`p-6 rounded-xl shadow-md border ${
              isProfit ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
            }`}
          >
            <h3 className="text-black font-semibold mb-2">الربح / الخسارة</h3>
            <div className="flex items-center text-2xl font-bold text-black">
              <span className={`ml-2 ${isProfit ? "text-green-600" : "text-red-600"}`}>
                {isProfit ? <FaArrowUp /> : <FaArrowDown />}
              </span>
              <span>${formatNumber(totalProfitLoss)}</span>
              <span className={`mr-2 text-sm ${isProfit ? "text-green-600" : "text-red-600"}`}>
                ({profitLossPercentage}%)
              </span>
            </div>
          </div>
        </div>

        {/* جدول المحفظة */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 text-right">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">العملة</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">الكمية</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">سعر الشراء</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">السعر الحالي</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">إجمالي الشراء</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">الربح/الخسارة (%)</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">إجراءات</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {wallet.map((asset) => {
                const invested = (asset.amount || 0) * (asset.buyPrice || 0);
                const currentValue = (asset.amount || 0) * (asset.currentRate || 0);
                const profit = currentValue - invested;
                const profitPercent = invested > 0 ? ((profit / invested) * 100).toFixed(2) : "0.00";
                const isAssetProfit = profit >= 0;

                return (
                  <tr key={asset.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{asset.currencyCode}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{asset.amount ?? 0}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">${formatNumber(asset.buyPrice)}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">${formatNumber(asset.currentRate)}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">${formatNumber(invested)}</td>
                    <td
                      className={`px-6 py-4 text-sm font-semibold ${
                        isAssetProfit ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {isAssetProfit ? `+${profitPercent}%` : `${profitPercent}%`}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <button
                        onClick={() => requestDeleteAsset(asset.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* إضافة أصل جديد */}
        <div className="mt-10 p-8 bg-white rounded-xl shadow-2xl border border-gray-200">
          <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
            <FaPlus className="ml-2 text-blue-600" />
            إضافة أصل جديد
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <select
              value={newAsset.currencyCode}
              onChange={(e) => handleCurrencyChange(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">اختر العملة</option>
              {Object.entries(currencyNames).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="سعر الشراء"
              value={newAsset.buyPrice ?? ""}
              onChange={(e) =>
                setNewAsset({
                  ...newAsset,
                  buyPrice: e.target.value ? Number(e.target.value) : null,
                })
              }
              className="border border-gray-300 p-3 rounded-lg text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="number"
              placeholder="الكمية"
              value={newAsset.amount ?? ""}
              onChange={(e) =>
                setNewAsset({
                  ...newAsset,
                  amount: e.target.value ? Number(e.target.value) : null,
                })
              }
              className="border border-gray-300 p-3 rounded-lg text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={handleAddAsset}
              disabled={loading}
              className="col-span-1 sm:col-span-2 lg:col-span-3 px-6 py-3 rounded-lg bg-[#1E9CE0] text-white font-semibold shadow-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "جارٍ الإضافة..." : "إضافة الأصل"}
            </button>
          </div>
        </div>
      </div>

      {/* ✅ مودال التأكيد */}
      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-lg font-bold mb-4 text-gray-800">تأكيد الحذف</h2>
            <p className="text-gray-600 mb-6">هل أنت متأكد أنك تريد حذف هذا الأصل؟</p>

            <div className="flex justify-end gap-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-300"
              >
                إلغاء
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
