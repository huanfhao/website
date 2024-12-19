import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // 保存当前路径，以便登录后返回
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAdmin && location.pathname.startsWith('/admin')) {
    toast.error('您没有访问管理后台的权限');
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};