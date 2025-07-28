import { DashboardLayout } from '@/components/layouts/private_layouts/DashboardLayout'
import { BudgetManagement } from '@/components/pages/budget_managment/BudgetManagement'
import React from 'react'

const BudgetManagment = () => {
  return (
    <DashboardLayout userRole="admin">
        <BudgetManagement />
      </DashboardLayout>
  )
}

export default BudgetManagment