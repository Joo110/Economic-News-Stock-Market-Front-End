// hooks/useMetalsCommodity.ts
import { useState, useEffect } from "react";
import api from "../lib/api";

export interface MetalPrice {
  id: number;
  type: string;
  unit: string;
  price: number;
  priceLow: number;
  priceHigh: number;
  changePercent: number;
  lastUpdated: string;
}

interface ApiResponse {
  status: number;
  data: MetalPrice[];
}

export const useMetalsCommodity = () => {
  const [data, setData] = useState<MetalPrice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get<ApiResponse>("/api/MetalsCommodity");
        setData(res.data.data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
