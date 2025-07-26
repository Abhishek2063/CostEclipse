import { DashboardLayout } from '@/components/layouts/private_layouts/DashboardLayout'
import { IncomeManagement } from '@/components/pages/income_managment/IncomeManagement'
import React from 'react'

const IncomeManagment = () => {
  return (
    <DashboardLayout userRole="admin">
    <IncomeManagement />
  </DashboardLayout>
  )
}

export default IncomeManagment