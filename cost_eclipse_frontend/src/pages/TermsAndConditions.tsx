import React from 'react'
import { FinalCTASection } from '@/components/layouts/public_layouts/FinalCTASection'
import { Footer } from '@/components/layouts/public_layouts/Footer'
import { Header } from '@/components/layouts/public_layouts/Header'
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