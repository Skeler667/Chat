import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.hook';
import routes from '../untils/routes';

const PrivateRoute = () => {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to={routes.login} />;
};
export default PrivateRoute;
