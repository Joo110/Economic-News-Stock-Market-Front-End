// hooks/useCurrencyConverter.ts
import { useState } from "react";
import api from "@/lib/api";

interface ConversionResult {
  fromCode: string;
  toCode: string;
  amount: number;
  convertedAmount: number;
}

export function useCurrencyConverter() {
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const convert = async (fromCode: string, toCode: string, amount: number) => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.get<ConversionResult>("/api/Currency/convert", {
        params: { fromCode, toCode, amount }, // 👈 Query Parameters
      });

      setResult(res.data);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { result, loading, error, convert };
}