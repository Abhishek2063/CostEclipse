import React from 'react'
import { FinalCTASection } from '@/components/pages/home/FinalCTASection'
import { Footer } from '@/components/pages/home/Footer'
import { Header } from '@/components/pages/home/Header'
import { TermsOfServiceSection } from '@/components/pages/terms_and_conditions/TermsOfServiceSection'
const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-background">
    <Header />
    <main>
      <TermsOfServiceSection />
      
      <FinalCTASection />
    </main>
    <Footer />
  </div>
  )
}

export default TermsAndConditions