import { DashboardLayout } from '@/components/layouts/private_layouts/DashboardLayout'
import { FriendManagement } from '@/components/pages/friends_managment/FriendManagement'
import React from 'react'

const FriendsManagment = () => {
  return (
   <DashboardLayout userRole="user">
      <FriendManagement />
    </DashboardLayout>
  )
}

export default FriendsManagment