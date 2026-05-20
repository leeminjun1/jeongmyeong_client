import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { authService } from '../../services/authService';
import { useAuthStore } from '../../stores/authStore';

interface AuthInitializerProps {
  children: ReactNode;
}

const AuthInitializer = ({ children }: AuthInitializerProps) => {
  const { setUser, clearAuth, setInitialized } = useAuthStore();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setInitialized();
      return;
    }

    authService
      .getMe()
      .then(({ data }) => setUser(data.user))
      .catch(() => {
        localStorage.removeItem('accessToken');
        clearAuth();
      })
      .finally(() => setInitialized());
  }, [clearAuth, setInitialized, setUser]);

  return children;
};

export default AuthInitializer;
