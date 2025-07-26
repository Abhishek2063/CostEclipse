import { DashboardLayout } from '@/components/layouts/private_layouts/DashboardLayout'
import { ExpenseManagement } from '@/components/pages/expanse_managment/ExpenseManagement'
import React from 'react'

const ExpenseManagment = () => {
  return (
    <DashboardLayout userRole="admin">
    <ExpenseManagement />
  </DashboardLayout>
  )
}

export default ExpenseManagment