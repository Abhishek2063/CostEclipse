import { DashboardLayout } from '@/components/layouts/private_layouts/DashboardLayout'
import { UserManagement } from '@/components/pages/user_management/UserManagement'
import React from 'react'

const UserManagment = () => {
  return (
    <DashboardLayout userRole="admin">
      <UserManagement />
    </DashboardLayout>
  )
}

export default UserManagment