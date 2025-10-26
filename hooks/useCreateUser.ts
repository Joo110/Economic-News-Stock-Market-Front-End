import { useState } from "react";
import api from "@/lib/api";

export interface CreateUserRequest {
  fullName: string;
  country: string;
  username: string;
  email: string;
  password: string;
}


interface ApiResponse<T> {
  status: number;
  message?: string;
  data?: T;
}

export function useCreateUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const createUser = async (user: CreateUserRequest) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const res = await api.post<ApiResponse<CreateUserRequest>>("/api/User/create", user);

      if (res.data.status === 200) {
        setSuccess("✅ User created successfully");
      } else {
        setError(res.data.message || "❌ Failed to create user");
      }

      return res.data;
    } catch (err: unknown) {
  if (err instanceof Error) {
    setError(err.message);
  } else {
    setError("❌ Error creating user");
  }
}
 finally {
      setLoading(false);
    }
  };

  return { createUser, loading, error, success };
}