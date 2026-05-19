import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import BottomNav from './components/layout/BottomNav';
import { authService } from './services/authService';
import { useAuthStore } from './stores/authStore';

const App = () => {
  const { setUser, clearAuth, setInitialized } = useAuthStore();
  const location = useLocation();
  const hideBottomNav = location.pathname.startsWith('/debate/create');

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

  return (
    <Layout>
      <Content $withBottomNav={!hideBottomNav}>
        <Outlet />
      </Content>
      {!hideBottomNav && <BottomNav />}
    </Layout>
  );
};

const Layout = styled.div`
  min-height: 100dvh;
  position: relative;
`;

const Content = styled.main<{ $withBottomNav: boolean }>`
  padding-bottom: ${({ $withBottomNav }) => ($withBottomNav ? '60px' : '0')};
`;

export default App;
