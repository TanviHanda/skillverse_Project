import { Navigate, Outlet } from 'react-router-dom';

export function PrivateRoute() {
  const isAuthenticated = !!localStorage.getItem('skillhub_token'); 
  
  return isAuthenticated ? <Outlet /> : <Navigate to="/register" replace />;
}