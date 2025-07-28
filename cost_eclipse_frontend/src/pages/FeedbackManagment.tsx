import { DashboardLayout } from '@/components/layouts/private_layouts/DashboardLayout'
import { FeedbackManagement } from '@/components/pages/feedback_managment/FeedbackManagement'
import React from 'react'

const FeedbackManagment = () => {
  return (
   <DashboardLayout userRole="admin">
       <FeedbackManagement />
     </DashboardLayout>
  )
}

export default FeedbackManagment