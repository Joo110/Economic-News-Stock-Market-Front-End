import { useState, useEffect } from "react";
import api from "@/lib/api";

export interface useUserAlerts {
  id: number;
  message: string;
  createdAt: string;
  newsTitle?: string;
  newsCategory?: string;
  newsPublishedAt?: string;
}

interface ApiResponse<T> {
  status: number;
  message?: string;
  data?: T;
}

export function useUserAlerts() {
  const [alerts, setAlerts] = useState<useUserAlerts[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.get<ApiResponse<useUserAlerts[]>>("/api/UserAlert/me");

      if (res.data.status === 200 && res.data.data) {
        setAlerts(res.data.data);
      } else {
        setError(res.data.message || "❌ Failed to fetch alerts");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("❌ Error fetching alerts");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  return { alerts, loading, error, refetch: fetchAlerts };
}