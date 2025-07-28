import { DashboardLayout } from '@/components/layouts/private_layouts/DashboardLayout'
import { QueryManagement } from '@/components/pages/query_managment/QueryManagement'
import React from 'react'

const QueryManagementMain = () => {
  return (
   <DashboardLayout userRole="admin">
       <QueryManagement />
     </DashboardLayout>
  )
}

export default QueryManagementMain