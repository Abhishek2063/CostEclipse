import { DashboardLayout } from '@/components/layouts/private_layouts/DashboardLayout'
import { SuperAdminDashboard } from '@/components/pages/dashboard/SuperAdminDashboard'
import React from 'react'

const DashboardSuperAdmin = () => {
  return (
    <DashboardLayout userRole="admin">
      <SuperAdminDashboard />
    </DashboardLayout>
  )
}

export default DashboardSuperAdmin