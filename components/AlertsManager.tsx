"use client";
import React from "react";
import { useUserAlerts } from "@/hooks/useUserAlerts";

export default function AlertsManager() {
  const { alerts, loading, error, refetch } = useUserAlerts();

  return (
    <div className="container mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold text-gray-500 mb-4">تنبيهاتي</h2>

      {loading && <p className="text-gray-500">⏳ جاري تحميل التنبيهات...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && alerts.length === 0 && (
        <p className="text-gray-500">لا يوجد تنبيهات حالياً.</p>
      )}

      {!loading && !error && alerts.length > 0 && (
        <ul className="space-y-2">
          {alerts.map((alert) => (
            <li
              key={alert.id}
              className="p-3 bg-gray-100 rounded-lg shadow-sm text-gray-700"
            >
              <p>{alert.message}</p>
              {alert.newsTitle && (
                <p className="text-sm text-gray-500">
                  📰 {alert.newsTitle} - {alert.newsCategory}
                </p>
              )}
              <span className="text-xs text-gray-400">
                {new Date(alert.createdAt).toLocaleString("ar-EG")}
              </span>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={refetch}
        className="mt-4 px-4 py-2 bg-[#1E9CE0] text-white rounded"
      >
        🔄 تحديث
      </button>
    </div>
  );
}
