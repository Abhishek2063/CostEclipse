import React from 'react'
import { FinalCTASection } from '@/components/layouts/public_layouts/FinalCTASection'
import { Footer } from '@/components/layouts/public_layouts/Footer'
import { Header } from '@/components/layouts/public_layouts/Header'
import { CookiesPolicySection } from '@/components/pages/cookies_policy/CookiesPolicySection'

const CookiesPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
    <Header />
    <main>
      <CookiesPolicySection />
      
      <FinalCTASection />
    </main>
    <Footer />
  </div>
  )
}

export default CookiesPolicy