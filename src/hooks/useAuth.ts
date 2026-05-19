import { useCallback } from 'react';
import { useAuthStore } from '../stores/authStore';
import { authService } from '../services/authService';

export const useAuth = () => {
  const { user, isAuthenticated, setUser, clearAuth, setInitialized } = useAuthStore();

  const signup = useCallback(async (email: string, nickname: string, password: string) => {
    await authService.signup({ email, nickname, password });
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { data } = await authService.login({ email, password });
    localStorage.setItem('accessToken', data.accessToken);
    setUser(data.user);
    setInitialized();
  }, [setInitialized, setUser]);

  const logout = useCallback(async () => {
    await authService.logout();
    localStorage.removeItem('accessToken');
    clearAuth();
  }, [clearAuth]);

  return { user, isAuthenticated, signup, login, logout };
};
