import { useState, useEffect } from "react";
import api from "@/lib/api";

export interface CryptoData {
  coinId: string;
  name: string;
  symbol: string | null;
  price: number;
  change24h: number;
  change7d: number;
  marketCap: number;
  volume24h: number;
  supply: number;
  lastUpdated: string;
}

interface ApiResponse<T> {
  status: number;
  count: number;
  data: T[];
}

export function useCryptoCurrencies() {
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get<ApiResponse<CryptoData>>("/api/CryptoCurrency/all");

        setCryptos(res.data.data); // ✅ دلوقتي TS عارف إن في data
      } catch (err) {
        setError("❌ Error fetching cryptos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { cryptos, loading, error };
}
