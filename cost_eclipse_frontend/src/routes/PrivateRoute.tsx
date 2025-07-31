import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { localGet } from '@/utils/storage';
// import { LOGIN, SUPERADMIN_DASHBOARD } from '@/constants/app_urls';

interface PrivateRouteProps {
  children: React.ReactNode;
  // roles?: string[];
}

const PrivateRoute = ({ children,
  //  roles
   }: PrivateRouteProps) => {
  // const user = localGet('user');
  // const token = localGet('token');

  // if (!token || !user) return <Navigate to={LOGIN} />;
  // if (roles && !roles.includes(user.role)) return <Navigate to={SUPERADMIN_DASHBOARD} />;

  return <>{children}</>;
};

export default PrivateRoute;
