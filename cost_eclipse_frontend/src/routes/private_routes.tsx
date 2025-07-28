import {
  USER_DASHBOARD,
  SUPERADMIN_DASHBOARD,
  USER_MANAGEMENT,
  EXPENSE_MANAGEMENT,
  INCOME_MANAGEMENT,
  SAVING_MANAGEMENT,
  BUDGET_MANAGEMENT,
  FEEDBACK_MANAGEMENT,
  QUERY_MANAGEMENT,
  FRIENDS_MANAGEMENT,
  EVENT_MANAGEMENT,
  PROFILE_MANAGEMENT,
} from '@/constants/app_urls';
import React from 'react';

// Lazy load all route components
const UserDashboard = React.lazy(() => import('../pages/DashboardUser'));
const SuperAdminDashboard = React.lazy(() => import('../pages/DashboardSuperAdmin'));
const UserManagement = React.lazy(() => import('../pages/UserManagment'));
const ExpenseManagement = React.lazy(() => import('../pages/ExpenseManagment'));
const IncomeManagement = React.lazy(() => import('../pages/IncomeManagment'));
const SavingManagement = React.lazy(() => import('../pages/SavingManagement'));
const BudgetManagement = React.lazy(() => import('../pages/BudgetManagment'));
const FeedbackManagement = React.lazy(() => import('../pages/FeedbackManagment'));
const QueryManagement = React.lazy(() => import('../pages/QueryManagement'));
const FriendsManagement = React.lazy(() => import('../pages/FriendsManagment'));
const EventManagement = React.lazy(() => import('../pages/EventManagmentPage'));
const ProfileManagement = React.lazy(() => import('../pages/ProfileManagmentPage'));

export const privateRoutes = [
  { path: USER_DASHBOARD, element: <UserDashboard />, roles: ['user'] },
  { path: SUPERADMIN_DASHBOARD, element: <SuperAdminDashboard />, roles: ['user'] },
  { path: USER_MANAGEMENT, element: <UserManagement />, roles: ['user'] },
  { path: EXPENSE_MANAGEMENT, element: <ExpenseManagement />, roles: ['user'] },
  { path: INCOME_MANAGEMENT, element: <IncomeManagement />, roles: ['user'] },
  { path: SAVING_MANAGEMENT, element: <SavingManagement />, roles: ['user'] },
  { path: BUDGET_MANAGEMENT, element: <BudgetManagement />, roles: ['user'] },
  { path: FEEDBACK_MANAGEMENT, element: <FeedbackManagement />, roles: ['user'] },
  { path: QUERY_MANAGEMENT, element: <QueryManagement />, roles: ['user'] },
  { path: FRIENDS_MANAGEMENT, element: <FriendsManagement />, roles: ['user'] },
  { path: EVENT_MANAGEMENT, element: <EventManagement />, roles: ['user'] },
  { path: PROFILE_MANAGEMENT, element: <ProfileManagement />, roles: ['user'] },
];
