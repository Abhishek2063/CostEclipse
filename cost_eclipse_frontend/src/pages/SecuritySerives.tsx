import React from 'react'
import { FinalCTASection } from '@/components/layouts/public_layouts/FinalCTASection'
import { Footer } from '@/components/layouts/public_layouts/Footer'
import { Header } from '@/components/layouts/public_layouts/Header'
import { SecurityServiceSection } from '@/components/pages/security_services/SecurityServiceSection'
const SecuritySerives = () => {
  return (
    <div className="min-h-screen bg-background">
    <Header />
    <main>
      <SecurityServiceSection />
      
      <FinalCTASection />
    </main>
    <Footer />
  </div>
  )
}

export default SecuritySerives