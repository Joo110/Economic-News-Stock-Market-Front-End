'use client';

import { useMutation } from '@tanstack/react-query';
import api from '../lib/api';
import Cookies from 'js-cookie';

interface LoginPayload {
  email: string;
  password: string;
  twoFactorCode?: string;
  twoFactorRecoveryCode?: string;
}

interface User {
  id: string;
  fullName: string;
  username: string;
  email: string;
  passwordHash: string;
  country: string;
  createdAt: string;
  userAlerts: null | unknown[];
  userPortfolios: null | unknown[];
}

interface LoginResponse {
  status: number;
  accessToken: string;
  refreshToken: string;
  user: User;
}

export function useLogin() {
  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: async ({ email, password, twoFactorCode = '', twoFactorRecoveryCode = '' }) => {
      try {
        const { data } = await api.post<LoginResponse>('/api/User/login', {
          email,
          password,
          twoFactorCode,
          twoFactorRecoveryCode,
        });

        Cookies.set('token', data.accessToken, { secure: true, sameSite: 'Strict' });
        Cookies.set('refreshToken', data.refreshToken, { secure: true, sameSite: 'Strict' });

        return data;
      } catch (error: unknown) {
        if (error instanceof Error) throw error;
        throw new Error('فشل تسجيل الدخول');
      }
    },
  });
}
