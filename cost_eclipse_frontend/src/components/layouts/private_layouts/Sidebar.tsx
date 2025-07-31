import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import {
  LayoutDashboard,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Target,
  BarChart3,
  Calendar,
  User,
  Settings,
  HelpCircle,
  LogOut,
  Users,
  Shield,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Logo } from '@/components/pages/home/Logo';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  BUDGET_MANAGEMENT,
  EVENT_MANAGEMENT,
  EXPENSE_MANAGEMENT,
  FEEDBACK_MANAGEMENT,
  HOME,
  INCOME_MANAGEMENT,
  PROFILE_MANAGEMENT,
  QUERY_MANAGEMENT,
  SAVING_MANAGEMENT,
  SUPERADMIN_DASHBOARD,
  USER_DASHBOARD,
  USER_MANAGEMENT,
} from '@/constants/app_urls';

interface SidebarProps {
  userRole?: 'user' | 'admin';
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

function SidebarContent({
  userRole = 'user',
  collapsed = false,
  onToggleCollapse,
  isMobile = false,
  onItemClick,
}: {
  userRole?: 'user' | 'admin';
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  isMobile?: boolean;
  onItemClick?: (itemId: string) => void;
}) {
  const [activeItem, setActiveItem] = useState('dashboard');
  const location = useLocation();
  const navigate = useNavigate();
  const userMenuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
      path: USER_DASHBOARD,
    },
    { id: 'income', label: 'Income', icon: TrendingUp, badge: null, path: INCOME_MANAGEMENT },
    { id: 'expenses', label: 'Expenses', icon: TrendingDown, badge: '3', path: EXPENSE_MANAGEMENT },
    { id: 'savings', label: 'Savings', icon: PiggyBank, badge: null, path: SAVING_MANAGEMENT },
    { id: 'budgets', label: 'Budgets', icon: Target, badge: null, path: BUDGET_MANAGEMENT },
    { id: 'reports', label: 'Reports', icon: BarChart3, badge: null, path: USER_DASHBOARD }, // Placeholder
    { id: 'events', label: 'Events', icon: Calendar, badge: '2', path: EVENT_MANAGEMENT },
  ];

  const adminMenuItems = [
    ...userMenuItems,
    {
      id: 'user-management',
      label: 'User Management',
      icon: Users,
      badge: null,
      path: USER_MANAGEMENT,
    },
    {
      id: 'system-analytics',
      label: 'System Analytics',
      icon: Shield,
      badge: null,
      path: SUPERADMIN_DASHBOARD,
    },
    {
      id: 'feedback-management',
      label: 'Feedback Management',
      icon: MessageSquare,
      badge: '12',
      path: FEEDBACK_MANAGEMENT,
    },
    {
      id: 'query-management',
      label: 'Query Management',
      icon: HelpCircle,
      badge: '5',
      path: QUERY_MANAGEMENT,
    },
    {
      id: 'admin-settings',
      label: 'Admin Settings',
      icon: Settings,
      badge: null,
      path: PROFILE_MANAGEMENT,
    },
  ];

  const bottomMenuItems = [
    { id: 'profile', label: 'Profile', icon: User, path: PROFILE_MANAGEMENT },
    { id: 'settings', label: 'Settings', icon: Settings, path: PROFILE_MANAGEMENT },
    { id: 'support', label: 'Support / Queries', icon: HelpCircle, path: QUERY_MANAGEMENT },
    { id: 'logout', label: 'Logout', icon: LogOut, path: HOME },
  ];

  const menuItems = userRole === 'admin' ? adminMenuItems : userMenuItems;

  const handleItemClick = (itemId: string, path: string) => {
    setActiveItem(itemId);
    navigate(path);
    onItemClick?.(itemId);
  };

  useEffect(() => {
    const currentItem = menuItems.find((item) => item.path === location.pathname);
    if (currentItem) {
      setActiveItem(currentItem.id);
    }
  }, [location.pathname]);

  return (
    <div className="h-full bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {(!collapsed || isMobile) && (
            <div className="flex items-center gap-3">
              <Logo variant="primary" size="sm" />
              <div>
                <h2 className="font-bold text-sidebar-foreground">CostEclipse</h2>
                <p className="text-xs text-sidebar-foreground/60">Financial Management</p>
              </div>
            </div>
          )}
          {collapsed && !isMobile && (
            <div className="flex justify-center w-full">
              <Logo variant="primary" size="sm" />
            </div>
          )}
          {!isMobile && onToggleCollapse && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleCollapse}
              className="text-sidebar-foreground hover:bg-sidebar-accent p-1 h-8 w-8"
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      </div>

      {/* User Role Badge */}
      {(!collapsed || isMobile) && (
        <div className="px-4 py-2">
          <Badge
            className={`w-full justify-center ${
              userRole === 'admin'
                ? 'bg-gradient-to-r from-primary to-secondary text-white'
                : 'bg-gradient-to-r from-success to-primary text-white'
            }`}
          >
            {userRole === 'admin' ? 'Super Admin' : 'User Dashboard'}
          </Badge>
        </div>
      )}

      {/* Navigation Menu */}
      <div className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;

          return (
            <Button
              key={item.id}
              variant={isActive ? 'default' : 'ghost'}
              className={`w-full justify-start h-10 px-3 ${
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              } ${collapsed && !isMobile ? 'px-0 justify-center' : ''}`}
              onClick={() => handleItemClick(item.id, item.path)}
            >
              <Icon className={`h-4 w-4 ${collapsed && !isMobile ? '' : 'mr-3'}`} />
              {(!collapsed || isMobile) && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-2 h-5 text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Button>
          );
        })}
      </div>

      {/* Bottom Menu */}
      <div className="border-t border-sidebar-border p-2 space-y-1">
        {bottomMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;

          return (
            <Button
              key={item.id}
              variant={isActive ? 'default' : 'ghost'}
              className={`w-full justify-start h-10 px-3 ${
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              } ${collapsed && !isMobile ? 'px-0 justify-center' : ''} ${
                item.id === 'logout'
                  ? 'text-destructive hover:text-destructive hover:bg-destructive/10'
                  : ''
              }`}
              onClick={() => handleItemClick(item.id, item.path)}
            >
              <Icon className={`h-4 w-4 ${collapsed && !isMobile ? '' : 'mr-3'}`} />
              {(!collapsed || isMobile) && <span className="flex-1 text-left">{item.label}</span>}
            </Button>
          );
        })}
      </div>

      {/* Collapse indicator tooltip for collapsed state */}
      {collapsed && !isMobile && (
        <div className="p-2 text-center">
          <div className="w-8 h-1 bg-sidebar-border rounded-full mx-auto"></div>
        </div>
      )}
    </div>
  );
}

export function Sidebar({
  userRole = 'user',
  collapsed = false,
  onToggleCollapse,
  isMobile = false,
  isOpen = false,
  onClose,
}: SidebarProps) {
  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent
            userRole={userRole}
            collapsed={false}
            isMobile={true}
            onItemClick={() => onClose?.()}
          />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className={`h-full transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <SidebarContent
        userRole={userRole}
        collapsed={collapsed}
        onToggleCollapse={onToggleCollapse}
        isMobile={false}
      />
    </div>
  );
}
