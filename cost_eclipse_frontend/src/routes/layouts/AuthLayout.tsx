import {
  //  Navigate,
   Outlet } from 'react-router-dom';
// import { localGet } from '@/utils/storage';
// import { SUPERADMIN_DASHBOARD } from '@/constants/app_urls';

export default function AuthLayout() {
  // const token = localGet('token');
  // if (token) return <Navigate to={SUPERADMIN_DASHBOARD} />;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Outlet />
    </div>
  );
}
