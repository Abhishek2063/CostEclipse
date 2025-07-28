import React from 'react'
import { FinalCTASection } from '@/components/layouts/public_layouts/FinalCTASection'
import { Footer } from '@/components/layouts/public_layouts/Footer'
import { Header } from '@/components/layouts/public_layouts/Header'
import { PrivacyPolicySection } from '@/components/pages/privacy_policy/PrivacyPolicySection'
const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
    <Header />
    <main>
      <PrivacyPolicySection />
      
      <FinalCTASection />
    </main>
    <Footer />
  </div>
  )
}

export default PrivacyPolicy