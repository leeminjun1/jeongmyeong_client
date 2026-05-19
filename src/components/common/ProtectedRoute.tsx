import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

const ProtectedRoute = () => {
  const { isAuthenticated, isInitialized } = useAuthStore();
  const location = useLocation();
  const isProfilePath = location.pathname === '/profile';

  if (!isInitialized) return null;
  if (!isAuthenticated && !isProfilePath) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
