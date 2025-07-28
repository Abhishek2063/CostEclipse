import { DashboardLayout } from '@/components/layouts/private_layouts/DashboardLayout'
import { ProfileManagement } from '@/components/pages/profile_managment/ProfileManagement'
import React from 'react'

const ProfileManagmentPage = () => {
  return (
      <DashboardLayout userRole="user">
         <ProfileManagement />
       </DashboardLayout>
  )
}

export default ProfileManagmentPage