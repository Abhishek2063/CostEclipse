import { DashboardLayout } from '@/components/layouts/private_layouts/DashboardLayout'
import { UserDashboard } from '@/components/pages/dashboard/UserDashboard'
import React from 'react'

const DashboardUser = () => {
  return (
    <DashboardLayout userRole="user">
      <UserDashboard />
    </DashboardLayout>
  )
}

export default DashboardUser