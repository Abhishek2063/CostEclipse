import React from 'react'
import { FinalCTASection } from '@/components/pages/home/FinalCTASection'
import { Footer } from '@/components/pages/home/Footer'
import { Header } from '@/components/pages/home/Header'
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