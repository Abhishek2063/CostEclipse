import React from 'react'
import { FinalCTASection } from '@/components/pages/home/FinalCTASection'
import { Footer } from '@/components/pages/home/Footer'
import { Header } from '@/components/pages/home/Header'
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