import { Navigate, Outlet } from 'react-router-dom';
import { isAdminLoggedIn } from '../../utils/auth';

const AuthGuard = () => {
  const isAdmin = isAdminLoggedIn();

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default AuthGuard;