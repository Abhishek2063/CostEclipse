import { DashboardFooter } from '@/components/layouts/private_layouts/DashboardFooter';
import { DashboardHeader } from '@/components/layouts/private_layouts/DashboardHeader';
import { Sidebar } from '@/components/layouts/private_layouts/Sidebar';
import { LOGIN, SUPERADMIN_DASHBOARD } from '@/constants/app_urls';
import { localGet } from '@/utils/storage';
import { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  roles?: string[];
}

export default function PrivateLayout({ roles }: PrivateRouteProps) {
  const user = localGet('user');
  const token = localGet('token');
  if (!token) return <Navigate to={LOGIN} />;
  if (!user) return <Navigate to={LOGIN} />;
  if (roles && !roles.includes(user.role)) return <Navigate to={SUPERADMIN_DASHBOARD} />;

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Check if screen is mobile size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
      if (window.innerWidth < 1024) {
        setSidebarCollapsed(false); // Reset collapse state on mobile
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileSidebarOpen(!mobileSidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  const closeMobileSidebar = () => {
    setMobileSidebarOpen(false);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Sidebar
          userRole={user.role}
          collapsed={sidebarCollapsed}
          onToggleCollapse={toggleSidebar}
          isMobile={false}
        />
      )}

      {/* Mobile Sidebar */}
      {isMobile && (
        <Sidebar
          userRole={user.role}
          isMobile={true}
          isOpen={mobileSidebarOpen}
          onClose={closeMobileSidebar}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header */}
        <DashboardHeader onMenuToggle={toggleSidebar} isMobile={isMobile} />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6">
          <Outlet />
        </main>

        {/* Footer - Hidden on mobile for better space utilization */}
        <div className="hidden sm:block">
          <DashboardFooter />
        </div>
      </div>
    </div>
  );
}
