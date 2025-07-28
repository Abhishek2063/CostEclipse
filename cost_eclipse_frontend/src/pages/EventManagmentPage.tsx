import { DashboardLayout } from '@/components/layouts/private_layouts/DashboardLayout'
import { EventManagement } from '@/components/pages/event_managment/EventManagement'
import React from 'react'

const EventManagmentPage = () => {
  return (
       <DashboardLayout userRole="user">
          <EventManagement />
        </DashboardLayout>
  )
}

export default EventManagmentPage