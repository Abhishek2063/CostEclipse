import { DashboardLayout } from '@/components/layouts/private_layouts/DashboardLayout'
import { SavingManagement } from '@/components/pages/saving_managment/SavingManagement'
import React from 'react'

const SavingManagementMain = () => {
  return (
      <DashboardLayout userRole="admin">
          <SavingManagement />
        </DashboardLayout>
  )
}

export default SavingManagementMain