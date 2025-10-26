import { useState } from "react";
import api from "@/lib/api";

interface ApiResponse<T> {
  status: number;
  message?: string;
  data?: T;
}

export function useDeleteUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const deleteUser = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const res = await api.delete<ApiResponse<null>>(`/api/User/delete/${id}`);

      if (res.data.status === 200) {
        setSuccess("✅ User deleted successfully");
      } else {
        setError(res.data.message || "❌ Failed to delete user");
      }

      return res.data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("❌ Error deleting user");
      }
    } finally {
      setLoading(false);
    }
  };

  return { deleteUser, loading, error, success };
}