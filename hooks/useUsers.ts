import { useState, useEffect } from "react";
import api from "@/lib/api";

interface User {
  id: string;
  fullName: string;
  country: string;
  username: string;
  email: string;
}

interface ApiResponse<T> {
  status: number;
  message?: string;
  data?: T;
}

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.get<ApiResponse<User[]>>("/api/User");

      if (res.data.status === 200 && res.data.data) {
        setUsers(res.data.data);
      } else {
        setError(res.data.message || "❌ Failed to fetch users");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("❌ Error fetching users");
      }
    } finally {
      setLoading(false);
    }
  };

  // يشتغل اول ما الكومبوننت يتركب
  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, error, refetch: fetchUsers };
}