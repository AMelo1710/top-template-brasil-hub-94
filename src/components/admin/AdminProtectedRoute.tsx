import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

const AdminProtectedRoute = ({ children }: AdminProtectedRouteProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    
    // Se não tem token e não está na página de login, redireciona
    if (!adminToken && location.pathname !== '/admin/login') {
      navigate('/admin/login');
    }
    
    // Se tem token e está na página de login, redireciona para admin
    if (adminToken && location.pathname === '/admin/login') {
      navigate('/admin');
    }
  }, [navigate, location]);

  return <>{children}</>;
};

export default AdminProtectedRoute;