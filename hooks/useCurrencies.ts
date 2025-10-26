import { useState, useEffect } from "react";
import api from "@/lib/api";
import currencyNames from "@/lib/currencyNames";

export interface Currency {
  id: number;
  code: string;
  name: string;
  lastUpdated: string;
  rateToUSD: number;
}

export interface ApiResponse {
  status: number;
  data: Currency;
  name?: string;
}
type CurrencyResponse = Currency[] | { data: Currency[] };

export function useCurrencies() {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get<CurrencyResponse>("/api/Currency/all");

        const rawData: Currency[] = Array.isArray(res.data)
          ? res.data
          : res.data.data;

        const mapped: Currency[] = rawData.map((c) => ({
          ...c,
          name: currencyNames[c.code] || c.code,
        }));

        setCurrencies(mapped);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCurrencyByCode = async (code: string): Promise<number> => {
  try {
    const res = await api.get<Currency>(`/api/Currency/${code}`);
    return res.data.rateToUSD; // ✅ يرجع الرقم بس
  } catch (err) {
    console.error("❌ Error fetching currency by code:", err);
    return 0; // لو في مشكلة يرجع 0
  }
};



  return { currencies, loading, error, getCurrencyByCode };
}